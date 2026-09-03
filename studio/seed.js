/**
 * Überträgt den aktuellen Website-Stand nach Sanity und entfernt Dokumente
 * früherer, nicht mehr verwendeter Schemas. Aufruf: `npm run migrate`.
 */
import { createClient } from '@sanity/client';
import { createReadStream } from 'node:fs';
import { basename, resolve } from 'node:path';
import dotenv from 'dotenv';

dotenv.config();
if (!process.env.SANITY_TOKEN) throw new Error('SANITY_TOKEN fehlt in studio/.env');

const client = createClient({
  projectId: 'dgeh1xh8',
  dataset: 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function image(file, alt) {
  const filename = basename(file);
  let asset = await client.fetch(
    '*[_type == "sanity.imageAsset" && originalFilename == $filename] | order(_createdAt desc)[0]{_id}',
    { filename }
  );
  if (!asset) {
    asset = await client.assets.upload('image', createReadStream(resolve('../public', file)), {
      filename,
    });
  }
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt };
}

const [logo, portrait, aboutImage] = await Promise.all([
  image('logo.png', 'Autoladen Altes Land'),
  image('alex-tall.webp', 'Alex vom Autoladen Altes Land'),
  image('alex.webp', 'Alex vom Autoladen Altes Land'),
]);

const vehicleData = [
  {
    id: 'fiat-ducato-kastenwagen',
    name: 'FIAT DUCATO Kastenwagen',
    kicker: 'Nutzfahrzeug',
    topic: 'transporter',
    status: 'Sofort verfügbar',
    tone: 'green',
    image: 'veh1.jpg',
    alt: 'FIAT DUCATO Kastenwagen',
    features: [
      'Für Handwerk & Lieferdienst',
      'EU-Neuwagen oder Jahreswagen',
      'Gewerblich & privat',
    ],
    price: '34.900 €',
    priceTerms: 'EU-Neuwagen und Jahreswagen',
  },
  {
    id: 'e-limousine',
    name: 'Elektrische Limousine',
    kicker: 'Dienstwagen',
    topic: 'firma',
    status: 'Kurzfristig möglich',
    tone: 'blue',
    image: 'veh2.jpg',
    alt: 'Elektrische Limousine',
    features: ['Vollelektrisch', 'Als Dienstwagen geeignet', 'Privat & gewerblich'],
    price: '42.900 €',
    priceOld: '46.900 €',
    priceTerms: 'Jahreswagen',
  },
  {
    id: 'kompakt-stromer',
    name: 'Kompakter Stromer',
    kicker: 'Alltag & Familie',
    topic: 'privat',
    status: 'Auf Anfrage',
    tone: 'grey',
    image: 'veh3.jpg',
    alt: 'Kompaktes Elektrofahrzeug',
    features: ['Vollelektrisch', 'Viel Platz für den Alltag', 'Privat & gewerblich'],
    price: '27.900 €',
    priceTerms: 'EU-Neuwagen',
  },
];

const vehicles = await Promise.all(
  vehicleData.map(async ({ id, image: imageFile, alt, ...fields }, index) => ({
    _id: `fahrzeug-${id}`,
    _type: 'fahrzeug',
    slug: { _type: 'slug', current: id },
    image: await image(imageFile, alt),
    verfuegbar: true,
    sortierung: (index + 1) * 10,
    ...fields,
  }))
);

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  brandName: 'Autoladen Altes Land',
  contactName: 'Alex',
  logo,
  phone: '+49 175 157 46 46',
  whatsapp: '491751574646',
  email: 'alex@autoladen-altesland.de',
  featuredVehicleCount: 3,
  priceNote: 'Kaufpreise netto zzgl. MwSt. für Gewerbe. Streichpreis ist der reguläre Preis.',
};

const frontpage = {
  _id: 'frontpage',
  _type: 'frontpage',
  seoTitle: 'Autoladen Altes Land – sag Alex, was du brauchst',
  seoDescription:
    'Ein Ansprechpartner für dein Fahrzeug. Markenunabhängig, für Unternehmen und Privatkunden. Anrufen, WhatsApp oder Anfrage mit drei Angaben.',
  hero: {
    _type: 'object',
    availability: 'Persönlich erreichbar',
    personTitle: 'Moin, ich bin Alex.',
    personIntro: 'Persönlich, direkt und ohne großes Verkaufstheater.',
    moreLabel: 'Was das für dich heißt',
    portrait,
    headline: 'Ein Ansprechpartner.',
    headlineAccent: 'Fertig.',
    quote: 'Gerade wenn Autos nicht dein Tagesgeschäft sind, musst du auch keins daraus machen.',
    phoneLabel: 'Anrufen',
    whatsappLabel: 'WhatsApp',
    ctaLabel: 'Kurz mit Alex sprechen',
  },
  offers: {
    _type: 'object',
    heading: 'Was gerade geht',
    allLabel: 'alle ansehen',
    sheetSubtitle: 'Beispiele – kein Bestand, kein Katalog.',
    priceLabel: 'Kaufpreis',
  },
  process: {
    _type: 'object',
    heading: 'Vom ersten Hallo bis zum ersten Grinsen.',
    intro:
      'Du sagst uns, was du suchst. Wir kümmern uns um Angebote, Prüfung, Zulassung und Lieferung.',
    steps: [
      {
        _key: 'kontakt',
        _type: 'object',
        title: 'Kontakt aufnehmen',
        text: 'Schreib uns oder ruf einfach an – ganz ohne Formulare-Marathon.',
      },
      {
        _key: 'wuensche',
        _type: 'object',
        title: 'Wünsche klären',
        text: 'Wir finden gemeinsam heraus, welches Fahrzeug wirklich zu dir, deinem Alltag und deinem Budget passt.',
      },
      {
        _key: 'angebote',
        _type: 'object',
        title: 'Angebote erhalten',
        text: 'Du bekommst ausgewählte, nachvollziehbare Angebote – ohne dich selbst durch unzählige Inserate kämpfen zu müssen.',
      },
      {
        _key: 'lieferung',
        _type: 'object',
        title: 'Geprüft, zugelassen & geliefert',
        text: 'Wir prüfen das Fahrzeug, kümmern uns um die Zulassung und bringen es auf Wunsch direkt zu dir.',
      },
      {
        _key: 'losfahren',
        _type: 'object',
        title: 'Einsteigen. Losfahren. Grinsen.',
        text: 'Ab hier musst du nichts mehr entscheiden. Außer vielleicht, wohin die erste Fahrt geht.',
      },
    ],
    ctaLabel: 'Fahrzeugwunsch besprechen',
    finePrint: 'Unverbindlich, persönlich und ohne Verkaufsdruck.',
  },
  finance: {
    _type: 'object',
    heading: 'Dein Auto. Dein Weg.',
    intro:
      'Ob Leasing oder Finanzierung: Gemeinsam finden wir eine Lösung, die zu deinem Budget und deinen Plänen passt – verständlich, transparent und ohne unnötiges Fachchinesisch.',
    comparisonLabel: 'oder',
    ways: [
      {
        _key: 'leasing',
        _type: 'object',
        id: 'leasing',
        tag: 'Flexibel nutzen',
        title: 'Leasing',
        intro:
          'Du nutzt das Fahrzeug für einen vereinbarten Zeitraum und zahlst dafür eine planbare monatliche Rate.',
        pros: [
          'Planbare monatliche Kosten',
          'Flexible Laufzeiten und Kilometerpakete',
          'Regelmäßig ein aktuelles Fahrzeug fahren',
          'Keine langfristige Bindung an ein bestimmtes Auto',
          'Rückgabe des Fahrzeugs am Ende der Laufzeit',
        ],
        fit: 'Leasing passt zu dir, wenn du flexibel bleiben, deine Kosten gut planen und regelmäßig ein aktuelles Fahrzeug fahren möchtest.',
      },
      {
        _key: 'finanzierung',
        _type: 'object',
        id: 'finanzierung',
        tag: 'Schrittweise besitzen',
        title: 'Finanzierung',
        intro:
          'Du bezahlst dein Fahrzeug Schritt für Schritt und kannst es nach vollständiger Zahlung dauerhaft behalten.',
        pros: [
          'Flexible Laufzeit und mögliche Anzahlung',
          'Klassische Raten- oder Schlussratenfinanzierung',
          'Keine vereinbarte Kilometerbegrenzung',
          'Das Fahrzeug kann langfristig bei dir bleiben',
          'Monatliche Rate passend zu deinem finanziellen Rahmen planbar',
        ],
        fit: 'Eine Finanzierung passt zu dir, wenn du dein Fahrzeug langfristig behalten und am Ende vollständig besitzen möchtest.',
      },
    ],
    helpHeading: 'Noch nicht sicher, was besser zu dir passt?',
    helpText:
      'Kein Problem. Wir erklären dir beide Möglichkeiten anhand deines Wunschfahrzeugs und rechnen gemeinsam durch, welche Variante für dich sinnvoll ist.',
    ctaLabel: 'Möglichkeiten besprechen',
    finePrint: 'Unverbindlich und ohne Finanzierungs-Fachchinesisch.',
    legal:
      'Konkrete Konditionen richten sich unter anderem nach Fahrzeug, Laufzeit, Anzahlung, Fahrleistung, Bonität und Finanzierungspartner. Alle Angebote werden individuell erstellt.',
  },
  about: {
    _type: 'object',
    title: 'Moin, ich bin Alex.',
    subtitle: 'Ein Ansprechpartner. Fertig.',
    image: aboutImage,
    lead: 'Persönlich, direkt und ohne großes Verkaufstheater.',
    paragraphs: [
      'Mir ist lieber, wir sprechen zehn Minuten vernünftig darüber, was du wirklich brauchst, als dass ich dir drei Hochglanzangebote schicke, die am Ende nicht passen.',
      'Wenn ich weiß, wonach du suchst, kann ich dir meistens ziemlich schnell sagen, was machbar ist.',
    ],
    kicker: 'Also: Was soll’s werden?',
    ruleHeading: 'Warum ein Ansprechpartner reicht',
    ruleParagraphs: [
      'Bei mir bist du nicht an eine bestimmte Marke gebunden und musst dich auch nicht selbst durch unzählige Angebote kämpfen.',
      'Ich suche das Fahrzeug, das zu deinem Bedarf und deinem Budget passt.',
    ],
    ruleEmphasis: 'Für Unternehmen genauso wie für Privatkunden.',
    ctaLabel: 'Kurz mit Alex sprechen',
  },
  form: {
    _type: 'object',
    title: 'Kurz mit Alex sprechen',
    subtitle: 'Drei Angaben – mehr brauche ich nicht.',
    topicLabel: 'Worum geht’s?',
    topics: [
      { _key: 'firma', _type: 'object', id: 'firma', label: 'Firmenwagen' },
      { _key: 'transporter', _type: 'object', id: 'transporter', label: 'Transporter' },
      { _key: 'privat', _type: 'object', id: 'privat', label: 'Privat' },
      { _key: 'offen', _type: 'object', id: 'offen', label: 'Noch offen' },
    ],
    channelLabel: 'Wie erreiche ich dich?',
    phoneOption: 'Anruf',
    whatsappOption: 'WhatsApp',
    phoneLabel: 'Deine Nummer',
    whatsappLabel: 'Deine WhatsApp-Nummer',
    phonePlaceholder: '01xx xxxxxxx',
    missingContactError: 'Ohne Nummer kann ich mich nicht melden.',
    messageLabel: 'Kurz dazu',
    optionalLabel: '– optional',
    messagePlaceholder: 'Was ist dir wichtig?',
    submitLabel: 'An Alex senden',
    submittingLabel: 'Wird gesendet …',
    finePrint: 'Geht direkt an Alex – nicht an ein Portal.',
    contextPrefix: 'Anfrage zu:',
    sendErrorSuffix: '– ruf Alex gern direkt an.',
    successTitle: 'Ist bei Alex.',
    successText: 'Er schaut, ob er so etwas findet, und meldet sich persönlich bei dir.',
    doneLabel: 'Fertig',
    closeLabel: 'Schließen',
    removeContextLabel: 'Bezug entfernen',
  },
  footer: {
    _type: 'object',
    phonePrefix: 'Telefon',
    emailPrefix: 'E-Mail',
    legalLabel: 'Impressum',
    privacyLabel: 'Datenschutz',
  },
};

const staleIds = await client.fetch(
  `*[
    _type in ["hero", "leistung", "kontakt", "about", "stats", "kundenstimmen", "angebot"] ||
    (_type == "fahrzeug" && !defined(slug.current)) ||
    (_type == "siteSettings" && _id != "siteSettings") ||
    (_type == "frontpage" && _id != "frontpage")
  ]._id`
);

let transaction = client.transaction();
for (const id of staleIds) transaction = transaction.delete(id);
for (const vehicle of vehicles) transaction = transaction.createOrReplace(vehicle);
transaction = transaction.createOrReplace(siteSettings).createOrReplace(frontpage);

const result = await transaction.commit();
console.log(
  `Gelöscht: ${staleIds.length}, geschrieben: ${result.results.length - staleIds.length}`
);
