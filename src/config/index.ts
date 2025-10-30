import { env } from './env'
import { createMetadata, defaultMetadata } from './metadata'
import { navConfig } from './navigation'
import { siteConfig } from './site'
import { validateConfig } from './validation'

const app = {
  name: 'Rafael Fragoso Portfolio',
  version: '1.0.0',
  theme: {
    defaultTheme: 'system' as const,
    enableTransitions: false,
  },
  features: {
    analytics: !env.isDev,
    commandMenu: true,
    darkMode: true,
  },
} as const

const configData = {
  site: siteConfig,
  navigation: navConfig,
  app,
} as const

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  validateConfig(configData)
}

export const config = {
  ...configData,
  metadata: {
    create: createMetadata,
    default: defaultMetadata,
  },
  env,
} as const

export default config

export { createMetadata } from './metadata'

export type { NavItem, SocialNavItem } from './navigation'

export type Config = typeof config
export type SiteConfig = typeof config.site
export type NavConfig = typeof config.navigation
export type AppConfig = typeof config.app
export type EnvConfig = typeof config.env
