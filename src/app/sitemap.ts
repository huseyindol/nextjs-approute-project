import { getAllPosts } from '@/lib/mdx'
import type { MetadataRoute } from 'next'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/experience`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/skills`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // Higher priority for deep technical articles (Backend/DevOps)
  const highPrioritySlugs = new Set([
    'backend-java-elly',
    'devops-kubernetes-master',
    'devops-docker-postgresql',
    'devops-postgresql',
  ])

  const posts = await getAllPosts()
  const dynamicBlogRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.frontmatter.publishedAt
      ? new Date(post.frontmatter.publishedAt)
      : lastModified,
    changeFrequency: 'monthly' as const,
    priority: highPrioritySlugs.has(post.slug) ? 0.9 : 0.8,
  }))

  return [...staticRoutes, ...dynamicBlogRoutes]
}
