'use client'

import type { DialogProps } from '@radix-ui/react-dialog'
import { FileText, Laptop, Moon, Sun } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { config } from '@/config'
import { useCommand } from '@/hooks/use-command'
import { categoryNameToSlug } from '@/lib/articles'
import type { Article } from '@/types/article'

interface CommandMenuProps extends DialogProps {
  articles: Article[]
}

export function CommandMenu({ articles, ...props }: CommandMenuProps) {
  const { setTheme } = useTheme()
  const router = useRouter()
  const command = useCommand()
  const [search, setSearch] = React.useState('')

  const runCommand = React.useCallback(
    (cmd: () => unknown) => {
      command.close()
      cmd()
    },
    [command],
  )

  React.useEffect(() => {
    if (!command.isOpen) {
      setSearch('')
    }
  }, [command.isOpen])

  return (
    <>
      <Button
        variant="ghost"
        className="h-9 w-9 px-0 text-foreground/80 hover:text-foreground"
        onClick={() => command.open()}
        aria-label="Open command menu"
        {...props}>
        <span className="text-xl">⌘</span>
        <span className="sr-only">Open command menu</span>
      </Button>
      <CommandDialog open={command.isOpen} onOpenChange={command.toggle}>
        <CommandInput placeholder="Type a command or search..." value={search} onValueChange={setSearch} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {config.navigation.main.map((page) => (
              <CommandItem key={page.href} value={page.title} onSelect={() => runCommand(() => router.push(page.href))}>
                <page.icon className="mr-2 h-4 w-4" />
                {page.title}
              </CommandItem>
            ))}
          </CommandGroup>
          {search && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Articles">
                {articles.map((article) => {
                  const categorySlug = categoryNameToSlug(article.category)
                  return (
                    <CommandItem
                      key={article.slug}
                      value={`${article.title} ${article.category}`}
                      onSelect={() =>
                        runCommand(() => {
                          router.push(`/articles/${categorySlug}/${article.slug}`)
                        })
                      }>
                      <FileText className="mr-2 h-4 w-4 shrink-0" />
                      <div className="flex flex-col">
                        <span>{article.title}</span>
                        <span className="text-xs text-foreground/50 dark:text-muted-foreground">
                          {article.category}
                        </span>
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </>
          )}
          <CommandSeparator />
          <CommandGroup heading="Links">
            {config.navigation.social.map(({ icon: Icon, ...navItem }) => (
              <CommandItem
                key={navItem.href}
                value={navItem.title}
                onSelect={() => {
                  window.open(navItem.href, '_blank')
                }}>
                <Icon className="mr-2 h-4 w-4" />
                {navItem.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <Sun className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <Laptop className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
