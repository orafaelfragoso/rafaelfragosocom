import { useEffect, useState } from 'react'

interface Coordinates {
  latitude: number
  longitude: number
}

interface LocationResult {
  coordinates: Coordinates | null
  loading: boolean
  error: string | null
}

const CACHE_KEY = 'ip-location-cache'
const CACHE_DURATION = 24 * 60 * 60 * 1000

interface CachedLocation {
  coordinates: Coordinates
  timestamp: number
}

function getCachedLocation(): Coordinates | null {
  if (typeof window === 'undefined') return null

  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null

    const { coordinates, timestamp }: CachedLocation = JSON.parse(cached)
    const now = Date.now()

    if (now - timestamp < CACHE_DURATION) {
      return coordinates
    }

    localStorage.removeItem(CACHE_KEY)
    return null
  } catch {
    localStorage.removeItem(CACHE_KEY)
    return null
  }
}

function setCachedLocation(coordinates: Coordinates): void {
  if (typeof window === 'undefined') return

  try {
    const cached: CachedLocation = {
      coordinates,
      timestamp: Date.now(),
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cached))
  } catch {}
}

export function useIpLocation(): LocationResult {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(getCachedLocation())
  const [loading, setLoading] = useState(!coordinates)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (coordinates) return

    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/', {
          cache: 'force-cache',
        })

        if (!response.ok) {
          throw new Error('Failed to fetch location')
        }

        const data = await response.json()

        if (
          data.latitude &&
          data.longitude &&
          typeof data.latitude === 'number' &&
          typeof data.longitude === 'number' &&
          !Number.isNaN(data.latitude) &&
          !Number.isNaN(data.longitude)
        ) {
          const coords = {
            latitude: data.latitude,
            longitude: data.longitude,
          }
          setCoordinates(coords)
          setCachedLocation(coords)
          setLoading(false)
        } else {
          console.error('Invalid location data received:', data)
          throw new Error('Invalid location data received')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get location')
        setLoading(false)
      }
    }

    fetchLocation()
  }, [coordinates])

  return { coordinates, loading, error }
}
