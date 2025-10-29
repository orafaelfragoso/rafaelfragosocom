import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import { navConfig } from '@/config/navigation'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...navConfig.main
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
