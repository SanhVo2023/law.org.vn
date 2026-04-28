import { Link } from '@/i18n/navigation'
import type { BlogCardItem } from './BlogCard'

interface RelatedPostsProps {
  posts: BlogCardItem[]
  title: string
  locale: 'vi' | 'en'
}

export function RelatedPosts({ posts, title, locale }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-16 border-t border-[var(--rule)] pt-10">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-500)] font-semibold">
        {title}
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((p) => {
          const date = p.publishedAt
            ? new Date(p.publishedAt).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
                year: 'numeric',
                month: 'short',
              })
            : null
          return (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="group block border border-[var(--rule)] p-5 transition hover:border-[var(--color-gold-500)]/50"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--color-gold-500)]">
                {p.categoryLabel}
              </p>
              <p className="mt-3 font-heading font-semibold leading-snug">{p.title}</p>
              {date && <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[var(--fg-muted)]">{date}</p>}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
