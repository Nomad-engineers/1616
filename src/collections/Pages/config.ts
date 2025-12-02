import type { CollectionConfig } from 'payload'
import { v4 as uuidv4 } from 'uuid'
import { content } from './content'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'slug',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data?.id) {
          const customID = uuidv4()
          return { ...data, id: customID }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      admin: {
        disabled: true,
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [content],
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
