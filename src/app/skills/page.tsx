import Skills from '@/components/Skills'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yetenekler | Hüseyin DOL Portfolio',
  description: 'Frontend geliştirme, UI/UX tasarım ve diğer teknik yeteneklerim',
  alternates: {
    canonical: 'https://next.huseyindol.site/skills'
  }
}

export default function SkillsPage() {
  return (
    <main className="min-h-screen pt-20">
      <Skills />
    </main>
  )
} 