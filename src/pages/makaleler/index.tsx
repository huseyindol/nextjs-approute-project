import MakalelerContent from '@/components/MakalelerContent'
import { getAllCmsCategories, getAllCmsPosts } from '@/lib/blog'
import type { BlogPost } from '@/types/blog'
import { Seo } from '@/lib/seo'
import type { GetStaticProps } from 'next'

/** Liste yalnız slug + frontmatter kullanır; CMS gövdesi taşınmaz. */
type MakaleListItem = Omit<BlogPost, 'content'>

interface MakalelerPageProps {
  posts: MakaleListItem[]
  categories: string[]
}

export default function MakalelerPage({
  posts,
  categories,
}: MakalelerPageProps) {
  return (
    <>
      <Seo
        rawTitle="Makalelerim | Hüseyin DOL"
        description="Yazılım geliştirme, mimari kararlar, AI entegrasyonları, Mobile ve Frontend üzerine derlediğim teknik notlar ve deneyimlerim."
        canonical="/makaleler"
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
      <MakalelerContent posts={posts as BlogPost[]} categories={categories} />
    </>
  )
}

/**
 * App Router'da bu sayfa `searchParams.category`'yi SUNUCUDA okuduğu için dinamikti (ƒ).
 * Kategori filtresi MakalelerContent içine (client-side) alınarak sayfa statiğe çevrildi
 * — istek başına render yok, RPS tavanı yükseliyor.
 *
 * `content` props'a konmaz: liste yalnız frontmatter kullanıyor, CMS gövdeleri
 * __NEXT_DATA__'yı gereksiz şişirirdi.
 */
export const getStaticProps: GetStaticProps<MakalelerPageProps> = async () => {
  const [allPosts, categories] = await Promise.all([
    getAllCmsPosts(),
    getAllCmsCategories(),
  ])

  const posts: MakaleListItem[] = allPosts.map(({ content, ...rest }) => rest)

  return { props: { posts, categories }, revalidate: 3600 }
}
