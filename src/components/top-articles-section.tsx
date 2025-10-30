import type { Pack } from '@/types/article'
import { TopArticlesCard } from './top-articles-card'

interface TopArticlesSectionProps {
  packs: Pack[]
}

export function TopArticlesSection({ packs }: TopArticlesSectionProps) {
  if (packs.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="top-articles-heading" className="mb-32">
      <h2
        id="top-articles-heading"
        className="text-2xl font-bold text-[#4d4357] dark:text-foreground mb-16 text-center">
        Top articles
      </h2>
      <nav aria-label="Featured article collections" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {packs.map((pack, index) => (
          <TopArticlesCard key={`${pack.category}-${index}`} pack={pack} index={index} />
        ))}
      </nav>
    </section>
  )
}
