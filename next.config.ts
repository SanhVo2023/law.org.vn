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
}

export default withNextIntl(withPayload(nextConfig))
