/** Import current website defaults. Preview by default; --apply fills missing content. */
import { createClient } from '@sanity/client';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';
import dotenv from 'dotenv';
import frontpage from './schemas/frontpage.js';
import siteSettings from './schemas/siteSettings.js';
import fahrzeug from './schemas/fahrzeug.js';
import aboutPage from './schemas/aboutPage.js';
import { fillMissing, toSanity } from './import-utils.mjs';

const here = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(here, '.env'), quiet: true });
const apply = process.argv.includes('--apply');
const only = process.argv.find((arg) => arg.startsWith('--only='))?.slice('--only='.length);
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'dgeh1xh8',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  perspective: 'raw',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

async function main() {
  if (only && !['frontpage', 'aboutPage', 'siteSettings'].includes(only))
    throw new Error('--only erwartet frontpage, aboutPage oder siteSettings');
  if (apply && !process.env.SANITY_TOKEN) throw new Error('SANITY_TOKEN fehlt in studio/.env');
  const defaults = JSON.parse(
    await readFile(resolve(here, '../src/data/content-defaults.json'), 'utf8')
  );
  const vehicleDefaults = JSON.parse(
    await readFile(resolve(here, '../src/data/vehicle-defaults.json'), 'utf8')
  );
  const docs = await client.fetch('*[!(_type match "system.*") && !(_type match "sanity.*")]');
  if (apply) {
    const dir = resolve(here, 'backups');
    await mkdir(dir, { recursive: true });
    const file = resolve(dir, `${new Date().toISOString().replaceAll(':', '-')}.json`);
    await writeFile(file, JSON.stringify(docs, null, 2), { mode: 0o600 });
    console.log(`Sicherung: ${file}`);
  }
  const cache = new Map();
  async function upload(file, alt) {
    if (!file?.startsWith('/') || file.includes('..'))
      throw new Error(`Ungültiger lokaler Bildpfad: ${file}`);
    if (!cache.has(file)) {
      const bytes = await readFile(resolve(here, '../public', file.slice(1)));
      const sha1hash = createHash('sha1').update(bytes).digest('hex');
      let asset = await client.fetch(
        '*[_type == "sanity.imageAsset" && sha1hash == $sha1hash][0]{_id}',
        { sha1hash }
      );
      if (!asset && apply)
        asset = await client.assets.upload('image', bytes, { filename: basename(file) });
      cache.set(file, asset?._id ?? `pending-${sha1hash}`);
    }
    return { _type: 'image', asset: { _type: 'reference', _ref: cache.get(file) }, alt };
  }
  let tx = client.transaction(),
    changed = 0;
  const targets = [
    { id: 'siteSettings', schema: siteSettings, values: defaults.fallbackSite },
    { id: 'frontpage', schema: frontpage, values: defaults.fallbackFrontpage },
    {
      id: 'aboutPage',
      schema: aboutPage,
      // Migrate published dialog edits, never unpublished frontpage drafts.
      values: fillMissing(
        docs.find((doc) => doc._id === 'frontpage')?.about,
        defaults.fallbackAboutPage
      ),
    },
    ...vehicleDefaults.map((v, i) => ({
      id: `fahrzeug-${v.id}`,
      schema: fahrzeug,
      values: {
        ...v,
        slug: { _type: 'slug', current: v.id },
        price: v.price.value,
        priceOld: v.price.old,
        priceTerms: v.price.terms,
        verfuegbar: true,
        sortierung: (i + 1) * 10,
      },
    })),
  ];
  for (const { id, schema, values } of targets) {
    if (only && id !== only) continue;
    // Do not reintroduce removed example vehicles into an already configured catalogue.
    if (
      schema.name === 'fahrzeug' &&
      !docs.some((d) => d._id === id) &&
      docs.some((d) => d._id === 'siteSettings')
    )
      continue;
    const existing = docs.filter((d) => d._id === id || d._id === `drafts.${id}`);
    const variants = existing.length ? existing : [{ _id: id, _type: schema.name }];
    for (const doc of variants) {
      const filled = fillMissing(doc, values);
      const fields = await toSanity(filled, schema, upload);
      const changes = Object.fromEntries(
        Object.entries(fields).filter(([key, value]) => !isDeepStrictEqual(doc[key], value))
      );
      if (!Object.keys(changes).length) {
        console.log(`${doc._id}: aktuell`);
        continue;
      }
      console.log(
        `${apply ? 'Schreibe' : 'Vorschau'} ${doc._id}: ${Object.keys(changes).join(', ')}`
      );
      if (doc._rev) tx = tx.patch(doc._id, (patch) => patch.ifRevisionId(doc._rev).set(changes));
      else tx = tx.create({ _id: doc._id, _type: schema.name, ...fields });
      changed++;
    }
  }
  const legacy = docs.filter(
    (d) => !['frontpage', 'aboutPage', 'siteSettings', 'fahrzeug'].includes(d._type)
  );
  if (legacy.length)
    console.log(
      `Alte Dokumente bleiben gesichert erhalten: ${legacy.map((d) => d._id).join(', ')}`
    );
  if (apply && changed) await tx.commit();
  console.log(
    `${changed} Dokument(e) ${apply ? 'übertragen' : 'geplant'}. ${apply ? 'Keine Dokumente gelöscht; vorhandene Texte und Entwürfe bleiben erhalten.' : 'Mit --apply übernehmen.'}`
  );
}
main().catch((error) => {
  console.error(`Import fehlgeschlagen: ${error.message}`);
  process.exitCode = 1;
});
