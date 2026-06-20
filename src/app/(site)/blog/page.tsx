import { getAllPosts } from '@/lib/mdx'
import BlogContent from '@/components/BlogContent'

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

export default async function BlogIndexPage() {
  const posts = await getAllPosts()
  const categories = [
    ...new Set(posts.map(p => p.frontmatter.category)),
  ].filter(Boolean) as string[]

  // Tüm postlar static prerender edilir; kategori filtresi BlogContent içinde
  // client-side yapılır (searchParams server'da okunmaz → sayfa static/ISR).
  return <BlogContent posts={posts} categories={categories} />
}
