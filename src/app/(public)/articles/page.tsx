import type { Metadata } from 'next'
import { ExploreCategories } from '@/components/explore-categories'
import { PageTemplate } from '@/components/layout/page-template'
import { TopArticlesSection } from '@/components/top-articles-section'
import { Subtitle } from '@/components/ui/subtitle'
import { Title } from '@/components/ui/title'
import { createMetadata } from '@/config'
import { createDefaultPacks } from '@/lib/articles'
import { getAllArticles, getAllCategories } from '@/lib/mdx'

export const metadata: Metadata = createMetadata({
  title: 'Articles',
  description:
    'Explore my articles on web development, programming, and technology. Discover useful guides, tutorials, and insights.',
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
          <Title id="articles-heading">Articles & Insights</Title>
          <Subtitle>
            Personal thoughts, career stories, tutorials, and everything in between. My journey through software
            development, programming, and life.
          </Subtitle>
        </section>

        {/* Top Articles */}
        <TopArticlesSection packs={packs} />

        {/* Explore Categories Section */}
        <ExploreCategories articles={articlesWithoutContent} categories={categories} />
      </header>
    </PageTemplate>
  )
}
