import { Link } from '@/i18n/navigation'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Section } from '@/components/ui/Section'
import { formatEntryDate, draftLabel } from '@/lib/format'

export interface FeaturedEntryItem {
  id: string | number
  slug: string
  title: string
  excerpt?: string
  cluster: string
  clusterLabel: string
  updatedDate?: string
  isDraft?: boolean
}

export function FeaturedEntries({
  eyebrow,
  title,
  lead,
  entries,
  locale,
  emptyMessage,
}: {
  eyebrow: string
  title: string
  lead: string
  entries: FeaturedEntryItem[]
  locale: string
  emptyMessage: string
}) {
  return (
    <Section tone="deep" bordered width="wide">
      <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />

      {entries.length === 0 ? (
        <p className="mt-12 text-center text-[var(--fg-muted)]">{emptyMessage}</p>
      ) : (
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {entries.slice(0, 3).map((e, idx) => (
            <Link
              key={e.id}
              href={`/${e.cluster}/${e.slug}`}
              className="group flex flex-col rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] transition duration-300 fade-up hover:-translate-y-1 hover:border-[var(--color-gold-500)]/40 hover:shadow-[var(--shadow-md)] md:p-7"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--color-gold-600)] dark:text-[var(--color-gold-500)]">
                  {e.clusterLabel}
                </span>
                {e.isDraft && <span className="badge-draft">{draftLabel(locale)}</span>}
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold leading-snug text-[var(--fg)] md:text-xl">
                {e.title}
              </h3>
              {e.excerpt && (
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--fg-muted)] line-clamp-3">
                  {e.excerpt}
                </p>
              )}
              <div className="mt-5 flex items-center justify-between border-t border-[var(--rule)] pt-4 font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)]">
                <span>{formatEntryDate(e.updatedDate, locale)}</span>
                <span className="text-[var(--color-gold-500)] transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Section>
  )
}
