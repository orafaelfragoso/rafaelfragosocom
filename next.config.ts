import type { NextConfig } from 'next'
import '@/env'

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,

  compress: true,
  poweredByHeader: false,
  output: 'standalone',
  transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core'],

  cacheComponents: true,

  images: {
    qualities: [100, 80],
  },

  headers: async () => [
    {
      source: '/(.*)',
      headers: securityHeaders,
    },
  ],
}

export default nextConfig
