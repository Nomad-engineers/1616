import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages/config'
import { Header } from './globals/Header'
import { Blog } from './collections/Blog'
import { migrations } from './migrations'
import { headers } from 'next/headers'
import { Plans } from './collections/Plans'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { Plan } from './payload-types'
import { Forms } from './collections/Forms'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  cors: {
    origins: '*',
    headers: ['Authorization', 'Content-Type'],
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    autoRefresh: true,
  },
  collections: [Users, Media, Pages, Blog, Plans, Forms],
  globals: [Header],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: false,
    prodMigrations: migrations,
  }),
  sharp,
  email: nodemailerAdapter({
    defaultFromAddress: '1616@nomad-engineers.space',
    defaultFromName: '1616.marketing',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  endpoints: [
    {
      path: '/send-form',
      method: 'post',
      handler: async (req) => {
        try {
          const { name, email, planId, message } = await req.json!()

          const plan: Plan = await req.payload.findByID({
            collection: 'plans',
            id: planId,
          })
          await req.payload.create({
            collection: 'forms',
            data: {
              name,
              email,
              plan,
              message,
            },
          })
          await req.payload.sendEmail({
            to: 'baidosovich@gmail.com',
            subject: `1616.marketing ${email}`,
            text: `
Name: ${name}
Email: ${email}
Plan: ${plan.title} - ${plan.price}
Message: ${message}
            `.trim(),
          })
          return Response.json({ success: true })
        } catch (error) {
          return Response.json({ error }, { status: 500 })
        }
      },
    },
  ],
})
