import { Block } from 'payload'
import { serviceCard } from './section-elements/service-card'
import { packageCard } from './section-elements/package-card'
import { caseCard } from './section-elements/case-card'

export const section: Block = {
  slug: 'section',
  fields: [
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
        // TODO: blog
        // {
        //   slug: 'blog-card',
        //   fields: [
        //    {
        //     relationTo: ''
        //    }
        //   ],
        // },
      ],
    },
  ],
}
