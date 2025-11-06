import type { Coordinates } from '@/types/location'
import { useDistance } from './use-distance'
import { useIpLocation } from './use-ip-location'

const RIO_COORDINATES: Coordinates = {
  latitude: -23.0225742,
  longitude: -43.4972615,
}

export function useLocationDistance() {
  const { coordinates: userLocation, loading, error } = useIpLocation()
  const { formattedDistance } = useDistance(userLocation, RIO_COORDINATES)

  return {
    userLocation,
    rioCoordinates: RIO_COORDINATES,
    formattedDistance,
    loading,
    error,
  }
}
