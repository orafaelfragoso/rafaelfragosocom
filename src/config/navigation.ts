import { Icons } from '@/components/icons'
import { siteConfig } from '@/config/site'

type NavItem = {
  title: string
  description: string
  href: string
}

type SocialNavItem = Omit<NavItem, 'description'> & {
  icon: React.JSXElementConstructor<{ className?: string }>
}

type NavConfig = {
  main: NavItem[]
  social: SocialNavItem[]
}

export const navConfig: NavConfig = {
  main: [],
  social: [
    {
      title: 'X (Twitter)',
      href: siteConfig.links.twitter,
      icon: Icons.twitter,
    },
    {
      title: 'Github',
      href: siteConfig.links.github,
      icon: Icons.github,
    },
    {
      title: 'LinkedIn',
      href: siteConfig.links.linkedin,
      icon: Icons.linkedin,
    },
    {
      title: 'Instagram',
      href: siteConfig.links.instagram,
      icon: Icons.instagram,
    },
    {
      title: 'Discord',
      href: siteConfig.links.discord,
      icon: Icons.discord,
    },
    {
      title: 'Strava',
      href: siteConfig.links.strava,
      icon: Icons.strava,
    },
  ],
}
