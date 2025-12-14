import type { NextConfig } from 'next'

// Validate environment variables at build time
import './src/lib/env'

const nextConfig: NextConfig = {
  output: 'standalone',
  /* config options here */
  experimental: {
    // Geliştirme ortamında metadata sorunu için
    optimizeCss: false,
  },
  serverExternalPackages: ['@prisma/client'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
