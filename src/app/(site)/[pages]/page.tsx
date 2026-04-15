import { getPageBySlugService } from '@/services/site/pages.services'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { PageResponseType, Page as PageType } from '../../../types/BaseResponse'

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

export default async function Page(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const response: PageResponseType = await getPageBySlugService(params.pages)

  const DynamicComponent = response.data.template
    ? dynamic<PageTemplateProps>(
        () => import(`@/components/dynamic/pages/${response.data.template}`),
      )
    : null

  return (
    <>
      {/* burada template bilgisi ne geliyorsa o component render edilecek ilgili component ise components/dynamic/pages altında aranacak */}
      {DynamicComponent && (
        <DynamicComponent
          pageInfo={response.data as PageType}
          searchParams={searchParams as { industry?: string }}
        />
      )}
    </>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const response: PageResponseType = await getPageBySlugService(
    (await params).pages,
  )

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
}
