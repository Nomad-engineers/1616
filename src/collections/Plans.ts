import { CollectionConfig } from 'payload'

export const Plans: CollectionConfig = {
  slug: 'plans',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
