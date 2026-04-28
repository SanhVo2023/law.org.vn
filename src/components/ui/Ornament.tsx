import { cn } from '@/lib/cn'

/* Decorative horizontal rule with a small gold diamond center — encyclopedia-style separator. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex items-center justify-center gap-3 text-[var(--color-gold-500)]', className)}
      aria-hidden
    >
      <span className="h-px w-24 bg-current opacity-40" />
      <span className="h-1.5 w-1.5 rotate-45 bg-current" />
      <span className="h-1.5 w-1.5 rotate-45 bg-current opacity-60" />
      <span className="h-1.5 w-1.5 rotate-45 bg-current" />
      <span className="h-px w-24 bg-current opacity-40" />
    </div>
  )
}

/* Subtle dotted/grid corner mark for hero blocks. */
export function CornerMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      className={cn('text-[var(--color-gold-500)]', className)}
    >
      <path d="M0 0 H22 M0 0 V22" stroke="currentColor" strokeWidth="1" />
      <circle cx="0" cy="0" r="1.5" fill="currentColor" />
    </svg>
  )
}
