import { PageResponseType } from '@/types/BaseResponse'
import { fetcher } from '@/utils/services/fetcher'
import { cache } from 'react'

// GET - Tek sayfa getir (slug ile) — site tarafı için
// cache() ile aynı render cycle'ında (generateMetadata + page) tek API çağrısına indirilir.
//
// Dönüş:
//  - PageResponseType → sayfa bulundu
//  - null             → sayfa CMS'te yok (result=false). BEKLENEN durum (örn. /arcade gibi
//                       CMS kaydı olmayan sayfalar), hata DEĞİL → loglanmaz.
//  - throw            → gerçek hata (network/parse). Loglanır ve yukarı fırlatılır.
export const getPageBySlugService = cache(
  async (slug: string): Promise<PageResponseType | null> => {
    let response: PageResponseType
    try {
      response = await fetcher(`/pages/${slug}`, {
        method: 'GET',
        next: { revalidate: 3600, tags: ['cms-pages', `cms-page-${slug}`] },
      })
    } catch (error) {
      console.error(`Error fetching page "${slug}":`, error)
      throw error
    }

    if (!response.result) {
      // Sayfa yok — beklenen durum, sessizce null dön
      return null
    }
    return response
  },
)
