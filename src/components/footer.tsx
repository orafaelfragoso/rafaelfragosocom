import { config } from '@/config'

export function Footer() {
  const socialItems = config.navigation.social

  return (
    <footer className="flex w-full h-32 pointer-events-none overflow-hidden relative northern-lights">
      <nav
        className="absolute bottom-4 left-0 w-full h-full flex justify-center items-end space-x-6 pointer-events-none select-none"
        aria-label="Social links">
        {socialItems.map((item) => (
          <a
            key={item.href}
            className="flex items-center gap-2 p-2 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors duration-200 ease-in-out pointer-events-auto"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.title}>
            <span>{item.title}</span>
          </a>
        ))}
      </nav>
    </footer>
  )
}
