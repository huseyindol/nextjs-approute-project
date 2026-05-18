import { unstable_cache } from 'next/cache'
import type { BlogFrontmatter, BlogPost } from '@/types/blog'

export type { BlogFrontmatter, BlogPost }

const API_BASE = process.env.NEXT_PUBLIC_API
const TENANT_ID = process.env.NEXT_PUBLIC_DEFAULT_TENANT ?? 'tenant1'

interface CmsPost {
  id: number
  title: string
  content: string
  slug: string
  status: boolean
  orderIndex: number | null
  description: string | null
  category: string | null
  coverImage: string | null
  publishedAt: string | null
  author: string | null
  readingTime: string | null
  seoInfo: {
    title: string | null
    description: string | null
    keywords: string | null
  } | null
}

interface ApiResponse<T> {
  result: boolean
  message?: string
  data: T
}

async function fetchAllPosts(): Promise<CmsPost[]> {
  const res = await fetch(
    `${API_BASE}/api/v1/public/${TENANT_ID}/posts/list/summary`,
    { next: { tags: ['cms-posts'] } },
  )
  if (!res.ok) throw new Error(`Posts fetch failed: ${res.status}`)
  const json: ApiResponse<CmsPost[]> = await res.json()
  if (!json.result) throw new Error(json.message ?? 'API error')
  return json.data
}

async function fetchPostBySlug(slug: string): Promise<CmsPost | null> {
  const res = await fetch(
    `${API_BASE}/api/v1/public/${TENANT_ID}/posts/slug/${slug}`,
    { next: { tags: ['cms-posts', `cms-post-${slug}`] } },
  )
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Post fetch failed: ${res.status}`)
  const json: ApiResponse<CmsPost> = await res.json()
  if (!json.result) return null
  return json.data
}

function toBlogPost(post: CmsPost): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    content: post.content ?? '',
    status: post.status ?? false,
    frontmatter: {
      title: post.title,
      description: post.description ?? null,
      category: post.category ?? null,
      coverImage: post.coverImage ?? null,
      publishedAt: post.publishedAt ?? null,
      author: post.author ?? null,
      readingTime: post.readingTime ?? null,
      order: post.orderIndex ?? 0,
    },
  }
}

export const getAllCmsPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    const posts = await fetchAllPosts()
    return posts
      .filter(p => p.status)
      .map(toBlogPost)
      .sort((a, b) => {
        if (a.frontmatter.order !== b.frontmatter.order)
          return a.frontmatter.order - b.frontmatter.order
        const dateA = a.frontmatter.publishedAt
          ? new Date(a.frontmatter.publishedAt).getTime()
          : 0
        const dateB = b.frontmatter.publishedAt
          ? new Date(b.frontmatter.publishedAt).getTime()
          : 0
        return dateB - dateA
      })
  },
  ['cms-posts'],
  { revalidate: 86400, tags: ['cms-posts'] },
)

export const getCmsPostBySlug = unstable_cache(
  async (slug: string): Promise<BlogPost | null> => {
    const post = await fetchPostBySlug(slug)
    if (!post) return null
    return toBlogPost(post)
  },
  ['cms-post'],
  { revalidate: 86400, tags: ['cms-posts'] },
)

export async function getAllCmsCategories(): Promise<string[]> {
  const posts = await getAllCmsPosts()
  const categories = new Set(
    posts.map(p => p.frontmatter.category).filter(Boolean),
  )
  return Array.from(categories) as string[]
}
