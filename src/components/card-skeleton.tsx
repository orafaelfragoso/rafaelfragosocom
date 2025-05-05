import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export type CardSkeletonProps = {
  className?: string
}

export function CardSkeleton({ className = '' }: CardSkeletonProps) {
  return (
    <Card className={`flex-1 w-full ${className}`}>
      <CardHeader className="space-y-2 pb-2">
        <CardTitle className="text-xl font-medium">
          <Skeleton className="h-4 w-2/3" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-12 w-full" />
      </CardContent>
    </Card>
  )
}
