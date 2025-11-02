import type React from 'react'
import { cn } from '@/lib/utils'

type TitleProps = React.ComponentProps<'h1'>

export function Title({ children, className, ...props }: TitleProps) {
  return (
    <h1 className={cn('text-4xl md:text-7xl font-light text-dark-purple mb-4', className)} {...props}>
      {children}
    </h1>
  )
}
