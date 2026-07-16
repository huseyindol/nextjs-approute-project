import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

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

// NOT: Bilinçli olarak unstable_cache KULLANILMIYOR. İçerik repo'daki lokal .mdx
// dosyalarından okunur (build/SSG anında hazır, okuma maliyeti ~ms). unstable_cache,
// Vercel Data Cache'i deploy'lar arası taşıdığı için bir kez boş/bozuk sonuç
// cache'lendiğinde blog listesi 24 saat boş kalıyordu (daha önce key bump'la
// geçiştirildi: 'blog-posts-fs-v2026-05'). Kök neden bu sarmalayıcıydı.
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
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
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    if (!fs.existsSync(rootDirectory)) {
      // Sessizce boş dönmek listeyi "yok" gösterir — kökten görünür yapalım.
      console.error('[mdx] Blog dizini bulunamadı:', rootDirectory)
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
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  const categories = new Set(posts.map(post => post.frontmatter.category))
  return Array.from(categories).filter(Boolean)
}
