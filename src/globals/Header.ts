import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {
      name: 'logo',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'items',
      type: 'array',
      maxRows: 8,
      fields: [
        {
          name: 'text',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'buttonText',
          type: 'text',
        },
        {
          name: 'buttonUrl',
          type: 'text',
        },
      ],
    },
  ],
}
