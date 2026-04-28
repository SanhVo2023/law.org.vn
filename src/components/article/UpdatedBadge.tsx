import { cn } from '@/lib/cn'

export function UpdatedBadge({
  date,
  locale,
  label,
  className,
}: {
  date?: string
  locale: string
  label: string
  className?: string
}) {
  if (!date) return null
  const formatted = new Date(date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-[var(--rule)] bg-[var(--color-paper-deep)]/40 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.14em] font-mono text-[var(--fg-muted)] dark:bg-white/[0.04]',
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold-500)]" />
      {label} · {formatted}
    </span>
  )
}
