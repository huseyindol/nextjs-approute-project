import ScrollToTop from '@/components/ScrollToTop'
import { WebVitals } from '@/components/WebVitals'
import Providers from '@/providers/Providers'
import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
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

// Metadata export for better performance (static instead of async)
export const metadata: Metadata = {
  title: {
    default: 'Hüseyin DOL | Senior Frontend Developer',
    template: '%s | Hüseyin DOL',
  },
  description:
    '10+ yıllık deneyim ile React, Next.js ve TypeScript kullanarak modern web uygulamaları geliştiriyorum.',
  keywords: [
    'Frontend Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Web Development',
  ],
  authors: [{ name: 'Hüseyin DOL' }],
  creator: 'Hüseyin DOL',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://next.huseyindol.site',
    siteName: 'Hüseyin DOL Portfolio',
    title: 'Hüseyin DOL | Senior Frontend Developer',
    description:
      '10+ yıllık deneyim ile React, Next.js ve TypeScript kullanarak modern web uygulamaları geliştiriyorum.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hüseyin DOL | Senior Frontend Developer',
    description:
      '10+ yıllık deneyim ile React, Next.js ve TypeScript kullanarak modern web uygulamaları geliştiriyorum.',
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
  // Performance: Preconnect to external domains
  other: {
    'X-DNS-Prefetch-Control': 'on',
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
  console.log('APP - LAYOUT')
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
