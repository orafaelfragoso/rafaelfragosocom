import type { MetadataRoute } from 'next'
import config from '@/config'
import { getAllArticles, getAllCategories } from '@/lib/mdx'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = config.site.url

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...config.navigation.main
      .filter((route) => route.href !== '/')
      .map((route) => ({
        url: `${baseUrl}${route.href}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route.href === '/about' ? 0.9 : 0.8,
      })),
  ]

  // Add articles index page
  const articlesRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  // Add category pages
  const categories = await getAllCategories()
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/articles/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Add individual article pages
  const articles = await getAllArticles()
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.category}/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...articlesRoutes, ...categoryRoutes, ...articleRoutes]
}
