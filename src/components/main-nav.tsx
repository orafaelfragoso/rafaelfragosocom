'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { navConfig } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link href="/" className="md:mr-6 flex flex-row items-center">
        <Image src="/apple-touch-icon.png" width={38} height={38} alt="Rafael Fragoso" className="mr-2" />
        <span className="hidden font-bold text-lg sm:inline-block break-keep">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {navConfig.main.map((navItem) => (
          <Link
            key={navItem.title}
            href={navItem.href}
            title={navItem.description}
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname === navItem.href ? 'text-foreground' : 'text-foreground/60',
            )}>
            {navItem.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}
