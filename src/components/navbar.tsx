'use client'

import Link from 'next/link'
import { CommandMenu } from '@/components/command-menu'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import config from '@/config'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 items-center justify-between px-4 relative">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-4 ml-2 logo">
            {config.site.name}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu pages={config.navigation.main} />

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          <CommandMenu />
        </div>
      </div>
    </header>
  )
}
