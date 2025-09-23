import dynamic from 'next/dynamic'
import Image from 'next/image'
import { AuroraText } from '@/components/ui/aurora-text'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { Button } from '@/components/ui/button'

const Mapbox = dynamic(() => import('@/components/mapbox').then((mod) => mod.Mapbox))

export default function About() {
  return (
    <div className="container mx-auto max-w-screen-lg px-4">
      <div className="mt-16 mb-4 space-y-6 flex flex-row gap-8">
        <div className="flex flex-1 gap-8 flex-col">
          <h1 className="text-3xl font-bold tracking-tight sm:text-3xl font-sans opacity-0 animate-fade-blur-in">
            <AuroraText speed={2} colors={['#8f5cff', '#c084fc', '#6d28d9']}>
              Stay Hungry. Stay Foolish.
            </AuroraText>
          </h1>
          <p className="mx-auto text-md text-muted-foreground lg:mx-0 leading-7 font-sans opacity-0 animate-[fade-blur-in_0.7s_ease-out_forwards_0.2s]">
            Hey, I'm Rafael Fragoso. I started as a software engineer back in 2007, working with PHP, HTML & CSS.
          </p>
          <p className="mx-auto text-md text-muted-foreground lg:mx-0 leading-7 font-sans opacity-0 animate-[fade-blur-in_0.7s_ease-out_forwards_0.2s]">
            I'm Brazilian through and through - born and raised in Rio de Janeiro, the wonderful city I'm proud to call
            home. I share my life with my incredible wife and my bright 8-year-old daughter.
          </p>
          <p className="mx-auto text-md text-muted-foreground lg:mx-0 leading-7 font-sans opacity-0 animate-[fade-blur-in_0.7s_ease-out_forwards_0.2s]">
            I'm passionate about open source projects, crafting great user experiences, and optimizing performance. When
            I'm not working or building something new, you'll find me at the beach, gaming, watching movies, or spending
            quality time with my family.
          </p>
        </div>
        <div className="hidden md:flex items-center justify-center opacity-0 animate-[fade-blur-in_0.7s_ease-out_forwards_0.6s]">
          <Image
            src="/profile.jpeg"
            alt="Rafael Fragoso profile picture"
            className="object-cover w-full h-full rounded-xl"
            width={666}
            height={666}
            priority
          />
        </div>
      </div>
      <BentoGrid>
        <BentoGridItem mdColSpan={6} mdRowSpan={2}>
          <div className="p-4 flex flex-col flex-1 gap-4">
            <Mapbox showDistance />
          </div>
        </BentoGridItem>
        <BentoGridItem mdColSpan={6} mdRowSpan={1}>
          <div className="p-4 flex flex-row flex-1 gap-8 items-center relative">
            <div className="w-36 flex flex-col items-center justify-center absolute z-0 -bottom-12 -left-12 rotate-45 opacity-30 select-none">
              <Image
                src="/workbits.png"
                alt="Workbits discord community logo"
                className="w-full h-full object-cover"
                width={96}
                height={96}
                quality={100}
              />
            </div>
            <div className="flex-1 text-md text-muted-foreground font-sans z-10 flex flex-col gap-4">
              <p>
                I run Workbits, a <span className="font-bold">Discord community</span> with over{' '}
                <span className="font-bold">1,000</span> developers, where we share ideas, help each other, and grow
                together. No matter your skill level.
              </p>
              <Button variant="secondary" className="hover:cursor-pointer">
                <a href="https://discord.gg/ZCxMHvTDcH" target="_blank" rel="noopener noreferrer">
                  Join the community
                </a>
              </Button>
            </div>
          </div>
        </BentoGridItem>
        <BentoGridItem mdColSpan={3} mdRowSpan={1}>
          <div className="flex-1 p-4 flex flex-col items-center justify-center gap-4 text-md text-muted-foreground font-sans">
            <p className="text-center">
              I'm <span className="font-bold">176cm</span> tall.
            </p>
            <p className="text-center">
              Not tall enough but not short enough, <span className="font-bold">I'm just the right size</span>.
            </p>
          </div>
        </BentoGridItem>
        <BentoGridItem mdColSpan={3} mdRowSpan={1}>
          <div className="flex-1 p-4 flex flex-col items-center justify-center gap-4 text-md text-muted-foreground font-sans">
            <p className="text-center">
              I started coding when I was <span className="font-bold">13 years</span> old.
            </p>
            <p className="text-center">
              Now I'm <span className="font-bold">32</span>. But I look 25.
            </p>
          </div>
        </BentoGridItem>
      </BentoGrid>
    </div>
  )
}
