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
      required: true,
      maxRows: 8,
      fields: [
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
        },
      ],
    },
  ],
}
