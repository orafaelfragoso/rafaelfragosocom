import { Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import { siteConfig } from './site'

export type NavItem = {
  title: string
  description: string
  href: string
}

export type SocialNavItem = Omit<NavItem, 'description'> & {
  icon: React.JSXElementConstructor<{ className?: string }>
}

export type NavConfig = {
  main: NavItem[]
  social: SocialNavItem[]
}

export const navConfig: NavConfig = {
  main: [],
  social: [
    {
      title: 'X',
      href: siteConfig.links.x,
      icon: Twitter,
    },
    {
      title: 'Github',
      href: siteConfig.links.github,
      icon: Github,
    },
    {
      title: 'LinkedIn',
      href: siteConfig.links.linkedin,
      icon: Linkedin,
    },
    {
      title: 'Instagram',
      href: siteConfig.links.instagram,
      icon: Instagram,
    },
  ],
}
