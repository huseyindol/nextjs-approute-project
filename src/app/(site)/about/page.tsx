import { ErrorBoundary } from '@/components/ErrorBoundary'
import Hero from '@/components/Hero'
import type { Metadata } from 'next'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'

export const metadata: Metadata = {
  title: 'Hakkımda',
  description:
    'Hüseyin DOL hakkında: 10+ yıllık deneyime sahip Senior Frontend Developer. React, Next.js ve TypeScript uzmanlığı, ekip liderliği ve mentorluk deneyimi.',
  keywords: [
    'Hüseyin DOL',
    'Hakkımda',
    'Senior Frontend Developer',
    'Frontend Developer',
    'Yazılım Geliştirici',
    'React Developer',
    'Next.js Developer',
    'TypeScript',
    'İstanbul',
    'Biyografi',
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'Hakkımda | Hüseyin DOL',
    description:
      'Hüseyin DOL hakkında: 10+ yıllık deneyime sahip Senior Frontend Developer. React, Next.js ve TypeScript uzmanlığı.',
    url: `${SITE_URL}/about`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hakkımda | Hüseyin DOL',
    description:
      'Hüseyin DOL hakkında: 10+ yıllık deneyime sahip Senior Frontend Developer.',
  },
}

export const revalidate = 3600

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
    </main>
  )
}
