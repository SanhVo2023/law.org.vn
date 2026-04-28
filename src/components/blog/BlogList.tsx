'use client'
import { useMemo, useState } from 'react'
import { BlogCard, type BlogCardItem } from './BlogCard'

const CATEGORIES = ['all', 'commentary', 'case-analysis', 'practice-update', 'policy', 'compliance'] as const

interface BlogListProps {
  posts: BlogCardItem[]
  locale: 'vi' | 'en'
  labels: {
    filterAll: string
    filterCommentary: string
    filterCaseAnalysis: string
    filterPracticeUpdate: string
    filterPolicy: string
    filterCompliance: string
    readingMin: string
    noResults: string
  }
}

export function BlogList({ posts, locale, labels }: BlogListProps) {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return posts
    return posts.filter((p) => p.category === filter)
  }, [posts, filter])

  const labelMap: Record<(typeof CATEGORIES)[number], string> = {
    all: labels.filterAll,
    commentary: labels.filterCommentary,
    'case-analysis': labels.filterCaseAnalysis,
    'practice-update': labels.filterPracticeUpdate,
    policy: labels.filterPolicy,
    compliance: labels.filterCompliance,
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={
              'rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition ' +
              (filter === c
                ? 'border-[var(--color-navy-700)] bg-[var(--color-navy-700)] text-white'
                : 'border-[var(--rule)] text-[var(--fg-muted)] hover:border-[var(--color-gold-500)] hover:text-[var(--fg)]')
            }
          >
            {labelMap[c]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="border border-[var(--rule)] p-10 text-center text-[var(--fg-muted)]">
          {labels.noResults}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              locale={locale}
              readingMinLabel={labels.readingMin}
            />
          ))}
        </div>
      )}
    </>
  )
}
