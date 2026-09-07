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
 * ISR: getStaticProps + revalidate:3600 — sayfa build/revalidate anında bir kez
 * render edilip statik servis edilir; CMS istek başına DEĞİL, saatte bir çağrılır.
 * Ölçümle kanıtlandı: dinamik (GSSP) her istekte backend'e gidip RPS'i backend
 * gecikmesine mahkûm ediyordu (yük altında ~42 RPS); statik backend'den bağımsız
 * ~708 RPS. `content` props'a konmaz: liste yalnız frontmatter kullanır.
 */
export const getStaticProps: GetStaticProps<MakalelerPageProps> = async () => {
  const [allPosts, categories] = await Promise.all([
    getAllCmsPosts(),
    getAllCmsCategories(),
  ])

  const posts: MakaleListItem[] = allPosts.map(({ content, ...rest }) => rest)

  return { props: { posts, categories }, revalidate: 3600 }
}
