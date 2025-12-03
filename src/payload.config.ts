// storage-adapter-import-placeholder
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
  collections: [Users, Media, Pages, Blog],
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
  plugins: [
    // storage-adapter-placeholder
  ],
})
