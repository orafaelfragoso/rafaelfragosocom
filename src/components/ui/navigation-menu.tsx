'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useEffectEvent, useRef } from 'react'
import colors from 'tailwindcss/colors'
import { Highlighter } from '@/components/ui/highlighter'
import type { NavItem } from '@/config/navigation'
import { cn } from '@/lib/utils'

type NavbarProps = {
  pages: NavItem[]
}

export function NavigationMenu({ pages }: NavbarProps) {
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const rafRef = useRef<number | null>(null)
  const isLineVisibleRef = useRef(false)

  const updateLinePosition = useEffectEvent((target: HTMLElement, shouldAnimate = true) => {
    const nav = navRef.current
    const line = lineRef.current
    if (!nav || !line) return

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      const rect = target.getBoundingClientRect()
      const navRect = nav.getBoundingClientRect()

      if (shouldAnimate) {
        line.style.transition = 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
      } else {
        line.style.transition = 'none'
      }

      line.style.transform = `translateX(${rect.left - navRect.left}px) scale(1)`
      line.style.width = `${rect.width}px`
      line.style.opacity = '1'

      isLineVisibleRef.current = true
    })
  })

  const hideLinePosition = useEffectEvent(() => {
    const line = lineRef.current
    if (!line) return

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      line.style.transition = 'opacity 250ms ease-out'
      line.style.opacity = '0'
      isLineVisibleRef.current = false
    })
  })

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const links = nav.querySelectorAll('[data-nav-link]')

    const handleMouseEnter = (e: Event) => {
      const shouldAnimate = isLineVisibleRef.current
      updateLinePosition(e.target as HTMLElement, shouldAnimate)
    }

    const handleMouseLeave = () => {
      hideLinePosition()
    }

    links.forEach((link) => {
      link.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    })

    nav.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleMouseEnter)
      })
      nav.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <nav className="hidden md:flex justify-center absolute left-1/2 translate-x-[-50%]" aria-label="Navigation">
      <div className="flex relative" ref={navRef}>
        {pages.map((page) => {
          const isActive = pathname === page.href

          return (
            <Link
              key={page.href}
              href={page.href}
              data-nav-link
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'relative z-10 px-4 py-3 text-xs uppercase font-medium cursor-pointer transition-colors duration-200',
                'text-foreground/60 hover:text-foreground/80 no-underline',
                isActive && 'text-foreground/80',
              )}>
              {isActive ? (
                <Highlighter action="underline" color={colors.purple[400]}>
                  {page.title}
                </Highlighter>
              ) : (
                page.title
              )}
            </Link>
          )
        })}
        <span
          className="absolute inset-y-0 bg-purple-300/20 rounded opacity-0 pointer-events-none"
          style={{ transform: 'translateX(0) scale(0.95)' }}
          ref={lineRef}
          aria-hidden="true"
        />
      </div>
    </nav>
  )
}
