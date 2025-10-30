import Image from 'next/image'
import { Shortcut } from '@/components/shortcut'
import { Title } from '@/components/ui/title'
import config from '@/config'

export function Hero() {
  return (
    <section className="relative flex flex-1 items-center overflow-hidden" aria-labelledby="hero-heading">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-4 items-center">
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <Title id="hero-heading">Software Engineer</Title>
              <p className="mx-auto max-w-2xl text-md md:text-lg text-foreground lg:mx-0 leading-7 font-sans opacity-0 animate-[fade-blur-in_0.7s_ease-out_forwards_0.2s]">
                I fix the technical problems that make websites crash and developers pull their hair out. When systems
                break or act weird, I dive in and make them work. Digital detective, but with more coffee.
              </p>
              <div className="hidden lg:block lg:opacity-0 lg:animate-[fade-blur-in_0.7s_ease-out_forwards_0.4s]">
                <Shortcut />
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end order-first lg:order-0">
            <Image
              src="/floating-avatar.webp"
              alt={`${config.site.author.name} avatar`}
              width={512}
              height={512}
              className="h-[160px] w-[160px] sm:h-[288px] sm:w-[288px] object-contain md:h-[352px] md:w-[352px] lg:h-[416px] lg:w-[416px] xl:h-[480px] xl:w-[480px] animate-float"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
