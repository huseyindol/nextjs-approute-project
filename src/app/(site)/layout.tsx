import Footer from '@/components/Footer'
import Header from '@/components/Header'
import type { Metadata } from 'next'

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
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
