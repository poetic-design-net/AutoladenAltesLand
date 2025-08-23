export default {
  name: 'angebot',
  title: 'Angebote',
  type: 'document',
  fields: [
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
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'SVG Path oder Icon-Name',
      options: {
        list: [
          {title: 'Check', value: 'check'},
          {title: 'Lightning', value: 'lightning'},
          {title: 'Users', value: 'users'},
          {title: 'Euro', value: 'euro'},
          {title: 'Settings', value: 'settings'},
          {title: 'Clipboard', value: 'clipboard'}
        ]
      }
    },
    {
      name: 'gradientFrom',
      title: 'Gradient Start Farbe',
      type: 'string',
      description: 'z.B. blue-500, cyan-500, orange-500',
      validation: Rule => Rule.required()
    },
    {
      name: 'gradientTo',
      title: 'Gradient End Farbe',
      type: 'string',
      description: 'z.B. blue-600, cyan-600, orange-600',
      validation: Rule => Rule.required()
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'Verlinkung zu weiteren Informationen'
    },
    {
      name: 'order',
      title: 'Reihenfolge',
      type: 'number',
      description: 'Position in der Anzeige (1-6)'
    }
  ],
  orderings: [
    {
      title: 'Reihenfolge',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      order: 'order'
    },
    prepare(selection) {
      const {title, subtitle, order} = selection;
      return {
        title: `${order ? order + '. ' : ''}${title}`,
        subtitle: subtitle
      };
    }
  }
};