import { CalendarDays, FileDown } from 'lucide-react'
import type { Metadata } from 'next'
import { PageTemplate } from '@/components/layout/page-template'
import { Subtitle } from '@/components/subtitle'
import { Title } from '@/components/title'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
    <PageTemplate maxWidth="screen-lg" as="article">
      <section aria-labelledby="hire-me-heading" className="mb-32 text-center">
        <Title id="hire-me-heading" className="text-center">
          Lean Forward. I Got You.
        </Title>
        <Subtitle>
          I have the skills and experience to help you achieve your goals.
          Working on something big? Let's talk.
        </Subtitle>
      </section>
      <section className="flex flex-col gap-4" aria-label="Contact options">
        <section className="grid w-full auto-rows-auto grid-cols-12 gap-4">
          <Card className="col-span-12 md:col-span-6 md:row-span-1">
            <div className="flex flex-col justify-start items-start gap-4 p-4">
              <h2 className="text-md font-semibold text-[#4d4357] dark:text-foreground">Schedule a Meeting</h2>
              <p className="text-sm text-[#4d4357] dark:text-foreground font-body">
                Book a meeting with me so we can get to know each other and discuss your project and how I can help you
                achieve your goals.
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
          </Card>
          <Card className="col-span-12 md:col-span-6 md:row-span-1">
            <div className="flex flex-col justify-start items-start gap-4 p-4">
              <h2 className="text-md font-semibold text-[#4d4357] dark:text-foreground">Download my resume</h2>
              <p className="text-sm text-[#4d4357] dark:text-foreground font-body">
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
          </Card>
        </section>
      </section>
    </PageTemplate>
  )
}
