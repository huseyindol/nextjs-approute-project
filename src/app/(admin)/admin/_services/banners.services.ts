import { CreateBannerInput, UpdateBannerInput } from '@/schemas/banner.schema'
import {
  BannerListResponseType,
  BannerResponseType,
  BaseResponse,
} from '@/types/BaseResponse'
import { fetcher } from '@/utils/services/fetcher'

// GET - Tüm bannerları listele
export const getBannerService = async () => {
  try {
    const response: BannerListResponseType = await fetcher(
      '/api/v1/banners/list',
      {
        method: 'GET',
        keepalive: true,
      },
    )
    console.log('Get banners:', response)
    if (!response.result) {
      throw new Error('Error get banners', { cause: response.message })
    }
    return response
  } catch (error) {
    console.error('Error get banners:', error)
    throw error
  }
}

// GET - Tek banner getir (ID ile)
export const getBannerByIdService = async (id: string) => {
  try {
    const response: BannerResponseType = await fetcher(
      `/api/v1/banners/${id}`,
      {
        method: 'GET',
        keepalive: true,
      },
    )
    console.log('Get banner by ID:', response)
    if (!response.result) {
      throw new Error('Error get banner', { cause: response.message })
    }
    return response
  } catch (error) {
    console.error('Error get banner:', error)
    throw error
  }
}

// POST - Yeni banner oluştur (multipart/form-data)
export const createBannerService = async (
  data: CreateBannerInput,
  imageFile: File,
) => {
  try {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('altText', data.altText || '')
    formData.append('link', data.link || '')
    formData.append('target', data.target || '_blank')
    formData.append('type', data.type || '')
    formData.append('orderIndex', String(data.orderIndex || 0))
    formData.append('status', String(data.status ?? true))
    formData.append('image', imageFile)

    const response: BannerResponseType = await fetcher('/api/v1/banners', {
      method: 'POST',
      body: formData,
      keepalive: true,
      // Content-Type otomatik olarak multipart/form-data olarak ayarlanır
    })
    console.log('Creating banner:', response)
    if (!response.result) {
      throw new Error('Error creating banner', { cause: response.message })
    }
    return response
  } catch (error) {
    console.error('Error creating banner:', error)
    throw error
  }
}

// PUT - Banner güncelle (multipart/form-data)
export const updateBannerService = async (
  id: string,
  data: UpdateBannerInput,
  imageFile?: File | null,
) => {
  try {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('altText', data.altText || '')
    formData.append('link', data.link || '')
    formData.append('target', data.target || '_blank')
    formData.append('type', data.type || '')
    formData.append('orderIndex', String(data.orderIndex || 0))
    formData.append('status', String(data.status ?? true))
    if (imageFile) {
      formData.append('image', imageFile)
    }

    const response: BannerResponseType = await fetcher(
      `/api/v1/banners/${id}`,
      {
        method: 'PUT',
        body: formData,
        keepalive: true,
      },
    )
    console.log('Updating banner:', response)
    if (!response.result) {
      throw new Error('Error updating banner', { cause: response.message })
    }
    return response
  } catch (error) {
    console.error('Error updating banner:', error)
    throw error
  }
}

// DELETE - Banner sil
export const deleteBannerService = async (id: string) => {
  try {
    const response: BaseResponse<null> = await fetcher(
      `/api/v1/banners/${id}`,
      {
        method: 'DELETE',
        keepalive: true,
      },
    )
    console.log('Deleting banner:', response)
    if (!response.result) {
      throw new Error('Error deleting banner', { cause: response.message })
    }
    return response
  } catch (error) {
    console.error('Error deleting banner:', error)
    throw error
  }
}
