import type { MetadataRoute } from 'next'
import config from '@/config'

export default function sitemap(): MetadataRoute.Sitemap {
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

  return staticRoutes
}
