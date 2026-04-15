import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { MdxContent } from '@/components/mdx-content'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Metadata } from 'next'
import { ArticleJsonLd } from '@/components/JsonLd'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams.slug)

  if (!post) {
    return { title: 'Makale Bulunamadı | Hüseyin DOL' }
  }

  const { title, description, category, coverImage, publishedAt, author } =
    post.frontmatter
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'
  const url = `${siteUrl}/blog/${post.slug}`

  // SEO ve LLM'ler için zenginleştirilmiş semantic etiketler
  return {
    title: `${title} | Hüseyin DOL`,
    description: description,
    keywords: [
      category,
      'Yazılım',
      'Frontend',
      'Teknoloji',
      'Next.js',
      'React',
      'Makale',
      'Hüseyin DOL',
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      type: 'article',
      publishedTime: publishedAt,
      authors: [author],
      tags: [category],
      images: coverImage
        ? [
            {
              url: coverImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: coverImage ? [coverImage] : [],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map(post => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: Readonly<Props>) {
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto min-h-screen bg-transparent px-6 pb-20 pt-32">
      <ArticleJsonLd
        title={post.frontmatter.title}
        description={
          (post.frontmatter.description as string) || post.frontmatter.title
        }
        url={`${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'}/blog/${post.slug}`}
        imageUrl={post.frontmatter.coverImage}
        datePublished={post.frontmatter.publishedAt as string}
        authorName={post.frontmatter.author}
      />
      <article className="mx-auto max-w-7xl">
        <div className="mb-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Makalelere Dön
          </Link>
        </div>

        <header className="mb-12 space-y-6">
          <div className="flex gap-3">
            <Badge className="pointer-events-none bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300">
              {post.frontmatter.category}
            </Badge>
          </div>

          <h1 className="pb-2 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-white">
            {post.frontmatter.title}
          </h1>

          <div className="flex items-center gap-6 text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <Image
                  src="https://github.com/huseyindol.png"
                  alt="Hüseyin DOL"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {post.frontmatter.author}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <CalendarIcon className="h-4 w-4" />
              <time dateTime={post.frontmatter.publishedAt}>
                {new Date(post.frontmatter.publishedAt).toLocaleDateString(
                  'tr-TR',
                  {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  },
                )}
              </time>
            </div>

            {post.frontmatter.readingTime && (
              <div className="flex items-center gap-2 text-sm">
                <ClockIcon className="h-4 w-4" />
                <span>{post.frontmatter.readingTime} min read</span>
              </div>
            )}
          </div>
        </header>

        {post.frontmatter.coverImage && (
          <div className="aspect-2/1 relative mb-16 w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-slate-900/5">
            <Image
              src={post.frontmatter.coverImage}
              alt={post.frontmatter.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="lg:pr-32">
          <MdxContent source={post.content} />
        </div>
      </article>
    </div>
  )
}
