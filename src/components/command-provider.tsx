'use client'

import { createContext, type ReactNode, useCallback, useEffect, useState } from 'react'

interface CommandContextType {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export const CommandContext = createContext<CommandContextType | undefined>(undefined)

interface CommandProviderProps {
  children: ReactNode
}

export function CommandProvider({ children }: CommandProviderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggle()
      }

      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        close()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, toggle, close])

  // Prevent body scroll when command menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const value = {
    isOpen,
    open,
    close,
    toggle,
  }

  return <CommandContext.Provider value={value}>{children}</CommandContext.Provider>
}
