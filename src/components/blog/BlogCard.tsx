import Image from 'next/image'
import { Link } from '@/i18n/navigation'

export interface BlogCardItem {
  id: string | number
  slug: string
  title: string
  excerpt?: string | null
  category: string
  categoryLabel: string
  publishedAt?: string | null
  readingTimeMin?: number | null
  author?: string | null
  featuredImage?: { url: string; alt?: string | null } | null
  isDraft?: boolean
}

interface BlogCardProps {
  post: BlogCardItem
  locale: 'vi' | 'en'
  readingMinLabel: string
}

export function BlogCard({ post, locale, readingMinLabel }: BlogCardProps) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <article className="group flex flex-col h-full border border-[var(--rule)] bg-[var(--bg)] overflow-hidden hover:border-[var(--color-gold-500)]/40 transition">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/9] bg-[var(--color-paper-deep)] overflow-hidden">
          {post.featuredImage?.url ? (
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt ?? post.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 hero-grid opacity-30" />
          )}
          <div className="absolute top-3 left-3">
            <span className="rounded-sm bg-[var(--color-navy-700)]/95 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-white">
              {post.categoryLabel}
            </span>
          </div>
          {post.isDraft && (
            <div className="absolute top-3 right-3">
              <span className="badge-draft">Draft</span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex-1 flex flex-col p-5 md:p-6">
        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="font-heading text-lg md:text-xl font-semibold leading-snug group-hover:text-[var(--color-gold-500)] transition">
            {post.title}
          </h3>
        </Link>
        {post.excerpt && (
          <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)] line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto pt-5 flex items-center justify-between gap-3 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-[var(--fg-muted)]">
          {date && <span>{date}</span>}
          {post.readingTimeMin ? (
            <span>
              {post.readingTimeMin} {readingMinLabel}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  )
}
