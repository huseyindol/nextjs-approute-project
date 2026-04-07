import ScrollToTop from '@/components/ScrollToTopButton'
import { PersonJsonLd } from '@/components/JsonLd'
import { WebVitals } from '@/components/WebVitals'
import Providers from '@/providers/Providers'
import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from 'next-themes'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { cookies } from 'next/headers'
import Script from 'next/script'
import Datalayer from '../components/Datalayer'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // FOUT (Flash of Unstyled Text) yerine swap kullan
  preload: true, // Fontları daha erken yükle
  adjustFontFallback: true, // CLS için fallback font ayarla
  weight: ['400', '500', '600', '700'], // Sadece kullanılan ağırlıklar
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  weight: ['400', '500', '600', '700'],
})

const SITE_URL = 'https://next.huseyindol.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Hüseyin DOL | Senior Frontend Developer',
    template: '%s | Hüseyin DOL',
  },
  description:
    '10+ yıllık deneyim ile React, Next.js ve TypeScript kullanarak ölçeklenebilir, performanslı ve kullanıcı dostu web uygulamaları geliştiriyorum. Ekip liderliği ve mentorluk konularında da deneyimliyim.',
  keywords: [
    'Hüseyin DOL',
    'Senior Frontend Developer',
    'Frontend Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript',
    'JavaScript',
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
    title: 'Hüseyin DOL | Senior Frontend Developer',
    description:
      '10+ yıllık deneyim ile React, Next.js ve TypeScript kullanarak ölçeklenebilir, performanslı web uygulamaları geliştiriyorum.',
    images: [
      {
        url: '/assets/img/huseyindol.png',
        width: 1200,
        height: 630,
        alt: 'Hüseyin DOL - Senior Frontend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hüseyin DOL | Senior Frontend Developer',
    description:
      '10+ yıllık deneyim ile React, Next.js ve TypeScript kullanarak ölçeklenebilir, performanslı web uygulamaları geliştiriyorum.',
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
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()

  // ReadonlyRequestCookies objesini serialize edilebilir formata çevir
  const cookiesData: Record<string, string> = {}
  cookieStore.getAll().forEach(cookie => {
    cookiesData[cookie.name] = cookie.value
  })
  // console.log('APP - LAYOUT')
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <GoogleTagManager gtmId="G-749L34H6ZZ" />
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-749L34H6ZZ"
        />

        <PersonJsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          themes={['light', 'dark']}
          disableTransitionOnChange
        >
          <Providers cookiesData={cookiesData}>
            <WebVitals />
            <Datalayer />
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
