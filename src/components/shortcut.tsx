'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCommand } from '@/hooks/use-command'
import { cn } from '@/lib/utils'

interface ShortcutProps {
  className?: string
}

type ShortcutState = { isMac: boolean; isReady: boolean }

export function Shortcut({ className }: ShortcutProps) {
  const command = useCommand()
  const [state, setState] = useState<ShortcutState>({ isMac: false, isReady: false })

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.userAgent.includes('Mac')) {
      setState({ isMac: true, isReady: true })
    }
  }, [])

  return (
    <Button
      variant="ghost"
      onClick={command.open}
      className={cn(
        'ml-[-8px] px-2 flex items-center gap-2 py-3 text-md font-medium text-foreground/80 cursor-pointer',
        className,
      )}>
      <span>Press</span>
      {state.isReady && (
        <span className="flex items-center gap-1 animate-in slide-in-from-bottom duration-500 fill-mode-forwards delay-300">
          <kbd className="rounded bg-muted px-2 py-0 text-base font-mono font-medium text-foreground/80 shadow border border-border">
            {state.isMac ? '⌘' : 'ctrl'}
          </kbd>
          <kbd className="rounded bg-muted px-2 py-0 text-base font-mono font-medium text-foreground/80 shadow border border-border">
            k
          </kbd>
        </span>
      )}
      <span>to start</span>
      <ArrowRight className="h-4 w-4" />
    </Button>
  )
}
