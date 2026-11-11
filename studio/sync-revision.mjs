/**
 * Review-Runde November 2026: neue Texte und die acht Modell-Kacheln nach Sanity bringen.
 *
 *   node studio/sync-revision.mjs                    Vorschau, schreibt nichts
 *   node studio/sync-revision.mjs --apply            Texte setzen, Kacheln versteckt anlegen
 *   node studio/sync-revision.mjs --apply --golive   Platzhalter aus, Kacheln an, Preis-Hinweis neu
 *
 * Ein Text wird nur ersetzt, wenn er noch dem früheren Standard entspricht (oder fehlt).
 * Im Studio geänderte Texte bleiben stehen und werden gemeldet; --force überschreibt auch sie.
 * Erst ausführen, wenn der neue Website-Code live ist: Der alte Code kann weder drei
 * Ablauf-Schritte noch Fahrzeuge ohne Preis darstellen.
 */
import { createClient } from '@sanity/client';
import { execFileSync } from 'node:child_process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';
import dotenv from 'dotenv';

const here = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(here, '.env'), quiet: true });
const flag = (name) => process.argv.includes(`--${name}`);
const apply = flag('apply');
const golive = flag('golive');
const force = flag('force');
if (!process.env.SANITY_TOKEN) throw new Error('SANITY_TOKEN fehlt in studio/.env');

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'dgeh1xh8',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  perspective: 'raw',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

// Stand vor dieser Runde: daran erkennt das Skript, ob ein Text im Studio angefasst wurde.
const BEFORE = '5c5c896';
const previous = JSON.parse(
  execFileSync('git', ['show', `${BEFORE}:src/data/content-defaults.json`], {
    cwd: resolve(here, '..'),
    encoding: 'utf8',
  })
);
const next = JSON.parse(await readFile(resolve(here, '../src/data/content-defaults.json'), 'utf8'));
const tiles = JSON.parse(
  await readFile(resolve(here, '../src/data/vehicle-defaults.json'), 'utf8')
);
const SAMPLES = [
  'fahrzeug-fiat-ducato-kastenwagen',
  'fahrzeug-e-limousine',
  'fahrzeug-kompakt-stromer',
];

const PLAN = [
  {
    id: 'frontpage',
    key: 'fallbackFrontpage',
    unset: ['intro.eyebrow'],
    paths: [
      'seoTitle',
      'seoDescription',
      'hero.eyebrow',
      'hero.quote',
      'hero.note',
      'hero.vehiclesLinkLabel',
      'hero.aboutLinkLabel',
      'hero.personIntro',
      'intro.heading',
      'intro.text',
      'intro.promises',
      'offers.ctaLabel',
      'offers.cardCtaLabel',
      'process.heading',
      'process.intro',
      'process.steps',
      'finance.heading',
      'finance.intro',
      'finance.compareLabel',
      'reviews.intro',
      'form.title',
      'form.submitLabel',
      'form.finePrint',
      'form.sendErrorSuffix',
      'form.successTitle',
      'form.successText',
      'header.contactLabel',
      'header.whatsappLabel',
      'header.links',
      'footer.links',
      'mobileNavigation.links',
      'faq.items',
      'rooftent.seoTitle',
      'rooftent.seoDescription',
      'rooftent.backLabel',
      'rooftent.teaserText',
      'rooftent.teaserLinkLabel',
    ],
  },
  {
    id: 'siteSettings',
    key: 'fallbackSite',
    paths: [
      'featuredVehicleCount',
      'vehiclePage.ctaLabel',
      'vehiclePage.note',
      'vehiclePage.seoText',
      ...(golive ? ['priceNote'] : []),
    ],
  },
  { id: 'aboutPage', key: 'fallbackAboutPage', paths: ['ctaLabel', 'seoDescription'] },
];

const get = (object, path) => path.split('.').reduce((value, key) => value?.[key], object);
/** Compare content only: Sanity adds _key/_type to array members. */
const plain = (value) =>
  Array.isArray(value)
    ? value.map(plain)
    : value && typeof value === 'object'
      ? Object.fromEntries(
          Object.entries(value)
            .filter(([key]) => !key.startsWith('_'))
            .map(([key, item]) => [key, plain(item)])
        )
      : value;
const keyed = (value, path) =>
  Array.isArray(value)
    ? value.map((item, index) =>
        item && typeof item === 'object'
          ? { _key: `${path.replaceAll('.', '-')}-${index}`, _type: 'object', ...item }
          : item
      )
    : value;
const show = (value) =>
  value === undefined ? '(leer)' : typeof value === 'string' ? value : JSON.stringify(plain(value));

const ids = PLAN.flatMap(({ id }) => [id, `drafts.${id}`]);
const docs = await client.fetch('*[_id in $ids || _type == "fahrzeug"]', { ids });
if (apply) {
  const dir = resolve(here, 'backups');
  await mkdir(dir, { recursive: true });
  const file = resolve(dir, `${new Date().toISOString().replaceAll(':', '-')}-revision.json`);
  await writeFile(file, JSON.stringify(docs, null, 2), { mode: 0o600 });
  console.log(`Sicherung: ${file}`);
}

let tx = client.transaction();
let changed = 0;
let skipped = 0;

for (const { id, key, paths, unset = [] } of PLAN) {
  for (const doc of docs.filter((d) => d._id === id || d._id === `drafts.${id}`)) {
    const set = {};
    const remove = [];
    const untouched = (path) => {
      const now = plain(get(doc, path));
      return now === undefined || isDeepStrictEqual(now, plain(get(previous[key], path)));
    };
    for (const path of paths) {
      const now = get(doc, path);
      const wanted = get(next[key], path);
      if (isDeepStrictEqual(plain(now), plain(wanted))) continue;
      if (!force && !untouched(path)) {
        skipped++;
        console.log(
          `\n${doc._id} · ${path}\n  im Studio geändert, bleibt: ${show(now)}\n  Vorschlag wäre:             ${show(wanted)}`
        );
        continue;
      }
      set[path] = keyed(wanted, path);
      console.log(`\n${doc._id} · ${path}\n  alt: ${show(now)}\n  neu: ${show(wanted)}`);
    }
    for (const path of unset) {
      if (get(doc, path) === undefined) continue;
      if (!force && !untouched(path)) {
        skipped++;
        console.log(
          `\n${doc._id} · ${path}\n  im Studio geändert, bleibt: ${show(get(doc, path))}`
        );
        continue;
      }
      remove.push(path);
      console.log(`\n${doc._id} · ${path}\n  alt: ${show(get(doc, path))}\n  neu: (leer)`);
    }
    if (!Object.keys(set).length && !remove.length) continue;
    tx = tx.patch(doc._id, (patch) => {
      let p = patch.ifRevisionId(doc._rev);
      if (Object.keys(set).length) p = p.set(set);
      if (remove.length) p = p.unset(remove);
      return p;
    });
    changed++;
  }
}

// Modell-Kacheln: versteckt anlegen, vorhandene nie überschreiben.
const slugs = new Set(docs.filter((d) => d._type === 'fahrzeug').map((d) => d.slug?.current));
tiles.forEach((tile, index) => {
  const _id = `fahrzeug-${tile.id}`;
  if (docs.some((d) => d._id === _id || d._id === `drafts.${_id}`) || slugs.has(tile.id)) return;
  const { id, ...fields } = tile;
  tx = tx.createIfNotExists({
    _id,
    _type: 'fahrzeug',
    ...fields,
    slug: { _type: 'slug', current: id },
    tone: 'green',
    verfuegbar: golive,
    sortierung: (index + 1) * 10,
  });
  changed++;
  console.log(
    `\n${_id}\n  neu: ${tile.name}${tile.discount ? ` · ${tile.discount}` : ''} (${golive ? 'sichtbar' : 'versteckt'})`
  );
});

if (golive) {
  // One transaction: sample vehicles off, model tiles on, price note swapped (see PLAN).
  const visible = (wanted) => (doc) => {
    if (doc.verfuegbar === wanted) return;
    tx = tx.patch(doc._id, (patch) => patch.ifRevisionId(doc._rev).set({ verfuegbar: wanted }));
    changed++;
    console.log(`\n${doc._id}\n  ${wanted ? 'wird sichtbar' : 'wird ausgeblendet'}: ${doc.name}`);
  };
  const base = (doc) => doc._id.replace(/^drafts\./, '');
  docs.filter((d) => SAMPLES.includes(base(d))).forEach(visible(false));
  docs
    .filter((d) => tiles.some((tile) => base(d) === `fahrzeug-${tile.id}`))
    .forEach(visible(true));
}

console.log('');
if (skipped)
  console.log(`${skipped} im Studio geänderte Stelle(n) bleiben unberührt (--force überschreibt).`);
if (apply && changed) {
  await tx.commit();
  console.log(`${changed} Dokument(e) übertragen. Nichts gelöscht; Entwürfe bleiben Entwürfe.`);
} else
  console.log(
    `${changed} Dokument(e) ${apply ? 'bereits aktuell' : 'geplant. Mit --apply übernehmen.'}`
  );
