export default {
  name: 'stats',
  title: 'Statistiken',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'stats',
      title: 'Statistiken',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Wert',
              type: 'string',
              description: 'z.B. "500+", "2019", "4.9⭐"',
              validation: Rule => Rule.required()
            },
            {
              name: 'label',
              title: 'Bezeichnung',
              type: 'string',
              description: 'z.B. "Zufriedene Kunden", "Gegründet"',
              validation: Rule => Rule.required()
            },
            {
              name: 'order',
              title: 'Reihenfolge',
              type: 'number'
            }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value'
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
};