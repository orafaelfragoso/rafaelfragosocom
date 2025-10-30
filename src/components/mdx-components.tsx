import type { MDXComponents } from 'mdx/types'
import { cn } from '@/lib/utils'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => (
      <h1 className={cn('text-4xl font-bold tracking-tight mt-8 mb-4 font-sans', className)} {...props} />
    ),
    h2: ({ className, ...props }) => (
      <h2 className={cn('text-3xl font-bold tracking-tight mt-6 mb-3 font-sans', className)} {...props} />
    ),
    h3: ({ className, ...props }) => (
      <h3 className={cn('text-2xl font-semibold tracking-tight mt-5 mb-2 font-sans', className)} {...props} />
    ),
    h4: ({ className, ...props }) => (
      <h4 className={cn('text-xl font-semibold tracking-tight mt-4 mb-2 font-sans', className)} {...props} />
    ),
    p: ({ className, ...props }) => (
      <p className={cn('text-md text-foreground leading-7 mb-4 font-sans', className)} {...props} />
    ),
    a: ({ className, ...props }) => (
      <a
        className={cn('text-primary underline underline-offset-4 hover:text-primary/80 transition-colors', className)}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul className={cn('list-disc list-inside mb-4 space-y-2 ml-4', className)} {...props} />
    ),
    ol: ({ className, ...props }) => (
      <ol className={cn('list-decimal list-inside mb-4 space-y-2 ml-4', className)} {...props} />
    ),
    li: ({ className, ...props }) => (
      <li className={cn('text-md text-foreground leading-7 font-sans', className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn('border-l-4 border-primary pl-4 py-2 my-4 italic text-muted-foreground', className)}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold', className)}
        {...props}
      />
    ),
    pre: ({ className, ...props }) => (
      <pre className={cn('overflow-x-auto rounded-lg bg-muted p-4 mb-4 font-mono text-sm', className)} {...props} />
    ),
    hr: ({ className, ...props }) => <hr className={cn('my-8 border-t border-border', className)} {...props} />,
    ...components,
  }
}
