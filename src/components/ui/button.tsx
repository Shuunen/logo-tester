import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import type { ComponentProps } from 'react'
import { slugify } from 'shuutils'
import { cn } from '../../utils/cn'

const buttonVariants = cva(
  'inline-flex w-fit shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:grayscale [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
      },
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
      },
    },
  },
)

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    name: string
  }

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'
  // the testid comes last so a wrapper like TooltipTrigger cannot override the button own testid
  return <Comp className={cn(buttonVariants({ className, size, variant }))} {...props} data-testid={slugify(`button-${props.name}`)} />
}
