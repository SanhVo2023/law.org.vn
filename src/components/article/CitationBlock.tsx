'use client'
import { useState } from 'react'

interface CitationBlockProps {
  title: string
  url: string
  publishedDate?: string
  updatedDate?: string
  locale: string
  labels: {
    citeAs: string
    plain: string
    bibtex: string
    copy: string
    copied: string
  }
}

function plainCitation(p: CitationBlockProps) {
  const author = 'law.org.vn'
  const year = (p.updatedDate || p.publishedDate || new Date().toISOString()).slice(0, 4)
  const accessed = new Date().toISOString().slice(0, 10)
  return p.locale === 'vi'
    ? `${author}. (${year}). "${p.title}". law.org.vn. Truy cập ${accessed}. ${p.url}`
    : `${author}. (${year}). "${p.title}". law.org.vn. Accessed ${accessed}. ${p.url}`
}

function bibtexCitation(p: CitationBlockProps) {
  const year = (p.updatedDate || p.publishedDate || new Date().toISOString()).slice(0, 4)
  const key = p.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32)
  return `@misc{laworgvn-${key}-${year},
  author = {{law.org.vn}},
  title  = {${p.title}},
  year   = {${year}},
  url    = {${p.url}},
  note   = {Accessed ${new Date().toISOString().slice(0, 10)}}
}`
}

export function CitationBlock(props: CitationBlockProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [tab, setTab] = useState<'plain' | 'bibtex'>('plain')

  const text = tab === 'plain' ? plainCitation(props) : bibtexCitation(props)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(tab)
      setTimeout(() => setCopied(null), 2000)
    } catch {}
  }

  return (
    <section className="no-print mt-12 border border-[var(--rule)] bg-[var(--color-paper-deep)]/30 p-5 dark:bg-white/[0.03]">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[var(--color-gold-500)]">
          {props.labels.citeAs}
        </p>
        <div className="flex gap-1 text-xs">
          {(['plain', 'bibtex'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={
                'px-2.5 py-1 rounded transition uppercase tracking-wider ' +
                (tab === t
                  ? 'bg-[var(--color-navy-700)] text-white'
                  : 'text-[var(--fg-muted)] hover:text-[var(--fg)]')
              }
            >
              {t === 'plain' ? props.labels.plain : props.labels.bibtex}
            </button>
          ))}
        </div>
      </header>
      <pre className="mt-3 whitespace-pre-wrap font-mono text-xs leading-relaxed text-[var(--fg)]">
        {text}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-[var(--rule)] px-3 py-1 text-xs uppercase tracking-wider text-[var(--fg-muted)] hover:border-[var(--color-gold-500)] hover:text-[var(--fg)] transition"
      >
        {copied === tab ? props.labels.copied : props.labels.copy}
      </button>
    </section>
  )
}
