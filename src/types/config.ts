import type { LucideProps } from 'lucide-react'

// Navigation Types
export type NavItem = {
  title: string
  description: string
  href: string
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
}

export type SocialNavItem = Omit<NavItem, 'description'> & {
  icon: React.JSXElementConstructor<{ className?: string }>
}

export type NavConfig = {
  main: NavItem[]
  social: SocialNavItem[]
}

// Site Configuration Types
export type SiteConfigType = {
  readonly name: string
  readonly url: string
  readonly ogImage: string
  readonly description: string
  readonly author: {
    readonly name: string
    readonly twitter: string
    readonly email: string
  }
  readonly links: {
    readonly twitter: string
    readonly github: string
    readonly linkedin: string
  }
  readonly analytics: {
    readonly plausible: {
      readonly domain: string
      readonly src: string
    }
  }
}

// App Configuration Types
export type AppConfigType = {
  readonly name: string
  readonly version: string
  readonly theme: {
    readonly defaultTheme: 'system' | 'dark' | 'light'
    readonly enableTransitions: boolean
  }
  readonly features: {
    readonly analytics: boolean
    readonly commandMenu: boolean
    readonly darkMode: boolean
  }
}

// Combined Config Type
export type ConfigDataType = {
  readonly site: SiteConfigType
  readonly navigation: NavConfig
  readonly app: AppConfigType
}
