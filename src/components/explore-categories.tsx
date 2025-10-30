import Link from 'next/link'
import { formatCategoryName, getCategorySlug } from '@/lib/category'
import type { ArticleListItem } from '@/types/article'

interface ExploreCategoriesProps {
  articles: ArticleListItem[]
  categories: string[]
}

export function ExploreCategories({ categories }: ExploreCategoriesProps) {
  if (categories.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="explore-categories-heading" className="mb-12">
      <h2 id="explore-categories-heading" className="text-4xl font-normal text-foreground mb-16 text-center">
        Explore Categories
      </h2>

      <nav aria-label="Article categories navigation" className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => {
          const categorySlug = getCategorySlug(category)
          const categoryName = formatCategoryName(categorySlug)

          return (
            <Link
              key={categorySlug}
              href={`/articles/${categorySlug}`}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-muted text-foreground hover:bg-foreground hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`Browse ${categoryName} articles`}>
              {categoryName}
            </Link>
          )
        })}
      </nav>
    </section>
  )
}
