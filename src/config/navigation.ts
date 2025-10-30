import { Github, Home, Linkedin, NotebookTabs, ToolCase, Twitter, User, FileText } from 'lucide-react'
import type { NavConfig } from '@/types/config'
import { siteConfig } from './site'

export type { NavConfig, NavItem, SocialNavItem } from '@/types/config'

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
      title: 'Articles',
      href: '/articles',
      description: 'Read my articles on web development and programming',
      icon: FileText,
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
