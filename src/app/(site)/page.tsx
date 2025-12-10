import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Experience from '@/components/experience'

// export async function generateMetadata(): Promise<Metadata> {
//   const page: APIResponseSuccessType<Page> = await fetcher(
//     `${process.env.NEXT_PUBLIC_HOST}/api/page?slug=home`,
//     {
//       next: {
//         revalidate: 300,
//       },
//     },
//   )

//   const formatMeta = formatMetadata(
//     page.data as unknown as Page & { pageSEO: PageSEO },
//   )
//   return {
//     ...formatMeta,
//   }
// }

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Skills />
      <Experience />

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
