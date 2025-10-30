'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ViewTransitions() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined' || !('startViewTransition' in document)) {
      return
    }

    const startViewTransition = (document as any).startViewTransition
    if (!startViewTransition) {
      return
    }

    // Enable view transitions for Next.js navigation
    // Next.js Link components will automatically trigger view transitions
    // We just need to ensure the API is available
  }, [pathname])

  return null
}

