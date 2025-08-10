import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Experience from '@/components/experience'
import { Metadata } from 'next'

// Force Static Site Generation (SSG) for this route
export const dynamic = 'force-static'
// 5 saat (18000 sn) sonra yeniden oluştur — değer statik olmalı
export const revalidate = 18000

export const metadata: Metadata = {
  title: 'Ana Sayfa | Hüseyin DOL Portfolio',
  description:
    'Frontend Developer & UI/UX Designer olarak çalışmalarım ve deneyimlerim',
  alternates: {
    canonical: 'https://next.huseyindol.site',
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Skills />
      <Experience />
    </main>
  )
}
