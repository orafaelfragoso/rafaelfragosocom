import { navConfig } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import type { NavItem } from '@/types/config'
import type { StructuredData } from '@/types/structured-data'

export type { StructuredData } from '@/types/structured-data'

export function createPersonSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    url: siteConfig.url,
    email: siteConfig.author.email,
    sameAs: [siteConfig.links.twitter, siteConfig.links.github, siteConfig.links.linkedin],
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  }
}

export function createWebsiteSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
  }
}

export function createProfilePageSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': `${siteConfig.url}#person`,
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
  }
}

export function createBreadcrumbListSchema(currentPath: string, navItems: NavItem[] = navConfig.main): StructuredData {
  const baseUrl = siteConfig.url
  const pathSegments = currentPath.split('/').filter(Boolean)
  const breadcrumbs = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
  ]

  if (pathSegments.length > 0) {
    pathSegments.forEach((segment, index) => {
      const navItem = navItems.find((item) => {
        const itemPath = item.href.split('/').filter(Boolean)
        return itemPath.length > 0 && itemPath[itemPath.length - 1] === segment
      })

      if (navItem) {
        breadcrumbs.push({
          '@type': 'ListItem',
          position: index + 2,
          name: navItem.title,
          item: `${baseUrl}${navItem.href}`,
        })
      }
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs,
  }
}

export function createOrganizationSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/apple-touch-icon.png`,
    sameAs: [siteConfig.links.twitter, siteConfig.links.github, siteConfig.links.linkedin],
  }
}
