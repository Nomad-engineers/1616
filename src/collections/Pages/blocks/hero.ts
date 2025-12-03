import { Block } from 'payload'

export const hero: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'badge',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'content',
      type: 'textarea',
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
    {
      type: 'array',
      name: 'hero-stats',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
  ],
}
