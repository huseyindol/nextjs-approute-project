import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ScrollToTop from '@/components/ScrollToTop'
import Providers from '@/providers/Providers'
import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Hüseyin DOL | Portfolio',
  description: "Hüseyin DOL'un kişisel portfolio sitesi",
  keywords: [
    'Hüseyin DOL',
    'Portfolio',
    'Web Developer',
    'Frontend Developer',
    'JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB, MySQL, PostgreSQL, Docker, Kubernetes',
  ],
  authors: [{ name: 'Hüseyin DOL' }],
  creator: 'Hüseyin DOL',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://next.huseyindol.site',
    title: 'Hüseyin DOL | Portfolio',
    description: "Hüseyin DOL'un kişisel portfolio sitesi",
    siteName: 'Hüseyin DOL Portfolio',
    images: {
      url: '/assets/img/huseyindol.png',
      width: 500,
      height: 500,
      alt: 'Hüseyin DOL',
    },
  },
  twitter: {
    card: 'summary',
    title: 'Hüseyin DOL | Portfolio',
    description: "Hüseyin DOL'un kişisel portfolio sitesi",
  },
  icons: {
    icon: '/assets/img/favicon.ico',
    apple: '/assets/img/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/img/favicon.ico" />
        <GoogleTagManager gtmId="G-749L34H6ZZ" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          themes={['light', 'dark']}
          disableTransitionOnChange
        >
          <Providers>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ScrollToTop />
            <Analytics />
            <SpeedInsights />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
