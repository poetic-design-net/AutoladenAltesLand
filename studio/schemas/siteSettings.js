export default {
  name: 'siteSettings',
  title: 'Website',
  type: 'document',
  groups: [
    { name: 'brand', title: 'Marke', default: true },
    { name: 'contact', title: 'Kontakt' },
    { name: 'vehicles', title: 'Fahrzeuge' },
    { name: 'legal', title: 'Impressum & Datenschutz' },
  ],
  fields: [
    {
      name: 'legal',
      title: 'Unternehmensangaben',
      type: 'object',
      group: 'legal',
      fields: [
        {
          name: 'company',
          title: 'Firmenname',
          type: 'string',
        },
        {
          name: 'street',
          title: 'Straße und Hausnummer',
          type: 'string',
        },
        {
          name: 'city',
          title: 'PLZ und Ort',
          type: 'string',
        },
        {
          name: 'ceo',
          title: 'Geschäftsführung',
          type: 'string',
        },
        {
          name: 'vatId',
          title: 'Umsatzsteuer-ID',
          type: 'string',
        },
        {
          name: 'register',
          title: 'Handelsregister',
          type: 'string',
        },
        {
          name: 'web',
          title: 'Website-Domain',
          type: 'string',
        },
      ],
    },
    {
      name: 'legalLabels',
      title: 'Impressum & Datenschutz – Beschriftungen',
      type: 'object',
      group: 'legal',
      fields: [
        {
          name: 'backLabel',
          title: 'Zurück-Link',
          type: 'string',
        },
        {
          name: 'imprintTitle',
          title: 'Impressum',
          type: 'string',
        },
        {
          name: 'privacyTitle',
          title: 'Datenschutz',
          type: 'string',
        },
        {
          name: 'law',
          title: 'Angaben gemäß § 5 DDG',
          type: 'string',
        },
        {
          name: 'provider',
          title: 'Anbieter',
          type: 'string',
        },
        {
          name: 'represented',
          title: 'Vertreten durch',
          type: 'string',
        },
        {
          name: 'ceo',
          title: 'Geschäftsführung',
          type: 'string',
        },
        {
          name: 'contact',
          title: 'Kontakt',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Telefon',
          type: 'string',
        },
        {
          name: 'email',
          title: 'E-Mail',
          type: 'string',
        },
        {
          name: 'web',
          title: 'Website-Domain',
          type: 'string',
        },
        {
          name: 'register',
          title: 'Handelsregister',
          type: 'string',
        },
        {
          name: 'vatId',
          title: 'Umsatzsteuer-ID',
          type: 'string',
        },
        {
          name: 'responsible',
          title: 'Verantwortlich für den Inhalt',
          type: 'string',
        },
        {
          name: 'privacyController',
          title: 'Verantwortlicher',
          type: 'string',
        },
        {
          name: 'legalNavigation',
          title: 'Rechtliches',
          type: 'string',
        },
      ],
    },
    {
      name: 'vehiclePage',
      title: 'Fahrzeugdetailseite – Texte',
      type: 'object',
      group: 'vehicles',
      fields: [
        {
          name: 'backLabel',
          title: 'Zurück-Link',
          type: 'string',
        },
        {
          name: 'priceLabel',
          title: 'Preisbezeichnung',
          type: 'string',
        },
        {
          name: 'ctaLabel',
          title: 'Anfragebutton',
          type: 'string',
        },
        {
          name: 'phoneLabel',
          title: 'Telefonbutton',
          type: 'string',
        },
        {
          name: 'whatsappLabel',
          title: 'WhatsApp-Button',
          type: 'string',
        },
        {
          name: 'note',
          title: 'Hinweis zur Anfrage',
          type: 'string',
        },
        {
          name: 'relatedHeading',
          title: 'Weitere Fahrzeuge – Überschrift',
          type: 'string',
        },
        {
          name: 'previousLabel',
          title: 'Vorheriges Bild',
          type: 'string',
        },
        {
          name: 'nextLabel',
          title: 'Nächstes Bild',
          type: 'string',
        },
        {
          name: 'imageLabel',
          title: 'Bildnummer – Präfix',
          type: 'string',
        },
        {
          name: 'seoText',
          title: 'SEO-Schlusssatz',
          type: 'string',
        },
      ],
    },
    {
      name: 'privacySections',
      title: 'Datenschutz – Abschnitte',
      description:
        'Bestehende Texte der Website. {{email}} wird durch die aktuelle Kontakt-E-Mail ersetzt. Änderungen bitte fachlich prüfen lassen.',
      type: 'array',
      group: 'legal',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Überschrift',
              type: 'string',
            },
            {
              name: 'paragraphs',
              title: 'Absätze',
              type: 'array',
              of: [
                {
                  type: 'text',
                  rows: 5,
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'heading',
            },
          },
        },
      ],
    },
    {
      name: 'brandName',
      title: 'Name',
      type: 'string',
      group: 'brand',
      validation: (R) => R.required(),
    },
    {
      name: 'contactName',
      title: 'Ansprechpartner',
      type: 'string',
      group: 'brand',
      validation: (R) => R.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'brand',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt-Text', type: 'string' }],
      validation: (R) => R.required(),
    },
    { name: 'phone', title: 'Telefon', type: 'string', group: 'contact' },
    {
      name: 'instagramUrl',
      title: 'Instagram-Profil',
      type: 'url',
      group: 'contact',
      validation: (R) => R.uri({ scheme: ['https'] }),
    },
    {
      name: 'whatsapp',
      title: 'WhatsApp-Nummer',
      type: 'string',
      group: 'contact',
      description: 'International, ohne + und Leerzeichen, z. B. 491751234567',
    },
    {
      name: 'email',
      title: 'E-Mail',
      type: 'string',
      group: 'contact',
      validation: (R) => R.email(),
    },
    {
      name: 'featuredVehicleCount',
      title: 'Anzahl Fahrzeuge auf der Startseite',
      type: 'number',
      group: 'vehicles',
      description:
        'Anzahl im horizontalen Startseiten-Slider. 0 = alle sichtbaren Fahrzeuge; die Reihenfolge wird am Fahrzeug festgelegt.',
      initialValue: 3,
      validation: (R) => R.required().min(0).integer(),
    },
    {
      name: 'priceNote',
      title: 'Allgemeiner Preis-Hinweis',
      type: 'text',
      rows: 2,
      group: 'vehicles',
      validation: (R) => R.required(),
    },
  ],
  preview: { prepare: () => ({ title: 'Website' }) },
};
