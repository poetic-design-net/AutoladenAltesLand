export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'highlightedText',
      title: 'Hervorgehobener Text',
      type: 'string',
      description: 'Der farbig hervorgehobene Teil des Titels'
    },
    {
      name: 'subtitle',
      title: 'Untertitel',
      type: 'text',
      rows: 3
    },
    {
      name: 'primaryButtonText',
      title: 'Primärer Button Text',
      type: 'string'
    },
    {
      name: 'primaryButtonLink',
      title: 'Primärer Button Link',
      type: 'string'
    },
    {
      name: 'secondaryButtonText',
      title: 'Sekundärer Button Text',
      type: 'string'
    },
    {
      name: 'secondaryButtonLink',
      title: 'Sekundärer Button Link',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Hero Bild',
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
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
};