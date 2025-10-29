'use client'

import type { LngLatBoundsLike, LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useRef, useState } from 'react'
import { env } from '@/env'
import { useDistance } from '@/hooks/use-distance'
import { useIpLocation } from '@/hooks/use-ip-location'

import 'mapbox-gl/dist/mapbox-gl.css'

const RIO_COORDINATES = {
  latitude: -23.0225742,
  longitude: -43.4972615,
}

interface MapboxProps {
  showDistance?: boolean
}

export function Mapbox({ showDistance }: MapboxProps) {
  const { theme, systemTheme } = useTheme()
  const { coordinates: userLocation, loading } = useIpLocation()
  const { formattedDistance } = useDistance(userLocation, RIO_COORDINATES)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map>(null)
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
        return null
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
      new mapboxgl.Marker({
        color: '#6d28d9',
        draggable: false,
      })
        .setLngLat(pointA)
        .addTo(mapRef.current!)

      new mapboxgl.Marker(el).setLngLat(pointB).addTo(mapRef.current!)

      mapRef.current?.fitBounds(fullCoordinates)

      mapRef.current?.addSource('route', {
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

      mapRef.current?.addLayer({
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

    return () => {
      mapRef.current?.remove()
    }
  }, [userLocation, mapStyle, loading])

  return (
    <>
      <div className="flex-1 rounded-md overflow-hidden min-h-32">
        <div
          className="map-container w-full h-full"
          ref={mapContainerRef}
          role="img"
          aria-label="Interactive map showing distance from visitor location to Rio de Janeiro, Brazil"
          aria-busy={isMounted ? loading : false} />
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
                <span className="inline-block w-16 h-4 bg-muted animate-pulse rounded mx-1" aria-hidden="true" />
                according to your ip address.
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}
