'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useEffectEvent, useState } from 'react'

import { CommandMenu } from '@/components/command-menu'
import { Logo } from '@/components/logo'
import config from '@/config'
import { cn } from '@/lib/utils'
import type { Article } from '@/types/article'

interface NavbarItemsProps {
  articles: Article[]
}

export function NavbarItems({ articles }: NavbarItemsProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = useEffectEvent(() => {
    setIsScrolled(window.scrollY > 0)
  })

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="flex mx-4 mt-4 items-center justify-between relative" aria-label="Main navigation">
      <div
        className={cn(
          'flex items-center gap-4 rounded-xl px-5 py-3 transition-all duration-200',
          isScrolled &&
            'backdrop-blur-xl supports-backdrop-filter:bg-[rgba(0,0,0,0.05)] dark:supports-backdrop-filter:bg-[rgba(255,255,255,0.1)]',
        )}>
        <Logo href="/" aria-label="Rafael Fragoso" />
        <nav className="hidden md:flex gap-4" aria-label="Navigation">
          {config.navigation.main.map((page) => {
            const isActive = pathname.includes(page.href)

            return (
              <Link
                key={page.href}
                href={page.href}
                prefetch
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative z-10 text-base font-medium text-black/85 dark:text-white/85 hover:opacity-100 cursor-pointer transition-all duration-200',
                  isActive ? 'opacity-100' : 'opacity-64',
                )}>
                {page.title}
              </Link>
            )
          })}
        </nav>
      </div>

      <div
        className={cn(
          'flex items-center rounded-xl transition-all duration-200 p-2',
          isScrolled &&
            'backdrop-blur-xl supports-backdrop-filter:bg-[rgba(0,0,0,0.05)] dark:supports-backdrop-filter:bg-[rgba(255,255,255,0.1)]',
        )}>
        <CommandMenu articles={articles} />
      </div>
    </nav>
  )
}
