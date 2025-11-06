import { cacheLife } from 'next/cache'
import { NavbarItems } from '@/components/navbar-items'

export async function Navbar() {
  'use cache'
  cacheLife('hours')

  return (
    <header className="sticky top-0 z-50 w-full">
      <NavbarItems />
    </header>
  )
}
