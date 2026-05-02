import { getPageBySlugService } from '@/services/site/pages.services'
import type { Metadata } from 'next'
import dynamicImport from 'next/dynamic'
import { PageResponseType, Page as PageType } from '../../../types/BaseResponse'
import GameComponent from '@/components/games/overtakeandparking/GameComponent'

export const dynamic = 'force-dynamic'

// Sabit SEO değerleri
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'
const SITE_NAME = 'Hüseyin DOL'

// Arcade URL ("/arcade") için kullanılacak slug
const PAGE_SLUG = 'arcade'

// Page props interface
interface ArcadePageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

// Dynamic page template component props
type PageTemplateProps = {
  pageInfo: PageType
  searchParams?: { industry?: string }
}

// Module-level cache — dynamic() must not be called inside render
const componentCache = new Map<string, React.ComponentType<PageTemplateProps>>()

function getTemplateComponent(template: string) {
  if (!componentCache.has(template)) {
    componentCache.set(
      template,
      dynamicImport<PageTemplateProps>(
        () => import(`@/components/dynamic/pages/${template}`),
      ),
    )
  }
  return componentCache.get(template)!
}

// Default fallback metadata
const DEFAULT_METADATA: Metadata = {
  title: `${SITE_NAME} | Arcade Oyunlar`,
  description:
    'Hüseyin DOL - Arcade Oyunlar. Makas ve Park Etme oyunlarını oynayın.',
  alternates: { canonical: `${SITE_URL}/arcade` },
  openGraph: {
    title: `${SITE_NAME} | Arcade Oyunlar`,
    description:
      'Hüseyin DOL - Arcade Oyunlar. Makas ve Park Etme oyunlarını oynayın.',
    url: `${SITE_URL}/arcade`,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'tr_TR',
  },
}

export default async function ArcadePage({ searchParams }: ArcadePageProps) {
  const resolvedSearchParams = await searchParams

  let response: PageResponseType | null = null
  try {
    response = await getPageBySlugService(PAGE_SLUG)
  } catch (error) {
    console.error('Arcade page render error:', error)
  }

  const DynamicComponent = response?.data.template
    ? getTemplateComponent(response.data.template)
    : null

  return (
    <>
      {/* Sayfanın CMS'ten gelen içerikleri varsa burada render edilecek */}
      {DynamicComponent && response && (
        // eslint-disable-next-line react-hooks/static-components -- template from API, memoised in module cache
        <DynamicComponent
          pageInfo={response.data as PageType}
          searchParams={resolvedSearchParams as { industry?: string }}
        />
      )}

      {/* CMS'ten gelen bileşenlerin altına oyunu entegre ediyoruz */}
      <GameComponent />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response: PageResponseType = await getPageBySlugService(PAGE_SLUG)

    const { seoInfo, title, description } = response.data
    const pageTitle = seoInfo?.title || title
    const pageDescription = seoInfo?.description || description
    const pageKeywords = seoInfo?.keywords || ''
    const canonicalUrl = seoInfo?.canonicalUrl
      ? `${SITE_URL}${seoInfo.canonicalUrl}`
      : `${SITE_URL}/arcade`

    return {
      title: pageTitle,
      description: pageDescription,
      keywords: pageKeywords,
      alternates: {
        canonical: canonicalUrl,
      },
      robots: {
        index: !seoInfo?.noIndex,
        follow: !seoInfo?.noFollow,
      },
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: canonicalUrl,
        siteName: SITE_NAME,
        type: 'website',
        locale: 'tr_TR',
      },
      twitter: {
        card: 'summary_large_image',
        title: pageTitle,
        description: pageDescription,
      },
    }
  } catch (error) {
    console.error('Metadata generation error:', error)
    return DEFAULT_METADATA
  }
}
