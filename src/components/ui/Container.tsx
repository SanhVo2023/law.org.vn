import { cn } from '@/lib/cn'

type El = 'div' | 'header' | 'section' | 'article' | 'aside'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  /** Content measure. `default` ≈ max-w-6xl (reading-dense pages); `wide` ≈ max-w-7xl (hero/grids). */
  width?: 'default' | 'wide' | 'narrow'
  as?: El
}

const WIDTHS: Record<NonNullable<ContainerProps['width']>, string> = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
}

/**
 * Horizontal page gutter + centered max-width. One source of truth for the
 * content measure so we stop scattering `mx-auto max-w-7xl px-4 md:px-6`.
 */
export function Container({ children, className, width = 'default', as = 'div' }: ContainerProps) {
  const Tag = as
  return <Tag className={cn('mx-auto px-4 md:px-6', WIDTHS[width], className)}>{children}</Tag>
}
