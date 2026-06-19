import { getPageBySlugService } from '@/services/site/pages.services'
import type { Metadata } from 'next'
import dynamicImport from 'next/dynamic'
import { notFound } from 'next/navigation'
import { PageResponseType, Page as PageType } from '../../../types/BaseResponse'

export const revalidate = 3600

// Sabit SEO değerleri
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'
const SITE_NAME = 'Hüseyin DOL'

type Props = {
  params: Promise<{ pages: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
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

export default async function Page(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams

  let response: PageResponseType | null = null
  try {
    response = await getPageBySlugService(params.pages)
  } catch (error) {
    console.error(`Page render error for slug "${params.pages}":`, error)
    notFound()
  }

  // Sayfa CMS'te yoksa 404
  if (!response) {
    notFound()
  }

  const DynamicComponent = response.data.template
    ? getTemplateComponent(response.data.template)
    : null

  return (
    <>
      {/* burada template bilgisi ne geliyorsa o component render edilecek ilgili component ise components/dynamic/pages altında aranacak */}
      {DynamicComponent && (
        // eslint-disable-next-line react-hooks/static-components -- template from API, memoised in module cache
        <DynamicComponent
          pageInfo={response.data as PageType}
          searchParams={searchParams as { industry?: string }}
        />
      )}
    </>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const response = await getPageBySlugService((await params).pages)
    // Sayfa CMS'te yoksa minimal fallback metadata (hata değil)
    if (!response) {
      return { title: SITE_NAME, description: `${SITE_NAME} - Portfolio` }
    }

    const { seoInfo, title, description } = response.data
    const pageTitle = seoInfo?.title || title
    const pageDescription = seoInfo?.description || description
    const pageKeywords = seoInfo?.keywords || ''
    const canonicalUrl = seoInfo?.canonicalUrl
      ? `${SITE_URL}${seoInfo.canonicalUrl}`
      : SITE_URL

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
    return {
      title: SITE_NAME,
      description: `${SITE_NAME} - Portfolio`,
    }
  }
}
