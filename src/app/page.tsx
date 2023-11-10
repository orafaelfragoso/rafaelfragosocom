import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import avatarImage from "../../public/avatar.png";
import { CardStrava } from "@/components/card-strava";
import { CardDiscord } from "@/components/card-discord";
import { CardSkeleton } from "@/components/card-skeleton";
import { CardNewsletter } from "@/components/card-newsletter";

export default function Home() {
  return (
    <div className="container relative">
      <PageHeader className="pb-8">
        <Link
          href="#"
          className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
        >
          🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
          <span className="sm:hidden">Tech blog on steroids.</span>
          <span className="hidden sm:inline">A new tech blog on steroids!</span>
          <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
        <PageHeaderHeading>
          I&apos;m a Senior Software Engineer
        </PageHeaderHeading>
        <PageHeaderDescription>
          Welcome to my space where I enthusiastically share my passions and
          creative endeavors with the world. You&apos;ll find everything related
          to JavaScript and whatever else piques my interest.
        </PageHeaderDescription>
        <div className="flex w-full items-center space-x-4 pb-8 pt-4 md:pb-10">
          {/* <Link href="#" className={cn(buttonVariants())}>
            Read the blog
          </Link> */}
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            GitHub
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.instagram}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Icons.instagram className="mr-2 h-4 w-4" />
            Instagram
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
  );
}
