"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { navConfig } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center">
        <span className="hidden font-bold sm:inline-block break-keep">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {navConfig.main.map((navItem) => (
          <Link
            key={navItem.title}
            href={navItem.href}
            title={navItem.description}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === navItem.href
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            {navItem.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
