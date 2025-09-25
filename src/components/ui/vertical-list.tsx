'use client'

import { useCallback, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type VerticalListProps = {
  children: React.ReactNode
  className?: string
}

type VerticalListItemProps = {
  children: React.ReactNode
  className?: string
  asChild?: boolean
} & React.ComponentPropsWithoutRef<'div'>

export function VerticalList({ children, className }: VerticalListProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLSpanElement>(null)
  const rafRef = useRef<number | null>(null)
  const isHighlightVisibleRef = useRef(false)

  const updateHighlightPosition = useCallback((target: HTMLElement, shouldAnimate = true) => {
    const list = listRef.current
    const highlight = highlightRef.current
    if (!list || !highlight) return

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      const listItem = target.hasAttribute?.('data-list-item') ? target : target.closest('[data-list-item]') || target
      const rect = listItem.getBoundingClientRect()
      const listRect = list.getBoundingClientRect()

      if (shouldAnimate) {
        highlight.style.transition = 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)'
      } else {
        highlight.style.transition = 'none'
      }

      highlight.style.transform = `translate(${rect.left - listRect.left}px, ${rect.top - listRect.top}px) scale(1)`
      highlight.style.width = `${rect.width}px`
      highlight.style.height = `${rect.height}px`
      highlight.style.opacity = '1'

      isHighlightVisibleRef.current = true
    })
  }, [])

  const hideHighlightPosition = useCallback(() => {
    const highlight = highlightRef.current
    if (!highlight) return

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      highlight.style.transition = 'opacity 250ms ease-out'
      highlight.style.opacity = '0'
      isHighlightVisibleRef.current = false
    })
  }, [])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!listRef.current) return

    const listItems = Array.from(listRef.current.children) as HTMLElement[]
    const focusableItems = listItems
      .map((li) => {
        const focusable = li.querySelector('a, button, [tabindex]:not([tabindex="-1"])')
        return focusable as HTMLElement
      })
      .filter(Boolean)

    const currentIndex = document.activeElement ? focusableItems.indexOf(document.activeElement as HTMLElement) : -1

    let nextIndex = currentIndex

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        nextIndex = currentIndex < focusableItems.length - 1 ? currentIndex + 1 : 0
        break
      case 'ArrowUp':
        event.preventDefault()
        nextIndex = currentIndex > 0 ? currentIndex - 1 : focusableItems.length - 1
        break
      case 'Home':
        event.preventDefault()
        nextIndex = 0
        break
      case 'End':
        event.preventDefault()
        nextIndex = focusableItems.length - 1
        break
      default:
        return
    }

    const nextItem = focusableItems[nextIndex]
    if (nextItem) {
      nextItem.focus()
    }
  }, [])

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const listItems = Array.from(list.children) as HTMLElement[]

    const handleMouseEnter = (e: Event) => {
      const shouldAnimate = isHighlightVisibleRef.current
      updateHighlightPosition(e.target as HTMLElement, shouldAnimate)
    }

    const handleMouseLeave = () => {
      hideHighlightPosition()
    }

    const handleFocus = (e: Event) => {
      const shouldAnimate = isHighlightVisibleRef.current
      updateHighlightPosition(e.target as HTMLElement, shouldAnimate)
    }

    const handleBlur = () => {
      hideHighlightPosition()
    }

    listItems.forEach((listItem) => {
      listItem.addEventListener('mouseenter', handleMouseEnter, { passive: true })
      listItem.addEventListener('mouseleave', handleMouseLeave, { passive: true })

      const focusableElements = listItem.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
      focusableElements.forEach((element) => {
        element.addEventListener('focus', handleFocus, { passive: true })
        element.addEventListener('blur', handleBlur, { passive: true })
      })
    })
    list.addEventListener('keydown', handleKeyDown)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      listItems.forEach((listItem) => {
        listItem.removeEventListener('mouseenter', handleMouseEnter)
        listItem.removeEventListener('mouseleave', handleMouseLeave)

        const focusableElements = listItem.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
        focusableElements.forEach((element) => {
          element.removeEventListener('focus', handleFocus)
          element.removeEventListener('blur', handleBlur)
        })
      })

      list.removeEventListener('keydown', handleKeyDown)
    }
  }, [updateHighlightPosition, hideHighlightPosition, handleKeyDown])

  return (
    <div ref={listRef} className={cn('relative inline-flex flex-col items-start ml-4', className)}>
      {children}
      <span
        className="absolute bg-purple-300/20 rounded opacity-0 pointer-events-none"
        style={{ transform: 'translate(0, 0) scale(0.95)' }}
        ref={highlightRef}
        aria-hidden="true"
      />
    </div>
  )
}

export function VerticalListItem({ children, className, asChild, ...props }: VerticalListItemProps) {
  if (asChild) {
    return <>{children}</>
  }

  return (
    <div className={cn('inline-block w-auto', className)} data-list-item {...props}>
      {children}
    </div>
  )
}
