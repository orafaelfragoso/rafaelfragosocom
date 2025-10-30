import { z } from 'zod'

const urlSchema = z
  .string()
  .refine((url) => {
    try {
      const parsed = new URL(url)
      return parsed.protocol === 'http:' || parsed.protocol === 'https:'
    } catch {
      return false
    }
  })

const navHrefSchema = z
  .string()
  .refine((href) => href.startsWith('/') || href.startsWith('http://') || href.startsWith('https://'), {
    message: 'Navigation href must start with / or be a valid URL',
  })

export const siteConfigSchema = z.object({
  name: z.string().min(1, 'Site name is required'),
  url: urlSchema,
  ogImage: urlSchema,
  description: z.string().min(1, 'Description is required'),
  author: z.object({
    name: z.string().min(1),
    twitter: z.string().min(1),
    email: z.string().email(),
  }),
  links: z.object({
    twitter: urlSchema,
    github: urlSchema,
    linkedin: urlSchema,
  }),
  analytics: z.object({
    plausible: z.object({
      domain: z.string().min(1, 'Analytics domain is required'),
      src: urlSchema,
    }),
  }),
})

const navItemSchema = z.object({
  title: z.string().min(1, 'Navigation title is required'),
  description: z.string().min(1, 'Navigation description is required'),
  href: navHrefSchema,
  icon: z.any(),
})

const socialNavItemSchema = navItemSchema.omit({ description: true })

export const navConfigSchema = z.object({
  main: z.array(navItemSchema).min(1, 'At least one main navigation item is required'),
  social: z.array(socialNavItemSchema).optional(),
})

export const appConfigSchema = z.object({
  name: z.string().min(1),
  version: z.string().min(1),
  theme: z.object({
    defaultTheme: z.enum(['system', 'dark', 'light']),
    enableTransitions: z.boolean(),
  }),
  features: z.object({
    analytics: z.boolean(),
    commandMenu: z.boolean(),
    darkMode: z.boolean(),
  }),
})

export const configSchema = z.object({
  site: siteConfigSchema,
  navigation: navConfigSchema,
  app: appConfigSchema,
})

export function validateConfig(config: unknown) {
  try {
    return configSchema.parse(config)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.issues.map((err) => `${err.path.join('.')}: ${err.message}`).join('\n')
      throw new Error(`Configuration validation failed:\n${formattedErrors}`)
    }
    throw error
  }
}
