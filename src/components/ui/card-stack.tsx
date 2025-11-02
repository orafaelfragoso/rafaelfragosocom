import Link from 'next/link'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type CardStackProps = React.ComponentProps<'div'> & {
  stackVariant?: 1 | 2 | 3 | 4
  href: React.ComponentProps<typeof Link>['href']
}

export function CardStack({ stackVariant = 1, className, href, children, ...props }: CardStackProps) {
  const firstLayerClass =
    {
      1: 'rotate-[2deg] -translate-y-[8px] group-hover:rotate-[4deg] group-hover:-translate-y-[15px] group-hover:-translate-x-[3px]',
      2: 'rotate-[6deg] -translate-y-[10px] group-hover:rotate-[8deg] group-hover:-translate-y-[13px] group-hover:-translate-x-[3px]',
      3: 'rotate-[4deg] -translate-y-[10px] group-hover:rotate-[6deg] group-hover:-translate-y-[13px] group-hover:-translate-x-[3px]',
      4: '-rotate-[2deg] -translate-y-[10px] group-hover:-rotate-[4deg] group-hover:-translate-y-[13px] group-hover:-translate-x-[3px]',
    }[stackVariant] ?? ''

  const secondLayerClass =
    {
      1: '-rotate-[5deg] translate-y-[8px] group-hover:-rotate-[7deg] group-hover:translate-y-[10px] group-hover:-translate-x-[3px]',
      2: '-rotate-[2deg] -translate-y-[9px] group-hover:-rotate-[4deg] group-hover:-translate-y-[12px] group-hover:-translate-x-[3px]',
      3: '-rotate-[1deg] translate-y-[10px] translate-x-[14px] group-hover:-rotate-[3deg] group-hover:translate-y-[7px] group-hover:translate-x-[11px]',
      4: 'rotate-[4deg] translate-y-[10px] group-hover:rotate-[6deg] group-hover:translate-y-[7px] group-hover:-translate-x-[3px]',
    }[stackVariant] ?? ''

  return (
    <div className="group relative min-h-88 flex flex-col">
      <Card
        className={cn(
          'cursor-pointer transition-all duration-200 ease-in-out group-hover:-translate-y-2 flex-1 bg-linear-to-b',
          className,
        )}
        {...props}>
        <Link href={href} className="relative z-30 p-5 flex flex-col h-full">
          {children}
        </Link>
      </Card>
      <div
        className={cn(
          'absolute inset-0 -z-10 bg-white dark:bg-white/5 rounded-[2.4rem] p-2 shadow-basic transition-all duration-200 ease-in-out',
          firstLayerClass,
        )}
      />
      <div
        className={cn(
          'absolute inset-0 -z-20 bg-white dark:bg-white/5 rounded-[2.4rem] p-2 shadow-basic transition-all duration-200 ease-in-out',
          secondLayerClass,
        )}
      />
    </div>
  )
}
