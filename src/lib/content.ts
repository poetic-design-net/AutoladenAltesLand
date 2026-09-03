import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID ?? 'dgeh1xh8',
  dataset: import.meta.env.SANITY_DATASET ?? 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
});

const imageBuilder = imageUrlBuilder(client);

export const fallbackSite = {
  brandName: 'Autoladen Altes Land',
  contactName: 'Alex',
  logo: '/logo.png',
  logoAlt: 'Autoladen Altes Land',
  phone: '+49 175 157 46 46',
  whatsapp: '491751574646',
  email: 'alex@autoladen-altesland.de',
  featuredVehicleCount: 3,
  priceNote: 'Kaufpreise netto zzgl. MwSt. für Gewerbe. Streichpreis ist der reguläre Preis.',
};

export const fallbackFrontpage = {
  seoTitle: 'Autoladen Altes Land – sag Alex, was du brauchst',
  seoDescription:
    'Ein Ansprechpartner für dein Fahrzeug. Markenunabhängig, für Unternehmen und Privatkunden. Anrufen, WhatsApp oder Anfrage mit drei Angaben.',
  hero: {
    eyebrow: 'Persönlich statt Verkaufstheater',
    availability: 'Persönlich erreichbar',
    personTitle: 'Moin, ich bin Alex.',
    personIntro: 'Persönlich, direkt und ohne großes Verkaufstheater.',
    moreLabel: 'Was das für dich heißt',
    portrait: '/alex-tall.webp',
    portraitAlt: 'Alex vom Autoladen Altes Land',
    headline: 'Ein Ansprechpartner.',
    headlineAccent: 'Fertig.',
    quote: 'Gerade wenn Autos nicht dein Tagesgeschäft sind, musst du auch keins daraus machen.',
    phoneLabel: 'Anrufen',
    whatsappLabel: 'WhatsApp',
    ctaLabel: 'Kurz mit Alex sprechen',
  },
  offers: {
    heading: 'Was gerade geht',
    intro: 'Ein paar Beispiele. Dein Wunschfahrzeug finden wir gemeinsam.',
    ctaLabel: 'Alle Möglichkeiten besprechen',
    allLabel: 'alle ansehen',
    sheetSubtitle: 'Beispiele – kein Bestand, kein Katalog.',
    priceLabel: 'Kaufpreis',
  },
  process: {
    heading: 'Vom ersten Hallo bis zum ersten Grinsen.',
    intro:
      'Du sagst uns, was du suchst. Wir kümmern uns um Angebote, Prüfung, Zulassung und Lieferung.',
    steps: [
      {
        title: 'Kontakt aufnehmen',
        text: 'Schreib uns oder ruf einfach an – ganz ohne Formulare-Marathon.',
      },
      {
        title: 'Wünsche klären',
        text: 'Wir finden gemeinsam heraus, welches Fahrzeug wirklich zu dir, deinem Alltag und deinem Budget passt.',
      },
      {
        title: 'Angebote erhalten',
        text: 'Du bekommst ausgewählte, nachvollziehbare Angebote – ohne dich selbst durch unzählige Inserate kämpfen zu müssen.',
      },
      {
        title: 'Geprüft, zugelassen & geliefert',
        text: 'Wir prüfen das Fahrzeug, kümmern uns um die Zulassung und bringen es auf Wunsch direkt zu dir.',
      },
      {
        title: 'Einsteigen. Losfahren. Grinsen.',
        text: 'Ab hier musst du nichts mehr entscheiden. Außer vielleicht, wohin die erste Fahrt geht.',
      },
    ],
    ctaLabel: 'Fahrzeugwunsch besprechen',
    finePrint: 'Unverbindlich, persönlich und ohne Verkaufsdruck.',
  },
  finance: {
    heading: 'Dein Auto. Dein Weg.',
    intro:
      'Ob Leasing oder Finanzierung: Gemeinsam finden wir eine Lösung, die zu deinem Budget und deinen Plänen passt – verständlich, transparent und ohne unnötiges Fachchinesisch.',
    comparisonLabel: 'oder',
    ways: [
      {
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
    title: 'Moin, ich bin Alex.',
    subtitle: 'Ein Ansprechpartner. Fertig.',
    image: '/alex.webp',
    imageAlt: 'Alex vom Autoladen Altes Land',
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
    title: 'Kurz mit Alex sprechen',
    subtitle: 'Drei Angaben – mehr brauche ich nicht.',
    topicLabel: 'Worum geht’s?',
    topics: [
      { id: 'firma', label: 'Firmenwagen' },
      { id: 'transporter', label: 'Transporter' },
      { id: 'privat', label: 'Privat' },
      { id: 'offen', label: 'Noch offen' },
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
    phonePrefix: 'Telefon',
    emailPrefix: 'E-Mail',
    legalLabel: 'Impressum',
    privacyLabel: 'Datenschutz',
  },
};

export type SiteSettings = typeof fallbackSite;
export type Frontpage = typeof fallbackFrontpage;

function merge<T>(fallback: T, value: unknown): T {
  if (Array.isArray(fallback))
    return (Array.isArray(value) && value.length ? value : fallback) as T;
  if (fallback && typeof fallback === 'object') {
    const source = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
    return Object.fromEntries(
      Object.entries(fallback as Record<string, unknown>).map(([key, defaultValue]) => [
        key,
        merge(defaultValue, source[key]),
      ])
    ) as T;
  }
  return (value === undefined || value === null || value === '' ? fallback : value) as T;
}

function imageUrl(image: unknown, fallback: string, width: number, height: number) {
  if (!image || typeof image !== 'object' || !('asset' in image)) return fallback;
  return imageBuilder.image(image).width(width).height(height).fit('crop').auto('format').url();
}

const QUERY = `{
  "site": *[_id == "siteSettings"][0],
  "page": *[_id == "frontpage"][0]
}`;

export async function getContent(): Promise<{ site: SiteSettings; page: Frontpage }> {
  try {
    const raw = await client.fetch<{ site?: any; page?: any }>(QUERY);
    const site = merge(fallbackSite, raw.site);
    const page = merge(fallbackFrontpage, raw.page);
    site.logo = imageUrl(raw.site?.logo, fallbackSite.logo, 320, 320);
    site.logoAlt = raw.site?.logo?.alt || site.brandName;
    page.hero.portrait = imageUrl(
      raw.page?.hero?.portrait,
      fallbackFrontpage.hero.portrait,
      960,
      1440
    );
    page.hero.portraitAlt =
      raw.page?.hero?.portrait?.alt || `${site.contactName} vom ${site.brandName}`;
    page.about.image = imageUrl(raw.page?.about?.image, fallbackFrontpage.about.image, 1600, 1067);
    page.about.imageAlt =
      raw.page?.about?.image?.alt || `${site.contactName} vom ${site.brandName}`;
    return { site, page };
  } catch (error) {
    console.warn('[sanity] Website-Inhalte konnten nicht geladen werden, nutze Fallback:', error);
    return { site: { ...fallbackSite }, page: structuredClone(fallbackFrontpage) };
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return (await getContent()).site;
}

export function contactLinks(site: SiteSettings) {
  return {
    telHref: site.phone ? `tel:${site.phone.replace(/[^+\d]/g, '')}` : null,
    waHref: site.whatsapp ? `https://wa.me/${site.whatsapp}` : null,
    mailHref: site.email ? `mailto:${site.email}` : null,
  };
}
