import { NavbarItems } from '@/components/navbar-items'
import { getAllArticleFiles } from '@/lib/mdx'

export async function Navbar() {
  const articles = await getAllArticleFiles()

  return (
    <header className="sticky top-0 z-50 w-full">
      <NavbarItems articles={articles} />
    </header>
  )
}
