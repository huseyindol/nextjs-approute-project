import MakalelerContent from '@/components/MakalelerContent'
import { getAllCmsCategories, getAllCmsPosts } from '@/lib/blog'
import type { BlogPost } from '@/types/blog'
import { Seo } from '@/lib/seo'
import type { GetServerSideProps } from 'next'

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
 * GEÇİCİ: dinamik (getServerSideProps) — "sadece router değişiminin" RPS'ini eski App
 * Router'la (o da ƒ idi) elmayla-elma karşılaştırmak için. Ölçüm sonrası tekrar
 * getStaticProps + revalidate:3600'e çekilecek (bkz. git: Faz 3b).
 *
 * `content` props'a konmaz: liste yalnız frontmatter kullanır.
 */
export const getServerSideProps: GetServerSideProps<
  MakalelerPageProps
> = async () => {
  const [allPosts, categories] = await Promise.all([
    getAllCmsPosts(),
    getAllCmsCategories(),
  ])

  const posts: MakaleListItem[] = allPosts.map(({ content, ...rest }) => rest)

  return { props: { posts, categories } }
}
