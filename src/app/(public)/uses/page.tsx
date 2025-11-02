import type { Metadata } from 'next'
import { PageTemplate } from '@/components/layout/page-template'
import { Subtitle } from '@/components/subtitle'
import { Title } from '@/components/title'
import { Card } from '@/components/ui/card'
import { VerticalList, VerticalListItem } from '@/components/vertical-list'
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
    <PageTemplate maxWidth="screen-lg" as="article">
      <section aria-labelledby="uses-heading" className="mb-16 text-center">
        <Title id="uses-heading" className="text-center">
          Tools, Apps & Gear
        </Title>
        <Subtitle>
          A curated list of tools, apps, and gear I use daily. Hardware, software,
          and everything that helps me build and stay productive.
        </Subtitle>
      </section>
      <section className="grid w-full auto-rows-auto grid-cols-12 gap-4 md:auto-rows-auto">
        <Card className="col-span-12 md:col-span-12 justify-start!">
          <section aria-labelledby="hardware-heading" className="flex flex-col gap-4 p-4 w-full">
            <h2 id="hardware-heading" className="text-md font-bold ml-2 text-[#4d4357] dark:text-foreground">
              Hardware
            </h2>
            <VerticalList>
              {hardware.map((h) => (
                <VerticalListItem key={h.title}>
                  <span className="text-sm text-muted-foreground p-2">
                    <span className="font-bold text-[#4d4357] dark:text-foreground">{h.title}</span> - {h.description}
                  </span>
                </VerticalListItem>
              ))}
            </VerticalList>
          </section>
        </Card>
        <Card className="col-span-12 md:col-span-12 justify-start!">
          <section aria-labelledby="software-heading" className="flex flex-col gap-4 p-4 w-full">
            <h2 id="software-heading" className="text-md font-bold ml-2 text-[#4d4357] dark:text-foreground">
              Software
            </h2>
            <VerticalList>
              {software.map((s) => (
                <VerticalListItem key={s.title}>
                  <span className="text-sm text-muted-foreground p-2">
                    <span className="font-bold text-[#4d4357] dark:text-foreground">{s.title}</span> - {s.description}
                  </span>
                </VerticalListItem>
              ))}
            </VerticalList>
          </section>
        </Card>
        <Card className="col-span-12 md:col-span-12 justify-start!">
          <section aria-labelledby="tools-heading" className="flex flex-col gap-4 p-4 w-full">
            <h2 id="tools-heading" className="text-md font-bold ml-2 text-[#4d4357] dark:text-foreground">
              Tools
            </h2>
            <VerticalList>
              {tools.map((t) => (
                <VerticalListItem key={t.title}>
                  <span className="text-sm text-muted-foreground p-2">
                    <span className="font-bold text-[#4d4357] dark:text-foreground">{t.title}</span> - {t.description}
                  </span>
                </VerticalListItem>
              ))}
            </VerticalList>
          </section>
        </Card>
      </section>
    </PageTemplate>
  )
}
