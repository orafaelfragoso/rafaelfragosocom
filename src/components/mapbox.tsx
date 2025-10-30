'use client'

import type { LngLatBoundsLike, LngLatLike, Map as MapboxMap } from 'mapbox-gl'
import { useTheme } from 'next-themes'
import { Activity, useEffect, useMemo, useRef, useState } from 'react'
import { env } from '@/env'
import { useDistance } from '@/hooks/use-distance'
import { useIpLocation } from '@/hooks/use-ip-location'

const RIO_COORDINATES = {
  latitude: -23.0225742,
  longitude: -43.4972615,
}

interface MapboxProps {
  showDistance?: boolean
}

// Dynamically load Mapbox CSS only when needed to avoid preload warnings
const loadMapboxCSS = (): Promise<void> => {
  return new Promise((resolve) => {
    // Check if CSS is already loaded
    const existingLink = document.querySelector('link[href*="mapbox-gl.css"]')
    if (existingLink) {
      resolve()
      return
    }

    // Inject link tag to load CSS from Mapbox CDN
    // This avoids Next.js preloading since it's loaded dynamically
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.16.0/mapbox-gl.css'
    link.onload = () => resolve()
    link.onerror = () => resolve() // Resolve anyway to not block map initialization
    document.head.appendChild(link)
  })
}

export function Mapbox({ showDistance }: MapboxProps) {
  const { theme, systemTheme } = useTheme()
  const { coordinates: userLocation, loading } = useIpLocation()
  const { formattedDistance } = useDistance(userLocation, RIO_COORDINATES)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapboxMap | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  const mapStyle = useMemo(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme
    return currentTheme === 'dark'
      ? 'mapbox://styles/mapbox/dark-v11?optimize=true'
      : 'mapbox://styles/mapbox/streets-v12?optimize=true'
  }, [theme, systemTheme])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (loading || (!userLocation?.latitude && !userLocation?.longitude)) return

    let isMounted = true

    const initMap = async () => {
      // Load CSS dynamically before initializing the map
      await loadMapboxCSS()

      const mapboxgl = (await import('mapbox-gl')).default

      if (!isMounted) return

      mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

      const pointA: LngLatLike = [userLocation.longitude, userLocation.latitude]
      const pointB: LngLatLike = [RIO_COORDINATES.longitude, RIO_COORDINATES.latitude]
      const fullCoordinates = [
        [userLocation.longitude + 0.03, userLocation.latitude + 0.03],
        [RIO_COORDINATES.longitude - 0.03, RIO_COORDINATES.latitude - 0.03],
      ] satisfies LngLatBoundsLike

      const el = document.createElement('div')
      el.className = 'marker'
      el.style.backgroundImage = 'url(/pin.png)'
      el.style.width = '64px'
      el.style.height = '64px'
      el.style.backgroundSize = '100%'

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        interactive: false,
        attributionControl: false,
        style: mapStyle,
        center: pointA,
        zoom: 14,
        transformRequest: (url, resourceType) => {
          if (resourceType === 'Tile' && url.includes('api.mapbox.com')) {
            return {
              url,
              headers: {},
            }
          }
          return { url, headers: {} }
        },
      })

      const handleError = (e: { error?: { status?: number; message?: string } }) => {
        if (e.error?.status === 403) {
          return
        }
        if (e.error?.message && !e.error.message.includes('403')) {
          console.error('Mapbox error:', e.error)
        }
      }

      mapRef.current.on('error', handleError)
      mapRef.current.on('tiledataerror', handleError)
      mapRef.current.on('sourcedataerror', handleError)

      mapRef.current.on('load', () => {
        if (!isMounted || !mapRef.current) return

        const markerA = new mapboxgl.Marker({
          color: '#6d28d9',
          draggable: false,
        })
          .setLngLat(pointA)
          .addTo(mapRef.current)

        markerA.getElement().setAttribute('aria-hidden', 'true')

        const markerB = new mapboxgl.Marker(el).setLngLat(pointB).addTo(mapRef.current)

        markerB.getElement().setAttribute('aria-hidden', 'true')

        // Make attribution controls unfocusable
        const controls = mapContainerRef.current?.querySelectorAll('.mapboxgl-ctrl a, .mapboxgl-ctrl button')
        controls?.forEach((element) => {
          element.setAttribute('tabindex', '-1')
          element.setAttribute('aria-hidden', 'true')
        })

        mapRef.current.fitBounds(fullCoordinates)

        mapRef.current.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [pointA, pointB],
            },
          },
        })

        mapRef.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#c084fc',
            'line-width': 6,
            'line-dasharray': [2, 2],
          },
        })
      })
    }

    initMap().catch((error) => {
      console.error('Failed to load mapbox:', error)
    })

    return () => {
      isMounted = false
      mapRef.current?.remove()
    }
  }, [userLocation, mapStyle, loading])

  return (
    <>
      <div className="flex-1 rounded-md overflow-hidden min-h-32">
        <div className="map-container w-full h-full" ref={mapContainerRef} aria-hidden="true" />
      </div>
      <div className="text-md text-muted-foreground font-sans">
        {showDistance && (
          <div>
            I'm from Rio de Janeiro, Brazil
            {isMounted && formattedDistance ? (
              <>
                , roughly <span className="font-bold">{formattedDistance}</span> away from your current location,
                according to your ip address.
              </>
            ) : (
              <>
                <Activity aria-label="Loading distance">
                  <span className="inline-block w-16 h-4 bg-muted animate-pulse rounded mx-1" />
                </Activity>
                according to your ip address.
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}
