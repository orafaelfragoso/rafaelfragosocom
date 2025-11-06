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
        url: 'https://www.amazon.com.br/Apple-2024-n%C3%BAcleos-Mem%C3%B3ria-unificada/dp/B0DLCJXRQV/ref=sr_1_1_sspa?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2EXO30CL0JBCP&dib=eyJ2IjoiMSJ9.1ypFXu-JbhfH4Iv-eAP6YAiLOcHBZMH8H7A2xGuka6kxRtOUtz16IWUWArjVxJLIVyU0EmmFR1NhuwLyR4Qn3phzbmsL5PKEvndYoFoC85ZZnkGxac2NMUxXXV4SgH-UVON_pi3WfBv23kbXLoWXY3DJ6T6XIV0dDFgUNmzzIQ71lDUOiv_yS7Gw3pjR3LwgdBoxBAuO3h2pNA7nqYko0kU4zIjwxDZulNU5V5PCJJFEwfR9JuGtD3LjvMinYqWtxRMT400nUnAnGpE7iLuwFTS2CX49YMcGqlL2fbQGU_A.Ghmyx7PrFGPAg41aalcgOWhncoIlJY010RJKSm_JY1g&dib_tag=se&keywords=mac%2Bmini%2Bm4&qid=1762454035&sprefix=mac%2Bmini%2Bm4%2Caps%2C239&sr=8-1-spons&ufe=app_do%3Aamzn1.fos.25548f35-0de7-44b3-b28e-0f56f3f96147&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1',
      },
      {
        title: 'Monitor Dell de 27" 4K com Hub USB-C P2723QE',
        description: 'Best monitor for development and design work on a budget.',
        url: 'https://www.amazon.com.br/Dell-Pro-27-Plus-Monitor/dp/B0F3SX7N6M/ref=sr_1_5?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3LICJNPCVGBE8&dib=eyJ2IjoiMSJ9.VsMnks2dkeThTwH46P0GLes6c1XMSk8l58lVxjkHSh_HmM__XeVzfDdig5gMGGsqVjjxC031xyT-PSpqFnqe4myix6ok6_XQAuRAoJE4KMr2G2YvwjA9Auz6WphffSrPzQZOuvqY9Wt_Zk-9rT4DKCWluOYrmh9gNdm8MQDomVG4BmA31cEggIPjqA1hBLArC3DQLcCTetjrgquW2k34aeQdmBLGB-RGgVUkRIEjDNMkcfp8GfqG_JUSr0NUhEzxMn286IJpeaNbdM7CC0X2H_krHauan1AvluRhJ8RZVwA.X_XuhCkOgc2tPag1InbI0eirIdBVUI_CjPrYef5-Jrk&dib_tag=se&keywords=monitor+dell+27+4k+p2725qe&qid=1762454094&sprefix=monitor+dell+27+4k+p2725qe%2Caps%2C190&sr=8-5&ufe=app_do%3Aamzn1.fos.25548f35-0de7-44b3-b28e-0f56f3f96147',
      },
      {
        title: 'Keyboard Keychron K2 + Dracula themed caps',
        description: 'Comfortable and responsive keyboard for coding.',
        url: 'https://www.keychron.com/products/keychron-k2-wireless-mechanical-keyboard?srsltid=AfmBOor-YTut-X4visYicXVuKdfwBr4c8jo3lFsd-B8LOs3q-RcwiMZe',
      },
      {
        title: 'Mouse Logitech M240',
        description: 'Budget mouse for everyday use.',
        url: 'https://www.amazon.com.br/Logitech-Bluetooth-Silencioso-Ambidestro-Compat%C3%ADvel/dp/B0DTJKLBBQ/ref=sr_1_5?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=12ELOCH0A7U25&dib=eyJ2IjoiMSJ9.jo8kYrSGKL-obwgoTz_bY9HZIQSNRwryoYjgqKQgKpwzyoyvdheaPtXGwCV7tRFpSu6QPMzzLf3FcIAFukl3NdUHFpchl0mBJskFkoJQTkoyySyOpMleINSFIDcepsx5DySCUMn_rkNyUf4GCUMlwIZj1adoxXx8UeUNBs4uuoOpQ9uHTvkccX_ZEiQpa_LhgcntgXj5V8hVrUUoixxDhudS0oh0btFWfBDAbd369bv8S6JbFFtQ72RMmyFX_uXca4XW5C9vQIDpvp3WtpZApgpAPnS5JSDuPKpwh0afopk.I8U-BniFZL7M_rDTSiZtjV7pYEs09pIgwRQJfka_s9c&dib_tag=se&keywords=logitech%2Bm240&qid=1762454165&sprefix=logitech%2Bm240%2Caps%2C204&sr=8-5&th=1',
      },
      {
        title: 'Webcam Logitech C920',
        description: 'Webcam for video calls.',
        url: 'https://www.amazon.com.br/Chamadas-Grava%C3%A7%C3%B5es-Widescreen-Logitech-Equipamentos/dp/B006JH8T3S/ref=sr_1_7?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1I8SYX4NMH2H9&dib=eyJ2IjoiMSJ9.oChQjJH6sm-SbwW8jcK-mPS5Aq_5Xk1UwuQ4mWyJRqm1xudWhSgjzKhggIwymtKzptU6ZdWlJSFndskYkOGQl5NfOdo4Fl7FlgkXdVnZjoki4wEWM_UKIp8DJN-_72f3ufOvOB7W8nzQx9R5D-6-R6NLhIdjQE4SrSqI_qOh6QJAUxEVi4yNjPKFpdhvkq1uGPzEOOpwwDYKbNQQOTXDno5bnphvMv2qKmgWWzseZ8-nFDiAwluyjaSa7nxYpaRrJpeN7dygP9i_XTpVQiNw5B9QQigSYc6wm-1KiKN1ihg.KEtwjAsQauclzvKQd2DbfXUKtNkxtPw8Z6VmD43_i3Q&dib_tag=se&keywords=logitech+c920+webcam&qid=1762454204&sprefix=logitech+c920+webcam%2Caps%2C198&sr=8-7&ufe=app_do%3Aamzn1.fos.e05b01e0-91a7-477e-a514-15a32325a6d6',
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
        url: 'https://zed.dev/',
      },
      {
        title: 'Raycast',
        description: 'A productivity tool for macOS that replaces Spotlight with lots of cool features.',
        url: 'https://www.raycast.com/',
      },
      {
        title: 'Kitty',
        description: 'The best terminal emulator in my opinion',
        url: 'https://sw.kovidgoyal.net/kitty/',
      },
      {
        title: 'Figma',
        description: 'Design and prototype user interfaces.',
        url: 'https://www.figma.com/',
      },
      {
        title: 'Insomnia',
        description: 'A powerful API client for testing and debugging APIs.',
        url: 'https://www.insomnia.rest/',
      },
      {
        title: 'Dia',
        description: 'A AI browser from the same people that made Arc.',
        url: 'https://www.diabrowser.com/',
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
        url: 'https://github.com/tmux/tmux',
      },
      {
        title: 'Neovim',
        description: 'For quick editing and scaffolding.',
        url: 'https://neovim.io/',
      },
      {
        title: 'Docker',
        description: 'For containerization and running things locally.',
        url: 'https://www.docker.com/',
      },
      {
        title: 'Gemini CLI',
        description: 'Working with Gemini on projects.',
        url: 'https://www.google.com/gemini/',
      },
      {
        title: 'Claude Code',
        description: 'When Gemini is not enough.',
        url: 'https://claude.com/product/claude-code',
      },
      {
        title: 'Hostinger + Coolify',
        description: 'For hosting and deploying all my projects.',
        url: 'https://www.hostinger.com.br/',
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
