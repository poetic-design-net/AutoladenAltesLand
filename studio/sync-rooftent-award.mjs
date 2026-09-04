/** Add the user-provided manufacturer award to the existing gallery. Dry-run by default. */
import { createClient } from '@sanity/client';
import { createReadStream } from 'node:fs';
import { readFile, mkdtemp, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { dirname, resolve, basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
const here = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(here, '.env'), quiet: true });
if (!process.env.SANITY_TOKEN) throw new Error('SANITY_TOKEN fehlt');
const client = createClient({
  projectId: 'dgeh1xh8',
  dataset: 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});
const apply = process.argv.includes('--apply');
const {
  fallbackFrontpage: { rooftent },
} = JSON.parse(await readFile(resolve(here, '../src/data/content-defaults.json'), 'utf8'));
const photo = rooftent.gallery.find((item) => item.fit === 'contain');
const docs = await client.fetch('*[_id in ["frontpage", "drafts.frontpage"]]');
if (!docs.some((doc) => doc._id === 'frontpage') || docs.some((doc) => !doc.rooftent))
  throw new Error('Dachzelt-Abschnitt fehlt');
if (apply) {
  const backup = join(await mkdtemp(join(tmpdir(), 'aal-award-backup-')), 'frontpage.json');
  await writeFile(backup, JSON.stringify(docs, null, 2), { mode: 0o600 });
  console.log(`Sicherung: ${backup}`);
}
const path = resolve(here, '../public', photo.image.slice(1));
const sha1hash = createHash('sha1')
  .update(await readFile(path))
  .digest('hex');
let asset = await client.fetch('*[_type == "sanity.imageAsset" && sha1hash == $sha1hash][0]{_id}', {
  sha1hash,
});
if (!asset && apply)
  asset = await client.assets.upload('image', createReadStream(path), {
    filename: basename(path),
    label: photo.alt,
  });
let tx = client.transaction();
let count = 0;
for (const doc of docs) {
  const changes = {};
  for (const key of ['awardText', 'awardSourceLabel', 'awardSourceUrl'])
    if (doc.rooftent[key] === undefined) changes[`rooftent.${key}`] = rooftent[key];
  const gallery = doc.rooftent.gallery || [];
  if (
    !gallery.some(
      (item) =>
        item._key === 'naturbummler-award-2026' || (asset && item.image?.asset?._ref === asset._id)
    )
  )
    changes['rooftent.gallery'] = [
      ...gallery,
      {
        _key: 'naturbummler-award-2026',
        alt: photo.alt,
        fit: 'contain',
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset?._id || 'pending-award-upload' },
        },
      },
    ];
  if (!Object.keys(changes).length) continue;
  tx = tx.patch(doc._id, (p) => p.ifRevisionId(doc._rev).set(changes));
  console.log(`${apply ? 'Schreibe' : 'Vorschau'} ${doc._id}: ${Object.keys(changes).join(', ')}`);
  count++;
}
if (apply && count) await tx.commit();
console.log(
  `${count} Dokument(e) ${apply ? 'aktualisiert' : 'vorgesehen'}. Bestehende Bilder und Texte bleiben erhalten.`
);
