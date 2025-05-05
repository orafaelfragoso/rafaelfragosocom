'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { siteConfig } from '@/config/site'
import { useApi } from '@/hooks/use-api'
import Link from 'next/link'

type ApiResponse = {
  totalRuns: number
  totalDistance: string
  totalTime: string
}

export function CardStrava() {
  const { data, loading } = useApi<ApiResponse>('/api/strava')

  return (
    <Link href={siteConfig.links.strava} target="_blank" rel="noreferrer">
      <Card className="flex-1 basis-1/3">
        <CardHeader className="space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">Run with me!</CardTitle>
          <CardDescription>Connect with me on Strava and let&apos;s run together.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? <Skeleton className="h-4 w-full mb-2" /> : data?.totalDistance}
          </div>
          <div className="text-xs text-muted-foreground">
            {loading ? <Skeleton className="h-4 w-full" /> : data?.totalTime}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
