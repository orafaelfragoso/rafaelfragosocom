import { cn } from '@/lib/utils'

interface PageTemplateProps {
  children: React.ReactNode
  maxWidth?: '5xl' | 'screen-lg'
  gap?: 4 | 8
  bottomMargin?: 4 | 16
  as?: 'main' | 'article' | 'div'
  className?: string
}

export function PageTemplate({
  children,
  maxWidth = '5xl',
  gap = 4,
  bottomMargin = 4,
  as: Component = 'main',
  className,
}: PageTemplateProps) {
  return (
    <Component
      className={cn(
        'container mx-auto px-4',
        maxWidth === '5xl' ? 'max-w-5xl' : 'max-w-screen-lg',
        className
      )}>
      <div
        className={cn(
          'mt-16 space-y-6 flex flex-col',
          bottomMargin === 4 ? 'mb-4' : 'mb-16',
          gap === 4 ? 'gap-4' : 'gap-8'
        )}>
        {children}
      </div>
    </Component>
  )
}
