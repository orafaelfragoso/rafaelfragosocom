import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {},

  client: {
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: z.string().min(1),
  },

  runtimeEnv: {
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
  },
})
