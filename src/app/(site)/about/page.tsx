import { ErrorBoundary } from '@/components/ErrorBoundary'
import Hero from '@/components/Hero'
import type { Metadata } from 'next'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'

export const metadata: Metadata = {
  title: 'Hakkımda',
  description:
    'Hüseyin DOL hakkında: 10+ yıllık deneyime sahip Software Developer. React, Next.js, TypeScript ile frontend; Java ve Spring Boot ile backend uzmanlığı, ekip liderliği ve mentorluk deneyimi.',
  keywords: [
    'Hüseyin DOL',
    'Hakkımda',
    'Software Developer',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Yazılım Geliştirici',
    'React Developer',
    'Next.js Developer',
    'Java Developer',
    'Spring Boot',
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
      'Hüseyin DOL hakkında: 10+ yıllık deneyime sahip Software Developer. React, Next.js, TypeScript ile frontend; Java ve Spring Boot ile backend uzmanlığı.',
    url: `${SITE_URL}/about`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hakkımda | Hüseyin DOL',
    description:
      'Hüseyin DOL hakkında: 10+ yıllık deneyime sahip Software Developer.',
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
