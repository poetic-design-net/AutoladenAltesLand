export default {
  name: 'fahrzeug',
  title: 'Fahrzeuge',
  type: 'document',
  fields: [
    {
      name: 'marke',
      title: 'Marke',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'modell',
      title: 'Modell',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'jahr',
      title: 'Baujahr',
      type: 'number'
    },
    {
      name: 'preis',
      title: 'Preis (€)',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'reichweite',
      title: 'Reichweite (km)',
      type: 'number'
    },
    {
      name: 'ladezeit',
      title: 'Ladezeit (Schnellladen)',
      type: 'string',
      description: 'z.B. "30 Min auf 80%"'
    },
    {
      name: 'leistung',
      title: 'Leistung (kW)',
      type: 'number'
    },
    {
      name: 'batterie',
      title: 'Batteriekapazität (kWh)',
      type: 'number'
    },
    {
      name: 'zustand',
      title: 'Zustand',
      type: 'string',
      options: {
        list: [
          {title: 'Neu', value: 'neu'},
          {title: 'Vorführwagen', value: 'vorfuehrwagen'},
          {title: 'Gebraucht', value: 'gebraucht'},
          {title: 'Jahreswagen', value: 'jahreswagen'}
        ]
      }
    },
    {
      name: 'verfuegbar',
      title: 'Verfügbar',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'highlight',
      title: 'Als Highlight anzeigen',
      type: 'boolean',
      description: 'Auf der Startseite hervorheben'
    },
    {
      name: 'bilder',
      title: 'Bilder',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            },
            {
              name: 'caption',
              title: 'Bildunterschrift',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'beschreibung',
      title: 'Beschreibung',
      type: 'text',
      rows: 5
    },
    {
      name: 'ausstattung',
      title: 'Ausstattung',
      type: 'array',
      of: [{type: 'string'}]
    }
  ],
  preview: {
    select: {
      title: 'modell',
      subtitle: 'marke',
      media: 'bilder.0',
      preis: 'preis'
    },
    prepare(selection) {
      const {title, subtitle, preis} = selection;
      return {
        title: `${subtitle} ${title}`,
        subtitle: preis ? `€ ${preis.toLocaleString('de-DE')}` : 'Preis auf Anfrage',
        media: selection.media
      };
    }
  }
};