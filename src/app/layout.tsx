import Script from 'next/script'

import { ThemeProvider } from '@/components/providers'
import config from '@/config'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

import './globals.css'

export const metadata = config.metadata.default

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme={config.app.theme.defaultTheme}
          enableSystem
          disableTransitionOnChange={!config.app.theme.enableTransitions}>
          {children}
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
