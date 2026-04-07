import { ErrorBoundary } from '@/components/ErrorBoundary'
import Skills from '@/components/Skills'
import type { Metadata } from 'next'

const SITE_URL = 'https://next.huseyindol.com'

export const metadata: Metadata = {
  title: 'Yetenekler',
  description:
    'Hüseyin DOL teknik yetenekleri: React, Next.js, TypeScript, Node.js, Docker ve daha fazlası. 10+ yıllık deneyimle uzman seviyesinde frontend teknolojileri.',
  keywords: [
    'Hüseyin DOL',
    'Teknik Yetenekler',
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Docker',
    'Frontend Teknolojileri',
    'Yazılım',
    'Web Geliştirme',
  ],
  alternates: {
    canonical: `${SITE_URL}/skills`,
  },
  openGraph: {
    title: 'Yetenekler | Hüseyin DOL',
    description:
      'React, Next.js, TypeScript, Node.js, Docker ve daha fazlası. 10+ yıllık deneyimle uzman seviyesinde frontend teknolojileri.',
    url: `${SITE_URL}/skills`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yetenekler | Hüseyin DOL',
    description:
      'React, Next.js, TypeScript, Node.js, Docker ve daha fazlası. Uzman seviyesinde frontend teknolojileri.',
  },
}

export const revalidate = 3600

export default function SkillsPage() {
  return (
    <main className="min-h-screen">
      <ErrorBoundary>
        <Skills />
      </ErrorBoundary>
    </main>
  )
}
