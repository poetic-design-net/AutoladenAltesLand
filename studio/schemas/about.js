export default {
  name: 'about',
  title: 'Über Alex',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Untertitel',
      type: 'string'
    },
    {
      name: 'introText',
      title: 'Einführungstext',
      type: 'text',
      rows: 3
    },
    {
      name: 'image',
      title: 'Profilbild',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ]
    },
    {
      name: 'timeline',
      title: 'Zeitstrahl',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'year',
              title: 'Jahr',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'title',
              title: 'Titel',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Beschreibung',
              type: 'text',
              rows: 2
            }
          ]
        }
      ]
    },
    {
      name: 'quote',
      title: 'Zitat',
      type: 'text',
      rows: 3
    },
    {
      name: 'phoneButtonText',
      title: 'Telefon Button Text',
      type: 'string'
    },
    {
      name: 'contactButtonText',
      title: 'Kontakt Button Text',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
};