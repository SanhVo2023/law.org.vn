import { Link } from '@/i18n/navigation'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EntryCard } from '@/components/ui/EntryCard'

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
    <section className="border-y border-[var(--rule)] section-paper">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-28">
        <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />

        {entries.length === 0 ? (
          <p className="mt-12 text-center text-[var(--fg-muted)]">{emptyMessage}</p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {entries.slice(0, 6).map((e, idx) => (
              <Link key={e.id} href={`/${e.cluster}/${e.slug}`} className="block fade-up" style={{ animationDelay: `${idx * 0.06}s` }}>
                <article className="h-full border border-[var(--rule)] bg-[var(--bg)] p-6 md:p-7 transition hover:border-[var(--color-gold-500)]/40 hover:shadow-lg hover:shadow-[var(--color-gold-500)]/5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--color-gold-500)]">
                      {e.clusterLabel}
                    </span>
                    {e.isDraft && <span className="badge-draft">Draft</span>}
                  </div>
                  <h3 className="mt-4 font-heading text-lg md:text-xl font-semibold leading-snug">
                    {e.title}
                  </h3>
                  {e.excerpt && (
                    <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)] line-clamp-3">
                      {e.excerpt}
                    </p>
                  )}
                  <div className="mt-5 flex items-center justify-between border-t border-[var(--rule)] pt-4 font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)]">
                    <span>
                      {e.updatedDate
                        ? new Date(e.updatedDate).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
                            year: 'numeric',
                            month: 'short',
                          })
                        : ''}
                    </span>
                    <span className="text-[var(--color-gold-500)] opacity-0 group-hover:opacity-100 transition">
                      →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
