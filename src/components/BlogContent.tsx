'use client'
import { motion, useInView } from 'framer-motion'
import { CalendarIcon, ClockIcon, BookOpenIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { BlogPost } from '@/lib/mdx'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
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

interface BlogContentProps {
  posts: BlogPost[]
  categories: string[]
  categoryFilter: string | undefined
}

export default function BlogContent({
  posts,
  categories,
  categoryFilter,
}: BlogContentProps) {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-32 pt-32 text-white md:py-40 md:pt-40">
        <motion.div
          className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-emerald-600/15 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container relative mx-auto px-6">
          <motion.div
            ref={headerRef}
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <Badge className="mb-6 border border-emerald-400/30 bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-200">
              Teknik Makaleler
            </Badge>
            <h1 className="mb-5 text-4xl font-extrabold md:text-6xl">
              Makalelerim
            </h1>
            <p className="text-lg text-slate-300 md:text-xl">
              Yazılım geliştirme süreçleri, kariyer deneyimlerim ve modern
              teknolojiler üzerine teknik notlarım.
            </p>

            {/* Stats */}
            <div className="mt-10 flex justify-center gap-8 text-sm text-slate-400">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{posts.length}</p>
                <p>Makale</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {categories.length}
                </p>
                <p>Kategori</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="bg-background/80 sticky top-[65px] z-40 border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto py-4">
            <Link href="/blog">
              <span
                className={`inline-flex shrink-0 cursor-pointer items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  categoryFilter === undefined
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                Tümü
              </span>
            </Link>
            {categories.map(category => (
              <Link
                key={category}
                href={`/blog?category=${encodeURIComponent(category)}`}
              >
                <span
                  className={`inline-flex shrink-0 cursor-pointer items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                    categoryFilter === category
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <main className="bg-muted/20 min-h-[60vh] py-16">
        <div className="container mx-auto px-6">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center text-muted-foreground"
            >
              <BookOpenIcon className="mx-auto mb-4 h-12 w-12 opacity-30" />
              <p className="text-lg">Bu kategoride henüz makale yok.</p>
            </motion.div>
          ) : (
            <motion.div
              ref={gridRef}
              initial="hidden"
              animate={gridInView ? 'visible' : 'hidden'}
              variants={stagger}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {posts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}

function PostCard({ post }: { post: BlogPost }) {
  const category = post.frontmatter.category
  const badgeColor =
    cardCategoryColors[category] ??
    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'

  return (
    <motion.div variants={fadeInUp}>
      <Link href={`/blog/${post.slug}`}>
        <Card className="group flex h-full flex-col overflow-hidden border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          {post.frontmatter.coverImage && (
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={post.frontmatter.coverImage}
                alt={post.frontmatter.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge
                className={`absolute bottom-3 left-3 border-0 text-xs font-semibold ${badgeColor}`}
              >
                {category}
              </Badge>
            </div>
          )}

          {!post.frontmatter.coverImage && (
            <div className="to-muted/50 flex h-52 items-center justify-center bg-gradient-to-br from-muted">
              <Badge className={`border-0 text-xs font-semibold ${badgeColor}`}>
                {category}
              </Badge>
            </div>
          )}

          <div className="flex flex-1 flex-col p-6">
            <h2 className="mb-3 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
              {post.frontmatter.title}
            </h2>
            <p className="mb-6 line-clamp-3 flex-1 text-sm text-muted-foreground">
              {post.frontmatter.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="h-3.5 w-3.5" />
                <time dateTime={post.frontmatter.publishedAt}>
                  {new Date(post.frontmatter.publishedAt).toLocaleDateString(
                    'tr-TR',
                    { month: 'short', day: 'numeric', year: 'numeric' },
                  )}
                </time>
              </span>
              {post.frontmatter.readingTime && (
                <span className="flex items-center gap-1.5">
                  <ClockIcon className="h-3.5 w-3.5" />
                  {post.frontmatter.readingTime} dk
                </span>
              )}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}
