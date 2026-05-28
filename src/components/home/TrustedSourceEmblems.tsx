import type { ReactNode } from 'react'

/* Inline SVG institutional emblems for the Trusted Sources rail.
 *
 * Single-stroke geometric monograms — `stroke="currentColor"` so the colour
 * inherits the parent's `text-[var(--color-gold-500)]` and adapts to light/dark.
 * Truly transparent (vector, no raster background) — replaces the AI-generated
 * raster crests that shipped with a baked-in / fake-transparent background.
 *
 * viewBox 0 0 64 64, ~2px stroke, no fills, each within a circular border.
 */

const common = {
  viewBox: '0 0 64 64',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const Ring = () => <circle cx="32" cy="32" r="29" strokeWidth={1.5} opacity={0.55} />

export const TRUSTED_SOURCE_EMBLEMS: Record<string, ReactNode> = {
  // National Assembly — five-pointed star above a horizontal rule
  'quoc-hoi': (
    <svg {...common}>
      <Ring />
      <path d="M32 16l3.5 7.2 7.9 1.1-5.7 5.6 1.3 7.9L32 41.3l-7 3.5 1.3-7.9-5.7-5.6 7.9-1.1z" />
      <line x1="20" y1="48" x2="44" y2="48" />
    </svg>
  ),
  // Government Portal — laurel wreath enclosing a small column
  'chinh-phu': (
    <svg {...common}>
      <Ring />
      <path d="M24 44c-6-3-8-9-7-16" />
      <path d="M40 44c6-3 8-9 7-16" />
      <line x1="29" y1="24" x2="35" y2="24" />
      <line x1="30" y1="24" x2="30" y2="42" />
      <line x1="34" y1="24" x2="34" y2="42" />
      <line x1="27" y1="42" x2="37" y2="42" />
    </svg>
  ),
  // Supreme People's Court — balance scales
  tandtc: (
    <svg {...common}>
      <Ring />
      <line x1="32" y1="18" x2="32" y2="46" />
      <line x1="20" y1="24" x2="44" y2="24" />
      <line x1="26" y1="46" x2="38" y2="46" />
      <path d="M20 24l-5 10a5 5 0 0 0 10 0z" />
      <path d="M44 24l-5 10a5 5 0 0 0 10 0z" />
    </svg>
  ),
  // Supreme People's Procuracy — upright sword crossed with a quill
  vksndtc: (
    <svg {...common}>
      <Ring />
      <line x1="27" y1="18" x2="27" y2="44" />
      <line x1="23" y1="22" x2="31" y2="22" />
      <path d="M40 18c-6 6-9 14-9 26" />
      <path d="M40 18l-2 5 5-1z" />
    </svg>
  ),
  // Ministry of Justice — open codex with small scales above
  'bo-tu-phap': (
    <svg {...common}>
      <Ring />
      <path d="M16 38c5-3 11-3 16 0 5-3 11-3 16 0" />
      <line x1="32" y1="38" x2="32" y2="28" />
      <line x1="24" y1="24" x2="40" y2="24" />
      <path d="M24 24l-3 5h6z" />
      <path d="M40 24l-3 5h6z" />
      <line x1="32" y1="22" x2="32" y2="24" />
    </svg>
  ),
  // Legal Documents Portal (VBPL) — stack of three horizontal scrolls
  vbpl: (
    <svg {...common}>
      <Ring />
      <rect x="20" y="22" width="24" height="5" rx="2.5" />
      <rect x="20" y="30" width="24" height="5" rx="2.5" />
      <rect x="20" y="38" width="24" height="5" rx="2.5" />
    </svg>
  ),
  // VIAC — handshake within a chevron
  viac: (
    <svg {...common}>
      <Ring />
      <path d="M18 28l8-4 6 4 6-4 8 4" />
      <path d="M26 24l4 8 4-2 4 4" />
      <path d="M18 28v8" />
      <path d="M46 28v8" />
    </svg>
  ),
  // Ministry of Public Security — shield with a five-pointed star inside
  'bo-cong-an': (
    <svg {...common}>
      <Ring />
      <path d="M32 16l12 4v10c0 8-5 13-12 16-7-3-12-8-12-16V20z" />
      <path d="M32 26l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6z" strokeWidth={1.4} />
    </svg>
  ),
}
