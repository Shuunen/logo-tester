import { cva, type VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { slugify } from 'shuutils'
import { cn } from '../../utils/cn'

const paragraphVariants = cva('leading-relaxed', {
  defaultVariants: {
    variant: 'default',
  },
  variants: {
    variant: {
      default: 'text-foreground',
      error: 'text-sm text-destructive',
      muted: 'text-sm text-muted-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
    },
  },
})

type ParagraphProps = VariantProps<typeof paragraphVariants> & {
  children: ReactNode
  className?: string
}

export function Paragraph({ children, variant = 'default', className = '' }: ParagraphProps) {
  const role = variant === 'error' ? 'alert' : undefined
  return (
    <p className={cn(paragraphVariants({ variant }), className)} data-testid={slugify(`paragraph-${variant}`)} role={role}>
      {children}
    </p>
  )
}
