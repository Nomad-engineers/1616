import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Tab } from 'payload'
import { hero } from './blocks/hero'
import { about } from './blocks/about'
import { section } from './blocks/section'

export const content: Tab = {
  label: 'Content',
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [hero, about, section],
      required: true,
      admin: {
        initCollapsed: true,
      },
    },
  ],
}
