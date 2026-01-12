import { CreateWidgetInput, UpdateWidgetInput } from '@/schemas/widget.schema'
import {
  BaseResponse,
  WidgetListResponseType,
  WidgetResponseType,
} from '@/types/BaseResponse'
import { fetcher } from '@/utils/services/fetcher'

// GET - Tüm widgetları listele
export const getWidgetService = async () => {
  try {
    const response: WidgetListResponseType = await fetcher(
      '/api/v1/widgets/list',
      {
        method: 'GET',
        keepalive: true,
      },
    )
    console.log('Get widgets:', response)
    if (!response.result) {
      throw new Error('Error get widgets', { cause: response.message })
    }
    return response
  } catch (error) {
    console.error('Error get widgets:', error)
    throw error
  }
}

// GET - Tek widget getir (ID ile)
export const getWidgetByIdService = async (id: string) => {
  try {
    const response: WidgetResponseType = await fetcher(
      `/api/v1/widgets/${id}`,
      {
        method: 'GET',
        keepalive: true,
      },
    )
    console.log('Get widget by ID:', response)
    if (!response.result) {
      throw new Error('Error get widget', { cause: response.message })
    }
    return response
  } catch (error) {
    console.error('Error get widget:', error)
    throw error
  }
}

// POST - Yeni widget oluştur
export const createWidgetService = async (data: CreateWidgetInput) => {
  try {
    const response: WidgetResponseType = await fetcher('/api/v1/widgets', {
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    console.log('Creating widget:', response)
    if (!response.result) {
      throw new Error('Error creating widget', { cause: response.message })
    }
    return response
  } catch (error) {
    console.error('Error creating widget:', error)
    throw error
  }
}

// PUT - Widget güncelle
export const updateWidgetService = async (
  id: string,
  data: UpdateWidgetInput,
) => {
  try {
    const response: WidgetResponseType = await fetcher(
      `/api/v1/widgets/${id}`,
      {
        method: 'PUT',
        keepalive: true,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
    console.log('Updating widget:', response)
    if (!response.result) {
      throw new Error('Error updating widget', { cause: response.message })
    }
    return response
  } catch (error) {
    console.error('Error updating widget:', error)
    throw error
  }
}

// DELETE - Widget sil
export const deleteWidgetService = async (id: string) => {
  try {
    const response: BaseResponse<null> = await fetcher(
      `/api/v1/widgets/${id}`,
      {
        method: 'DELETE',
        keepalive: true,
      },
    )
    console.log('Deleting widget:', response)
    if (!response.result) {
      throw new Error('Error deleting widget', { cause: response.message })
    }
    return response
  } catch (error) {
    console.error('Error deleting widget:', error)
    throw error
  }
}
