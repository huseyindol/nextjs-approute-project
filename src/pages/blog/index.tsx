import BlogContent from '@/components/BlogContent'
import { getAllPosts, type BlogPost } from '@/lib/mdx'
import { Seo } from '@/lib/seo'
import type { GetStaticProps } from 'next'

/** Liste yalnız slug + frontmatter kullanır; MDX gövdesi taşınmaz (bkz. getStaticProps). */
type BlogListItem = Omit<BlogPost, 'content'>

interface BlogIndexProps {
  posts: BlogListItem[]
  categories: string[]
}

export default function BlogIndexPage({ posts, categories }: BlogIndexProps) {
  return (
    <>
      <Seo
        rawTitle="Makalelerim | Hüseyin DOL"
        description="Yazılım geliştirme, mimari kararlar, AI entegrasyonları, Mobile ve Frontend üzerine derlediğim teknik notlar ve deneyimlerim."
        canonical="/blog"
        keywords={[
          'Blog',
          'Hüseyin DOL Blog',
          'Yazılım Makaleleri',
          'React.js',
          'Next.js',
          'Frontend Development',
          'Model Context Protocol',
          'Tech Blog',
        ]}
      />
      <BlogContent posts={posts as BlogPost[]} categories={categories} />
    </>
  )
}

/**
 * Tüm postlar build'de üretilir; kategori filtresi BlogContent içinde client-side
 * yapılır (searchParams sunucuda okunmaz → sayfa statik kalır).
 *
 * ÖNEMLİ: `content` (MDX gövdesi) props'tan ÇIKARILIR. Pages Router'da getStaticProps
 * çıktısı __NEXT_DATA__ ile HTML'e gömülür; 27 makalenin tam metnini göndermek
 * sayfayı yüzlerce KB şişirirdi. Liste sadece frontmatter'a ihtiyaç duyuyor.
 */
export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const allPosts = await getAllPosts()

  const posts: BlogListItem[] = allPosts.map(({ slug, frontmatter }) => ({
    slug,
    frontmatter,
  }))

  const categories = [
    ...new Set(allPosts.map(p => p.frontmatter.category)),
  ].filter(Boolean) as string[]

  return { props: { posts, categories }, revalidate: 3600 }
}
