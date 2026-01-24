import dynamic from 'next/dynamic'
import { getPageBySlugService } from '../../(admin)/admin/_services/pages.services'
import { PageResponseType, Page as PageType } from '../../../types/BaseResponse'

type Props = {
  params: Promise<{ pages: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Dynamic page template component props
type PageTemplateProps = {
  pageInfo: PageType
}

export default async function Page(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  console.log('Page', params, searchParams)
  console.log(`/api/v1/pages/${params.pages}`)
  const response: PageResponseType = await getPageBySlugService(params.pages)
  console.log('pagesResponse', response)
  const DynamicComponent = response.data.template
    ? dynamic<PageTemplateProps>(
        () => import(`@/components/dynamic/pages/${response.data.template}`),
      )
    : null

  return (
    <section
      id="about"
      className="flex items-center justify-center py-24 pt-24 md:pt-32"
    >
      {/* burada template bilgisi ne geliyorsa o component render edilecek ilgili component ise components/dynamic/pages altında aranacak */}
      {DynamicComponent && (
        <DynamicComponent pageInfo={response.data as PageType} />
      )}
    </section>
  )
}

export async function generateMetadata({ params }: Props) {
  const response: PageResponseType = await getPageBySlugService(
    (await params).pages,
  )
  return {
    title: response.data.seoInfo.title,
    description: response.data.seoInfo.description,
    keywords: response.data.seoInfo.keywords,
    alternates: {
      canonical: response.data.seoInfo.canonicalUrl,
    },
    robots: {
      index: !response.data.seoInfo.noIndex,
      follow: !response.data.seoInfo.noFollow,
    },
  }
}
