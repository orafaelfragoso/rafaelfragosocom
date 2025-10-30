'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { isLightGradient, packGradients } from '@/lib/articles'
import type { Pack, StackingValues } from '@/types/article'

interface TopArticlesCardProps {
  pack: Pack
  index: number
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

// Generate truly random stacking values for each card
const getRandomStackingValues = (): StackingValues => {
  const rotation1 = (Math.random() - 0.5) * 8
  const rotation2 = (Math.random() - 0.5) * 10

  const translateX1 = (Math.random() - 0.5) * 8
  const translateY1 = Math.random() * 4 + 2
  const translateX2 = (Math.random() - 0.5) * 12
  const translateY2 = Math.random() * 6 + 4

  const hoverX1 = translateX1 * 1.5 + (translateX1 > 0 ? 2 : -2)
  const hoverY1 = translateY1 * 1.5 + 2
  const hoverX2 = translateX2 * 1.5 + (translateX2 > 0 ? 3 : -3)
  const hoverY2 = translateY2 * 1.5 + 3

  const hoverRotate1 = rotation1 * 1.2
  const hoverRotate2 = rotation2 * 1.1

  return {
    layer1: {
      rotate: rotation1,
      translateX: translateX1,
      translateY: translateY1,
      hoverX: hoverX1,
      hoverY: hoverY1,
      hoverRotate: hoverRotate1,
    },
    layer2: {
      rotate: rotation2,
      translateX: translateX2,
      translateY: translateY2,
      hoverX: hoverX2,
      hoverY: hoverY2,
      hoverRotate: hoverRotate2,
    },
  }
}

export function TopArticlesCard({ pack, index }: TopArticlesCardProps) {
  const [stacking, setStacking] = useState<StackingValues | null>(null)

  useEffect(() => {
    setStacking(getRandomStackingValues())
  }, [])

  const gradient = packGradients[index % packGradients.length]
  const useLightText = !isLightGradient(index % packGradients.length)
  const href = pack.articleSlug ? `/articles/${pack.category}/${pack.articleSlug}` : `/articles/${pack.category}`

  if (!stacking) {
    return <div className="h-[320px] w-full rounded-3xl border border-border bg-background" />
  }

  return (
    <article className="relative">
      <Link
        href={href}
        className={`card-${index} group block relative h-[320px] w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded-3xl`}
        aria-label={`${pack.title}: ${pack.description}. Published on ${pack.date ? formatDate(pack.date) : 'unknown date'}`}>
        <style>{`
          .card-${index}:hover .layer-2-${index} {
            transform: rotate(${stacking.layer2.hoverRotate}deg) translate(${stacking.layer2.hoverX}px, ${stacking.layer2.hoverY}px) !important;
          }
          .card-${index}:hover .layer-1-${index} {
            transform: rotate(${stacking.layer1.hoverRotate}deg) translate(${stacking.layer1.hoverX}px, ${stacking.layer1.hoverY}px) !important;
          }
        `}</style>

        <div
          className={`layer-2-${index} absolute top-0 left-0 w-full h-full bg-white dark:bg-white/5 rounded-3xl border border-solid border-black/8 dark:border-white/8 transition-all duration-250`}
          style={{
            transform: `rotate(${stacking.layer2.rotate}deg) translate(${stacking.layer2.translateX}px, ${stacking.layer2.translateY}px)`,
          }}
          aria-hidden="true"
        />

        <div
          className={`layer-1-${index} absolute top-0 left-0 w-full h-full bg-white dark:bg-white/8 rounded-3xl border border-solid border-black/8 dark:border-white/8 transition-all duration-250 shadow-md group-hover:shadow-xl`}
          style={{
            transform: `rotate(${stacking.layer1.rotate}deg) translate(${stacking.layer1.translateX}px, ${stacking.layer1.translateY}px)`,
          }}
          aria-hidden="true"
        />

        {/* Main content card with gradient - moves up on hover */}
        <div
          className={`relative h-full w-full rounded-3xl bg-linear-to-b ${gradient} p-6 flex flex-col transition-all duration-250 group-hover:-translate-y-1`}>
          <h3 className={`font-semibold text-2xl leading-tight mb-3 ${useLightText ? 'text-white' : 'text-black'}`}>
            {pack.title}
          </h3>
          <p
            className={`text-base leading-relaxed line-clamp-3 mb-auto grow ${useLightText ? 'text-white/90' : 'text-black/90'}`}>
            {pack.description}
          </p>
          {pack.date && (
            <time
              dateTime={pack.date}
              className={`text-xs mt-auto ${useLightText ? 'text-white/80' : 'text-black/70'}`}>
              {formatDate(pack.date)}
            </time>
          )}
        </div>
      </Link>
    </article>
  )
}
