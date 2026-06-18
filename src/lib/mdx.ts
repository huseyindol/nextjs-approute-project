import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { unstable_cache } from 'next/cache'

export interface BlogFrontmatter {
  title: string
  description: string
  publishedAt: string
  category: string
  author: string
  coverImage?: string
  readingTime?: string
  order?: number
  [key: string]: unknown
}

export interface BlogPost {
  slug: string
  frontmatter: BlogFrontmatter
  content: string
}

const rootDirectory = path.join(process.cwd(), 'src', 'data', 'blog')

export const getPostBySlug = unstable_cache(
  async (slug: string): Promise<BlogPost | null> => {
    try {
      const realSlug = slug.replace(/\.mdx$/, '')
      const filePath = path.join(rootDirectory, `${realSlug}.mdx`)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContent)

      return {
        slug: realSlug,
        frontmatter: data as BlogFrontmatter,
        content,
      }
    } catch (error) {
      console.error('Error getting post params:', error)
      return null
    }
  },
  ['post-by-slug'],
  { revalidate: 86400, tags: ['blog-posts'] },
)

export const getAllPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    try {
      if (!fs.existsSync(rootDirectory)) {
        return []
      }
      const files = fs.readdirSync(rootDirectory)
      const posts = files
        .filter(file => file.endsWith('.mdx'))
        .map(file => {
          const filePath = path.join(rootDirectory, file)
          const fileContent = fs.readFileSync(filePath, 'utf8')
          const { data, content } = matter(fileContent)
          const slug = file.replace(/\.mdx$/, '')

          return {
            slug,
            frontmatter: data as BlogFrontmatter,
            content,
          }
        })
        .sort((a, b) => {
          // Kural: en yeni yayınlanan (publishedAt) her zaman en üstte —
          // son eklediğimiz bloglar listede başta gelir. Aynı gün yayınlananlar
          // `order` (asc) ile sıralanır → çok bölümlü seriler doğru sırada (1→2→3).
          const dateA = new Date(a.frontmatter.publishedAt).getTime()
          const dateB = new Date(b.frontmatter.publishedAt).getTime()

          if (dateA !== dateB) {
            return dateB - dateA
          }

          const orderA = a.frontmatter.order ?? 99
          const orderB = b.frontmatter.order ?? 99
          return orderA - orderB
        })

      return posts
    } catch (error) {
      console.error('Error reading blog posts', error)
      return []
    }
  },
  ['blog-posts-fs-v2026-05'],
  { revalidate: 86400, tags: ['blog-posts'] },
)

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  const categories = new Set(posts.map(post => post.frontmatter.category))
  return Array.from(categories).filter(Boolean)
}
