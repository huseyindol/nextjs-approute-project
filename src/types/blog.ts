export interface BlogFrontmatter {
  title: string
  description: string | null
  category: string | null
  coverImage: string | null
  publishedAt: string | null
  author: string | null
  readingTime: string | null
  order: number
}

export interface BlogPost {
  id: number
  slug: string
  content: string
  status: boolean
  frontmatter: BlogFrontmatter
}
