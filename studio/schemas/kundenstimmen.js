export default {
  name: 'kundenstimmen',
  title: 'Kundenstimmen',
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
      name: 'testimonials',
      title: 'Kundenbewertungen',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'role',
              title: 'Rolle/Position',
              type: 'string',
              description: 'z.B. "Privatkundin", "Geschäftsführer"'
            },
            {
              name: 'text',
              title: 'Bewertungstext',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required()
            },
            {
              name: 'rating',
              title: 'Bewertung',
              type: 'number',
              validation: Rule => Rule.min(1).max(5)
            },
            {
              name: 'order',
              title: 'Reihenfolge',
              type: 'number'
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role'
            }
          }
        }
      ]
    },
    {
      name: 'ctaTitle',
      title: 'CTA Titel',
      type: 'string'
    },
    {
      name: 'ctaText',
      title: 'CTA Text',
      type: 'text',
      rows: 2
    },
    {
      name: 'primaryButtonText',
      title: 'Primärer Button Text',
      type: 'string'
    },
    {
      name: 'secondaryButtonText',
      title: 'Sekundärer Button Text',
      type: 'string'
    },
    {
      name: 'googleReviewLink',
      title: 'Google Bewertungen Link',
      type: 'url'
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
};