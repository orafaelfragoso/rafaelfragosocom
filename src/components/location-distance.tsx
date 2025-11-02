'use client'

import { useEffect, useState } from 'react'
import { useLocationDistance } from '@/hooks/use-location-distance'

export function LocationDistance() {
  const { formattedDistance } = useLocationDistance()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div>
      I'm from Rio de Janeiro, Brazil
      {isMounted && formattedDistance && (
        <>
          , roughly <span className="font-bold">{formattedDistance}</span> away from your current location, according to
          your ip address.
        </>
      )}
    </div>
  )
}
