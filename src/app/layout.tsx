import ScrollToTop from '@/components/ScrollToTop'
import Providers from '@/providers/Providers'
import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  icons: {
    icon: '/assets/img/favicon.ico',
    apple: '/assets/img/favicon.ico',
  },
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <GoogleTagManager gtmId="G-749L34H6ZZ" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          themes={['light', 'dark']}
          disableTransitionOnChange
        >
          <Providers>
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
