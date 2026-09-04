const requiredString = (name, title, extra = {}) => ({
  name,
  title,
  type: 'string',
  validation: (R) => R.required(),
  ...extra,
});

const requiredText = (name, title, rows = 3, extra = {}) => ({
  name,
  title,
  type: 'text',
  rows,
  validation: (R) => R.required(),
  ...extra,
});

const sectionTargets = [
  { title: 'Über Alex', value: 'alex' },
  { title: 'Fahrzeuge', value: 'fahrzeuge' },
  { title: 'Ablauf', value: 'ablauf' },
  { title: 'Leasing & Finanzierung', value: 'finanzierung' },
];
const navigationLinks = (name, title, { footer = false, mobile = false } = {}) => ({
  name,
  title,
  type: 'array',
  validation: (R) =>
    mobile
      ? R.required()
          .length(4)
          .custom(
            (items) =>
              new Set(items?.map((item) => item.target)).size === 4 ||
              'Jeder Abschnitt muss genau einmal vorkommen.'
          )
      : R.required()
          .min(1)
          .max(footer ? 8 : 4),
  of: [
    {
      type: 'object',
      fields: [
        requiredString('label', 'Beschriftung'),
        requiredString('target', 'Ziel', {
          options: {
            list: footer
              ? [
                  ...sectionTargets,
                  { title: 'Fragen & Antworten (Dialog)', value: 'faq' },
                  { title: 'Kontakt (Dialog)', value: 'ask' },
                ]
              : sectionTargets,
          },
        }),
      ],
      preview: { select: { title: 'label', subtitle: 'target' } },
    },
  ],
});

export default {
  name: 'frontpage',
  title: 'Startseite',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Einstieg', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'offers', title: 'Fahrzeuge' },
    { name: 'intro', title: 'Fahrzeug-Einleitung & Vorteilsleiste' },
    { name: 'process', title: 'Ablauf' },
    { name: 'rooftent', title: 'Dachzelte' },
    { name: 'finance', title: 'Leasing & Finanzierung' },
    { name: 'about', title: 'Über Alex' },
    { name: 'reviews', title: 'Google-Rezensionen' },
    { name: 'form', title: 'Anfrage' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    {
      name: 'rooftent',
      title: 'Dachzelt-Banner & Galerie',
      type: 'object',
      group: 'rooftent',
      fields: [
        { name: 'enabled', title: 'Abschnitt anzeigen', type: 'boolean', initialValue: true },
        requiredString('eyebrow', 'Hinweis über der Überschrift'),
        requiredText('heading', 'Überschrift (Zeilenumbruch möglich)', 2),
        requiredText('text', 'Beschreibung'),
        requiredString('ctaLabel', 'Anfragebutton'),
        requiredString('topicLabel', 'Thema im Anfrageformular'),
        requiredString('finePrint', 'Hinweis unter dem Button'),
        {
          name: 'image',
          title: 'Bannermotiv',
          type: 'image',
          options: { hotspot: true },
          description:
            'Breites Motiv mit Dachzelt rechts. Text und dunkler Verlauf werden von der Website ergänzt.',
          fields: [requiredString('alt', 'Bildbeschreibung')],
          validation: (R) => R.required(),
        },
        requiredString('galleryLabel', 'Galerieüberschrift'),
        requiredString('galleryNote', 'Galerie-Kurztext'),
        requiredString('openLabel', 'Bild öffnen – Beschriftung'),
        requiredString('closeLabel', 'Galerie schließen – Beschriftung'),
        requiredString('previousLabel', 'Vorheriges Bild – Beschriftung'),
        requiredString('nextLabel', 'Nächstes Bild – Beschriftung'),
        {
          name: 'gallery',
          title: 'Originalfotos',
          type: 'array',
          description: 'Reihenfolge per Ziehen ändern. Eine leere Liste blendet die Galerie aus.',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'image',
                  title: 'Foto',
                  type: 'image',
                  options: { hotspot: true },
                  validation: (R) => R.required(),
                },
                requiredString('alt', 'Bildbeschreibung / Bildunterschrift'),
              ],
              preview: { select: { title: 'alt', media: 'image' } },
            },
          ],
        },
      ],
    },
    requiredString('seoTitle', 'Seitentitel', { group: 'seo' }),
    requiredText('seoDescription', 'Meta-Beschreibung', 3, { group: 'seo' }),
    {
      name: 'seoImage',
      title: 'Social-Vorschaubild',
      type: 'image',
      group: 'seo',
      description:
        'Vorschau beim Teilen der Startseite. Empfohlen: 1200 × 630 Pixel. Ohne Bild wird das Hero-Motiv verwendet.',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Bildbeschreibung', type: 'string' }],
    },
    {
      name: 'seoImageAlt',
      title: 'Beschreibung des Standard-Vorschaubilds',
      type: 'string',
      group: 'seo',
    },
    {
      name: 'header',
      title: 'Desktop-Header',
      type: 'object',
      group: 'navigation',
      fields: [
        requiredString('navigationLabel', 'Navigationsbezeichnung'),
        navigationLinks('links', 'Sprunglinks'),
        requiredString('contactLabel', 'Kontaktbutton'),
        requiredString('whatsappLabel', 'Barrierefreie WhatsApp-Beschriftung'),
      ],
    },
    {
      name: 'mobileNavigation',
      title: 'Mobile Bottom-Navigation',
      type: 'object',
      group: 'navigation',
      description:
        'Erscheint automatisch nach dem Hero. Beschriftungen und Reihenfolge sind hier änderbar.',
      fields: [
        requiredString('label', 'Navigationsbezeichnung'),
        navigationLinks('links', 'Vier Abschnitte', { mobile: true }),
      ],
    },
    {
      name: 'hero',
      title: 'Einstieg',
      type: 'object',
      group: 'hero',
      fields: [
        ...['desktopImage', 'mobileImage'].map((name) => ({
          name,
          title:
            name === 'desktopImage' ? 'Hero-Grafik Desktop (16:9)' : 'Hero-Grafik Mobile (9:16)',
          type: 'image',
          options: { hotspot: true },
          validation: (R) => R.required(),
          description:
            name === 'desktopImage'
              ? 'Freie Fläche links für den Text. Die Seite erzeugt WebP-Größen automatisch.'
              : 'Freie Fläche oben für den Text. Wird bis 760 Pixel Bildschirmbreite verwendet.',
        })),
        requiredString('imageAlt', 'Alternativtext der Hero-Grafiken'),
        { name: 'eyebrow', title: 'Hinweis über der Hauptüberschrift', type: 'string' },
        { name: 'aboutLinkLabel', title: 'Link in der kurzen Alex-Leiste', type: 'string' },
        requiredString('availability', 'Erreichbarkeits-Hinweis'),
        requiredString('personTitle', 'Persönliche Überschrift'),
        requiredText('personIntro', 'Persönlicher Kurztext', 2),
        requiredString('moreLabel', 'Link zu „Über Alex“'),
        {
          name: 'portrait',
          title: 'Hochformat',
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt-Text', type: 'string' }],
          validation: (R) => R.required(),
        },
        requiredString('headline', 'Hauptüberschrift'),
        requiredString('headlineAccent', 'Hervorgehobene zweite Zeile'),
        requiredText('quote', 'Einleitung', 2),
        requiredString('phoneLabel', 'Telefon-Button'),
        requiredString('whatsappLabel', 'WhatsApp-Button'),
        requiredString('whatsappLinkLabel', 'WhatsApp-Link unter dem Hero-Button'),
        requiredString('vehiclesLinkLabel', 'Sprunglink zu den Fahrzeugen'),
        requiredString('ctaLabel', 'Anfrage-Button'),
      ],
    },
    {
      name: 'offers',
      title: 'Fahrzeugbereich',
      type: 'object',
      group: 'offers',
      fields: [
        requiredString('heading', 'Titel im Fahrzeug-Dialog', {
          description:
            'Die Überschrift über dem Slider wird unter „Fahrzeug-Einleitung & Vorteilsleiste“ gepflegt.',
        }),
        { name: 'intro', title: 'Frühere Fahrzeug-Einleitung', type: 'string', hidden: true },
        { name: 'ctaLabel', title: 'Button zur Beratung', type: 'string' },
        {
          name: 'sliderLabel',
          title: 'Slider-Bezeichnung für Screenreader',
          type: 'string',
          initialValue: 'Fahrzeuge entdecken',
        },
        {
          name: 'previousLabel',
          title: 'Zurück-Pfeil: barrierefreie Beschriftung',
          type: 'string',
          initialValue: 'Vorherige Fahrzeuge',
        },
        {
          name: 'nextLabel',
          title: 'Weiter-Pfeil: barrierefreie Beschriftung',
          type: 'string',
          initialValue: 'Weitere Fahrzeuge',
        },
        requiredString('allLabel', 'Button „Alle ansehen“'),
        requiredString('sheetSubtitle', 'Untertitel in der Fahrzeugübersicht'),
        requiredString('priceLabel', 'Preisbezeichnung'),
      ],
    },
    {
      name: 'intro',
      title: 'Fahrzeug-Einleitung & Vorteilsleiste',
      type: 'object',
      group: 'intro',
      fields: [
        requiredString('eyebrow', 'Hinweis über der Überschrift'),
        requiredText('heading', 'Überschrift über den Fahrzeugen', 2),
        requiredText('text', 'Vorstellungstext neben der Überschrift'),
        requiredString('promisesLabel', 'Bezeichnung der Vorteilsleiste'),
        ...['promises', 'benefits'].map((name) => ({
          name,
          title: name === 'promises' ? 'Leiste unter dem Hero' : 'Drei Vorteile',
          // Keep existing content without exposing controls for the removed icon row.
          hidden: name === 'benefits',
          type: 'array',
          validation: (R) => R.length(3),
          of: [
            {
              type: 'object',
              fields: [
                requiredString('title', 'Titel'),
                requiredText('text', 'Text', 2),
                ...(name === 'benefits'
                  ? [
                      requiredString('icon', 'Symbol', {
                        options: {
                          list: [
                            { title: 'Uhr', value: 'clock' },
                            { title: 'Gespräch', value: 'chat' },
                            { title: 'Sicherheit', value: 'shield' },
                          ],
                        },
                      }),
                    ]
                  : []),
              ],
            },
          ],
        })),
      ],
    },
    {
      name: 'process',
      title: 'Ablauf',
      type: 'object',
      group: 'process',
      fields: [
        requiredString('heading', 'Überschrift'),
        requiredText('intro', 'Einleitung', 2),
        {
          name: 'steps',
          title: 'Fünf Schritte',
          type: 'array',
          validation: (R) => R.required().length(5),
          of: [
            {
              type: 'object',
              fields: [requiredString('title', 'Titel'), requiredText('text', 'Text', 3)],
              preview: { select: { title: 'title', subtitle: 'text' } },
            },
          ],
        },
        requiredString('ctaLabel', 'Button'),
        requiredString('finePrint', 'Hinweis unter dem Button'),
      ],
    },
    {
      name: 'finance',
      title: 'Leasing & Finanzierung',
      type: 'object',
      group: 'finance',
      fields: [
        requiredString('heading', 'Überschrift'),
        requiredText('intro', 'Einleitung', 3),
        requiredString('comparisonLabel', 'Text zwischen den Möglichkeiten'),
        {
          name: 'ways',
          title: 'Möglichkeiten',
          type: 'array',
          validation: (R) =>
            R.required()
              .length(2)
              .custom((items) => {
                const ids = items?.map(({ id }) => id) ?? [];
                return ids.includes('leasing') && ids.includes('finanzierung')
                  ? true
                  : 'Leasing und Finanzierung müssen jeweils genau einmal vorkommen.';
              }),
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'id',
                  title: 'Art',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Leasing', value: 'leasing' },
                      { title: 'Finanzierung', value: 'finanzierung' },
                    ],
                    layout: 'radio',
                  },
                  validation: (R) => R.required(),
                },
                requiredString('tag', 'Kategorie-Zeile'),
                requiredString('title', 'Titel'),
                requiredText('intro', 'Einleitung', 3),
                {
                  name: 'pros',
                  title: 'Vorteile',
                  type: 'array',
                  of: [{ type: 'string' }],
                  validation: (R) => R.required().min(1),
                },
                requiredText('fit', 'Für wen passt es?', 3),
              ],
              preview: { select: { title: 'title', subtitle: 'tag' } },
            },
          ],
        },
        requiredString('helpHeading', 'Beratungs-Überschrift'),
        requiredText('helpText', 'Beratungs-Text', 3),
        requiredString('ctaLabel', 'Beratungs-Button'),
        requiredString('finePrint', 'Hinweis unter dem Button'),
        requiredText('legal', 'Rechtlicher Hinweis', 3),
      ],
    },
    {
      name: 'about',
      title: 'Über Alex',
      type: 'object',
      group: 'about',
      fields: [
        requiredString('title', 'Überschrift'),
        requiredString('subtitle', 'Untertitel'),
        {
          name: 'image',
          title: 'Bild',
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt-Text', type: 'string' }],
          validation: (R) => R.required(),
        },
        requiredText('lead', 'Hervorgehobener Einstieg', 2),
        {
          name: 'paragraphs',
          title: 'Absätze',
          type: 'array',
          of: [{ type: 'text', rows: 3 }],
          validation: (R) => R.required().min(1),
        },
        requiredString('kicker', 'Zwischenüberschrift'),
        requiredString('ruleHeading', 'Vorteils-Überschrift'),
        {
          name: 'ruleParagraphs',
          title: 'Vorteils-Absätze',
          type: 'array',
          of: [{ type: 'text', rows: 3 }],
          validation: (R) => R.required().min(1),
        },
        requiredString('ruleEmphasis', 'Hervorgehobener Schlusssatz'),
        requiredString('ctaLabel', 'Button'),
      ],
    },
    {
      name: 'form',
      title: 'Anfrageformular',
      type: 'object',
      group: 'form',
      fields: [
        requiredString('title', 'Überschrift'),
        requiredString('subtitle', 'Untertitel'),
        requiredString('topicLabel', 'Themen-Frage'),
        {
          name: 'topics',
          title: 'Themen',
          type: 'array',
          validation: (R) => R.required().min(1),
          of: [
            {
              type: 'object',
              fields: [
                requiredString('id', 'Technischer Wert', {
                  options: {
                    list: [
                      { title: 'Firmenwagen', value: 'firma' },
                      { title: 'Transporter', value: 'transporter' },
                      { title: 'Privat', value: 'privat' },
                      { title: 'Noch offen', value: 'offen' },
                      { title: 'Dachzelt', value: 'dachzelt' },
                    ],
                  },
                }),
                requiredString('label', 'Bezeichnung'),
              ],
              preview: { select: { title: 'label', subtitle: 'id' } },
            },
          ],
        },
        requiredString('channelLabel', 'Kontaktweg-Frage'),
        requiredString('phoneOption', 'Telefon-Option'),
        requiredString('whatsappOption', 'WhatsApp-Option'),
        requiredString('phoneLabel', 'Beschriftung Telefonnummer'),
        requiredString('whatsappLabel', 'Beschriftung WhatsApp-Nummer'),
        requiredString('phonePlaceholder', 'Platzhalter Telefonnummer'),
        requiredString('missingContactError', 'Fehler bei fehlender Nummer'),
        requiredString('messageLabel', 'Beschriftung Nachricht'),
        requiredString('optionalLabel', 'Optional-Hinweis'),
        requiredString('messagePlaceholder', 'Platzhalter Nachricht'),
        requiredString('submitLabel', 'Senden-Button'),
        requiredString('submittingLabel', 'Text beim Senden'),
        requiredString('finePrint', 'Hinweis unter dem Button'),
        requiredString('contextPrefix', 'Fahrzeugbezug-Präfix'),
        requiredString('sendErrorSuffix', 'Zusatz bei Sendefehler'),
        requiredString('successTitle', 'Erfolgs-Überschrift'),
        requiredText('successText', 'Erfolgs-Text', 2),
        requiredString('doneLabel', 'Abschluss-Button'),
        requiredString('closeLabel', 'Barrierefreier Text für Schließen'),
        requiredString('removeContextLabel', 'Barrierefreier Text für Fahrzeugbezug entfernen'),
      ],
    },
    {
      name: 'reviews',
      title: 'Google-Rezensionen',
      type: 'object',
      group: 'reviews',
      description:
        'Live-Abruf aus Google Places oder redaktionelle Auswahl. Im Live-Modus kommen Sterne, Anzahl, Auszüge und Quellen direkt von Google; manuelle Werte werden dann nicht verwendet. Gesamtbewertung und Gesamtanzahl beziehen sich auf ALLE Google-Rezensionen.',
      fields: [
        { name: 'enabled', title: 'Bereich anzeigen', type: 'boolean', initialValue: true },
        {
          name: 'useGoogleApi',
          title: 'Live aus Google Places laden',
          type: 'boolean',
          initialValue: true,
          description:
            'Google liefert maximal fünf relevante Rezensionen, nicht garantiert die neuesten. Die Website filtert fünf Sterne und sortiert diese Auswahl nach Datum. Schlüssel nur in der Server-Umgebung hinterlegen. API-Inhalte werden nicht in Sanity gespeichert.',
        },
        {
          name: 'placeId',
          title: 'Google Place ID',
          type: 'string',
          validation: (R) => R.regex(/^[\w-]+$/),
        },
        requiredString('eyebrow', 'Hinweis über der Überschrift'),
        requiredText('heading', 'Überschrift', 2),
        requiredText('intro', 'Einleitung', 2),
        requiredString('sourceLabel', 'Bezeichnung der Quelle'),
        {
          name: 'sourceUrl',
          title: 'Google-Unternehmenseintrag / alle Rezensionen',
          type: 'url',
          validation: (R) => R.required().uri({ scheme: ['https'] }),
        },
        {
          name: 'rating',
          title: 'Google-Gesamtbewertung',
          type: 'number',
          description:
            'Leer lassen, bis der aktuelle Wert verifiziert wurde. Nicht aus der Auswahl berechnen.',
          validation: (R) => R.min(1).max(5).precision(1),
        },
        {
          name: 'count',
          title: 'Gesamtanzahl aller Google-Rezensionen',
          type: 'number',
          validation: (R) => R.min(1).integer(),
        },
        {
          name: 'verifiedAt',
          title: 'Bewertung und Anzahl zuletzt geprüft am',
          type: 'date',
          description:
            'Die Zusammenfassung erscheint nur, wenn Bewertung, Anzahl und Prüfdatum vorhanden sind.',
        },
        {
          name: 'items',
          title: 'Neueste 5-Sterne-Rezensionen',
          type: 'array',
          description:
            'Die Website sortiert nach Datum, neueste zuerst. Namen und Wortlaut unverändert vom Original übernehmen.',
          of: [
            {
              type: 'object',
              fields: [
                requiredString('name', 'Name wie bei Google'),
                {
                  name: 'rating',
                  title: 'Sterne',
                  type: 'number',
                  initialValue: 5,
                  validation: (R) => R.required().min(5).max(5).integer(),
                },
                requiredText('text', 'Originaltext', 6),
                {
                  name: 'date',
                  title: 'Datum der Rezension',
                  type: 'date',
                  validation: (R) => R.required(),
                },
                {
                  name: 'sourceUrl',
                  title: 'Direktlink zur Rezension',
                  type: 'url',
                  description: 'Ohne Direktlink wird der Google-Unternehmenseintrag verlinkt.',
                  validation: (R) => R.uri({ scheme: ['https'] }),
                },
              ],
              preview: { select: { title: 'name', subtitle: 'text' } },
            },
          ],
        },
        requiredString('selectionLabel', 'Hinweis zur 5-Sterne-Auswahl'),
        requiredString('allLabel', 'Link zu allen Rezensionen'),
        {
          name: 'writeUrl',
          title: 'Direktlink zum Bewerten',
          type: 'url',
          description:
            'Google-Link „Um Rezensionen bitten“ eintragen. Ohne Link wird kein Bewertungsbutton angezeigt.',
          validation: (R) => R.uri({ scheme: ['https'] }),
        },
        requiredString('writeLabel', 'Button zum Bewerten'),
        requiredText('emptyText', 'Text, solange noch keine Rezensionen hinterlegt sind', 2),
        requiredText('note', 'Quellenhinweis unter der Auswahl', 2),
        requiredString('trackLabel', 'Slider-Bezeichnung für Screenreader'),
        requiredString('previousLabel', 'Zurück-Pfeil'),
        requiredString('nextLabel', 'Weiter-Pfeil'),
        requiredString('readMoreLabel', 'Langen Text öffnen'),
        requiredString('readLessLabel', 'Langen Text schließen'),
        requiredString('originalLabel', 'Link zum Original'),
      ],
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'footer',
      fields: [
        requiredString('eyebrow', 'Hinweis über der Kontakt-Überschrift'),
        requiredString('heading', 'Kontakt-Überschrift'),
        requiredText('intro', 'Persönliche Einladung', 2),
        requiredString('ctaLabel', 'Hauptbutton'),
        requiredString('whatsappCtaLabel', 'Großer WhatsApp-Button'),
        requiredString('finePrint', 'Hinweis unter den Buttons'),
        requiredString('brandTagline', 'Text unter dem Markennamen'),
        requiredString('contactLabel', 'Überschrift Kontaktdaten'),
        requiredString('exploreLabel', 'Überschrift Entdecken-Links'),
        requiredString('moreLabel', 'Überschrift weitere Links'),
        requiredText('tagline', 'Persönlicher Abschlusssatz', 2),
        requiredString('whatsappLabel', 'WhatsApp-Link'),
        requiredString('instagramLabel', 'Instagram-Linktext'),
        requiredString('navigationLabel', 'Navigationsbezeichnung'),
        navigationLinks('links', 'Footer-Links', { footer: true }),
        requiredString('phonePrefix', 'Präfix Telefon'),
        requiredString('emailPrefix', 'Präfix E-Mail'),
        requiredString('legalLabel', 'Link Impressum'),
        requiredString('privacyLabel', 'Link Datenschutz'),
      ],
    },
    {
      name: 'faq',
      title: 'Fragen & Antworten im Dialog',
      type: 'object',
      group: 'footer',
      fields: [
        requiredString('title', 'Überschrift'),
        {
          name: 'items',
          title: 'Fragen',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [requiredString('question', 'Frage'), requiredText('answer', 'Antwort')],
            },
          ],
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: 'Startseite' }) },
};
