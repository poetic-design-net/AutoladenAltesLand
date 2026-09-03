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

export default {
  name: 'frontpage',
  title: 'Startseite',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Einstieg', default: true },
    { name: 'offers', title: 'Fahrzeuge' },
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
      name: 'hero',
      title: 'Einstieg',
      type: 'object',
      group: 'hero',
      fields: [
        { name: 'eyebrow', title: 'Hinweis über der Hauptüberschrift', type: 'string' },
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
        requiredString('ctaLabel', 'Anfrage-Button'),
      ],
    },
    {
      name: 'offers',
      title: 'Fahrzeugbereich',
      type: 'object',
      group: 'offers',
      fields: [
        requiredString('heading', 'Überschrift'),
        { name: 'intro', title: 'Einleitung auf der Startseite', type: 'string' },
        { name: 'ctaLabel', title: 'Button zur Beratung', type: 'string' },
        requiredString('allLabel', 'Button „Alle ansehen“'),
        requiredString('sheetSubtitle', 'Untertitel in der Fahrzeugübersicht'),
        requiredString('priceLabel', 'Preisbezeichnung'),
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
        requiredString('phonePrefix', 'Präfix Telefon'),
        requiredString('emailPrefix', 'Präfix E-Mail'),
        requiredString('legalLabel', 'Link Impressum'),
        requiredString('privacyLabel', 'Link Datenschutz'),
      ],
    },
  ],
  preview: { prepare: () => ({ title: 'Startseite' }) },
};
