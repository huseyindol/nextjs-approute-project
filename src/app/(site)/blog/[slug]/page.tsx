import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { MdxContent } from '@/components/mdx-content'
import AdSenseAd from '@/components/AdSenseAd'
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

const cardCategoryColors: Record<string, string> = {
  Frontend: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Backend:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  DevOps:
    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  AI: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  Mobile: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
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

  const categoryKeywords: Record<string, string[]> = {
    Backend: [
      'Spring Boot',
      'Java',
      'RBAC',
      'Redis',
      'RabbitMQ',
      'JWT',
      'PostgreSQL',
      'Multitenancy',
      'Spring Security',
      'OAuth2',
      'JPA',
      'Hibernate',
      'Zipkin',
      'Actuator',
    ],
    DevOps: [
      'Kubernetes',
      'Docker',
      'PostgreSQL',
      'CI/CD',
      'GitHub Actions',
      'Helm',
      'k3s',
      'Traefik',
      'Prometheus',
      'Grafana',
      'Redis',
      'RabbitMQ',
      'StatefulSet',
      'HPA',
    ],
    Frontend: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'SEO',
      'Performance',
      'App Router',
      'Server Components',
    ],
    AI: [
      'MCP',
      'Model Context Protocol',
      'Claude',
      'LLM',
      'AI Agents',
      'Anthropic',
      'Prompt Engineering',
      'ChatGPT',
    ],
    Mobile: [
      'React Native',
      'Expo',
      'Mobile Development',
      'iOS',
      'Android',
      'Reanimated',
      'Navigation',
    ],
  }

  const baseKeywords = [
    'Hüseyin DOL',
    'huseyindol',
    'Yazılım',
    'Teknoloji',
    'Makale',
  ]
  const keywords = [...(categoryKeywords[category] ?? []), ...baseKeywords]

  return {
    title: `${title} | Hüseyin DOL`,
    description: description,
    keywords,
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
        ? [{ url: coverImage, width: 1200, height: 630, alt: title }]
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
  return posts.map(post => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: Readonly<Props>) {
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'

  const categoryColor =
    cardCategoryColors[post.frontmatter.category] ??
    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'

  return (
    <div className="min-h-screen bg-background">
      <ArticleJsonLd
        title={post.frontmatter.title}
        description={
          (post.frontmatter.description as string) || post.frontmatter.title
        }
        url={`${siteUrl}/blog/${post.slug}`}
        imageUrl={post.frontmatter.coverImage}
        datePublished={post.frontmatter.publishedAt as string}
        dateModified={post.frontmatter.publishedAt as string}
        authorName={post.frontmatter.author}
        articleSection={post.frontmatter.category}
        wordCount={post.content.split(/\s+/).length}
      />

      {/* Cover image hero */}
      {post.frontmatter.coverImage ? (
        <div className="relative h-72 w-full overflow-hidden md:h-96">
          <Image
            src={post.frontmatter.coverImage}
            alt={post.frontmatter.title}
            fill
            className="object-cover"
            priority
          />
          <div className="via-background/40 absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
      ) : (
        <div className="h-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
      )}

      <div className="container mx-auto px-6 pb-24">
        <article className="mx-auto max-w-3xl">
          {/* Back link */}
          <div className="mb-8 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Makalelere Dön
            </Link>
          </div>

          {/* Article header */}
          <header className="mb-12 space-y-5">
            <Badge
              className={`border-0 text-xs font-semibold ${categoryColor}`}
            >
              {post.frontmatter.category}
            </Badge>

            <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
              {post.frontmatter.title}
            </h1>

            {post.frontmatter.description && (
              <p className="text-lg text-muted-foreground">
                {post.frontmatter.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-5 border-t border-border pt-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-border">
                  <Image
                    src="https://github.com/huseyindol.png"
                    alt="Hüseyin DOL"
                    width={36}
                    height={36}
                  />
                </div>
                <span className="font-semibold text-foreground">
                  {post.frontmatter.author}
                </span>
              </div>

              <span className="flex items-center gap-1.5">
                <CalendarIcon className="h-4 w-4" />
                <time dateTime={post.frontmatter.publishedAt}>
                  {new Date(post.frontmatter.publishedAt).toLocaleDateString(
                    'tr-TR',
                    { month: 'long', day: 'numeric', year: 'numeric' },
                  )}
                </time>
              </span>

              {post.frontmatter.readingTime && (
                <span className="flex items-center gap-1.5">
                  <ClockIcon className="h-4 w-4" />
                  {post.frontmatter.readingTime} dk okuma
                </span>
              )}
            </div>
          </header>

          {/* Ad — makale başlangıcı */}
          <AdSenseAd slot="1350227419" />

          {/* MDX content */}
          <MdxContent source={post.content} />

          {/* Ad — makale sonu */}
          <AdSenseAd slot="3777093516" />
        </article>
      </div>
    </div>
  )
}
