import { Eyebrow } from './Eyebrow'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  lead?: string
  align?: 'left' | 'center'
  as?: 'h2' | 'h3'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  as = 'h2',
  className,
}: SectionHeadingProps) {
  const Tag = as
  return (
    <header
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && <Eyebrow align={align} withRules={align === 'center'}>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          'mt-3 font-heading font-bold leading-[1.1] text-[var(--fg)]',
          as === 'h2' ? 'text-3xl md:text-4xl lg:text-[2.6rem]' : 'text-2xl md:text-3xl',
        )}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed text-[var(--fg-muted)]',
            align === 'center' && 'mx-auto',
          )}
        >
          {lead}
        </p>
      )}
      <div
        aria-hidden
        className={cn(
          'mt-6 h-[2px] w-16 bg-[var(--color-gold-500)]',
          align === 'center' && 'mx-auto',
        )}
      />
    </header>
  )
}
