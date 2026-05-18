import { getAllCmsPosts, getAllCmsCategories } from '@/lib/blog'
import MakalelerContent from '@/components/MakalelerContent'

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
    canonical: `${SITE_URL}/makaleler`,
  },
  openGraph: {
    title: 'Makalelerim | Hüseyin DOL',
    description:
      'Yazılım geliştirme, mimari kararlar, AI entegrasyonları, Mobile ve Frontend üzerine derlediğim teknik notlar.',
    url: `${SITE_URL}/makaleler`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Makalelerim | Hüseyin DOL',
    description:
      'Yazılım geliştirme, mimari kararlar, AI entegrasyonları, Mobile ve Frontend üzerine derlediğim teknik notlar.',
  },
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function MakalelerPage(props: Readonly<Props>) {
  const searchParams = await props.searchParams
  const categoryFilter = searchParams.category as string | undefined

  const [allPosts, categories] = await Promise.all([
    getAllCmsPosts(),
    getAllCmsCategories(),
  ])

  const posts = categoryFilter
    ? allPosts.filter(post => post.frontmatter.category === categoryFilter)
    : allPosts

  return (
    <MakalelerContent
      posts={posts}
      categories={categories}
      categoryFilter={categoryFilter}
    />
  )
}
