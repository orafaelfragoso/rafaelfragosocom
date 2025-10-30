'use client'

import Link from 'next/link'
import { CommandMenu } from '@/components/command-menu'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import config from '@/config'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 items-center justify-between px-4 relative" aria-label="Main navigation">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-4 ml-2 logo" aria-label={`${config.site.name} - Home`}>
            <span aria-hidden="true">{config.site.name}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu pages={config.navigation.main} />

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          <CommandMenu />
        </div>
      </nav>
    </header>
  )
}
