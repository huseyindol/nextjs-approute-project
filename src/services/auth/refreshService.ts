import { RefreshTokenResponseType } from '../../types/AuthResponse'

// refresh Service
// NOTE: proxy.ts ve CSR'da refresh token kullanılıyor
export const refreshService = async (refreshToken: string) => {
  console.log('refreshService', refreshToken)
  const response: Response = await fetch(
    'http://localhost:8080/api/v1/auth/refresh',
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken,
      }),
    },
  )
  const data: RefreshTokenResponseType = await response.json()
  console.log('data', data)
  return data
}
