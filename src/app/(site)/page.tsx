import { ErrorBoundary } from '@/components/ErrorBoundary'
import Experience from '@/components/experience'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import dynamicImport from 'next/dynamic'

const ExperienceWithErrorDemo = dynamicImport(
  () => import('@/components/ExperienceWithErrorDemo'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  },
)

// ✨ Cache Strategy: ISR with dynamic searchParams support
export const revalidate = 3600 // 1 saat (3600 saniye) sonra yeniden oluştur

// Page props interface
interface HomeProps {
  searchParams?: Promise<{ industry?: string }>
}

export default async function Home({ searchParams }: HomeProps) {
  // searchParams'ı await et (Next.js 15+ async searchParams)
  const resolvedSearchParams = await searchParams

  return (
    <main className="min-h-screen">
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary>
        <Skills />
      </ErrorBoundary>
      <ErrorBoundary>
        <Experience searchParams={resolvedSearchParams} />
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
