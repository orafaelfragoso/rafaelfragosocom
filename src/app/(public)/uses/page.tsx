import type { Metadata } from 'next'
import { PageTemplate } from '@/components/layout/page-template'
import { Subtitle } from '@/components/subtitle'
import { Title } from '@/components/title'
import { createMetadata } from '@/config'

export const metadata: Metadata = createMetadata({
  title: 'Uses',
  description:
    'Discover the tools, apps, and gear I use to build software, stay productive, and create amazing user experiences. Hardware, software, and development tools.',
  alternates: {
    canonical: '/uses',
  },
})

const sections = [
  {
    id: 'hardware',
    title: 'Hardware',
    items: [
      {
        title: 'Mac Mini M4 16GB',
        description: 'My primary development machine.',
        url: '',
      },
      {
        title: 'Monitor Dell de 27" 4K com Hub USB-C P2723QE',
        description: 'Best monitor for development and design work on a budget.',
        url: '',
      },
      {
        title: 'Keyboard Keychron K2 + Dracula themed caps',
        description: 'Comfortable and responsive keyboard for coding.',
        url: '',
      },
      {
        title: 'Mouse Logitech M240',
        description: 'Budget mouse for everyday use.',
        url: '',
      },
      {
        title: 'Webcam Logitech C920',
        description: 'Webcam for video calls.',
        url: '',
      },
    ],
  },
  {
    id: 'software',
    title: 'Software',
    items: [
      {
        title: 'Zed Editor',
        description: 'Super fast and lightweight code editor with a vscode-like experience.',
        url: '',
      },
      {
        title: 'Raycast',
        description: 'A productivity tool for macOS that replaces Spotlight with lots of cool features.',
        url: '',
      },
      {
        title: 'Kitty',
        description: 'The best terminal emulator in my opinion',
        url: '',
      },
      {
        title: 'Figma',
        description: 'Design and prototype user interfaces.',
        url: '',
      },
      {
        title: 'Insomnia',
        description: 'A powerful API client for testing and debugging APIs.',
        url: '',
      },
      {
        title: 'Dia',
        description: 'A AI browser from the same people that made Arc.',
        url: '',
      },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    items: [
      {
        title: 'Tmux',
        description:
          'A terminal multiplexer that allows you to create multiple terminal sessions within a single window.',
        url: '',
      },
      {
        title: 'Neovim',
        description: 'For quick editing and scaffolding.',
        url: '',
      },
      {
        title: 'Docker',
        description: 'For containerization and running things locally.',
        url: '',
      },
      {
        title: 'Gemini CLI',
        description: 'Working with Gemini on projects.',
        url: '',
      },
      {
        title: 'Claude Code',
        description: 'When Gemini is not enough.',
        url: '',
      },
      {
        title: 'Hostinger + Coolify',
        description: 'For hosting and deploying all my projects.',
        url: '',
      },
    ],
  },
]

export default function Uses() {
  return (
    <PageTemplate as="article">
      <section aria-labelledby="uses-heading" className="mb-16 text-center">
        <Title id="uses-heading" className="text-center">
          Tools, Apps & Gear
        </Title>
        <Subtitle>
          A curated list of tools, apps, and gear I use daily. Hardware, software, and everything that helps me build
          and stay productive.
        </Subtitle>
      </section>
      <section
        className="grid w-full auto-rows-auto grid-cols-12 gap-px bg-border/40 border border-border/40 rounded-2xl overflow-hidden text-lg text-black/60 dark:text-white/70 text-pretty"
        style={{ gridAutoRows: 'auto' }}>
        {sections.map((section) => (
          <div key={section.id} className="col-span-12 bg-background">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-border/40">
              <div className="md:col-span-5 bg-background p-6 flex items-start">
                <h2 id={`${section.id}-heading`} className="text-4xl font-light text-dark-purple">
                  {section.title}
                </h2>
              </div>
              <div className="md:col-span-7 bg-background p-6">
                <ul className="flex flex-col gap-6">
                  {section.items.map((item) => (
                    <li key={item.title} className="flex flex-col gap-1">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-normal text-dark-purple dark:text-foreground hover:text-purple-400 dark:hover:text-dark-purple transition-colors">
                        {item.title}
                      </a>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>
    </PageTemplate>
  )
}
