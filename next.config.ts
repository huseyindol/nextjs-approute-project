import bundleAnalyzer from '@next/bundle-analyzer'

// Validate environment variables at build time
import './src/lib/env'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
})

/** Oyun export’u aynı dosya adlarıyla güncellenince mobil cache kırılsın diye (iframe + revalidate). */
const matchingGameAssetVersion =
  process.env.NEXT_PUBLIC_MATCHING_GAME_ASSET_VERSION?.trim() ||
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) ||
  ''

const nextConfig = {
  // NOT: `output: 'standalone'` KALDIRILDI. Bu proje Vercel'e deploy ediliyor ve
  // Vercel paketlemeyi/file tracing'i kendisi yapar; standalone self-host/Docker
  // içindir ve bu repoda hiçbir şey `.next/standalone` çıktısını tüketmiyor
  // (Dockerfile yok; docker-compose.yml yalnızca Dependency-Track için).
  // Next 16.3.1 ile birlikte standalone, Vercel'in `onBuildComplete` adımının
  // beklediği `.next/next-server.js.nft.json` trace dosyasını bulamamasına ve
  // deploy'un ENOENT ile düşmesine yol açıyordu (build'in kendisi başarılıydı).

  env: {
    NEXT_PUBLIC_MATCHING_GAME_ASSET_VERSION: matchingGameAssetVersion,
  },

  // NOT: Next 16.3'te stabilleşen `typedRoutes: true` denendi ve 14 gerçek bulgu
  // çıkardı (var olmayan /admin rotalarına linkler + dış URL'lerin next/link ile
  // kullanılması). Açmak bu çağrı yerlerinin düzeltilmesini gerektirdiğinden ayrı
  // bir değişikliğe bırakıldı — bu PR yalnızca sürüm yükseltmesini kapsıyor.

  experimental: {
    optimizeCss: true,
    // Not: `experimental.ppr` 16.3'te deprecate edildi (top-level `cacheComponents`'a
    // taşındı). Burada zaten `false` idi (= varsayılan davranış), o yüzden anahtar
    // tamamen kaldırıldı — PPR/Cache Components açmak `use cache` direktifleri
    // gerektirir ve ayrı bir mimari karardır.
  },

  // Force metadata to be in head for all bots
  // Empty regex = matches nothing = no bots are HTML-limited
  htmlLimitedBots: /.*/,

  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'api.huseyindol.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http' as const,
        hostname: 'localhost',
        port: '8080',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: '**.pollinations.ai',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Performance: Headers for caching
  async headers() {
    return [
      // Godot Web export (SharedArrayBuffer / crossOriginIsolated)
      {
        source: '/assets/games/matching/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=1800, s-maxage=1800, must-revalidate',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // AI arama motorları için llms.txt dosyaları
      {
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'X-Robots-Tag', value: 'all' },
        ],
      },
      {
        source: '/llms-full.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'X-Robots-Tag', value: 'all' },
        ],
      },
    ]
  },
}

export default withBundleAnalyzer(nextConfig)
