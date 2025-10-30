'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const bentoGridVariants = cva('grid w-full auto-rows-auto grid-cols-12 gap-4', {
  variants: {
    variant: {
      default: 'md:auto-rows-[10rem]',
      showcase: 'md:auto-rows-[10rem]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const bentoGridItemVariants = cva(
  'group/bento relative col-span-12 flex flex-col justify-between overflow-hidden rounded-xl bg-[#f8f8f8] dark:bg-[#161616] transition-all duration-500 ease-in-out opacity-0 animate-fade-blur-in',
  {
    variants: {
      variant: {
        default: 'transform-gpu',
        showcase: 'transform-gpu',
      },
      colSpan: {
        1: 'col-span-1',
        2: 'col-span-2',
        3: 'col-span-3',
        4: 'col-span-4',
        5: 'col-span-5',
        6: 'col-span-6',
        7: 'col-span-7',
        8: 'col-span-8',
        9: 'col-span-9',
        10: 'col-span-10',
        11: 'col-span-11',
        12: 'col-span-12',
      },
      mdColSpan: {
        1: 'md:col-span-1',
        2: 'md:col-span-2',
        3: 'md:col-span-3',
        4: 'md:col-span-4',
        5: 'md:col-span-5',
        6: 'md:col-span-6',
        7: 'md:col-span-7',
        8: 'md:col-span-8',
        9: 'md:col-span-9',
        10: 'md:col-span-10',
        11: 'md:col-span-11',
        12: 'md:col-span-12',
      },
      rowSpan: {
        1: 'row-span-1',
        2: 'row-span-2',
      },
      mdRowSpan: {
        1: 'md:row-span-1',
        2: 'md:row-span-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      colSpan: 12,
    },
  },
)

export interface BentoGridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bentoGridItemVariants> {
  as?: React.ElementType
}

const BentoGridItem = React.forwardRef<HTMLDivElement, BentoGridItemProps>(
  ({ className, variant, colSpan, mdColSpan, rowSpan, mdRowSpan, as: Comp = 'article', ...props }, ref) => (
    <Comp
      ref={ref}
      data-bento-item
      className={cn(
        bentoGridItemVariants({
          variant,
          colSpan,
          mdColSpan,
          rowSpan,
          mdRowSpan,
        }),
        className,
      )}
      {...props}
    />
  ),
)
BentoGridItem.displayName = 'BentoGridItem'

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bentoGridVariants> {}

const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps & { as?: React.ElementType }>(
  ({ className, variant, as: Comp = 'section', children, ...props }, ref) => {
    let itemIndex = 0
    const childrenWithDelay = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === BentoGridItem) {
        const delay = 200 + itemIndex * 150
        itemIndex++
        return React.cloneElement(child, {
          ...child.props,
          style: {
            ...child.props.style,
            animationDelay: `${delay}ms`,
          },
        } as any)
      }
      return child
    })

    return (
      <Comp ref={ref} className={cn(bentoGridVariants({ variant }), className, 'relative')} {...props}>
        {childrenWithDelay}
      </Comp>
    )
  },
)
BentoGrid.displayName = 'BentoGrid'

export { BentoGrid, BentoGridItem }
