import dns from 'node:dns'
import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

// Force IPv4 — fixes Supabase IPv6-only DNS resolution on some networks
dns.setDefaultResultOrder('ipv4first')

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-ebe397ad6fc946888f5c9aacc3cc48bb.r2.dev',
        // '/**' — Payload media now lands at the bucket root (no prefix), and the
        // existing site assets live under /law.org.vn/*; both are on this host.
        pathname: '/**',
      },
    ],
  },
  // Build-time DB-connection budget. Every SSG page (home, 6 categories, about…)
  // opens a Payload→Postgres connection at build. Vercel build machines have many
  // cores, so Next's default worker count (= cores − 1) spawns several build
  // workers, each with its OWN pg pool → connections multiply and blow past the
  // SHARED Supabase Session Pooler limit (15 clients), especially while the live
  // site is also using slots: "(EMAXCONNSESSION) max clients reached in session mode".
  // Force a single build worker generating pages serially, with retries, so the
  // build holds ≈1 connection regardless of core count.
  experimental: {
    cpus: 1,
    staticGenerationMinPagesPerWorker: 1000,
    staticGenerationMaxConcurrency: 1,
    staticGenerationRetryCount: 3,
  },
}

export default withNextIntl(withPayload(nextConfig))
