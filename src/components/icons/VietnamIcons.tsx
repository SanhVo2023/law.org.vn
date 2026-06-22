import type { ReactNode } from 'react'

/** Five-pointed star (flag motif), centred in a 100×100 box. fill = currentColor. */
export const STAR_PATH =
  'M50 8 L59.87 36.41 L89.94 37.02 L65.98 55.19 L74.69 83.98 L50 66.8 L25.31 83.98 L34.02 55.19 L10.06 37.02 L40.13 36.41 Z'

export function Star({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <path d={STAR_PATH} />
    </svg>
  )
}

const line = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

/** Scales of justice — the law. */
export const IconScales = ({ className }: { className?: string }) => (
  <svg {...line} className={className}>
    <line x1="24" y1="9" x2="24" y2="40" />
    <line x1="12" y1="15" x2="36" y2="15" />
    <line x1="17" y1="40" x2="31" y2="40" />
    <path d="M12 15l-5 10a5 5 0 0 0 10 0z" />
    <path d="M36 15l-5 10a5 5 0 0 0 10 0z" />
    <circle cx="24" cy="9" r="1.4" fill="currentColor" stroke="none" />
  </svg>
)

/** Classical column — the rule of law. */
export const IconColumn = ({ className }: { className?: string }) => (
  <svg {...line} className={className}>
    <path d="M14 16h20" />
    <path d="M14 16c0-2.5 4.5-4 10-4s10 1.5 10 4" />
    <line x1="18" y1="16" x2="18" y2="36" />
    <line x1="24" y1="16" x2="24" y2="36" />
    <line x1="30" y1="16" x2="30" y2="36" />
    <path d="M12 40h24" />
    <path d="M15 36h18" />
  </svg>
)

/** The Constitution — codex with a star on the cover. */
export const IconConstitution = ({ className }: { className?: string }) => (
  <svg {...line} className={className}>
    <path d="M12 12h18a4 4 0 0 1 4 4v22a3 3 0 0 0-3-3H12z" />
    <path d="M34 16a4 4 0 0 1 4-4v23a3 3 0 0 0-3 3" />
    <path d="M22 19l1.5 3 3.3.3-2.5 2.2.8 3.2L22 28.9l-3.1 1.9.8-3.2-2.5-2.2 3.3-.3z" fill="currentColor" stroke="none" />
  </svg>
)

/** Gavel — adjudication. */
export const IconGavel = ({ className }: { className?: string }) => (
  <svg {...line} className={className}>
    <rect x="22" y="9" width="11" height="7" rx="1.5" transform="rotate(45 27.5 12.5)" />
    <line x1="24.5" y1="17" x2="15" y2="26.5" />
    <line x1="30.5" y1="23" x2="21" y2="32.5" />
    <line x1="18" y1="23.5" x2="27.5" y2="33" />
    <path d="M12 38h16" />
    <path d="M16 38v-3h8v3" />
  </svg>
)

/** A small map of orbit icons for the hero. */
export const HERO_ORBIT_ICONS: { key: string; node: ReactNode }[] = [
  { key: 'scales', node: <IconScales /> },
  { key: 'column', node: <IconColumn /> },
  { key: 'constitution', node: <IconConstitution /> },
  { key: 'gavel', node: <IconGavel /> },
]
