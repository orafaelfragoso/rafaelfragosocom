import Image from 'next/image'

import { Shortcut } from '@/components/shortcut'
import { Title } from '@/components/title'
import config from '@/config'

export function Hero() {
  return (
    <section className="relative flex flex-1 items-center overflow-hidden" aria-labelledby="hero-heading">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] items-center">
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <Title id="hero-heading" className="md:text-6xl">
                Software Engineer
              </Title>
              <p className="mx-auto max-w-2xl text-md md:text-lg text-pretty font-light text-black/60 dark:text-white/70 lg:mx-0">
                I fix the technical problems that make websites crash and developers pull their hair out. When systems
                break or act weird, I dive in and make them work. Digital detective, but with more coffee.
              </p>
              <div className="hidden lg:block">
                <Shortcut />
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end order-first md:order-0">
            <Image
              src="/floating-avatar.webp"
              alt={`${config.site.author.name} avatar`}
              width={512}
              height={512}
              className="h-[160px] w-[160px] sm:h-[288px] sm:w-[288px] object-contain md:h-[352px] md:w-[352px] lg:h-[400px] lg:w-[400px] animate-float"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
