import { PageResponseType } from '@/types/BaseResponse'
import { fetcher } from '@/utils/services/fetcher'

// GET - Tek sayfa getir (slug ile) — site tarafı için
export const getPageBySlugService = async (slug: string) => {
  try {
    const response: PageResponseType = await fetcher(`/api/v1/pages/${slug}`, {
      method: 'GET',
    })
    if (!response.result) {
      throw new Error('Error get page', { cause: response.message })
    }
    return response
  } catch (error) {
    console.error('Error get page:', error)
    throw error
  }
}
