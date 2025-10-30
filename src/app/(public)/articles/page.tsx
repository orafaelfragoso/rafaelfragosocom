import type { Metadata } from 'next'
import Link from 'next/link'
import { ExploreCategories } from '@/components/explore-categories'
import { PageTemplate } from '@/components/layout/page-template'
import { TopArticlesSection } from '@/components/top-articles-section'
import { Subtitle } from '@/components/ui/subtitle'
import { Title } from '@/components/ui/title'
import { VerticalList, VerticalListItem } from '@/components/ui/vertical-list'
import { createMetadata } from '@/config'
import { createDefaultPacks } from '@/lib/articles'
import { formatCategoryName, getCategorySlug } from '@/lib/category'
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
  const latestArticles = articlesWithoutContent.slice(0, 10)

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

        {/* Latest Articles Section */}
        {latestArticles.length > 0 && (
          <section aria-labelledby="latest-articles-heading" className="mb-12">
            <h2
              id="latest-articles-heading"
              className="text-xl font-bold text-[#4d4357] dark:text-foreground mb-4 ml-4">
              Latest Articles
            </h2>
            <VerticalList className="w-full flex">
              {latestArticles.map((article) => {
                const categorySlug = getCategorySlug(article.category)
                const categoryName = formatCategoryName(categorySlug)
                const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })

                return (
                  <VerticalListItem key={article.slug} className="w-full">
                    <Link
                      href={`/articles/${categorySlug}/${article.slug}`}
                      className="block w-full h-32 p-4 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      aria-label={`Read article: ${article.title}`}>
                      <div className="flex flex-col h-full">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-lg font-normal text-[#4d4357] dark:text-foreground flex-1 line-clamp-2">
                            {article.title}
                          </h3>
                          <time
                            dateTime={article.date}
                            className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                            {formattedDate}
                          </time>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2 flex-1">{article.description}</p>
                        <span className="text-xs text-muted-foreground">{categoryName}</span>
                      </div>
                    </Link>
                  </VerticalListItem>
                )
              })}
            </VerticalList>
          </section>
        )}
      </header>
    </PageTemplate>
  )
}
