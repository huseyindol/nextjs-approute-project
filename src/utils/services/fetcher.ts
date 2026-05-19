import { redirect } from 'next/navigation'
import {
  getGlobalCookies,
  removeGlobalCookie,
  updateGlobalCookie,
} from '../../context/CookieContext'
import { refreshService } from '../../services/auth/refreshService'
import { RefreshTokenResponseType } from '../../types/AuthResponse'
import { CookieEnum } from '../constant/cookieConstant'
import { buildApiUrl } from '../helpers/tenant'

// Helper function to remove all auth cookies
const removeAllAuthCookies = () => {
  removeGlobalCookie(CookieEnum.ACCESS_TOKEN)
  removeGlobalCookie(CookieEnum.REFRESH_TOKEN)
  removeGlobalCookie(CookieEnum.EXPIRED_DATE)
  removeGlobalCookie(CookieEnum.USER_CODE)
}

const prepareRequestSSROptions = async (options: RequestInit) => {
  // generateStaticParams / build-time'da request context olmadığı için
  // cookies() throw atar; bu durumda Authorization header'sız devam ederiz.
  try {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const accessToken = cookieStore.get(CookieEnum.ACCESS_TOKEN)
    options.headers = {
      ...options.headers,
      ...(accessToken && { Authorization: `Bearer ${accessToken.value}` }),
    }
  } catch {
    // No request context (örn. generateStaticParams) — auth header eklenmez.
  }
  return options
}

const prepareRequestCSROptions = (options: RequestInit) => {
  const cookies = getGlobalCookies()
  const accessToken = cookies[CookieEnum.ACCESS_TOKEN]
  options.headers = {
    ...options.headers,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  }
  return options
}

export const fetcher = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  console.log('fetcherqq 1')
  if (typeof window === 'undefined') {
    options = await prepareRequestSSROptions(options)
  } else {
    options = prepareRequestCSROptions(options)
  }
  if (url.includes('/auth/refresh') || url.includes('/auth/login')) {
    delete (options.headers as Record<string, string>)?.Authorization
  }
  console.log('fetcherqq 2')

  const fullUrl = await buildApiUrl(url)
  console.log('fetcherqq fullUrl', fullUrl)
  let response = await fetch(fullUrl, options)
  if (!response.ok) {
    if (response.status === 401) {
      // In CSR: try to refresh token if fetchOngoing is enabled
      if (typeof window !== 'undefined') {
        const fetchOngoing = process.env.NEXT_PUBLIC_FETCH_ONGOING === 'true'
        if (fetchOngoing) {
          const cookies = getGlobalCookies()
          const refreshToken = cookies[CookieEnum.REFRESH_TOKEN]
          if (!refreshToken) {
            // No refresh token, remove all auth cookies and throw error
            removeAllAuthCookies()
            throw new Error('No refresh token available')
          }
          const csrRefreshTokenResponse: RefreshTokenResponseType =
            await csrRefreshToken(refreshToken)
          if (!csrRefreshTokenResponse.result) {
            // Refresh failed, remove all auth cookies and throw error
            removeAllAuthCookies()
            throw new Error('Token refresh failed')
          }
          options.headers = {
            ...options.headers,
            ...(csrRefreshTokenResponse.data.token && {
              Authorization: `Bearer ${csrRefreshTokenResponse.data.token}`,
            }),
          }
          response = await fetch(fullUrl, options)
        }
      } else {
        redirect('/login')
      }
    }
  }
  if (response.status === 204) {
    return null as T
  }

  return response.json() as Promise<T>
}

// CSR Refresh Token
const csrRefreshToken = async (refreshToken: string) => {
  const response = await refreshService(refreshToken)
  const { data } = response
  // Update cookies using global function (no React hook needed!)
  if (data?.refreshToken) {
    updateGlobalCookie(CookieEnum.REFRESH_TOKEN, data.refreshToken)
  }
  if (data?.token) {
    updateGlobalCookie(CookieEnum.ACCESS_TOKEN, data.token)
  }

  return response
}
