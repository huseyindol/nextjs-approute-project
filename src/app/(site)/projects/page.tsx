import ProjectsContent from '@/components/ProjectsContent'
import type { Metadata } from 'next'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'

export const metadata: Metadata = {
  title: 'Projelerim | Hüseyin DOL',
  description:
    'Elly headless CMS ekosistemi ve kişisel projelerim: Spring Boot backend, Next.js admin panel, portföy sitesi ve React Native mobil uygulama.',
  keywords: [
    'Elly CMS',
    'Spring Boot',
    'Java',
    'Next.js',
    'React Native',
    'Headless CMS',
    'Multitenant',
    'Hüseyin DOL',
    'Projeler',
    'Portfolio',
  ],
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    title: 'Projelerim | Hüseyin DOL',
    description:
      'Elly headless CMS ekosistemi: backend, admin panel, portföy sitesi ve mobil uygulama.',
    url: `${SITE_URL}/projects`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projelerim | Hüseyin DOL',
    description:
      'Elly headless CMS ekosistemi: backend, admin panel, portföy sitesi ve mobil uygulama.',
  },
}

export default function ProjectsPage() {
  return <ProjectsContent />
}
