import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hüseyin DOL | Senior Frontend Developer',
    short_name: 'Hüseyin DOL',
    description:
      '10+ yıllık deneyim ile React, Next.js ve TypeScript kullanarak ölçeklenebilir, performanslı ve kullanıcı dostu web uygulamaları geliştiriyorum.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/assets/img/favicon.ico',
        sizes: '192x192',
        type: 'image/x-icon',
      },
      {
        src: '/assets/img/huseyindol.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
