import type React from 'react'
import { cn } from '@/lib/utils'

type SubtitleProps = React.ComponentProps<'p'>

export function Subtitle({ children, className, ...props }: SubtitleProps) {
  return (
    <p
      className={cn('text-xl text-black/60 dark:text-white/70 text-pretty max-w-150 mx-auto text-center', className)}
      {...props}>
      {children}
    </p>
  )
}
