import { cva, type VariantProps } from 'class-variance-authority'
import type { JSX, ReactNode } from 'react'
import { slugify } from 'shuutils'
import { cn } from '../../utils/cn'
import { getNodeText } from '../../utils/node-text'

const titleVariants = cva('font-semibold tracking-tight', {
  defaultVariants: {
    level: 1,
    variant: 'default',
  },
  variants: {
    level: {
      1: 'text-2xl font-bold',
      2: 'text-xl',
      3: 'text-base font-semibold',
      4: 'text-base',
    },
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
    },
  },
})

type TitleProps = VariantProps<typeof titleVariants> & {
  children: ReactNode
  className?: string
  // oxlint-disable-next-line no-magic-numbers
  level?: 1 | 2 | 3 | 4
}

export function Title({ children, level = 1, variant = 'default', className = '' }: TitleProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  return (
    <Tag className={cn(titleVariants({ level, variant }), className)} data-testid={slugify(`title-${getNodeText(children)}`)}>
      {children}
    </Tag>
  )
}
