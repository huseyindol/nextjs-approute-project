import { redirect } from 'next/navigation'
import {
  getGlobalCookies,
  removeGlobalCookie,
  updateGlobalCookie,
} from '../../context/CookieContext'
import { refreshService } from '../../services/auth/refreshService'
import { RefreshTokenResponseType } from '../../types/AuthResponse'
import { CookieEnum } from '../constant/cookieConstant'

// Helper function to remove all auth cookies
const removeAllAuthCookies = () => {
  removeGlobalCookie(CookieEnum.ACCESS_TOKEN)
  removeGlobalCookie(CookieEnum.REFRESH_TOKEN)
  removeGlobalCookie(CookieEnum.EXPIRED_DATE)
  removeGlobalCookie(CookieEnum.USER_CODE)
}

const prepareRequestSSROptions = async (options: RequestInit) => {
  const cookiesStore = import('next/headers').then(module => module.cookies())
  const cookies = await cookiesStore
  const accessToken = cookies.get(CookieEnum.ACCESS_TOKEN)
  options.headers = {
    ...options.headers,
    ...(accessToken && { Authorization: `Bearer ${accessToken?.value}` }),
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
  if (typeof window === 'undefined') {
    options = await prepareRequestSSROptions(options)
  } else {
    options = prepareRequestCSROptions(options)
  }
  if (url.includes('/auth/refresh') || url.includes('/auth/login')) {
    delete (options.headers as Record<string, string>)?.Authorization
  }
  console.log('url', url)
  console.log('options', options)
  const startTime = performance.now()
  let response = await fetch(`${process.env.NEXT_PUBLIC_API}${url}`, options)
  const duration = performance.now() - startTime
  console.log(`Fetch duration for ${url}: ${duration.toFixed(2)}ms`)
  console.log('response.ok', response.ok)
  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}`)
    if (response.status === 401) {
      // In CSR: try to refresh token if keepalive is true
      if (typeof window !== 'undefined') {
        if (options.keepalive) {
          const cookies = getGlobalCookies()
          const refreshToken = cookies[CookieEnum.REFRESH_TOKEN]
          if (!refreshToken) {
            // No refresh token, remove all auth cookies and throw error
            removeAllAuthCookies()
            throw new Error('No refresh token available')
          }
          const csrRefreshTokenResponse: RefreshTokenResponseType =
            await csrRefreshToken(refreshToken)
          console.log('csrRefreshTokenResponse', csrRefreshTokenResponse)
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
          response = await fetch(url, options)
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
  let response = {} as RefreshTokenResponseType
  response = await refreshService(refreshToken)
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
