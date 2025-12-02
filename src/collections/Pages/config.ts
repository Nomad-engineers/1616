import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'slug',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
  ],
}
