import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { TopArticlesSection } from '@/components/top-articles-section'
import { Title } from '@/components/ui/title'
import { VerticalList } from '@/components/ui/vertical-list'
import { createMetadata } from '@/config'
import { createDefaultPacks } from '@/lib/articles'
import { formatCategoryName, getCategorySlug } from '@/lib/category'
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
  const categorySlug = getCategorySlug(category)
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
  const categorySlug = getCategorySlug(category)
  const articles = await getArticlesByCategory(categorySlug)

  if (articles.length === 0) {
    notFound()
  }

  const categoryName = formatCategoryName(categorySlug)
  const packs = createDefaultPacks(articles)

  return (
    <main className="container mx-auto max-w-5xl px-4">
      <header className="mt-16 mb-4 space-y-6 flex flex-col gap-4">
        <nav aria-label="Breadcrumb" className="text-sm">
          <ol className="flex items-center gap-2 text-muted-foreground">
            <li>
              <Link href="/articles" className="hover:text-foreground transition-colors">
                Articles
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground" aria-current="page">
              {categoryName}
            </li>
          </ol>
        </nav>
        <section aria-labelledby="category-heading">
          <Title id="category-heading">{categoryName} Articles</Title>
          <p className="text-md text-foreground leading-7 font-sans opacity-0 delay-100 animate-fade-blur-in">
            Explore all articles about {categoryName} and related topics.
          </p>
        </section>
        <div className="opacity-0 delay-200 animate-fade-blur-in">
          <TopArticlesSection packs={packs} />
        </div>
        <div className="flex flex-col gap-4 opacity-0 delay-300 animate-fade-blur-in">
          <VerticalList>
            {articles.map((article) => (
              <div key={article.slug}></div>
            ))}
          </VerticalList>
          <nav aria-label="Category navigation">
            <Link
              href="/articles"
              className="text-sm text-primary hover:underline inline-block mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded"
              aria-label="Go back to all articles">
              ← Back to all articles
            </Link>
          </nav>
        </div>
      </header>
    </main>
  )
}
