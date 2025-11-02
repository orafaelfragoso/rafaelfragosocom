import Link from 'next/link'
import { formatCategoryName } from '@/lib/articles'

interface ExploreCategoriesProps {
  categories: string[]
}

export function ExploreCategoriesSection({ categories }: ExploreCategoriesProps) {
  if (categories.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="explore-categories-heading" className="mb-32">
      <h2 className="text-4xl font-light text-dark-purple mb-16 text-center">Explore Categories</h2>

      <nav aria-label="Article categories navigation" className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
        {categories.map((category) => {
          const categorySlug = category
          const categoryName = formatCategoryName(categorySlug)

          return (
            <Link
              key={categorySlug}
              href={`/articles/${categorySlug}`}
              prefetch
              className="inline-flex items-center justify-center px-4 py-2 uppercase text-black/60 dark:text-white/60 bg-dark-purple/20 hover:bg-purple-100 dark:hover:bg-dark-purple/50 rounded-lg text-xs font-medium transition-colors focus-visible:outline-none"
              aria-label={`Browse ${categoryName} articles`}>
              {categoryName}
            </Link>
          )
        })}
      </nav>
    </section>
  )
}
