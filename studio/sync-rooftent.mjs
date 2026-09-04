/** Adds only the rooftop-tent section and its enquiry topic. Dry-run unless --apply. */
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
const apply = process.argv.includes('--apply');
const client = createClient({
  projectId: 'dgeh1xh8',
  dataset: 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});
const { fallbackFrontpage } = JSON.parse(
  await readFile(resolve(here, '../src/data/content-defaults.json'), 'utf8')
);
const docs = await client.fetch('*[_id in ["frontpage", "drafts.frontpage"]]');
if (!docs.some((doc) => doc._id === 'frontpage')) throw new Error('Startseite fehlt');
if (apply) {
  const backup = join(await mkdtemp(join(tmpdir(), 'aal-rooftent-backup-')), 'frontpage.json');
  await writeFile(backup, JSON.stringify(docs, null, 2), { mode: 0o600 });
  console.log(`Sicherung: ${backup}`);
}
async function image(path, alt) {
  const file = resolve(here, '../public', path.replace(/^\//, ''));
  const sha1hash = createHash('sha1')
    .update(await readFile(file))
    .digest('hex');
  let asset = await client.fetch(
    '*[_type == "sanity.imageAsset" && sha1hash == $sha1hash][0]{_id}',
    { sha1hash }
  );
  if (!asset && apply)
    asset = await client.assets.upload('image', createReadStream(file), {
      filename: basename(file),
      label: alt,
    });
  return {
    _type: 'image',
    alt,
    asset: { _type: 'reference', _ref: asset?._id || `pending-${basename(file)}` },
  };
}
let section;
if (docs.some((doc) => !doc.rooftent)) {
  section = structuredClone(fallbackFrontpage.rooftent);
  section.image = await image(section.image, section.imageAlt);
  delete section.imageSmall;
  delete section.imageAlt;
  section.gallery = await Promise.all(
    section.gallery.map(async (item, i) => ({
      _key: `rooftent-photo-${i + 1}`,
      image: await image(item.image, item.alt),
      alt: item.alt,
    }))
  );
}
let transaction = client.transaction();
let count = 0;
for (const doc of docs) {
  const changes = {};
  if (!doc.rooftent) changes.rooftent = section;
  const topics =
    doc.form?.topics || fallbackFrontpage.form.topics.map((item) => ({ ...item, _key: item.id }));
  if (!topics.some((item) => item.id === 'dachzelt'))
    changes['form.topics'] = [
      ...topics,
      { _key: 'dachzelt', id: 'dachzelt', label: fallbackFrontpage.rooftent.topicLabel },
    ];
  if (!Object.keys(changes).length) continue;
  console.log(`${apply ? 'Schreibe' : 'Vorschau'} ${doc._id}: ${Object.keys(changes).join(', ')}`);
  transaction = transaction.patch(doc._id, (patch) => patch.ifRevisionId(doc._rev).set(changes));
  count++;
}
if (apply && count) await transaction.commit();
console.log(
  `${count} Dokument(e) ${apply ? 'aktualisiert' : 'vorgesehen'}. Bestehende Inhalte bleiben erhalten.`
);
