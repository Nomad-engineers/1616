import { Block } from 'payload'
import { serviceCard } from './section-elements/service-card'
import { packageCard } from './section-elements/package-card'
import { caseCard } from './section-elements/case-card'

export const section: Block = {
  slug: 'section',
  fields: [
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'tag',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      type: 'blocks',
      name: 'elements',
      blocks: [
        serviceCard,
        packageCard,
        caseCard,
        {
          slug: 'blog-card',
          fields: [
            {
              name: 'blog',
              type: 'relationship',
              relationTo: 'blog',
            },
          ],
        },
      ],
    },
  ],
}
