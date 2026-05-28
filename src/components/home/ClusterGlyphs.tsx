import type { ReactNode } from 'react'

/* Inline SVG glyphs for the home "Knowledge Map" cluster cards.
 *
 * Replaces the AI-generated raster glyphs that shipped with a baked-in
 * checkerboard ("fake transparent") background. `stroke="currentColor"` so the
 * colour inherits the parent's gold text class and adapts to light/dark.
 *
 * viewBox 0 0 48 48, ~2px stroke, no fills — truly transparent vector marks.
 */

const base = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const CLUSTER_GLYPHS: Record<string, ReactNode> = {
  // Legal System — Ionic column with a small open codex resting on the capital
  'legal-system': (
    <svg {...base}>
      <path d="M18 16h12" />
      <path d="M18 16c0-2 2.5-3 6-3s6 1 6 3" />
      <line x1="20" y1="16" x2="20" y2="34" />
      <line x1="28" y1="16" x2="28" y2="34" />
      <path d="M16 38h16" />
      <path d="M18 34h12" />
      <path d="M24 13V9m-5 2 5-2 5 2" />
    </svg>
  ),
  // Court System — classical courthouse facade: pediment + columns + base
  'court-system': (
    <svg {...base}>
      <path d="M10 18 24 10l14 8z" />
      <line x1="10" y1="18" x2="38" y2="18" />
      <line x1="14" y1="18" x2="14" y2="34" />
      <line x1="20" y1="18" x2="20" y2="34" />
      <line x1="28" y1="18" x2="28" y2="34" />
      <line x1="34" y1="18" x2="34" y2="34" />
      <line x1="10" y1="38" x2="38" y2="38" />
      <line x1="12" y1="34" x2="36" y2="34" />
    </svg>
  ),
  // Litigation — briefcase with a dossier of papers protruding from the top
  litigation: (
    <svg {...base}>
      <path d="M20 16v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M24 16v-2h6v4" />
      <rect x="10" y="18" width="28" height="18" rx="2" />
      <line x1="10" y1="26" x2="38" y2="26" />
      <rect x="21" y="23" width="6" height="6" rx="1" />
    </svg>
  ),
  // Rights — heraldic shield with an open hand over the heart
  rights: (
    <svg {...base}>
      <path d="M24 10l12 4v8c0 8-5 13-12 16-7-3-12-8-12-16v-8z" />
      <path d="M24 20v8" />
      <path d="M21 22v6m6-6v6m-3-8v8" />
      <path d="M21 28h6" />
    </svg>
  ),
  // Terminology — open dictionary with page volume and a ribbon bookmark
  terminology: (
    <svg {...base}>
      <path d="M24 16c-4-3-9-3-13-1v18c4-2 9-2 13 1" />
      <path d="M24 16c4-3 9-3 13-1v18c-4-2-9-2-13 1" />
      <line x1="24" y1="16" x2="24" y2="34" />
      <path d="M30 14v7l2-2 2 2v-7" />
    </svg>
  ),
  // FAQ — question mark within a circular laurel wreath
  faq: (
    <svg {...base}>
      <path d="M16 34c-5-2-7-7-6-13" />
      <path d="M32 34c5-2 7-7 6-13" />
      <path d="M20 20a4 4 0 1 1 5 4c-1 .7-1.5 1.5-1.5 3" strokeWidth={2.2} />
      <circle cx="23.5" cy="32" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
}
