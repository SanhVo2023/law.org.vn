import { cn } from '@/lib/cn'
import { Container } from './Container'

interface SectionProps {
  children: React.ReactNode
  className?: string
  /** Background band. `deep` = alternating surface; `plain` = page bg. */
  tone?: 'plain' | 'deep'
  /** Vertical rhythm. `default` uses the --section-y token; `tight` is half. */
  spacing?: 'default' | 'tight' | 'none'
  /** Draw hairline top + bottom rules (used for banded sections). */
  bordered?: boolean
  /** Container width passed through. */
  width?: 'default' | 'wide' | 'narrow'
  /** Render without the inner Container (caller controls layout). */
  bare?: boolean
  id?: string
}

const SPACING: Record<NonNullable<SectionProps['spacing']>, string> = {
  none: '',
  tight: 'py-[clamp(2.5rem,5vw,4rem)]',
  default: 'py-[var(--section-y)]',
}

/**
 * Page section wrapper. Owns the vertical rhythm and optional banded surface so
 * stacked sections read as distinct blocks instead of one undifferentiated wall.
 */
export function Section({
  children,
  className,
  tone = 'plain',
  spacing = 'default',
  bordered = false,
  width = 'default',
  bare = false,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        SPACING[spacing],
        tone === 'deep' && 'bg-[var(--surface-deep)] dark:bg-[var(--surface-deep)]',
        bordered && 'border-y border-[var(--rule)]',
        className,
      )}
    >
      {bare ? children : <Container width={width}>{children}</Container>}
    </section>
  )
}
