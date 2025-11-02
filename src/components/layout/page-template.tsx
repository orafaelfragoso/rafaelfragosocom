import { cn } from '@/lib/utils'

interface PageTemplateProps {
  children: React.ReactNode
  gap?: 4 | 8
  bottomMargin?: 4 | 16
  as?: 'main' | 'article' | 'div'
  className?: string
  skipTopMargin?: boolean
}

export function PageTemplate({
  children,
  gap = 4,
  bottomMargin = 4,
  as: Component = 'main',
  className,
  skipTopMargin = false,
}: PageTemplateProps) {
  return (
    <Component className={cn('container mx-auto px-4 max-w-6xl', className)}>
      <div
        className={cn(
          skipTopMargin ? '' : 'mt-16',
          'space-y-6 flex flex-col',
          bottomMargin === 4 ? 'mb-4' : 'mb-16',
          gap === 4 ? 'gap-4' : 'gap-8',
        )}>
        {children}
      </div>
    </Component>
  )
}
