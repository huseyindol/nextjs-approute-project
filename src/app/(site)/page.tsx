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

// Fallback always loads APage — defined at module level so dynamic() is not called in render
const FallbackPage = dynamicImport<PageTemplateProps>(
  () => import('@/components/dynamic/pages/APage'),
)

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

  let response: PageResponseType | null = null
  try {
    response = await getPageBySlugService(HOME_SLUG)
  } catch (error) {
    console.error('Home page render error:', error)
  }

  if (!response) {
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

  const DynamicComponent = response.data.template
    ? getTemplateComponent(response.data.template)
    : null

  return (
    <>
      {DynamicComponent && (
        // eslint-disable-next-line react-hooks/static-components -- template from API, memoised in module cache
        <DynamicComponent
          pageInfo={response.data as PageType}
          searchParams={resolvedSearchParams as { industry?: string }}
        />
      )}
    </>
  )
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
