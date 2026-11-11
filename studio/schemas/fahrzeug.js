// Fahrzeug-Angebot: spiegelt den Vehicle-Typ in src/data/site.ts.
export default {
  name: 'fahrzeug',
  title: 'Fahrzeuge',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (R) => R.required() },
    {
      name: 'slug',
      title: 'URL-Kürzel',
      type: 'slug',
      options: { source: 'name' },
      validation: (R) => R.required(),
    },
    {
      name: 'kicker',
      title: 'Kategorie-Zeile',
      type: 'string',
      description: 'z. B. „Nutzfahrzeug“ oder „Dienstwagen“',
    },
    {
      name: 'topic',
      title: 'Anfrage-Thema',
      type: 'string',
      options: {
        list: [
          { title: 'Firmenwagen', value: 'firma' },
          { title: 'Transporter', value: 'transporter' },
          { title: 'Privat', value: 'privat' },
        ],
        layout: 'radio',
      },
      initialValue: 'firma',
    },
    {
      name: 'status',
      title: 'Status-Text',
      type: 'string',
      description: 'z. B. „Kontingent verfügbar“',
    },
    {
      name: 'tone',
      title: 'Status-Farbe',
      type: 'string',
      options: {
        list: [
          { title: 'Grün', value: 'green' },
          { title: 'Blau', value: 'blue' },
          { title: 'Grau', value: 'grey' },
        ],
        layout: 'radio',
      },
      initialValue: 'green',
    },
    {
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt-Text', type: 'string' }],
    },
    {
      name: 'gallery',
      title: 'Weitere Bilder (Slider auf der Detailseite)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt-Text', type: 'string' }],
        },
      ],
    },
    { name: 'features', title: 'Merkmale', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'beschreibung',
      title: 'Beschreibung (Detailseite)',
      type: 'text',
      rows: 6,
    },
    {
      name: 'discount',
      title: 'Nachlass-Hinweis (optional)',
      type: 'string',
      description:
        'z. B. „Bis zu 42 % Nachlass“. Erscheint als Plakette auf der Kachel und ersetzt dort den Status-Text.',
    },
    {
      name: 'ctaLabel',
      title: 'Button-Text der Kachel (optional)',
      type: 'string',
      description: 'z. B. „Ducato anfragen“. Leer = Standardtext aus Startseite → Fahrzeuge.',
    },
    {
      name: 'price',
      title: 'Kaufpreis (optional)',
      type: 'string',
      description: 'z. B. „34.900 €“. Leer lassen, wenn es keinen festen Preis gibt.',
    },
    {
      name: 'priceOld',
      title: 'Streichpreis (optional)',
      type: 'string',
      description: 'Nur wenn es einen echten regulären Preis gibt, z. B. „46.900 €“',
    },
    {
      name: 'priceTerms',
      title: 'Zusatz zum Preis',
      type: 'string',
      description: 'z. B. „EU-Neuwagen und Jahreswagen“',
    },
    { name: 'verfuegbar', title: 'Online zeigen', type: 'boolean', initialValue: true },
    {
      name: 'sortierung',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Kleinere Zahl zuerst',
      initialValue: 10,
    },
  ],
  orderings: [
    { title: 'Reihenfolge', name: 'sort', by: [{ field: 'sortierung', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'name',
      discount: 'discount',
      price: 'price',
      media: 'image',
      on: 'verfuegbar',
    },
    prepare({ title, discount, price, media, on }) {
      return { title, subtitle: `${on ? '' : 'versteckt · '}${discount || price || ''}`, media };
    },
  },
};
