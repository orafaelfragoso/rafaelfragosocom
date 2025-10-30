import bundleAnalyzer from '@next/bundle-analyzer'
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
  productionBrowserSourceMaps: true,
  experimental: {
    viewTransition: true,
    turbopackFileSystemCacheForDev: true,
  },

  output: 'standalone',

  cacheComponents: true,

  images: {
    qualities: [100, 80],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.mapbox.com',
      },
      {
        protocol: 'https',
        hostname: '**.tiles.mapbox.com',
      },
    ],
  },

  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        ...securityHeaders,
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://api.mapbox.com https://*.mapbox.com https://plausible.workbits.io",
            "style-src 'self' 'unsafe-inline' https://api.mapbox.com",
            "img-src 'self' data: blob: https:",
            "font-src 'self' data:",
            "connect-src 'self' https://api.mapbox.com https://*.tiles.mapbox.com https://*.mapbox.com https://events.mapbox.com https://plausible.workbits.io",
            "worker-src 'self' blob:",
          ].join('; '),
        },
      ],
    },
  ],
}

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig)
