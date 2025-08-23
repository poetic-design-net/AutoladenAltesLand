export default {
  name: 'kontakt',
  title: 'Kontaktinformationen',
  type: 'document',
  fields: [
    {
      name: 'firmenname',
      title: 'Firmenname',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'strasse',
      title: 'Straße und Hausnummer',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'plz',
      title: 'PLZ',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'ort',
      title: 'Ort',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'telefon',
      title: 'Telefon',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'telefonService',
      title: 'Telefon Service',
      type: 'string'
    },
    {
      name: 'email',
      title: 'E-Mail',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'emailService',
      title: 'E-Mail Service',
      type: 'string',
      validation: Rule => Rule.email()
    },
    {
      name: 'oeffnungszeiten',
      title: 'Öffnungszeiten',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'tag',
              title: 'Tag/Zeitraum',
              type: 'string',
              description: 'z.B. Mo-Fr, Sa, So'
            },
            {
              name: 'zeit',
              title: 'Zeit',
              type: 'string',
              description: 'z.B. 9:00 - 18:00 Uhr oder Geschlossen'
            }
          ]
        }
      ]
    },
    {
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
      description: 'Link zur Google Maps Ansicht'
    },
    {
      name: 'googleMapsEmbed',
      title: 'Google Maps Embed Code',
      type: 'text',
      description: 'iframe Embed Code von Google Maps'
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Plattform',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Twitter/X', value: 'twitter'},
                  {title: 'YouTube', value: 'youtube'}
                ]
              }
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'firmenname',
      subtitle: 'ort'
    }
  }
};