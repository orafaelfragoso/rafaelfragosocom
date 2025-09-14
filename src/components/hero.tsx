import Image from 'next/image'
import { Shortcut } from '@/components/shortcut'
import { AuroraText } from '@/components/ui/aurora-text'
import config from '@/config'

export function Hero() {
  return (
    <section className="relative flex flex-1 items-center overflow-hidden">
      <div className="container mx-auto max-w-screen-lg px-4">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-4 items-center">
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-5xl lg:text-5xl font-sans opacity-0 animate-fade-blur-in">
                <AuroraText speed={2} colors={['#8f5cff', '#c084fc', '#6d28d9']}>
                  Software Engineer
                </AuroraText>
              </h1>
              <p className="mx-auto max-w-[42rem] text-md md:text-lg text-muted-foreground lg:mx-0 leading-7 font-sans opacity-0 animate-[fade-blur-in_0.7s_ease-out_forwards_0.2s]">
                I fix the technical problems that make websites crash and developers pull their hair out. When systems
                break or act weird, I dive in and make them work. Digital detective, but with more coffee.
              </p>
              <div className="opacity-0 animate-[fade-blur-in_0.7s_ease-out_forwards_0.4s]">
                <Shortcut />
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end order-first lg:order-none">
            <div className="opacity-0 animate-[fade-blur-in_0.7s_ease-out_forwards_0.6s]">
              <Image
                src="/floating-avatar.png"
                alt={`${config.site.author.name} avatar`}
                width={512}
                height={512}
                className="h-[160px] w-[160px] sm:h-[288px] sm:w-[288px] object-contain md:h-[352px] md:w-[352px] lg:h-[416px] lg:w-[416px] xl:h-[480px] xl:w-[480px] animate-float"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
