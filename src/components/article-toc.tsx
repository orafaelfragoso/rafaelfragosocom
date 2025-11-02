'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface Heading {
  id: string
  text: string
  level: number
}

interface ArticleTOCProps {
  initialHeadings?: Heading[]
  className?: string
}

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const getUniqueId = (text: string, existingIds: Set<string>): string => {
  const baseId = slugify(text)
  let id = baseId
  let counter = 1

  while (existingIds.has(id)) {
    id = `${baseId}-${counter}`
    counter++
  }

  existingIds.add(id)
  return id
}

export function ArticleTOC({ initialHeadings = [], className }: ArticleTOCProps) {
  const [headings, setHeadings] = useState<Heading[]>(initialHeadings)
  const [activeId, setActiveId] = useState<string>(initialHeadings.length > 0 ? initialHeadings[0].id : '')

  useEffect(() => {
    if (initialHeadings.length > 0) {
      initialHeadings.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element && !element.id) {
          element.id = heading.id
        }
      })
      return
    }

    const extractHeadings = () => {
      const articleElement = document.querySelector(`[itemprop="articleBody"]`)
      if (!articleElement) return

      const headingElements = articleElement.querySelectorAll('h1, h2, h3, h4, h5, h6')
      const extractedHeadings: Heading[] = []
      const existingIds = new Set<string>()

      headingElements.forEach((element) => {
        const text = element.textContent || ''
        if (!text.trim()) return

        const level = parseInt(element.tagName.substring(1), 10)
        const id = getUniqueId(text, existingIds)

        if (!element.id) {
          element.id = id
        } else {
          const existingId = element.id
          if (existingIds.has(existingId)) {
            element.id = getUniqueId(text, existingIds)
          } else {
            existingIds.add(existingId)
          }
        }

        extractedHeadings.push({
          id: element.id,
          text,
          level,
        })
      })

      setHeadings(extractedHeadings)
      if (extractedHeadings.length > 0) {
        setActiveId(extractedHeadings[0].id)
      }
    }

    const timeoutId = setTimeout(extractHeadings, 100)

    const observer = new MutationObserver(extractHeadings)
    const articleElement = document.querySelector(`[itemprop="articleBody"]`)
    if (articleElement) {
      observer.observe(articleElement, {
        childList: true,
        subtree: true,
      })
    }

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [initialHeadings])

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map((h) => ({
        id: h.id,
        element: document.getElementById(h.id),
      }))

      let currentActiveId = ''

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const { element, id } = headingElements[i]
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            currentActiveId = id
            break
          }
        }
      }

      if (!currentActiveId && headingElements.length > 0) {
        currentActiveId = headingElements[0].id
      }

      setActiveId(currentActiveId)
    }

    if (headings.length > 0) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [headings])

  const handleHeadingClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      setActiveId(id)
    }
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <aside
      className={cn(
        'hidden lg:block w-56 shrink-0 sticky top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto',
        'text-sm pr-8',
        className,
      )}
      aria-label="Table of contents">
      <nav>
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">Contents</h2>
        <ul className="space-y-1.5">
          {headings.map((heading) => {
            const isActive = activeId === heading.id
            const indentClass =
              heading.level === 1
                ? 'pl-0'
                : heading.level === 2
                  ? 'pl-3'
                  : heading.level === 3
                    ? 'pl-6'
                    : heading.level === 4
                      ? 'pl-9'
                      : 'pl-12'

            return (
              <li key={heading.id} className={indentClass}>
                <button
                  type="button"
                  onClick={() => handleHeadingClick(heading.id)}
                  className={cn(
                    'text-left w-full py-1 px-2 rounded-md transition-colors text-xs',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    'cursor-pointer',
                    isActive ? 'text-purple-400' : 'text-muted-foreground hover:text-purple-400',
                  )}
                  aria-current={isActive ? 'location' : undefined}>
                  {heading.text}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
