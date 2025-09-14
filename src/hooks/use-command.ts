import { useContext } from 'react'
import { CommandContext } from '@/components/command-provider'

export function useCommand() {
  const context = useContext(CommandContext)
  if (context === undefined) {
    throw new Error('useCommand must be used within a CommandProvider')
  }
  return context
}
