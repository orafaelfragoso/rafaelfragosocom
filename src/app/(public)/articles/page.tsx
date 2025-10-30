import type { Metadata } from 'next'
import { ExploreCategories } from '@/components/explore-categories'
import { PageTemplate } from '@/components/layout/page-template'
import { TopArticlesSection } from '@/components/top-articles-section'
import { createMetadata } from '@/config'
import { getAllArticles, getAllCategories } from '@/lib/mdx'
import { createDefaultPacks } from '@/lib/articles'

export const metadata: Metadata = createMetadata({
  title: 'Articles',
  description: 'Explore my articles on web development, programming, and technology. Discover useful guides, tutorials, and insights.',
  alternates: {
    canonical: '/articles',
  },
  openGraph: {
    title: 'Articles - Rafael Fragoso',
    description: 'Explore articles on web development, programming, and technology.',
    type: 'website',
  },
})

export default async function ArticlesPage() {
  const articles = await getAllArticles()
  const categories = await getAllCategories()

  const articlesWithoutContent = articles.map(({ content, ...rest }) => rest)
  const packs = createDefaultPacks(articlesWithoutContent)

  return (
    <PageTemplate bottomMargin={16}>
      <header>
        {/* Hero Section */}
        <section aria-labelledby="articles-heading" className="mb-32 text-center">
          <h1 id="articles-heading" className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            See what&apos;s possible
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Articles are shortcuts for your repeatable workflows. Discover and explore the best from the collection.
          </p>
        </section>

        {/* Top Articles */}
        <TopArticlesSection packs={packs} />

        {/* Explore Categories Section */}
        <ExploreCategories articles={articlesWithoutContent} categories={categories} />
      </header>
    </PageTemplate>
  )
}
