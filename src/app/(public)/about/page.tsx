import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Suspense } from 'react'

import { PageTemplate } from '@/components/layout/page-template'
import { StructuredData } from '@/components/structured-data'
import { Subtitle } from '@/components/subtitle'
import { Title } from '@/components/title'
import { createMetadata } from '@/config'
import { createBreadcrumbListSchema, createProfilePageSchema } from '@/lib/structured-data'

const Mapbox = dynamic(() => import('@/components/mapbox').then((mod) => mod.Mapbox))
const LocationDistance = dynamic(() => import('@/components/location-distance').then((mod) => mod.LocationDistance))

export const metadata: Metadata = createMetadata({
  title: 'About',
  description:
    "I'm a software engineer from Rio de Janeiro, Brazil. Learn about my journey, my passion for open source, and the tools I use to build great user experiences.",
  alternates: {
    canonical: '/about',
  },
})

export default async function About() {
  'use cache'

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
        <section
          className="grid w-full auto-rows-auto grid-cols-12 gap-px bg-border/40 border border-border/40 rounded-2xl overflow-hidden text-lg text-black/60 dark:text-white/70 text-pretty"
          style={{ gridAutoRows: 'auto' }}>
          <div className="col-span-12 md:col-span-4 md:row-span-2 bg-background">
            <div className="flex items-center justify-center w-full h-full">
              <Image
                src="/profile.webp"
                alt="Rafael Fragoso profile picture"
                className="object-cover w-full h-full"
                width={333}
                height={333}
                sizes="(max-width: 768px) 100vw, 333px"
                priority
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 md:row-span-2 bg-background">
            <div className="p-6 flex flex-col flex-1 gap-2">
              <p>
                Hey there! I'm Rafael Fragoso, a software engineer who's been crafting digital experiences since 2007.
                My journey began with PHP, HTML & CSS, and it's been an incredible ride ever since.
              </p>
              <p>
                Born and raised in Rio de Janeiro—the marvelous city I proudly call home—I'm Brazilian through and
                through. I share my life with my amazing wife and our brilliant 8-year-old daughter, who keeps reminding
                me what truly matters.
              </p>
              <p>
                I'm deeply passionate about open source, creating intuitive user experiences, and pushing the boundaries
                of web performance. When I'm not coding or tinkering with new projects, you'll find me enjoying the
                beach, diving into games, watching movies, or simply savoring quality moments with my family.
              </p>
              <p>
                I also run Workbits, a thriving{' '}
                <a
                  href="https://discord.gg/ZCxMHvTDcH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-dark-purple">
                  Discord community
                </a>{' '}
                with over <span className="font-bold text-dark-purple">1,000</span> developers. It's a welcoming space
                where we share knowledge, support each other's growth, and build meaningful connections—regardless of
                experience level.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 md:row-span-1 bg-background order-3 md:order-0">
            <div className="flex-1 p-6 flex flex-col items-center justify-center gap-4 text-md">
              <p>
                Standing at <span className="font-bold">176cm</span> tall.{' '}
                <span className="font-bold">Perfectly average</span>—not too tall, not too short. Just right for
                reaching the keyboard comfortably.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 md:row-span-3 bg-background order-5 md:order-0">
            <div className="flex flex-col w-full h-full min-h-[400px] md:min-h-0">
              <Suspense
                fallback={
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="w-full h-full bg-muted animate-pulse" />
                  </div>
                }>
                <Mapbox />
              </Suspense>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 md:row-span-1 bg-background order-4 md:order-0">
            <div className="flex-1 p-6 flex flex-col items-center justify-center gap-4 text-md">
              <p>
                Been coding since I was <span className="font-bold">13 years old</span>. Now{' '}
                <span className="font-bold">32</span>, with <span className="font-bold">19 years</span> of experience.
                Still feel like I'm learning something new every day.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 md:row-span-1 bg-background order-6 md:order-0">
            <div className="flex-1 p-6 flex flex-col justify-center text-md">
              <Suspense fallback={<div className="animate-pulse">Loading location...</div>}>
                <LocationDistance />
              </Suspense>
            </div>
          </div>
        </section>
      </PageTemplate>
    </>
  )
}
