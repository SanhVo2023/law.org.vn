import { Be_Vietnam_Pro, Playfair_Display, JetBrains_Mono } from 'next/font/google'

// Body — Vietnamese diacritics, institutional body text
export const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body',
})

// Headings — encyclopedia serif, supports Vietnamese
export const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-heading',
})

// Citations — legal-code references, inline quotes
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
})
