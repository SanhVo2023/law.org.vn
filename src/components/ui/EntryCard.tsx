import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { cn } from '@/lib/cn'

interface EntryCardProps {
  href: string
  title: string
  excerpt?: string
  cluster?: string
  updatedDate?: string
  image?: { src: string; width: number; height: number; alt: string }
  number?: number
  variant?: 'default' | 'feature' | 'compact'
  className?: string
  locale?: string
  isDraft?: boolean
}

export function EntryCard({
  href,
  title,
  excerpt,
  cluster,
  updatedDate,
  image,
  number,
  variant = 'default',
  className,
  locale = 'vi',
  isDraft,
}: EntryCardProps) {
  const formattedDate = updatedDate
    ? new Date(updatedDate).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
        year: 'numeric',
        month: 'short',
      })
    : null

  if (variant === 'feature' && image) {
    return (
      <Link
        href={href}
        className={cn(
          'group block overflow-hidden rounded-lg border border-[var(--rule)] bg-[var(--bg)] transition hover:border-[var(--color-gold-500)]/40 hover:shadow-lg hover:shadow-[var(--color-gold-500)]/5',
          className,
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-paper-deep)]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {cluster && (
            <span className="absolute left-3 top-3 rounded bg-[var(--color-navy-700)] px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-white">
              {cluster}
            </span>
          )}
        </div>
        <div className="p-5 md:p-6">
          {isDraft && <span className="badge-draft mb-2">Draft</span>}
          <h3 className="font-heading text-lg md:text-xl font-semibold leading-snug">{title}</h3>
          {excerpt && (
            <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)] line-clamp-3">{excerpt}</p>
          )}
          {formattedDate && (
            <p className="mt-4 font-mono text-xs uppercase tracking-wider text-[var(--fg-muted)]">
              {formattedDate}
            </p>
          )}
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        'group block bg-[var(--bg)] p-6 md:p-7 transition hover:bg-[var(--color-paper-deep)]/60 dark:hover:bg-white/[0.03]',
        className,
      )}
    >
      <div className="flex items-baseline justify-between gap-4">
        {number !== undefined && (
          <span className="font-mono text-xs text-[var(--fg-muted)]">
            {String(number).padStart(2, '0')}
          </span>
        )}
        {cluster && (
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[var(--color-gold-500)]">
            {cluster}
          </span>
        )}
        <span className="ml-auto text-[var(--color-gold-500)] opacity-0 transition group-hover:opacity-100">
          →
        </span>
      </div>
      <h3
        className={cn(
          'mt-3 font-heading font-semibold leading-snug',
          variant === 'compact' ? 'text-base md:text-lg' : 'text-xl',
        )}
      >
        {title}
      </h3>
      {excerpt && (
        <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)] line-clamp-3">{excerpt}</p>
      )}
      <div className="mt-4 flex items-center gap-3 text-xs font-mono text-[var(--fg-muted)] uppercase tracking-wider">
        {isDraft && <span className="badge-draft">Draft</span>}
        {formattedDate && <span>{formattedDate}</span>}
      </div>
    </Link>
  )
}
