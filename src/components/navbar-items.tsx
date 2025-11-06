'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useEffectEvent, useState } from 'react'

import { CommandMenu } from '@/components/command-menu'
import { Logo } from '@/components/logo'
import config from '@/config'
import { cn } from '@/lib/utils'

export function NavbarItems() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  const handleScroll = useEffectEvent(() => {
    setIsScrolled(window.scrollY > 0)
  })

  useEffect(() => {
    setMounted(true)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="flex mx-4 mt-4 items-center justify-between relative" aria-label="Main navigation">
      <div
        suppressHydrationWarning
        className={cn(
          'flex items-center gap-4 rounded-xl px-5 py-3 transition-all duration-200',
          mounted &&
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
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative z-10 text-base font-medium text-black/85 dark:text-white/85 hover:opacity-100 cursor-pointer transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
                  isActive ? 'opacity-100' : 'opacity-64',
                )}>
                {page.title}
              </Link>
            )
          })}
        </nav>
      </div>

      <div
        suppressHydrationWarning
        className={cn(
          'flex items-center rounded-xl transition-all duration-200 p-2',
          mounted &&
            isScrolled &&
            'backdrop-blur-xl supports-backdrop-filter:bg-[rgba(0,0,0,0.05)] dark:supports-backdrop-filter:bg-[rgba(255,255,255,0.1)]',
        )}>
        <CommandMenu />
      </div>
    </nav>
  )
}
