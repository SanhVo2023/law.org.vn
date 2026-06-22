import { Link } from '@/i18n/navigation'
import { LEGAL_UPDATES, getTypeLabel } from '@/lib/updates'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { formatEntryDate } from '@/lib/format'

interface RecentUpdatesTeaserProps {
  locale: 'vi' | 'en'
  labels: {
    eyebrow: string
    title: string
    lead: string
    viewAll: string
    issued: string
    issuingBody: string
    commentary: string
  }
}

export function RecentUpdatesTeaser({ locale, labels }: RecentUpdatesTeaserProps) {
  const top5 = [...LEGAL_UPDATES]
    .sort((a, b) => (a.issuedDate < b.issuedDate ? 1 : -1))
    .slice(0, 5)

  const formatDate = (date: string) => formatEntryDate(date, locale, { withDay: true })

  return (
    <Section width="wide">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>{labels.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.1] text-[var(--fg)] md:text-4xl">
            {labels.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--fg-muted)]">{labels.lead}</p>
          <Link
            href="/updates"
            className="mt-7 inline-flex items-center gap-2 border-b border-current pb-1 font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-navy-700)] transition hover:text-[var(--color-gold-500)] dark:text-[var(--color-gold-500)]"
          >
            {labels.viewAll}
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/blog"
            className="mt-4 block text-xs text-[var(--fg-muted)] transition hover:text-[var(--color-gold-500)]"
          >
            {labels.commentary} →
          </Link>
        </div>

        <div className="lg:col-span-8">
          <ol className="grid gap-px overflow-hidden rounded-xl border border-[var(--rule)] bg-[var(--rule)] shadow-[var(--shadow-sm)]">
            {top5.map((u, idx) => {
              const body = (
                <>
                  <span className="pt-1 font-mono text-xs tabular-nums text-[var(--fg-subtle)]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-[var(--color-navy-700)] px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.14em] text-white">
                        {getTypeLabel(u.type, locale)}
                      </span>
                      <span className="font-mono text-xs text-[var(--color-gold-600)] dark:text-[var(--color-gold-500)]">
                        {u.number}
                      </span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-[var(--fg-subtle)]">
                        {formatDate(u.issuedDate)}
                      </span>
                    </div>
                    <p className="mt-2 font-heading text-base font-semibold leading-snug line-clamp-2 text-[var(--fg)] md:text-lg">
                      {u.title[locale]}
                    </p>
                  </div>
                </>
              )
              const cls =
                'group flex items-start gap-4 bg-[var(--surface)] p-5 transition hover:bg-[var(--surface-deep)] md:p-6'
              return (
                <li key={u.id}>
                  {u.sourceUrl ? (
                    <a href={u.sourceUrl} target="_blank" rel="noopener noreferrer" className={cls}>
                      {body}
                      <span
                        aria-hidden
                        className="pt-1 text-[var(--color-gold-500)] opacity-0 transition group-hover:opacity-100"
                      >
                        ↗
                      </span>
                    </a>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </Section>
  )
}
