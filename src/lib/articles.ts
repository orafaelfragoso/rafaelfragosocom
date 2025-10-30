import type { ArticleListItem, Pack } from '@/types/article'
import { formatCategoryName, getCategorySlug } from './category'

export const packGradients = [
  'from-blue-200 via-purple-100 to-pink-200', // Light blue to pink
  'from-emerald-500 via-teal-400 to-cyan-500', // Subtle green gradient
  'from-yellow-200 via-yellow-300 to-orange-300', // Yellow to orange
  'from-purple-300 via-purple-200 to-pink-300', // Purple to pink
] as const

export const isLightGradient = (index: number): boolean => {
  return index === 0 || index === 2 || index === 3
}

export const packDescriptions: Record<string, string> = {
  development: 'Essential articles on development to get you started.',
  design: 'Thoughtful design articles built around modern practices.',
  learning: 'Start strong with essential articles made for learning.',
  writing: 'Inspired by great writers, each article helps you improve your craft.',
}

const getPackTitle = (categorySlug: string): string => {
  const formattedName = formatCategoryName(categorySlug)
  const titles: Record<string, string> = {
    development: 'Development Essentials',
    design: 'Design Fundamentals',
    learning: 'Learning Path',
    writing: 'Writing Craft',
  }
  return titles[categorySlug.toLowerCase()] || `${formattedName} Essentials`
}

export function createDefaultPacks(articles: ArticleListItem[]): Pack[] {
  const categories = Array.from(new Set(articles.map((a) => a.category)))
  const categoryMap = new Map<string, ArticleListItem[]>()

  articles.forEach((article) => {
    const categorySlug = getCategorySlug(article.category)
    const existing = categoryMap.get(categorySlug) || []
    categoryMap.set(categorySlug, [...existing, article])
  })

  return categories.slice(0, 4).map((category) => {
    const categorySlug = getCategorySlug(category)
    const categoryArticles = categoryMap.get(categorySlug) || []
    const description =
      packDescriptions[categorySlug.toLowerCase()] ??
      `Essential articles on ${formatCategoryName(categorySlug)} to get you started.`

    const mostRecentArticle = categoryArticles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )[0]

    return {
      title: getPackTitle(categorySlug),
      description,
      author: categorySlug,
      contributors: [],
      category: categorySlug,
      date: mostRecentArticle?.date,
      articleSlug: mostRecentArticle?.slug,
    }
  })
}
