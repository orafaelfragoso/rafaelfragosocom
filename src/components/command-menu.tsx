"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { DialogProps } from "@radix-ui/react-alert-dialog";
import {
  LaptopIcon,
  MoonIcon,
  SunIcon,
  FileTextIcon,
  Link1Icon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { navConfig } from "@/config/navigation";
import { allPosts } from "contentlayer/generated";
import Minisearch from "minisearch";

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = useMemo(() => {
    if (searchTerm.length === 0) return [];

    const index = new Minisearch({
      fields: ["title", "description"],
      storeFields: ["_id", "title", "slug"],
    });

    index.addAll(allPosts.map((post) => ({ ...post, id: post._id })));

    return index.search(searchTerm, { boost: { title: 2 }, prefix: true });
  }, [searchTerm]);

  const { setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={(value) => setSearchTerm(value)}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {navConfig.main.length > 0 && (
            <CommandGroup heading="Navigation">
              {navConfig.main.map((nav) => (
                <CommandItem
                  key={nav.href}
                  value={nav.title}
                  onSelect={() => {
                    runCommand(() => router.push(nav.href));
                  }}
                >
                  <Link1Icon className="mr-2 h-4 w-4" />
                  {nav.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {searchResults.length > 0 && (
            <CommandGroup heading="Posts">
              {searchResults.map((post) => (
                <CommandItem
                  key={post._id}
                  value={post.title}
                  onSelect={() => {
                    runCommand(() => router.push(post.slug));
                  }}
                >
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  {post.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandGroup heading="Links">
            {navConfig.social.map(({ icon: Icon, ...navItem }) => (
              <CommandItem
                key={navItem.href}
                value={navItem.title}
                onSelect={() => {
                  window.open(navItem.href, "_blank");
                }}
              >
                <Icon className="mr-2 h-4 w-4" />
                {navItem.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunIcon className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <MoonIcon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <LaptopIcon className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
