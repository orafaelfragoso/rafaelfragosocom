import { CardStack } from '@/components/ui/card-stack'
import { formatCategoryName } from '@/lib/articles'
import { getGradient } from '@/lib/gradients'
import { cn } from '@/lib/utils'
import type { Article } from '@/types/article'

interface TopArticlesSectionProps {
  articles: Article[]
}

export function TopArticlesSection({ articles }: TopArticlesSectionProps) {
  if (articles.length < 4) {
    return null
  }

  return (
    <section aria-labelledby="top-articles-heading" className="mb-32">
      <h2 id="top-articles-heading" className="sr-only">
        Featured Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {articles.slice(0, 4).map((article, index) => (
          <CardStack
            key={`${article.slug}-${index}`}
            stackVariant={(index + 1) as 1 | 2 | 3 | 4}
            href={`/articles/${article.category}/${article.slug}`}
            className={cn(getGradient(article.category).background, getGradient(article.category).text)}>
            <div className="flex flex-col gap-4 h-full min-h-full">
              <h3 className="text-3xl font-medium line-clamp-4">{article.title}</h3>
              <p className="text-base line-clamp-4">{article.description}</p>
              <div className="mt-auto flex flex-col">
                <span className="text-xs lowercase">{formatCategoryName(article.category)}</span>
              </div>
            </div>
          </CardStack>
        ))}
      </div>
    </section>
  )
}
