// Location/Coordinates Types
export interface Coordinates {
  latitude: number
  longitude: number
}

export interface LocationResult {
  coordinates: Coordinates | null
  loading: boolean
  error: string | null
}

export interface CachedLocation {
  coordinates: Coordinates
  timestamp: number
}

