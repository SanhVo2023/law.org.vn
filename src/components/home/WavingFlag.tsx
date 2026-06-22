import { cn } from '@/lib/cn'
import { STAR_PATH } from '@/components/icons/VietnamIcons'

/**
 * Vietnamese national flag (cờ đỏ sao vàng) on a short gold pole, gently waving.
 * The wave is the `.flag-wave` CSS animation (disabled under prefers-reduced-motion).
 * Colours are flag-accurate hex (red #DA251D, gold #FFCD00).
 */
export function WavingFlag({ className }: { className?: string }) {
  return (
    <div className={cn('relative aspect-[3/2]', className)} aria-hidden>
      <span className="absolute inset-y-0 left-0 z-10 w-[3px] rounded-full bg-gradient-to-b from-[var(--color-gold-400)] to-[var(--color-gold-600)]" />
      <span className="absolute -top-1 left-[-2px] z-10 h-2.5 w-2.5 rounded-full bg-[var(--color-gold-400)]" />
      <div className="flag-wave ml-[3px] h-full">
        <svg viewBox="0 0 90 60" preserveAspectRatio="none" className="block h-full w-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]" role="img" aria-label="Quốc kỳ Việt Nam">
          <defs>
            <linearGradient id="flagFold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#000" stopOpacity="0.2" />
              <stop offset="0.22" stopColor="#fff" stopOpacity="0.14" />
              <stop offset="0.46" stopColor="#000" stopOpacity="0.12" />
              <stop offset="0.7" stopColor="#fff" stopOpacity="0.1" />
              <stop offset="1" stopColor="#000" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="90" height="60" rx="1.5" fill="#DA251D" />
          <g transform="translate(45,30) scale(0.34) translate(-50,-50)">
            <path d={STAR_PATH} fill="#FFCD00" />
          </g>
          <rect x="0" y="0" width="90" height="60" rx="1.5" fill="url(#flagFold)" />
        </svg>
      </div>
    </div>
  )
}
