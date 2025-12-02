import type { CollectionConfig } from 'payload'
import { content } from './content'
import { v4 } from 'uuid'

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
          const customID = v4()
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
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  endpoints: [
    {
      path: '/slug/:slug',
      method: 'get',
      handler: async (req) => {
        try {
          const slug = req.routeParams?.slug
          if (!slug) return Response.json({ error: 'slug required' }, { status: 400 })
          const data = (
            await req.payload.find({
              collection: 'pages',
              where: {
                slug: {
                  equals: slug,
                },
              },
            })
          ).docs[0]
          return Response.json(data)
        } catch (error) {
          return Response.json({ error }, { status: 500 })
        }
      },
    },
  ],
}
