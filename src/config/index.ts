import type { AppConfigType, ConfigDataType, SiteConfigType } from '@/types/config'

import { env } from './env'
import { createMetadata, defaultMetadata } from './metadata'
import { navConfig } from './navigation'
import { siteConfig } from './site'

const app: AppConfigType = {
  name: 'Rafael Fragoso Portfolio',
  version: '1.0.0',
  theme: {
    defaultTheme: 'system',
    enableTransitions: false,
  },
  features: {
    analytics: !env.isDev,
    commandMenu: true,
    darkMode: true,
  },
}

// TypeScript will validate structure matches types at compile time
const configData: ConfigDataType = {
  site: siteConfig satisfies SiteConfigType,
  navigation: navConfig,
  app,
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

export type { NavConfig, NavItem, SocialNavItem } from '@/types/config'
export { createMetadata } from './metadata'

export type Config = typeof config
export type SiteConfig = typeof config.site
export type AppConfig = typeof config.app
export type EnvConfig = typeof config.env
