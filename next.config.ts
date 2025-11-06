import bundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'

import '@/env'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  cacheComponents: true,
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],

  images: {
    formats: ['image/avif', 'image/webp'],
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
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://api.mapbox.com https://*.mapbox.com https://plausible.workbits.io https://static.cloudflareinsights.com",
            "style-src 'self' 'unsafe-inline' https://api.mapbox.com",
            "img-src 'self' data: blob: https:",
            "font-src 'self' data:",
            "connect-src 'self' https://api.mapbox.com https://*.tiles.mapbox.com https://*.mapbox.com https://events.mapbox.com https://plausible.workbits.io https://ipapi.co",
            "worker-src 'self' blob:",
          ].join('; '),
        },
      ],
    },
    {
      source: '/fonts/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    {
      source: '/_next/static/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
  ],
}

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(nextConfig)
