import type { MDXComponents } from 'mdx/types'

import { slugify } from '@/lib/articles'
import { cn } from '@/lib/utils'

const extractTextFromChildren = (children: React.ReactNode): string => {
  if (typeof children === 'string') {
    return children
  }
  if (typeof children === 'number') {
    return String(children)
  }
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join(' ')
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return extractTextFromChildren((children as React.ReactElement<{ children: React.ReactNode }>).props.children)
  }
  return ''
}

export const components: MDXComponents = {
  h1: ({ className, children, ...props }) => {
    const textContent = extractTextFromChildren(children)
    const id = textContent ? slugify(textContent) : undefined
    return (
      <h1
        id={id}
        className={cn('text-2xl md:text-3xl font-bold tracking-tight mb-8 font-body text-foreground', className)}
        {...props}>
        {children}
      </h1>
    )
  },
  h2: ({ className, children, ...props }) => {
    const textContent = extractTextFromChildren(children)
    const id = textContent ? slugify(textContent) : undefined
    return (
      <h2
        id={id}
        className={cn('text-xl md:text-2xl font-bold tracking-tight mb-6 font-body text-foreground', className)}
        {...props}>
        {children}
      </h2>
    )
  },
  h3: ({ className, children, ...props }) => {
    const textContent = extractTextFromChildren(children)
    const id = textContent ? slugify(textContent) : undefined
    return (
      <h3
        id={id}
        className={cn('text-lg md:text-xl font-semibold tracking-tight mb-4 font-body text-foreground', className)}
        {...props}>
        {children}
      </h3>
    )
  },
  h4: ({ className, children, ...props }) => {
    const textContent = extractTextFromChildren(children)
    const id = textContent ? slugify(textContent) : undefined
    return (
      <h4
        id={id}
        className={cn('text-base md:text-lg font-semibold tracking-tight mb-3 font-body text-foreground', className)}
        {...props}>
        {children}
      </h4>
    )
  },
  p: ({ className, ...props }) => (
    <p
      className={cn('text-sm md:text-base text-foreground/90 leading-7 md:leading-8 mb-6 font-body', className)}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a
      className={cn(
        'text-primary underline underline-offset-2 decoration-2 hover:text-primary/80 transition-colors',
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => <ul className={cn('list-disc mb-6 space-y-3 ml-6 md:ml-8', className)} {...props} />,
  ol: ({ className, ...props }) => (
    <ol className={cn('list-decimal mb-6 space-y-3 ml-6 md:ml-8', className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li
      className={cn('text-sm md:text-base text-foreground/90 leading-7 md:leading-8 font-body', className)}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn('border-l-4 border-primary pl-4 py-2 mb-6 italic text-muted-foreground font-body', className)}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => <hr className={cn('mb-8 border-t border-border', className)} {...props} />,
}

export function useMDXComponents(): MDXComponents {
  return components
}
