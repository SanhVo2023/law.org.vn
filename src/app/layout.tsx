/* Root layout — applies to both Payload admin (under /admin) and locale-scoped pages.
   The Payload (payload)/layout.tsx wraps admin separately; this file provides fonts + metadata base. */
import type { Metadata } from 'next'
import { beVietnamPro, playfair, jetbrainsMono } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://law.org.vn'),
  title: {
    default: 'law.org.vn — Vietnam Legal Knowledge Portal',
    template: '%s | law.org.vn',
  },
  description:
    'law.org.vn — an encyclopedic, non-commercial knowledge portal explaining Vietnam\'s legal system, courts, and procedures.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${beVietnamPro.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
