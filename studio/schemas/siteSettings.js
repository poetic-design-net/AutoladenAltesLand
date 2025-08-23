export default {
  name: 'siteSettings',
  title: 'Website Einstellungen',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Website Titel',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Website Beschreibung',
      type: 'text',
      description: 'Für SEO und Meta-Tags',
      rows: 3
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'SEO Keywords'
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image'
    },
    {
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Bild für Social Media Sharing'
    },
    {
      name: 'primaryColor',
      title: 'Primärfarbe',
      type: 'string',
      description: 'Hex-Code z.B. #1e40af'
    },
    {
      name: 'secondaryColor',
      title: 'Sekundärfarbe',
      type: 'string',
      description: 'Hex-Code z.B. #f97316'
    },
    {
      name: 'footerText',
      title: 'Footer Text',
      type: 'text',
      rows: 2
    },
    {
      name: 'cookieBanner',
      title: 'Cookie Banner Text',
      type: 'text',
      rows: 3
    },
    {
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Titel',
              type: 'string'
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string'
            },
            {
              name: 'external',
              title: 'Externer Link',
              type: 'boolean',
              initialValue: false
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo'
    }
  }
};