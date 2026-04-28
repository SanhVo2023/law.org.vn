'use client'
import { useMemo, useState } from 'react'
import { LEGAL_UPDATES, UPDATE_AREAS, UPDATE_TYPES, getTypeLabel, type LegalUpdate } from '@/lib/updates'

interface UpdatesListProps {
  locale: 'vi' | 'en'
  labels: {
    type: string
    area: string
    issued: string
    issuingBody: string
    sourceLabel: string
    showing: string
    of: string
    none: string
    disclaimer: string
  }
}

export function UpdatesList({ locale, labels }: UpdatesListProps) {
  const [areaFilter, setAreaFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filtered = useMemo(() => {
    return LEGAL_UPDATES.filter((u) => {
      if (areaFilter !== 'all' && u.area !== areaFilter) return false
      if (typeFilter !== 'all' && u.type !== typeFilter) return false
      return true
    })
  }, [areaFilter, typeFilter])

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  return (
    <>
      <div className="border border-[var(--rule)] bg-[var(--bg)] p-5 md:p-6">
        <FilterGroup
          label={labels.type}
          options={UPDATE_TYPES}
          current={typeFilter}
          onChange={setTypeFilter}
          locale={locale}
        />
        <div className="mt-4">
          <FilterGroup
            label={labels.area}
            options={UPDATE_AREAS}
            current={areaFilter}
            onChange={setAreaFilter}
            locale={locale}
          />
        </div>
        <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--fg-muted)]">
          {labels.showing} {filtered.length} {labels.of} {LEGAL_UPDATES.length}
        </p>
      </div>

      <p className="mt-6 text-xs italic text-[var(--fg-muted)]">{labels.disclaimer}</p>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-[var(--fg-muted)]">{labels.none}</p>
      ) : (
        <ol className="mt-6 grid gap-px overflow-hidden rounded-lg border border-[var(--rule)] bg-[var(--rule)]">
          {filtered.map((u, idx) => (
            <li key={u.id} className="bg-[var(--bg)]">
              <UpdateRow
                update={u}
                index={idx + 1}
                locale={locale}
                labels={labels}
                formatDate={formatDate}
              />
            </li>
          ))}
        </ol>
      )}
    </>
  )
}

function FilterGroup({
  label,
  options,
  current,
  onChange,
  locale,
}: {
  label: string
  options: ReadonlyArray<{ key: string; label: { vi: string; en: string } }>
  current: string
  onChange: (key: string) => void
  locale: 'vi' | 'en'
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[0.65rem] uppercase tracking-[0.16em] font-semibold text-[var(--fg-muted)] mr-1 w-full sm:w-auto">
        {label}
      </span>
      {options.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => onChange(opt.key)}
          aria-pressed={current === opt.key}
          className={
            'rounded-full border px-3 py-1 text-xs font-medium transition ' +
            (current === opt.key
              ? 'border-[var(--color-navy-700)] bg-[var(--color-navy-700)] text-white'
              : 'border-[var(--rule)] text-[var(--fg-muted)] hover:border-[var(--color-gold-500)] hover:text-[var(--fg)]')
          }
        >
          {opt.label[locale]}
        </button>
      ))}
    </div>
  )
}

function UpdateRow({
  update,
  index,
  locale,
  labels,
  formatDate,
}: {
  update: LegalUpdate
  index: number
  locale: 'vi' | 'en'
  labels: UpdatesListProps['labels']
  formatDate: (date: string) => string
}) {
  return (
    <article className="group p-6 md:p-7 transition hover:bg-[var(--color-paper-deep)]/60 dark:hover:bg-white/[0.03]">
      <div className="flex items-start gap-4 md:gap-6">
        <span className="font-mono text-xs text-[var(--fg-muted)] tabular-nums pt-1">
          {String(index).padStart(2, '0')}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-[var(--color-navy-700)] px-2 py-0.5 text-[0.62rem] uppercase tracking-[0.14em] text-white">
              {getTypeLabel(update.type, locale)}
            </span>
            <span className="font-mono text-xs text-[var(--color-gold-500)]">{update.number}</span>
          </div>
          <h3 className="mt-3 font-heading text-lg md:text-xl font-semibold leading-snug">
            {update.title[locale]}
          </h3>
          {locale === 'en' && (
            <p className="mt-2 text-xs italic text-[var(--fg-muted)]" lang="vi">
              {update.title.vi}
            </p>
          )}
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)] md:grid-cols-3">
            <div>
              <dt className="text-[0.6rem]">{labels.issued}</dt>
              <dd className="text-[var(--fg)]">{formatDate(update.issuedDate)}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-[0.6rem]">{labels.issuingBody}</dt>
              <dd className="text-[var(--fg)] truncate">{update.issuingBody[locale]}</dd>
            </div>
          </dl>
          <a
            href={update.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-[var(--fg-muted)] hover:text-[var(--color-gold-500)] transition"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M14 4h6v6M20 4l-9 9M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {labels.sourceLabel}
          </a>
        </div>
      </div>
    </article>
  )
}
