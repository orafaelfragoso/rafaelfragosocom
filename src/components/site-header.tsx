import { CommandMenu } from '@/components/command-menu'
import { Icons } from '@/components/icons'
import { MainNav } from '@/components/main-nav'
import { MainNavBorder } from '@/components/main-nav-border'
import { MobileNav } from '@/components/mobile-nav'
import { ModeToggle } from '@/components/mode-toggle'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center">
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0',
                )}>
                <Icons.github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0',
                )}>
                <Icons.linkedin className="h-5 w-5 fill-current" />
                <span className="sr-only">Linkedin</span>
              </div>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
      <MainNavBorder />
    </header>
  )
}
