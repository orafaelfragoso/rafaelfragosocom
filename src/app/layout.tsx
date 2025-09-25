import type { Metadata } from 'next'
import Script from 'next/script'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ThemeProvider } from '@/components/providers'
import config from '@/config'
import { fontHeading, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

import './globals.css'

export const metadata: Metadata = config.metadata.default

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(fontSans.variable, fontHeading.variable)}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme={config.app.theme.defaultTheme}
          enableSystem
          disableTransitionOnChange={!config.app.theme.enableTransitions}>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="relative flex flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        {config.app.features.analytics && (
          <Script
            defer
            data-domain={config.site.analytics.plausible.domain}
            src={config.site.analytics.plausible.src}
          />
        )}
      </body>
    </html>
  )
}
