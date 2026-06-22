import { cn } from '@/lib/cn'

interface EyebrowProps {
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center'
  /** Symmetric rules on both sides (centered headings). Default shows a single leading gold tick. */
  withRules?: boolean
}

/**
 * Section kicker. Restrained by design: muted uppercase label with a short gold
 * tick — gold is the accent, not the whole word. Keeps the institutional tone
 * from drowning in gold.
 */
export function Eyebrow({ children, className, align = 'left', withRules = false }: EyebrowProps) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2.5 text-[0.68rem] uppercase tracking-[0.22em] font-semibold text-[var(--fg-muted)]',
        align === 'center' && 'justify-center',
        className,
      )}
    >
      <span aria-hidden className="h-px w-6 bg-[var(--color-gold-500)]" />
      <span>{children}</span>
      {withRules && <span aria-hidden className="h-px w-6 bg-[var(--color-gold-500)]" />}
    </p>
  )
}
