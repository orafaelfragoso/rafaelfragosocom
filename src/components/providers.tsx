'use client'

import type { ThemeProviderProps } from 'next-themes'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { CommandProvider } from '@/components/command-provider'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <CommandProvider>
        {children}
      </CommandProvider>
    </NextThemesProvider>
  )
}
