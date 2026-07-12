import { ClarityAnalytics } from '@/components/ClarityAnalytics'
import { PersonJsonLd } from '@/components/JsonLd'
import ScrollToTop from '@/components/ScrollToTopButton'
import { SessionRefresher } from '@/components/SessionRefresher'
import { WebVitals } from '@/components/WebVitals'
import Providers from '@/providers/Providers'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Geist, Geist_Mono } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import Datalayer from '../components/Datalayer'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true, // CLS için fallback font metrik eşleme
  weight: ['400', '500', '600', '700', '800'], // 800 = font-extrabold
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false, // Mono sadece kod blokları için, kritik path'te değil
  adjustFontFallback: true,
  weight: ['400', '500'], // Sadece gerçekten kullanılan weight'lar
})

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Hüseyin DOL | Software Developer',
    template: '%s | Hüseyin DOL',
  },
  description:
    '10+ yıllık deneyimimle React, Next.js ve TypeScript ile modern frontend, Java ve Spring Boot ile ölçeklenebilir backend çözümleri geliştiren bir Software Developer. Uçtan uca performanslı web uygulamaları, ekip liderliği ve mentorluk konularında deneyimliyim.',
  keywords: [
    'Hüseyin DOL',
    'huseyindol',
    'huseyin dol',
    'Software Developer',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'React Developer',
    'Next.js Developer',
    'Java Developer',
    'Spring Boot',
    'TypeScript',
    'JavaScript',
    'Java',
    'Web Development',
    'React',
    'Next.js',
    'İstanbul',
    'Türkiye',
    'Yazılım Geliştirici',
  ],
  authors: [{ name: 'Hüseyin DOL', url: SITE_URL }],
  creator: 'Hüseyin DOL',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SITE_URL,
    siteName: 'Hüseyin DOL | Portfolio',
    title: 'Hüseyin DOL | Software Developer',
    description:
      '10+ yıllık deneyimle React, Next.js, TypeScript (frontend) ve Java, Spring Boot (backend) ile uçtan uca, ölçeklenebilir ve performanslı web uygulamaları geliştiriyorum.',
    images: [
      {
        url: '/assets/img/huseyindol.png',
        width: 1200,
        height: 630,
        alt: 'Hüseyin DOL - Software Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hüseyin DOL | Software Developer',
    description:
      '10+ yıllık deneyimle React, Next.js, TypeScript (frontend) ve Java, Spring Boot (backend) ile uçtan uca, ölçeklenebilir ve performanslı web uygulamaları geliştiriyorum.',
    images: ['/assets/img/huseyindol.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/assets/img/favicon.ico',
    shortcut: '/assets/img/favicon.ico',
    apple: '/assets/img/favicon.ico',
  },
  alternates: {
    canonical: SITE_URL,
    // AI crawler'lar için llms.txt discovery
    types: {
      'text/plain': `${SITE_URL}/llms.txt`,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* DNS/TLS handshake'i kritik 3rd party kaynaklar için önceden yap */}
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://api.huseyindol.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <GoogleAnalytics gaId="G-ETR2NBJH5V" />
        <ClarityAnalytics />
        <NextTopLoader
          color="#6366f1"
          height={3}
          showSpinner={false}
          easing="ease"
          speed={200}
        />

        <PersonJsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          themes={['light', 'dark']}
          disableTransitionOnChange
        >
          <Providers cookiesData={{}}>
            <WebVitals />
            <Datalayer />
            <SessionRefresher />
            {children}
            <ScrollToTop />
            <Analytics />
            <SpeedInsights />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
