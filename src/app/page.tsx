import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Experience from '@/components/experience'
import { metadataHomePage } from '@/data/mockData'

// Force Static Site Generation (SSG) for this route
export const dynamic = 'force-static'
// 5 saat (18000 sn) sonra yeniden oluştur — değer statik olmalı
export const revalidate = 18000

// Export metadata from service data
export const metadata = metadataHomePage

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Skills />
      <Experience />
    </main>
  )
}
