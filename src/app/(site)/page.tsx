import { getPageBySlugService } from '@/services/site/pages.services'
import type { Metadata } from 'next'
import dynamicImport from 'next/dynamic'
import { PageResponseType, Page as PageType } from '../../types/BaseResponse'

// Force dynamic rendering — this page uses cookies() via fetcher/tenant
export const dynamic = 'force-dynamic'

// Sabit SEO değerleri
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'
const SITE_NAME = 'Hüseyin DOL'

// Root URL ("/") için kullanılacak slug
const HOME_SLUG = 'home'

// Page props interface
interface HomeProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

// Dynamic page template component props
type PageTemplateProps = {
  pageInfo: PageType
  searchParams?: { industry?: string }
}

// Default fallback metadata
const DEFAULT_METADATA: Metadata = {
  title: `${SITE_NAME} | Senior Frontend Developer`,
  description:
    'Hüseyin DOL - Senior Frontend Developer & Team Lead. React, Next.js, TypeScript uzmanı.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} | Senior Frontend Developer`,
    description:
      'Hüseyin DOL - Senior Frontend Developer & Team Lead. React, Next.js, TypeScript uzmanı.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    locale: 'tr_TR',
  },
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams

  try {
    const response: PageResponseType = await getPageBySlugService(HOME_SLUG)

    const DynamicComponent = response.data.template
      ? dynamicImport<PageTemplateProps>(
          () => import(`@/components/dynamic/pages/${response.data.template}`),
        )
      : null

    return (
      <>
        {DynamicComponent && (
          <DynamicComponent
            pageInfo={response.data as PageType}
            searchParams={resolvedSearchParams as { industry?: string }}
          />
        )}
      </>
    )
  } catch (error) {
    console.error('Home page render error:', error)

    // Fallback: statik olarak APage'i yükle
    const FallbackPage = dynamicImport<PageTemplateProps>(
      () => import('@/components/dynamic/pages/APage'),
    )

    return (
      <FallbackPage
        pageInfo={
          {
            title: SITE_NAME,
            slug: HOME_SLUG,
            template: 'APage',
            components: [],
          } as unknown as PageType
        }
        searchParams={resolvedSearchParams as { industry?: string }}
      />
    )
  }
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response: PageResponseType = await getPageBySlugService(HOME_SLUG)

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
    return DEFAULT_METADATA
  }
}
