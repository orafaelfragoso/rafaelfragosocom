import { useMemo } from 'react'
import type { Coordinates } from '@/types/location'

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

function haversineDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371000 // Earth's radius in meters

  const lat1Rad = toRadians(coord1.latitude)
  const lat2Rad = toRadians(coord2.latitude)
  const deltaLatRad = toRadians(coord2.latitude - coord1.latitude)
  const deltaLonRad = toRadians(coord2.longitude - coord1.longitude)

  const a =
    Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLonRad / 2) * Math.sin(deltaLonRad / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

export function useDistance(from: Coordinates | null, to: Coordinates | null) {
  const distance = useMemo(() => {
    if (!from || !to) return null
    return haversineDistance(from, to)
  }, [from, to])

  const formattedDistance = useMemo(() => {
    if (distance === null) return null

    if (distance < 1000) {
      return `${Math.round(distance)} m`
    }

    const kilometers = distance / 1000
    if (kilometers < 10) {
      return `${kilometers.toFixed(1)} km`
    }

    return `${Math.round(kilometers)} km`
  }, [distance])

  return {
    distance,
    formattedDistance,
  }
}
