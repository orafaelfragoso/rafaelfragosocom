import type { Metadata } from 'next'
import Script from 'next/script'

import { ThemeProvider } from '@/components/providers'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://rafaelfragoso.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['Next.js', 'React', 'NodeJS', 'TypeScript', 'Software Development', 'JavaScript'],
  authors: [
    {
      name: 'Rafael Fragoso',
      url: 'https://rafaelfragoso.com',
    },
  ],
  creator: 'Rafael Fragoso',
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
    creator: '@orafaelfragoso',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  // manifest: `${siteConfig.url}/site.webmanifest`,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="container mx-auto flex-1 flex items-center">{children}</div>
              <SiteFooter />
            </div>
          </ThemeProvider>
          <Script
            defer
            data-domain="rafaelfragoso.com"
            src="https://plausible.workbits.io/js/script.outbound-links.js"
          />
        </body>
      </html>
    </>
  )
}
