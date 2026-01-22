import { getPageBySlugService } from '../../(admin)/admin/_services/pages.services'
import { PageResponseType } from '../../../types/BaseResponse'

type Props = {
  params: Promise<{ pages: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  console.log('Page', params, searchParams)
  console.log(`/api/v1/pages/${params.pages}`)
  const response: PageResponseType = await getPageBySlugService(params.pages)
  console.log('pagesResponse', response)
  return (
    <section
      id="about"
      className="flex items-center justify-center py-24 pt-24 md:pt-32"
    >
      <div className="container mx-auto px-6">Coach</div>
    </section>
  )
}
