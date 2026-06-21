'use server'

import { clearAuthCookies, writeAuthCookies } from '@/lib/auth-cookies'
import { cookieDomainForHost } from '@/lib/cookie-domain'
import { RefreshTokenResponseType } from '@/types/AuthResponse'
import { CookieEnum } from '@/utils/constant/cookieConstant'
import { cookies, headers } from 'next/headers'

const ELLY_API_URL =
  process.env.NEXT_PUBLIC_ELLY_API_URL ?? 'https://api.huseyindol.com'

/**
 * Login'li kullanıcının access token'ı (expiredDate) bitince çağrılır.
 *
 * refreshToken httpOnly cookie'den okunur (server-side), backend'in
 * /api/v1/auth/refresh endpoint'ine body'de gönderilir (bu endpoint permitAll
 * ve public-prefix gerektirmez; tenant refresh token JWT'sinden çözülür).
 * Yeni token seti aynı httpOnly modeliyle cookie'lere yazılır.
 */
export async function refreshSession(): Promise<{
  ok: boolean
  expiredDate?: number
}> {
  const store = await cookies()
  const refreshToken = store.get(CookieEnum.REFRESH_TOKEN)?.value
  if (!refreshToken) return { ok: false }

  const domain = cookieDomainForHost((await headers()).get('host'))

  try {
    const res = await fetch(`${ELLY_API_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      cache: 'no-store',
    })
    const data: RefreshTokenResponseType = await res.json()

    if (!res.ok || !data.result || !data.data) {
      clearAuthCookies(store, domain)
      return { ok: false }
    }

    const d = data.data
    writeAuthCookies(
      store,
      {
        token: d.token,
        refreshToken: d.refreshToken,
        username: d.username,
        expiredDate: d.expiredDate,
        userCode: d.userCode,
      },
      domain,
    )
    return { ok: true, expiredDate: d.expiredDate }
  } catch {
    // Ağ hatası → cookie'lere dokunma, tekrar denenebilir
    return { ok: false }
  }
}
