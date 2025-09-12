import type { Metadata } from 'next'
import { siteConfig } from './site'

export const createMetadata = (overrides: Partial<Metadata> = {}): Metadata => {
  return {
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: '/',
    },
    title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      'Next.js',
      'React',
      'NodeJS',
      'TypeScript',
      'Software Development',
      'JavaScript',
      'Web Development',
      'Frontend',
      'Backend',
      'Full Stack',
    ],
    authors: [
      {
        name: siteConfig.author.name,
        url: siteConfig.url,
      },
    ],
    creator: siteConfig.author.name,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.author.twitter,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
    ...overrides,
  }
}

export const defaultMetadata = createMetadata()