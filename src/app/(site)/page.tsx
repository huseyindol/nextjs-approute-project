import { ErrorBoundary } from '@/components/ErrorBoundary'
import dynamicImport from 'next/dynamic'
// import ExperienceWithErrorDemo from '@/components/ExperienceWithErrorDemo'
// import Hero from '@/components/Hero'
// import Skills from '@/components/Skills'
// import Experience from '@/components/experience'

const Hero = dynamicImport(() => import('@/components/Hero'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
})
const Skills = dynamicImport(() => import('@/components/Skills'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
})
const Experience = dynamicImport(() => import('@/components/experience'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
})
const ExperienceWithErrorDemo = dynamicImport(
  () => import('@/components/ExperienceWithErrorDemo'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  },
)

// ✨ Cache Strategy: ISR (Incremental Static Regeneration)
export const revalidate = 3600 // 1 saat (3600 saniye) sonra yeniden oluştur
export const dynamic = 'force-static' // Statik olarak oluştur
export const dynamicParams = true // Dynamic segments için

export default async function Home() {
  return (
    <main className="min-h-screen">
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary>
        <Skills />
      </ErrorBoundary>
      <ErrorBoundary>
        <Experience />
      </ErrorBoundary>

      {/* 🧪 ErrorBoundary Demo Section - Sadece Development */}
      {process.env.NODE_ENV === 'development' && (
        <ErrorBoundary>
          <ExperienceWithErrorDemo />
        </ErrorBoundary>
      )}

      {/* Server Actions Demo Section */}
      {/* <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Server Actions Demo
          </h2>
          <PostsFetcher />
        </div>
      </section> */}
    </main>
  )
}
