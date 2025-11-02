import { Card } from '@/components/ui/card'

export default function AboutLoading() {
  return (
    <div className="container mx-auto max-w-5xl px-4">
      <div className="mt-16 mb-4 space-y-6 flex flex-col gap-8">
        <div className="h-12 w-64 bg-muted animate-pulse rounded" />
        <div className="flex flex-row gap-8">
          <div className="flex flex-1 gap-8 flex-col items-center justify-center">
            <div className="h-6 w-full bg-muted animate-pulse rounded" />
            <div className="h-6 w-full bg-muted animate-pulse rounded" />
            <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
          </div>
          <div className="hidden md:flex items-center justify-center">
            <div className="w-[400px] h-[400px] bg-muted animate-pulse rounded-xl" />
          </div>
        </div>
      </div>
      <div className="grid w-full auto-rows-auto grid-cols-12 gap-4">
        <Card className="col-span-12 md:col-span-6 md:row-span-2">
          <div className="p-4 flex flex-col flex-1 gap-4">
            <div className="flex-1 rounded-md overflow-hidden min-h-32 bg-muted animate-pulse" />
            <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
          </div>
        </Card>
        <Card className="col-span-12 md:col-span-6 md:row-span-1">
          <div className="p-4 flex flex-row flex-1 gap-8 items-center">
            <div className="flex-1 space-y-2">
              <div className="h-4 w-full bg-muted animate-pulse rounded" />
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
              <div className="h-10 w-32 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </Card>
        <Card className="col-span-12 md:col-span-3 md:row-span-1">
          <div className="flex-1 p-4 flex flex-col items-center justify-center gap-4">
            <div className="h-6 w-24 bg-muted animate-pulse rounded" />
            <div className="h-6 w-32 bg-muted animate-pulse rounded" />
          </div>
        </Card>
        <Card className="col-span-12 md:col-span-3 md:row-span-1">
          <div className="flex-1 p-4 flex flex-col items-center justify-center gap-4">
            <div className="h-6 w-28 bg-muted animate-pulse rounded" />
            <div className="h-6 w-20 bg-muted animate-pulse rounded" />
          </div>
        </Card>
      </div>
    </div>
  )
}
