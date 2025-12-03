import { CollectionConfig } from 'payload'

export const Forms: CollectionConfig = {
  slug: 'forms',
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'plan',
      type: 'relationship',
      relationTo: 'plans',
    },
    {
      name: 'message',
      type: 'textarea',
    },
  ],
}
