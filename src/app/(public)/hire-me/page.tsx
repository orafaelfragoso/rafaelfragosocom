import { CalendarDays, FileDown } from 'lucide-react'
import type { Metadata } from 'next'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { Button } from '@/components/ui/button'
import { Title } from '@/components/ui/title'
import { createMetadata } from '@/config'

export const metadata: Metadata = createMetadata({
  title: 'Hire Me',
  description:
    "I'm a skilled software engineer looking for new opportunities. Get in touch to discuss your project, download my resume, or schedule a meeting. Open to exciting challenges.",
  alternates: {
    canonical: '/hire-me',
  },
})

export default function HireMe() {
  return (
    <article className="container mx-auto max-w-screen-lg px-4">
      <div className="mt-16 mb-4 space-y-6 flex flex-col gap-4">
        <Title>Lean Forward. I Got You.</Title>
        <p className="text-md text-foreground leading-7 font-sans opacity-0 delay-100 animate-fade-blur-in">
          Do you believe I have the skills and experience to help you achieve your goals? Are you working on the next
          big thing? Are you expanding your business? Let's talk about how I can assist you.
        </p>
        <section className="flex flex-col gap-4 opacity-0 delay-200 animate-fade-blur-in" aria-label="Contact options">
          <BentoGrid>
            <BentoGridItem mdColSpan={6} mdRowSpan={1}>
              <div className="flex flex-col justify-start items-start gap-4 p-4">
                <h2 className="text-md font-semibold text-foreground">Schedule a Meeting</h2>
                <p className="text-sm text-foreground font-sans">
                  Book a meeting with me so we can get to know each other and discuss your project and how I can help
                  you achieve your goals.
                </p>
                <Button
                  variant="link"
                  asChild
                  className="px-1 py-2 h-auto text-purple-600 dark:text-purple-300 hover:bg-transparent hover:text-purple-700 dark:hover:text-purple-400 hover:cursor-pointer hover:no-underline">
                  <a
                    href="mailto:rafaelfragosom@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Send email to schedule a meeting">
                    <CalendarDays aria-hidden="true" />
                    Get in touch
                  </a>
                </Button>
              </div>
            </BentoGridItem>
            <BentoGridItem mdColSpan={6} mdRowSpan={1}>
              <div className="flex flex-col justify-start items-start gap-4 p-4">
                <h2 className="text-md font-semibold text-foreground">Download my resume</h2>
                <p className="text-sm text-foreground font-sans">
                  If you're interested in working together, feel free to download my resume and reach out to me. I'm
                  always open to new opportunities.
                </p>
                <Button
                  variant="link"
                  asChild
                  className="px-1 py-2 h-auto text-purple-600 dark:text-purple-300 hover:bg-transparent hover:text-purple-700 dark:hover:text-purple-400 hover:cursor-pointer hover:no-underline">
                  <a
                    href="https://docs.google.com/document/d/17t93MLoIBZZ9l5xhmQ97t-2vrqhu8Z9n1arefhBLuwU/export?format=pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download resume as PDF">
                    <FileDown aria-hidden="true" />
                    Download now
                  </a>
                </Button>
              </div>
            </BentoGridItem>
          </BentoGrid>
        </section>
      </div>
    </article>
  )
}
