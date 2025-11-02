import Link from 'next/link'
import { VerticalList, VerticalListItem } from '@/components/vertical-list'
import { formatCategoryName } from '@/lib/articles'
import type { Article } from '@/types/article'

interface LatestArticlesSectionProps {
  articles: Article[]
}

export function LatestArticlesSection({ articles }: LatestArticlesSectionProps) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="latest-articles-heading" className="mb-12">
      <h2 id="latest-articles-heading" className="text-xl font-bold text-[#4d4357] dark:text-foreground mb-4 ml-4">
        Latest Articles
      </h2>
      <VerticalList className="w-full flex">
        {articles.map((article) => {
          const categorySlug = article.category
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
                    <time dateTime={article.date} className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                      {formattedDate}
                    </time>
                  </div>
                  {article.description && (
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2 flex-1">{article.description}</p>
                  )}
                  <span className="text-[10px] uppercase text-muted-foreground">{categoryName}</span>
                </div>
              </Link>
            </VerticalListItem>
          )
        })}
      </VerticalList>
    </section>
  )
}
