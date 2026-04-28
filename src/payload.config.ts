import dns from 'dns'
import path from 'path'
import { fileURLToPath } from 'url'

// Force Node.js to prefer IPv4 — fixes Supabase IPv6-only DNS on some networks
dns.setDefaultResultOrder('ipv4first')

import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import {
  lexicalEditor,
  HeadingFeature,
  BlockquoteFeature,
  LinkFeature,
  UnorderedListFeature,
  OrderedListFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  InlineCodeFeature,
  HorizontalRuleFeature,
  UploadFeature,
  FixedToolbarFeature,
} from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import sharp from 'sharp'

// Collections
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Articles } from './collections/Articles'
import { Categories } from './collections/Categories'
import { LegalUpdates } from './collections/LegalUpdates'
import { BlogPosts } from './collections/BlogPosts'

// Globals
import { SiteSettings } from './globals/SiteSettings'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.PAYLOAD_SECRET || process.env.PAYLOAD_SECRET === 'default-secret-change-me') {
  throw new Error('PAYLOAD_SECRET env var must be set to a real random 32+ char string')
}
if (!process.env.DATABASE_URI) {
  throw new Error('DATABASE_URI env var must be set (pooled Supabase connection)')
}

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET,

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — law.org.vn Admin',
    },
  },

  // Bilingual: Vietnamese primary, English fallback
  localization: {
    locales: [
      { label: 'Tiếng Việt', code: 'vi' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'vi',
    fallback: true,
  },

  collections: [
    Media,
    Users,
    Categories,
    Articles,
    BlogPosts,
    LegalUpdates,
  ],

  globals: [
    SiteSettings,
    Header,
    Footer,
  ],

  editor: lexicalEditor({
    features: () => [
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      BlockquoteFeature(),
      LinkFeature({ enabledCollections: ['articles', 'blog-posts'] }),
      UnorderedListFeature(),
      OrderedListFeature(),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      InlineCodeFeature(),
      HorizontalRuleFeature(),
      UploadFeature({ collections: { media: { fields: [] } } }),
      FixedToolbarFeature(),
    ],
  }),

  db: postgresAdapter({
    push: process.env.NODE_ENV !== 'production',
    schemaName: 'lov',
    // @ts-expect-error tablePrefix is supported at runtime but missing from public Args type
    tablePrefix: 'lov_',
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),

  plugins: [
    seoPlugin({
      collections: ['articles', 'blog-posts'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) =>
        `${typeof doc?.title === 'string' ? doc.title : 'law.org.vn'} | Vietnam Legal Knowledge Portal`,
      generateDescription: ({ doc }) =>
        typeof doc?.excerpt === 'string' ? doc.excerpt : '',
    }),
  ],

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  sharp,
})
