'use client'

import { createContext, type ReactNode, useCallback, useEffect, useEffectEvent, useState } from 'react'

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

  const handleKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      toggle()
    }

    if (e.key === 'Escape' && isOpen) {
      close()
    }
  })

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

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
