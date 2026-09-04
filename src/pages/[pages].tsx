import { Seo, SITE_URL } from '@/lib/seo'
import { getPageBySlugService } from '@/services/site/pages.services'
import type { PageResponseType, Page as PageType } from '@/types/BaseResponse'
import type { GetServerSideProps } from 'next'
import dynamicImport from 'next/dynamic'

const SITE_NAME = 'Hüseyin DOL'

type PageTemplateProps = { pageInfo: PageType }

// Module-level cache — dynamic() render içinde çağrılmamalı
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

interface CmsPageProps {
  pageInfo: PageType
  seo: {
    title: string
    description: string
    keywords: string
    canonical: string
    noIndex: boolean
    noFollow: boolean
  }
}

export default function CmsPage({ pageInfo, seo }: CmsPageProps) {
  const Template = pageInfo.template
    ? getTemplateComponent(pageInfo.template)
    : null

  return (
    <>
      <Seo
        rawTitle={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        keywords={
          seo.keywords ? seo.keywords.split(',').map(k => k.trim()) : undefined
        }
        noIndex={seo.noIndex}
      />
      {Template && (
        // eslint-disable-next-line react-hooks/static-components -- template from API, module cache'de memoize
        <Template pageInfo={pageInfo} />
      )}
    </>
  )
}

/**
 * CMS'teki slug'a göre şablon render eder. Slug'lar önceden bilinemediği için
 * (kullanıcı panelden yeni sayfa ekleyebilir) getServerSideProps ile dinamik —
 * App Router'daki ƒ davranışının aynısı. SEO + şablon verisi tek çağrıda toplanır.
 */
export const getServerSideProps: GetServerSideProps<CmsPageProps> = async ({
  params,
  res,
}) => {
  const slug = params?.pages as string

  let response: PageResponseType | null = null
  try {
    response = await getPageBySlugService(slug)
  } catch (error) {
    console.error(`Page render error for slug "${slug}":`, error)
    return { notFound: true }
  }
  if (!response) return { notFound: true }

  // App Router revalidate=3600 karşılığı: CDN/tarayıcı cache header'ı
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400',
  )

  const data = response.data
  const seoInfo = data.seoInfo
  return {
    props: {
      pageInfo: data as PageType,
      seo: {
        title: seoInfo?.title || data.title || SITE_NAME,
        description:
          seoInfo?.description ||
          data.description ||
          `${SITE_NAME} - Portfolio`,
        keywords: seoInfo?.keywords || '',
        canonical: seoInfo?.canonicalUrl
          ? `${SITE_URL}${seoInfo.canonicalUrl}`
          : SITE_URL,
        noIndex: Boolean(seoInfo?.noIndex),
        noFollow: Boolean(seoInfo?.noFollow),
      },
    },
  }
}
