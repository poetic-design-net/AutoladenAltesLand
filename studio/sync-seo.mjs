/** Refresh only the known old defaults; preserve independently edited SEO copy. */
import { createClient } from '@sanity/client';
import { readFile, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
const here = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(here, '.env'), quiet: true });
if (!process.env.SANITY_TOKEN) throw new Error('SANITY_TOKEN fehlt.');
const client = createClient({
  projectId: 'dgeh1xh8',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});
const { fallbackFrontpage: defaults } = JSON.parse(
  await readFile(resolve(here, '../src/data/content-defaults.json'), 'utf8')
);
const previous = {
  seoTitle: 'Autoladen Altes Land – sag Alex, was du brauchst',
  seoDescription:
    'Ein Ansprechpartner für dein Fahrzeug. Markenunabhängig, für Unternehmen und Privatkunden. Anrufen, WhatsApp oder Anfrage mit drei Angaben.',
};
const docs = await client.fetch('*[_id in ["frontpage", "drafts.frontpage"]]');
let tx = client.transaction();
let count = 0;
for (const doc of docs) {
  const patch = {};
  for (const key of ['seoTitle', 'seoDescription', 'seoImageAlt']) {
    if (!doc[key] || doc[key] === previous[key]) patch[key] = defaults[key];
  }
  if (Object.keys(patch).length) {
    tx = tx.patch(doc._id, (p) => p.ifRevisionId(doc._rev).set(patch));
    count++;
  }
  console.log(
    `${doc._id}: ${Object.keys(patch).join(', ') || 'aktuell / individuelle Texte beibehalten'}`
  );
}
if (process.argv.includes('--apply') && count) {
  const backup = join(await mkdtemp(join(tmpdir(), 'aal-seo-backup-')), 'documents.json');
  await writeFile(backup, JSON.stringify(docs, null, 2), { mode: 0o600 });
  console.log(`Sicherung: ${backup}`);
  await tx.commit();
  console.log(`${count} Dokumente aktualisiert.`);
}
