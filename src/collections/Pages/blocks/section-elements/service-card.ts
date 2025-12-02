import { Block } from 'payload'

export const serviceCard: Block = {
  slug: 'service-card',
  fields: [
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
  ],
}
