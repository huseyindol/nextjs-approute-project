import { RefreshTokenResponseType } from '../../types/AuthResponse'
import { buildApiUrl } from '../../utils/helpers/tenant'

// refresh Service
// NOTE: proxy.ts ve CSR'da refresh token kullanılıyor
export const refreshService = async (refreshToken: string) => {
  const url = await buildApiUrl('/auth/refresh')
  const response: Response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken,
    }),
  })
  const data: RefreshTokenResponseType = await response.json()
  return data
}
