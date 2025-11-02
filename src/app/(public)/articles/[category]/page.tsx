import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { LatestArticlesSection } from '@/components/latest-articles-section'
import { PageTemplate } from '@/components/layout/page-template'
import { Subtitle } from '@/components/subtitle'
import { Title } from '@/components/title'
import { TopArticlesSection } from '@/components/top-articles-section'
import { Button } from '@/components/ui/button'
import { createMetadata } from '@/config'
import { formatCategoryName } from '@/lib/articles'
import { getAllCategories, getArticlesByCategory } from '@/lib/mdx'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    category,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const categorySlug = category
  const categoryName = formatCategoryName(categorySlug)

  return createMetadata({
    title: `${categoryName} Articles`,
    description: `Browse articles about ${categoryName} and related topics. Explore curated content on ${categoryName.toLowerCase()}.`,
    alternates: {
      canonical: `/articles/${categorySlug}`,
    },
    openGraph: {
      title: `${categoryName} Articles - Rafael Fragoso`,
      description: `Browse articles about ${categoryName} and related topics.`,
      type: 'website',
    },
  })
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const articles = await getArticlesByCategory(category)

  if (articles.length === 0) {
    notFound()
  }

  const categoryName = formatCategoryName(category)

  return (
    <PageTemplate>
      <header>
        <section aria-labelledby="category-heading" className="mb-32 text-center">
          <Title id="category-heading">{categoryName} Articles</Title>
          <Subtitle>Explore all articles about {categoryName} and related topics.</Subtitle>
        </section>
        <div className="flex flex-col gap-4">
          <TopArticlesSection articles={articles} />
          <LatestArticlesSection articles={articles} />

          <nav aria-label="Category navigation" className="flex justify-center mt-4">
            <Button variant="outline" asChild>
              <Link href="/articles" aria-label="Go back to all articles">
                ← Back to all articles
              </Link>
            </Button>
          </nav>
        </div>
      </header>
    </PageTemplate>
  )
}
