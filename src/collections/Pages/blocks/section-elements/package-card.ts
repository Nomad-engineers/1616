import { Block } from 'payload'

export const packageCard: Block = {
  slug: 'package-card',
  fields: [
    {
      name: 'plan',
      type: 'relationship',
      relationTo: 'plans',
      required: true,
    },
    {
      name: 'isPrimary',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
