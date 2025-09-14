import { createMetadata, defaultMetadata } from './metadata'
import { navConfig } from './navigation'
import { siteConfig } from './site'

const env = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
} as const

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

export const config = {
  site: siteConfig,
  navigation: navConfig,
  metadata: {
    create: createMetadata,
    default: defaultMetadata,
  },
  app,
  env,
} as const

export default config

export type Config = typeof config
export type SiteConfig = typeof config.site
export type NavConfig = typeof config.navigation
export type AppConfig = typeof config.app
export type EnvConfig = typeof config.env
