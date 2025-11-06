'use client'

import type { LngLatBoundsLike, LngLatLike, Map as MapboxMap } from 'mapbox-gl'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useRef } from 'react'
import { useLocationDistance } from '@/hooks/use-location-distance'

const loadMapboxCSS = (): Promise<void> => {
  return new Promise((resolve) => {
    const existingLink = document.querySelector('link[href*="mapbox-gl.css"]')
    if (existingLink) {
      resolve()
      return
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.16.0/mapbox-gl.css'
    link.onload = () => resolve()
    link.onerror = () => resolve()
    document.head.appendChild(link)
  })
}

export function Mapbox() {
  const { theme, systemTheme } = useTheme()
  const { userLocation, rioCoordinates, loading } = useLocationDistance()
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapboxMap | null>(null)

  const mapStyle = useMemo(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme
    return currentTheme === 'dark'
      ? 'mapbox://styles/mapbox/dark-v11?optimize=true'
      : 'mapbox://styles/mapbox/streets-v12?optimize=true'
  }, [theme, systemTheme])

  useEffect(() => {
    if (loading || (!userLocation?.latitude && !userLocation?.longitude)) return

    let isMounted = true

    const initMap = async () => {
      await loadMapboxCSS()

      const mapboxgl = (await import('mapbox-gl')).default

      if (!isMounted) return

      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

      const pointA: LngLatLike = [userLocation.longitude, userLocation.latitude]
      const pointB: LngLatLike = [rioCoordinates.longitude, rioCoordinates.latitude]
      const fullCoordinates = [
        [userLocation.longitude + 0.03, userLocation.latitude + 0.03],
        [rioCoordinates.longitude - 0.03, rioCoordinates.latitude - 0.03],
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

        setTimeout(() => {
          const controls = mapContainerRef.current?.querySelectorAll(
            '.mapboxgl-ctrl a, .mapboxgl-ctrl button, .mapboxgl-ctrl-logo',
          )
          controls?.forEach((element) => {
            element.setAttribute('tabindex', '-1')
            element.setAttribute('aria-hidden', 'true')
          })
        }, 100)

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
      if (mapRef.current) {
        try {
          if (mapRef.current.getContainer()) {
            mapRef.current.remove()
          }
        } catch (error) {
          console.debug('Map cleanup error:', error)
        }
        mapRef.current = null
      }
    }
  }, [userLocation, rioCoordinates, mapStyle, loading])

  return (
    <div className="flex-1 overflow-hidden w-full h-full">
      <div className="map-container w-full h-full" ref={mapContainerRef} aria-hidden="true" />
    </div>
  )
}
