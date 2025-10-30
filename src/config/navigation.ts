import {
  FolderOpenDot,
  Github,
  Home,
  Linkedin,
  type LucideProps,
  NotebookTabs,
  Rss,
  ToolCase,
  Twitter,
  User,
} from 'lucide-react'
import { siteConfig } from './site'

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

export const navConfig: NavConfig = {
  main: [
    {
      title: 'Home',
      href: '/',
      description: 'Return to the homepage',
      icon: Home,
    },
    {
      title: 'About',
      href: '/about',
      description: 'Learn more about my background and experience',
      icon: User,
    },
    {
      title: 'Uses',
      href: '/uses',
      description: 'See my favorite tools and gear',
      icon: ToolCase,
    },
    {
      title: 'Hire Me',
      href: '/hire-me',
      description: 'Get in touch with opportunities',
      icon: NotebookTabs,
    },
  ],
  social: [
    {
      title: 'Twitter',
      href: siteConfig.links.twitter,
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
  ],
}
