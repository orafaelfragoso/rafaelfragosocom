import Image from 'next/image'

import { CardDiscord } from '@/components/card-discord'
import { CardNewsletter } from '@/components/card-newsletter'
import { CardStrava } from '@/components/card-strava'
import { Icons } from '@/components/icons'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import avatarImage from '../../public/avatar.png'

export default function Home() {
  return (
    <div className="container relative">
      <PageHeader className="pb-8">
        <span className="animate-border rounded-lg inline-block bg-transparent from-purple-500 via-red-500 to-pink-500 p-0.5 bg-gradient-to-r">
          <span className="block bg-background rounded-md px-2 py-1 text-foreground text-xs font-semibold">
            Available for hire
          </span>
        </span>
        <PageHeaderHeading>I&apos;m a Senior Software Engineer</PageHeaderHeading>
        <PageHeaderDescription>
          Welcome to my space where I enthusiastically share my passions and creative endeavors with the world.
          You&apos;ll find everything related to JavaScript and whatever else piques my interest.
        </PageHeaderDescription>
        <div className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
          {/* <Link href="#" className={cn(buttonVariants())}>
            Read the blog
          </Link> */}
          <Link href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
            <div
              className={cn(
                buttonVariants({
                  variant: 'outline',
                }),
                'w-9 px-0',
              )}>
              <Icons.linkedin className="h-5 w-5 fill-current" />
              <span className="sr-only">Linkedin</span>
            </div>
          </Link>
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <div
              className={cn(
                buttonVariants({
                  variant: 'outline',
                }),
                'w-9 px-0',
              )}>
              <Icons.github className="h-5 w-5 fill-current" />
              <span className="sr-only">Github</span>
            </div>
          </Link>
          <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
            <div
              className={cn(
                buttonVariants({
                  variant: 'outline',
                }),
                'w-9 px-0',
              )}>
              <Icons.twitter className="h-5 w-5 fill-current" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>
          <Link href={siteConfig.links.instagram} target="_blank" rel="noreferrer">
            <div
              className={cn(
                buttonVariants({
                  variant: 'outline',
                }),
                'w-9 px-0',
              )}>
              <Icons.instagram className="h-5 w-5 fill-current" />
              <span className="sr-only">Instagram</span>
            </div>
          </Link>
        </div>
        <Image
          src={avatarImage}
          width="680"
          height="680"
          className="hidden lg:inline-block absolute top-[-64px] right-[-64px]"
          alt="Rafael Fragoso Avatar"
          priority={true}
        />
      </PageHeader>

      <div className="flex flex-col lg:flex-row gap-4">
        <CardNewsletter className="md:basis-2/3" />
        <CardDiscord />
        <CardStrava />
      </div>
    </div>
  )
}
