function getClientEnv() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

  if (!mapboxToken || mapboxToken.trim() === '') {
    throw new Error('NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN environment variable is required')
  }

  return {
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: mapboxToken,
  }
}

function getServerEnv() {
  return {
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
  }
}

const clientEnv = getClientEnv()

const serverEnv = getServerEnv()

export const env = {
  ...clientEnv,
  ...serverEnv,
} as const
