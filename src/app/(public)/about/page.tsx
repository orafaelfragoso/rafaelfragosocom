import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Activity, Suspense } from 'react'
import { PageTemplate } from '@/components/layout/page-template'
import { StructuredData } from '@/components/structured-data'
import { Subtitle } from '@/components/subtitle'
import { Title } from '@/components/title'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { createMetadata } from '@/config'
import { createBreadcrumbListSchema, createProfilePageSchema } from '@/lib/structured-data'

const Mapbox = dynamic(() => import('@/components/mapbox').then((mod) => mod.Mapbox), {
  loading: () => (
    <div className="flex flex-col gap-4 items-center justify-center min-h-32">
      <Activity aria-label="Loading map">
        <div className="flex-1 rounded-md overflow-hidden min-h-32 bg-muted animate-pulse" />
      </Activity>
    </div>
  ),
})

export const metadata: Metadata = createMetadata({
  title: 'About',
  description:
    "I'm a software engineer from Rio de Janeiro, Brazil. Learn about my journey, my passion for open source, and the tools I use to build great user experiences.",
  alternates: {
    canonical: '/about',
  },
})

export default function About() {
  const structuredData = [createProfilePageSchema(), createBreadcrumbListSchema('/about')]

  return (
    <>
      <StructuredData data={structuredData} />
      <PageTemplate as="article">
        <section aria-labelledby="about-heading" className="mb-16 text-center">
          <Title id="about-heading" className="text-center">
            About Me
          </Title>
          <Subtitle>
            Learn about my personal life, career path, and curiosities. Discover what shaped me into who I am today.
          </Subtitle>
        </section>
        <section className="grid w-full auto-rows-auto grid-cols-12 gap-4 md:auto-rows-auto">
          <Card className="col-span-12 md:col-span-4 md:row-span-2 w-fit">
            <div className="p-4 hidden md:flex items-center justify-center">
              <Image
                src="/profile.webp"
                alt="Rafael Fragoso profile picture"
                className="object-cover rounded-xl"
                width={333}
                height={333}
                sizes="(max-width: 768px) 100vw, 333px"
                priority
              />
            </div>
          </Card>
          <Card className="col-span-12 md:col-span-8 md:row-span-2">
            <div className="p-4 flex flex-col gap-4 flex-1">
              <p className="text-md text-[#4d4357] dark:text-foreground font-body">
                Hey, I'm Rafael Fragoso. I started as a software engineer back in 2007, working with PHP, HTML & CSS.
              </p>
              <p className="text-md text-[#4d4357] dark:text-foreground font-body">
                I'm Brazilian through and through - born and raised in Rio de Janeiro, the wonderful city I'm proud to
                call home. I share my life with my incredible wife and my bright 8-year-old daughter.
              </p>
              <p className="text-md text-[#4d4357] dark:text-foreground font-body">
                I'm passionate about open source projects, crafting great user experiences, and optimizing performance.
                When I'm not working or building something new, you'll find me at the beach, gaming, watching movies, or
                spending quality time with my family.
              </p>
            </div>
          </Card>
          <Card className="col-span-12 md:col-span-6 md:row-span-2">
            <div className="p-4 flex flex-col flex-1 gap-4">
              <Activity>
                <Suspense
                  fallback={
                    <div className="flex flex-col gap-4 items-center justify-center min-h-32">
                      <div className="flex-1 rounded-md overflow-hidden min-h-32 bg-muted animate-pulse" />
                    </div>
                  }>
                  <Mapbox showDistance />
                </Suspense>
              </Activity>
            </div>
          </Card>
          <Card className="col-span-12 md:col-span-6 md:row-span-1">
            <div className="p-4 flex flex-row flex-1 gap-8 items-center relative">
              <div className="w-36 flex flex-col items-center justify-center absolute z-0 -bottom-12 -left-12 rotate-45 opacity-30 select-none">
                <Image
                  src="/workbits.webp"
                  alt="Workbits discord community logo"
                  className="w-full h-full object-cover"
                  width={96}
                  height={96}
                  sizes="96px"
                />
              </div>
              <div className="flex-1 text-md text-[#4d4357] dark:text-foreground font-body z-10 flex flex-col gap-4">
                <p>
                  I run Workbits, a <span className="font-bold">Discord community</span> with over{' '}
                  <span className="font-bold">1,000</span> developers, where we share ideas, help each other, and grow
                  together. No matter your skill level.
                </p>
                <Button variant="secondary" asChild className="hover:cursor-pointer">
                  <a href="https://discord.gg/ZCxMHvTDcH" target="_blank" rel="noopener noreferrer">
                    Join the community
                  </a>
                </Button>
              </div>
            </div>
          </Card>
          <Card className="col-span-12 md:col-span-3 md:row-span-1">
            <div className="flex-1 p-4 flex flex-col items-center justify-center gap-4 text-md text-[#4d4357] dark:text-foreground font-body">
              <p className="text-center">
                I'm <span className="font-bold">176cm</span> tall.
              </p>
              <p className="text-center">
                Not tall enough but not short enough, <span className="font-bold">I'm just the right size</span>.
              </p>
            </div>
          </Card>
          <Card className="col-span-12 md:col-span-3 md:row-span-1">
            <div className="flex-1 p-4 flex flex-col items-center justify-center gap-4 text-md text-[#4d4357] dark:text-foreground font-body">
              <p className="text-center">
                I started coding when I was <span className="font-bold">13 years</span> old.
              </p>
              <p className="text-center">
                Now I'm <span className="font-bold">32</span>. But I look 25.
              </p>
            </div>
          </Card>
        </section>
      </PageTemplate>
    </>
  )
}
