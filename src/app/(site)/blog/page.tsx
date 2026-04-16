import { getAllPosts } from '@/lib/mdx'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarIcon, ClockIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'

export const metadata = {
  title: 'Makalelerim | Hüseyin DOL',
  description:
    'Yazılım geliştirme, mimari kararlar, AI entegrasyonları, Mobile ve Frontend üzerine derlediğim teknik notlar ve deneyimlerim.',
  keywords: [
    'Blog',
    'Hüseyin DOL Blog',
    'Yazılım Makaleleri',
    'React.js',
    'Next.js',
    'Frontend Development',
    'Model Context Protocol',
    'Tech Blog',
  ],
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Makalelerim | Hüseyin DOL',
    description:
      'Yazılım geliştirme, mimari kararlar, AI entegrasyonları, Mobile ve Frontend üzerine derlediğim teknik notlar.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Makalelerim | Hüseyin DOL',
    description:
      'Yazılım geliştirme, mimari kararlar, AI entegrasyonları, Mobile ve Frontend üzerine derlediğim teknik notlar.',
  },
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogIndexPage(props: Readonly<Props>) {
  const searchParams = await props.searchParams
  const categoryFilter = searchParams.category as string | undefined

  const allPosts = await getAllPosts()
  const categories = [
    ...new Set(allPosts.map(p => p.frontmatter.category)),
  ].filter(Boolean)

  const posts = categoryFilter
    ? allPosts.filter(post => post.frontmatter.category === categoryFilter)
    : allPosts

  return (
    <div className="min-h-screen bg-slate-50 pb-20 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="bg-linear-to-br relative overflow-hidden from-indigo-900 via-slate-900 to-emerald-950 px-6 py-32 text-center text-white md:py-40">
        <div className="mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] absolute inset-0 bg-white/5" />
        <div className="relative mx-auto mt-8 max-w-4xl space-y-6 md:mt-12">
          <Badge className="border border-emerald-500/50 bg-emerald-500/20 px-4 py-1.5 font-semibold text-emerald-300 hover:bg-emerald-500/30">
            Kişisel Deneyimler
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Makalelerim
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-300 md:text-xl">
            Yazılım geliştirme süreçleri, kariyer deneyimlerim ve modern
            teknolojiler üzerine teknik notlarım.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 pt-16">
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <Link href="/blog">
            <Badge
              variant={categoryFilter === undefined ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2 text-sm"
            >
              All
            </Badge>
          </Link>
          {categories.map(category => (
            <Link
              key={category}
              href={`/blog?category=${encodeURIComponent(category)}`}
            >
              <Badge
                variant={categoryFilter === category ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2 text-sm"
              >
                {category}
              </Badge>
            </Link>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
                {post.frontmatter.coverImage && (
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={post.frontmatter.coverImage}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="bg-linear-to-t absolute inset-0 from-slate-900/60 to-transparent" />
                    <Badge className="absolute bottom-4 left-4 border border-white/30 bg-white/20 text-white backdrop-blur-md hover:bg-white/30">
                      {post.frontmatter.category}
                    </Badge>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-3 text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                    {post.frontmatter.title}
                  </h3>
                  <p className="mb-6 line-clamp-3 flex-1 text-slate-600 dark:text-slate-400">
                    {post.frontmatter.description}
                  </p>
                  <div className="mt-auto flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon className="h-4 w-4" />
                      <time dateTime={post.frontmatter.publishedAt}>
                        {new Date(
                          post.frontmatter.publishedAt,
                        ).toLocaleDateString('tr-TR', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                    {post.frontmatter.readingTime && (
                      <div className="flex items-center gap-1.5">
                        <ClockIcon className="h-4 w-4" />
                        <span>{post.frontmatter.readingTime} min read</span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
