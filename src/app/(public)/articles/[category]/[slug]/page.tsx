import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllArticlePaths, getArticleBySlug } from '@/lib/mdx'
import { Title } from '@/components/ui/title'
import { cn } from '@/lib/utils'
import { createMetadata } from '@/config'
import { formatCategoryName, getCategorySlug } from '@/lib/category'

interface ArticlePageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  const paths = await getAllArticlePaths()
  return paths
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params
  const article = await getArticleBySlug(category, slug)

  if (!article) {
    return createMetadata({
      title: 'Article Not Found',
      robots: {
        index: false,
        follow: false,
      },
    })
  }

  const categorySlug = getCategorySlug(article.category)
  const categoryName = formatCategoryName(categorySlug)

  return createMetadata({
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/articles/${categorySlug}/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author || 'Rafael Fragoso'],
      tags: article.tags,
      url: `/articles/${categorySlug}/${article.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
    keywords: article.tags,
  })
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params
  const categorySlug = getCategorySlug(category)
  const article = await getArticleBySlug(categorySlug, slug)

  if (!article) {
    notFound()
  }

  const categoryName = formatCategoryName(categorySlug)

  // Import components directly for server component usage
  const mdxComponents = {
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1
        className={cn('text-4xl font-bold tracking-tight mt-8 mb-4 font-sans', className)}
        {...props}
      />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className={cn('text-3xl font-bold tracking-tight mt-6 mb-3 font-sans', className)}
        {...props}
      />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        className={cn('text-2xl font-semibold tracking-tight mt-5 mb-2 font-sans', className)}
        {...props}
      />
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p
        className={cn('text-md text-foreground leading-7 mb-4 font-sans', className)}
        {...props}
      />
    ),
    a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a
        className={cn(
          'text-primary underline underline-offset-4 hover:text-primary/80 transition-colors',
          className
        )}
        {...props}
      />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className={cn('list-disc list-inside mb-4 space-y-2 ml-4', className)} {...props} />
    ),
    ol: ({ className, ...props }: React.OlHTMLAttributes<HTMLOListElement>) => (
      <ol className={cn('list-decimal list-inside mb-4 space-y-2 ml-4', className)} {...props} />
    ),
    li: ({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
      <li className={cn('text-md text-foreground leading-7 font-sans', className)} {...props} />
    ),
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <code
        className={cn(
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
          className
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
      <pre
        className={cn('overflow-x-auto rounded-lg bg-muted p-4 mb-4 font-mono text-sm', className)}
        {...props}
      />
    ),
  }

  return (
    <main className="container mx-auto max-w-screen-lg px-4">
      <article itemScope itemType="https://schema.org/BlogPosting" className="mt-16 mb-4 space-y-6 flex flex-col gap-4">
        <header className="flex flex-col gap-2 opacity-0 delay-100 animate-fade-blur-in">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex items-center gap-2 text-muted-foreground">
              <li>
                <Link
                  href="/articles"
                  className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded">
                  Articles
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/articles/${categorySlug}`}
                  className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded">
                  {categoryName}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground line-clamp-1" aria-current="page" itemProp="name">
                {article.title}
              </li>
            </ol>
          </nav>
          <Title itemProp="headline">{article.title}</Title>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <time itemProp="datePublished" dateTime={article.date}>
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {article.author && (
              <span itemProp="author" itemScope itemType="https://schema.org/Person">
                <span itemProp="name" className="sr-only">
                  {article.author}
                </span>
              </span>
            )}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2" aria-label="Article tags">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    itemProp="keywords"
                    className="px-2 py-1 rounded bg-muted text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>
        <div
          itemProp="articleBody"
          className="prose prose-neutral dark:prose-invert max-w-none opacity-0 delay-200 animate-fade-blur-in">
          <MDXRemote source={article.content} components={mdxComponents} />
        </div>
        <footer className="flex flex-col gap-4 opacity-0 delay-300 animate-fade-blur-in">
          <hr className="border-t border-border" aria-hidden="true" />
          <nav aria-label="Article navigation">
            <ul className="flex flex-row gap-4 flex-wrap">
              <li>
                <Link
                  href={`/articles/${categorySlug}`}
                  className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded"
                  aria-label={`Browse more ${categoryName} articles`}>
                  ← More {categoryName} articles
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded"
                  aria-label="Browse all articles">
                  All articles →
                </Link>
              </li>
            </ul>
          </nav>
        </footer>
      </article>
    </main>
  )
}

