import type { Metadata } from 'next'
import { ExploreCategoriesSection } from '@/components/explore-categories-section'
import { LatestArticlesSection } from '@/components/latest-articles-section'
import { PageTemplate } from '@/components/layout/page-template'
import { Subtitle } from '@/components/subtitle'
import { Title } from '@/components/title'
import { TopArticlesSection } from '@/components/top-articles-section'
import { createMetadata } from '@/config'
import { getAllArticleFiles, getAllCategories } from '@/lib/mdx'

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
  const articles = await getAllArticleFiles()
  const categories = await getAllCategories()

  return (
    <PageTemplate as="div" bottomMargin={16}>
      <header>
        <section aria-labelledby="articles-heading" className="mb-32 text-center">
          <Title id="articles-heading" className="text-center">
            Articles & Insights
          </Title>
          <Subtitle>
            Personal thoughts, career stories, and tutorials. My journey through software development and programming.
          </Subtitle>
        </section>

        <TopArticlesSection articles={articles} />

        <ExploreCategoriesSection categories={categories} />

        <LatestArticlesSection articles={articles} />
      </header>
    </PageTemplate>
  )
}
