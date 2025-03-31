import About from '@/components/About'
import Hero from '@/components/Hero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ana Sayfa | Hüseyin DOL Portfolio',
  description: 'Frontend Developer & UI/UX Designer olarak çalışmalarım ve deneyimlerim',
  alternates: {
    canonical: 'https://next.huseyindol.site'
  }
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
    </main>
  )
}
