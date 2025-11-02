import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'

import { ArticleTOC } from '@/components/article-toc'
import { Button } from '@/components/ui/button'
import { createMetadata } from '@/config'
import { formatCategoryName, slugify } from '@/lib/articles'
import { getGradient } from '@/lib/gradients'
import { getAllArticleFiles, getArticleBySlug } from '@/lib/mdx'
import { cn } from '@/lib/utils'
import { components } from '@/mdx-components'

interface ArticlePageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  return await getAllArticleFiles()
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return createMetadata({
      title: 'Article Not Found',
      robots: {
        index: false,
        follow: false,
      },
    })
  }

  return createMetadata({
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/articles/${article.category}/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author || 'Rafael Fragoso'],
      tags: article.tags,
      url: `/articles/${article.category}/${article.slug}`,
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
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const categoryName = formatCategoryName(article.category)
  const gradient = getGradient(article.category)
  const headings = article.content
    .split('\n')
    .filter((line) => /^#{1,6}\s/.test(line))
    .map((line) => {
      const match = /^#{1,6}/.exec(line)
      const level = match ? match[0].length : 1
      const text = line.replace(/^#{1,6}\s/, '').trim()
      return {
        id: slugify(text),
        text,
        level,
      }
    })

  return (
    <>
      <section
        className={cn(
          'flex-1 relative z-40 mt-4 mx-4 rounded-[2.4rem] bg-linear-to-br',
          gradient.background,
          gradient.text,
        )}
        aria-labelledby="article-hero-title">
        <div className="w-full px-12 py-12 md:py-32 md:px-12 lg:py-40 lg:px-4">
          <div className="max-w-6xl mx-auto">
            <header className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-medium uppercase tracking-wider">{categoryName}</span>
                <h1
                  id="article-hero-title"
                  itemProp="headline"
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight font-body leading-tight">
                  {article.title}
                </h1>
              </div>
              {article.description && (
                <p className="text-sm md:text-base max-w-3xl leading-normal">{article.description}</p>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs uppercase tracking-wider">
                <time itemProp="datePublished" dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </header>
          </div>
        </div>
      </section>

      <div className="relative pt-16 w-full">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="lg:flex lg:items-start lg:gap-12">
            <ArticleTOC initialHeadings={headings} />

            <article itemScope itemType="https://schema.org/BlogPosting" className="flex-1 min-w-0">
              <div itemProp="articleBody" className="prose prose-neutral dark:prose-invert max-w-none">
                <MDXRemote
                  source={article.content}
                  components={components}
                  options={{
                    mdxOptions: {
                      rehypePlugins: [
                        [
                          rehypePrettyCode,
                          {
                            theme: 'dracula',
                            keepBackground: true,
                          },
                        ],
                      ],
                    },
                  }}
                />
              </div>
              <footer className="flex flex-col gap-4 mt-8 mb-30">
                <hr className="border-t border-border" />
                <nav aria-label="Article navigation" className="flex justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/articles" aria-label="Go back to all articles">
                      ← Back to all articles
                    </Link>
                  </Button>
                </nav>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </>
  )
}
