import { cn } from '@/lib/cn'

type CalloutVariant = 'note' | 'definition' | 'caution' | 'methodological'

const VARIANT_STYLES: Record<CalloutVariant, string> = {
  note: 'border-l-[var(--color-navy-700)]/60',
  definition: 'border-l-[var(--color-gold-500)]',
  caution: 'border-l-rose-500/60',
  methodological: 'border-l-emerald-500/60',
}

const VARIANT_LABELS: Record<CalloutVariant, { vi: string; en: string }> = {
  note: { vi: 'Lưu ý', en: 'Note' },
  definition: { vi: 'Định nghĩa', en: 'Definition' },
  caution: { vi: 'Cảnh báo', en: 'Caution' },
  methodological: { vi: 'Ghi chú phương pháp', en: 'Methodological note' },
}

export function Callout({
  variant = 'note',
  title,
  children,
  locale = 'vi',
  className,
}: {
  variant?: CalloutVariant
  title?: string
  children: React.ReactNode
  locale?: string
  className?: string
}) {
  const label =
    title ?? VARIANT_LABELS[variant][locale === 'en' ? 'en' : 'vi']

  return (
    <aside
      className={cn(
        'my-8 border-l-4 bg-[var(--color-paper-deep)]/40 p-5 dark:bg-white/[0.04]',
        VARIANT_STYLES[variant],
        className,
      )}
    >
      <p className="text-[0.65rem] uppercase tracking-[0.16em] font-semibold text-[var(--fg-muted)]">
        {label}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-[var(--fg)]">{children}</div>
    </aside>
  )
}
