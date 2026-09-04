/** Add review configuration and Instagram without replacing existing editorial content. */
import { createClient } from '@sanity/client';
import { readFile, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, resolve, join } from 'node:path';
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
const apply = process.argv.includes('--apply');
const { fallbackSite, fallbackFrontpage } = JSON.parse(
  await readFile(resolve(here, '../src/data/content-defaults.json'), 'utf8')
);
const docs = await client.fetch(
  '*[_id in ["frontpage", "drafts.frontpage", "siteSettings", "drafts.siteSettings"]]'
);
if (!docs.some((doc) => doc._id === 'frontpage') || !docs.some((doc) => doc._id === 'siteSettings'))
  throw new Error('Veröffentlichte Dokumente fehlen.');
let transaction = client.transaction();
let changes = 0;
for (const doc of docs) {
  const patch = {};
  if (doc._id.endsWith('frontpage')) {
    if (!doc.reviews) patch.reviews = fallbackFrontpage.reviews;
    else
      for (const [key, value] of Object.entries(fallbackFrontpage.reviews)) {
        if (doc.reviews[key] === undefined) patch[`reviews.${key}`] = value;
      }
    if (!doc.footer) patch.footer = fallbackFrontpage.footer;
    else
      for (const key of [
        'instagramLabel',
        'eyebrow',
        'heading',
        'intro',
        'ctaLabel',
        'whatsappCtaLabel',
        'finePrint',
        'brandTagline',
        'contactLabel',
        'exploreLabel',
        'moreLabel',
      ]) {
        if (doc.footer[key] === undefined) patch[`footer.${key}`] = fallbackFrontpage.footer[key];
      }
  } else if (doc.instagramUrl === undefined) patch.instagramUrl = fallbackSite.instagramUrl;
  const fields = Object.keys(patch);
  console.log(`${doc._id}: ${fields.length ? fields.join(', ') : 'bereits aktuell'}`);
  if (fields.length) {
    transaction = transaction.patch(doc._id, (p) => p.ifRevisionId(doc._rev).setIfMissing(patch));
    changes++;
  }
}
if (apply && changes) {
  const backup = join(await mkdtemp(join(tmpdir(), 'aal-reviews-backup-')), 'documents.json');
  await writeFile(backup, JSON.stringify(docs, null, 2), { mode: 0o600 });
  console.log(`Sicherung: ${backup}`);
  await transaction.commit();
  console.log(`${changes} Dokumente ergänzt. Keine Beispielbewertungen veröffentlicht.`);
} else console.log(apply ? 'Keine Änderungen nötig.' : 'Dry-run. Mit --apply übernehmen.');
