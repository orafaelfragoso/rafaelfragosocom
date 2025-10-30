import type { Metadata } from 'next'
import { Title } from '@/components/ui/title'
import { VerticalList, VerticalListItem } from '@/components/ui/vertical-list'
import { createMetadata } from '@/config'

export const metadata: Metadata = createMetadata({
  title: 'Uses',
  description:
    'Discover the tools, apps, and gear I use to build software, stay productive, and create amazing user experiences. Hardware, software, and development tools.',
  alternates: {
    canonical: '/uses',
  },
})

const hardware = [
  {
    title: 'Mac Mini M4 16GB',
    description: 'My primary development machine.',
  },
  {
    title: 'Monitor Dell de 27" 4K com Hub USB-C P2723QE',
    description: 'Best monitor for development and design work on a budget.',
  },
  {
    title: 'Keyboard Keychron K2 + Dracula themed caps',
    description: 'Comfortable and responsive keyboard for coding.',
  },
  {
    title: 'Mouse Logitech M240',
    description: 'Budget mouse for everyday use.',
  },
  {
    title: 'Webcam Logitech C920',
    description: 'Webcam for video calls.',
  },
]

const software = [
  {
    title: 'Zed Editor',
    description: 'Super fast and lightweight code editor with a vscode-like experience.',
  },
  {
    title: 'Raycast',
    description: 'A productivity tool for macOS that replaces Spotlight with lots of cool features.',
  },
  {
    title: 'Kitty',
    description: 'The best terminal emulator in my opinion',
  },
  {
    title: 'Figma',
    description: 'Design and prototype user interfaces.',
  },
  {
    title: 'Insomnia',
    description: 'A powerful API client for testing and debugging APIs.',
  },
  {
    title: 'Dia',
    description: 'A AI browser from the same people that made Arc.',
  },
]

const tools = [
  {
    title: 'Tmux',
    description: 'A terminal multiplexer that allows you to create multiple terminal sessions within a single window.',
  },
  {
    title: 'Neovim',
    description: 'For quick editing and scaffolding.',
  },
  {
    title: 'Docker',
    description: 'For containerization and running things locally.',
  },
  {
    title: 'Gemini CLI',
    description: 'Working with Gemini on projects.',
  },
  {
    title: 'Claude Code',
    description: 'When Gemini is not enough.',
  },
  {
    title: 'Hostinger + Coolify',
    description: 'For hosting and deploying all my projects.',
  },
]

export default function Uses() {
  return (
    <article className="container mx-auto max-w-screen-lg px-4">
      <div className="mt-16 mb-4 space-y-6 flex flex-col gap-4">
        <Title>Tools, Apps & Gear</Title>
        <p className="text-md text-foreground leading-7 font-sans opacity-0 delay-100 animate-fade-blur-in">
          People often ask me about the tools and gear I use to build software, stay productive, or sometimes just
          indulge my love for new gadgets. Whether it's for real work or just a bit of procrastination, here's a curated
          list of my favorite apps, hardware, and resources that help me get things done—or at least feel like I am.
        </p>
        <div className="flex flex-col gap-4 opacity-0 delay-200 animate-fade-blur-in">
          <section aria-labelledby="hardware-heading">
            <h2 id="hardware-heading" className="text-2xl font-bold text-foreground">
              Hardware
            </h2>
            <VerticalList>
              {hardware.map((h) => (
                <VerticalListItem key={h.title}>
                  <span className="text-sm text-foreground p-2">
                    <span className="font-bold">{h.title}</span> - {h.description}
                  </span>
                </VerticalListItem>
              ))}
            </VerticalList>
          </section>
          <section aria-labelledby="software-heading">
            <h2 id="software-heading" className="text-2xl font-bold text-foreground">
              Software
            </h2>
            <VerticalList>
              {software.map((s) => (
                <VerticalListItem key={s.title}>
                  <span className="text-sm text-foreground p-2">
                    <span className="font-bold">{s.title}</span> - {s.description}
                  </span>
                </VerticalListItem>
              ))}
            </VerticalList>
          </section>
          <section aria-labelledby="tools-heading">
            <h2 id="tools-heading" className="text-2xl font-bold text-foreground">
              Tools
            </h2>
            <VerticalList>
              {tools.map((t) => (
                <VerticalListItem key={t.title}>
                  <span className="text-sm text-foreground p-2">
                    <span className="font-bold">{t.title}</span> - {t.description}
                  </span>
                </VerticalListItem>
              ))}
            </VerticalList>
          </section>
        </div>
      </div>
    </article>
  )
}
