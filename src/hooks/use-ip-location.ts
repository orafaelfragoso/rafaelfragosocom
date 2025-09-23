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

export function useIpLocation(): LocationResult {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
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
          setCoordinates({
            latitude: data.latitude,
            longitude: data.longitude,
          })
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
  }, [])

  return { coordinates, loading, error }
}
