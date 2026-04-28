import { cn } from '@/lib/cn'

interface EyebrowProps {
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center'
  withRules?: boolean
}

export function Eyebrow({ children, className, align = 'left', withRules = false }: EyebrowProps) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.22em] font-semibold text-[var(--color-gold-500)]',
        align === 'center' && 'justify-center',
        className,
      )}
    >
      {withRules && <span aria-hidden className="h-px w-8 bg-[var(--color-gold-500)]/60" />}
      <span>{children}</span>
      {withRules && <span aria-hidden className="h-px w-8 bg-[var(--color-gold-500)]/60" />}
    </p>
  )
}
