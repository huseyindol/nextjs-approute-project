import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Experience from '@/components/experience'
import { APIResponseSuccessType } from '@/types/APITypes'
import { formatMetadata } from '@/utils'
import { fetcher } from '@/utils/services/fetcher'
import { Page, PageSEO } from '@prisma/client'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page: APIResponseSuccessType<Page> = await fetcher(
    `${process.env.NEXT_PUBLIC_HOST}/api/page?slug=home`,
    {
      next: {
        revalidate: 300,
      },
    },
  )

  const formatMeta = formatMetadata(
    page.data as unknown as Page & { pageSEO: PageSEO },
  )
  return {
    ...formatMeta,
  }
}

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Skills />
      <Experience />
    </main>
  )
}
