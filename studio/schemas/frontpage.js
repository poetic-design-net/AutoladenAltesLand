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
    { name: 'finance', title: 'Leasing & Finanzierung' },
    { name: 'about', title: 'Über Alex' },
    { name: 'form', title: 'Anfrage' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    requiredString('seoTitle', 'Seitentitel', { group: 'seo' }),
    requiredText('seoDescription', 'Meta-Beschreibung', 3, { group: 'seo' }),
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
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'footer',
      fields: [
        requiredText('tagline', 'Persönlicher Abschlusssatz', 2),
        requiredString('whatsappLabel', 'WhatsApp-Link'),
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
