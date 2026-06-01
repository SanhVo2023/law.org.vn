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
import { s3Storage } from '@payloadcms/storage-s3'
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

// Cloudflare R2 (S3-compatible) storage for the Media collection. Without this,
// Payload writes uploads to the local filesystem — which is READ-ONLY on Vercel
// serverless, so every image upload fails. R2 keeps media on the same CDN bucket
// the rest of the site's images already use.
const hasR2 =
  !!process.env.R2_ACCOUNT_ID &&
  !!process.env.R2_ACCESS_KEY_ID &&
  !!process.env.R2_SECRET_ACCESS_KEY &&
  !!process.env.R2_BUCKET_NAME &&
  !!process.env.R2_PUBLIC_URL

// In production media uploads MUST go to R2 — fail loud rather than silently
// falling back to the read-only local disk (which is the bug we're fixing).
if (process.env.NODE_ENV === 'production' && !hasR2) {
  throw new Error(
    '[payload] R2 storage is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, ' +
      'R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME and R2_PUBLIC_URL — media uploads require ' +
      'the R2 adapter because the serverless filesystem is read-only.',
  )
}

// Origins allowed to make authenticated, cookie-based mutations from the admin
// panel (CSRF) and cross-origin API reads (CORS). The admin UI authenticates with
// the `payload-token` COOKIE, which IS subject to CSRF — so Payload checks the
// request Origin against `csrf`. If the custom domain (or www variant) is missing,
// the admin loads and reads work but EVERY Save returns 403. (Bearer-token API
// calls skip CSRF, which is why scripts worked while the browser admin didn't.)
// VERCEL_URL / VERCEL_PROJECT_PRODUCTION_URL are auto-added so the *.vercel.app
// preview/prod URLs also work without manual config.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const adminOrigins = Array.from(
  new Set(
    [
      SITE_URL,
      'https://law.org.vn',
      'https://www.law.org.vn',
      'http://localhost:3000',
      'http://localhost:3010',
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
      process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : null,
    ].filter((v): v is string => Boolean(v)),
  ),
)

export default buildConfig({
  serverURL: SITE_URL,
  secret: process.env.PAYLOAD_SECRET,

  // Allow the admin's custom domain (+ www, + localhost, + vercel.app) to read
  // cross-origin and to pass CSRF on Save.
  cors: adminOrigins,
  csrf: adminOrigins,

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
    // push:false always — schema introspection ("Pulling schema from database…")
    // hangs on the Supabase Session Pooler. Schema changes go through
    // `npx payload migrate`, never auto-push.
    push: false,
    schemaName: 'lov',
    // @ts-expect-error tablePrefix is supported at runtime but missing from public Args type
    tablePrefix: 'lov_',
    // Disable Payload's automatic transaction wrapping. With the Supabase Session
    // Pooler, draft-enabled reads (articles/blog-posts have versions.drafts) were
    // opening transactions that were left "idle in transaction", permanently holding
    // a pool slot — after a couple of admin operations the whole CMS hung ("can sign
    // in but can't do anything"). Single-doc CMS writes don't need transactions.
    transactionOptions: false,
    pool: {
      connectionString: process.env.DATABASE_URI,
      // Cap pool per process so Next's parallel build workers + Supabase Session Pooler
      // (max 15 clients per user) don't deadlock at build time.
      max: 2,
      idleTimeoutMillis: 5000,
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
    // R2 storage for Media uploads (S3-compatible). No `prefix` (keeps files at the
    // bucket root, adds no DB column → no migration). disablePayloadAccessControl +
    // generateFileURL serve media straight from the R2 public CDN.
    ...(hasR2
      ? [
          s3Storage({
            collections: {
              media: {
                disablePayloadAccessControl: true,
                generateFileURL: ({ filename }) =>
                  `${process.env.R2_PUBLIC_URL}/${filename}`,
              },
            },
            bucket: process.env.R2_BUCKET_NAME as string,
            config: {
              region: 'auto',
              endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
              credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
              },
            },
          }),
        ]
      : []),
  ],

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  sharp,
})
