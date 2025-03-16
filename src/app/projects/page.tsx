import Projects from '@/components/Projects'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projeler | Hüseyin DOL Portfolio',
  description: 'Geliştirdiğim web projeleri ve çalışmalarım',
  alternates: {
    canonical: 'https://huseyindol.site/projects'
  }
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-20">
      <Projects />
    </main>
  )
} 