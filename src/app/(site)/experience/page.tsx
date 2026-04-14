import { ErrorBoundary } from '@/components/ErrorBoundary'
import Experience from '@/components/experience'
import type { Metadata } from 'next'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'

export const metadata: Metadata = {
  title: 'Deneyim',
  description:
    'Hüseyin DOL iş deneyimleri: 10+ yıllık frontend geliştirme kariyeri, çalıştığı şirketler, üstlendiği roller ve başarıları.',
  keywords: [
    'Hüseyin DOL',
    'İş Deneyimi',
    'Kariyer',
    'Frontend Developer',
    'React',
    'Next.js',
    'Software Engineer',
    'Özgeçmiş',
    'CV',
  ],
  alternates: {
    canonical: `${SITE_URL}/experience`,
  },
  openGraph: {
    title: 'Deneyim | Hüseyin DOL',
    description:
      'Hüseyin DOL iş deneyimleri: 10+ yıllık frontend geliştirme kariyeri, çalıştığı şirketler, üstlendiği roller ve başarıları.',
    url: `${SITE_URL}/experience`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deneyim | Hüseyin DOL',
    description:
      '10+ yıllık frontend geliştirme kariyeri, çalıştığı şirketler, üstlendiği roller ve başarıları.',
  },
}

export const revalidate = 3600

interface ExperiencePageProps {
  searchParams?: Promise<{ industry?: string }>
}

export default async function ExperiencePage({
  searchParams,
}: ExperiencePageProps) {
  const resolvedSearchParams = await searchParams

  return (
    <main className="min-h-screen pt-24 md:pt-32">
      <ErrorBoundary>
        <Experience searchParams={resolvedSearchParams} />
      </ErrorBoundary>
    </main>
  )
}
