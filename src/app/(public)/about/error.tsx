'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AboutError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('About page error:', error)
  }, [error])

  return (
    <div className="container mx-auto max-w-5xl px-4 mt-16">
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <h2 className="text-2xl font-bold text-foreground">Something went wrong!</h2>
        <p className="text-muted-foreground text-center max-w-md">
          I'm having trouble loading this page. Please try again or refresh the page.
        </p>
        <div className="flex gap-4">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh page
          </Button>
        </div>
      </div>
    </div>
  )
}
