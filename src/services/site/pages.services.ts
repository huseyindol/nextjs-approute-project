import { PageResponseType } from '@/types/BaseResponse'
import { fetcher } from '@/utils/services/fetcher'
import { cache } from 'react'

// GET - Tek sayfa getir (slug ile) — site tarafı için
// cache() ile aynı render cycle'ında (generateMetadata + page) tek API çağrısına indirilir.
export const getPageBySlugService = cache(async (slug: string) => {
  try {
    const response: PageResponseType = await fetcher(`/pages/${slug}`, {
      method: 'GET',
      next: { revalidate: 3600, tags: ['cms-pages', `cms-page-${slug}`] },
    })
    if (!response.result) {
      throw new Error('Error get page', { cause: response.message })
    }
    return response
  } catch (error) {
    console.error('Error get page:', error)
    throw error
  }
})
