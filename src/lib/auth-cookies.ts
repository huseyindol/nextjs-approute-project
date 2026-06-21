import { CookieEnum } from '@/utils/constant/cookieConstant'

/**
 * Auth cookie'lerini tek noktadan yazar/temizler — login, refresh ve logout
 * aynı attribute setini üretsin diye (backend AuthCookieWriter ile aynı model:
 * access/refresh httpOnly; expiredDate/userCode/username client'tan okunabilir).
 *
 * Cookie'yi DAİMA bu helper (BFF) yazar; domain request host'undan dinamik
 * türetilir — her tenant kendi domain'inde cookie alır (bkz. lib/cookie-domain.ts).
 * Backend'in cookie set/okuma'sına güvenilmez; authenticated api çağrıları SSR'da
 * `Authorization: Bearer` ile yapılır (server-to-server).
 */

const MAX_AGE = 60 * 60 * 24 * 7 // 7 gün — token JWT'si kendi expiredDate'ine göre yenilenir

interface WritableCookieStore {
  set(
    name: string,
    value: string,
    options?: {
      httpOnly?: boolean
      sameSite?: 'strict' | 'lax' | 'none'
      secure?: boolean
      path?: string
      maxAge?: number
      domain?: string
    },
  ): void
}

interface JwtPayload {
  username?: string
  sub?: string
  preferred_username?: string
}

const isProd = process.env.NODE_ENV === 'production'

// Cookie domain artık sabit `.huseyindol.com` DEĞİL — request host'undan dinamik
// türetilir (registrable domain): admin.huseyindol.com → .huseyindol.com,
// www.acme.com → .acme.com. Çağıran (server action / middleware) host'tan domain'i
// hesaplayıp parametre geçer; undefined = host-only. Bkz. lib/cookie-domain.ts.
const httpOnlyOpts = (domain?: string) => ({
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: isProd,
  path: '/',
  maxAge: MAX_AGE,
  domain,
})

const readableOpts = (domain?: string) => ({
  httpOnly: false,
  sameSite: 'strict' as const,
  secure: isProd,
  path: '/',
  maxAge: MAX_AGE,
  domain,
})

export interface AuthCookieData {
  token: string
  refreshToken: string
  username: string
  expiredDate: number
  userCode: string
}

function decodeJwtDisplayName(token: string): string | null {
  try {
    const segment = token.split('.')[1]
    if (!segment) return null
    const normalized = segment.replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(atob(normalized)) as JwtPayload
    const name =
      payload.username ?? payload.preferred_username ?? payload.sub ?? null
    return typeof name === 'string' && name.trim() ? name.trim() : null
  } catch {
    return null
  }
}

/** accessToken + userCode'dan görünen ad çözümler (panel login'de username cookie eksik kalabilir). */
function resolveAuthDisplayName(
  accessToken: string,
  userCode?: string | null,
): string | null {
  const fromJwt = decodeJwtDisplayName(accessToken)
  if (fromJwt) return fromJwt
  const code = userCode?.trim()
  return code || null
}

/**
 * Layout → Providers: username cookie eksikse JWT/userCode'dan tamamlar.
 */
export function enrichAuthCookies(
  cookiesData: Record<string, string>,
): Record<string, string> {
  if (cookiesData[CookieEnum.USERNAME]?.trim()) return cookiesData

  const accessToken = cookiesData[CookieEnum.ACCESS_TOKEN]
  if (!accessToken) return cookiesData

  const resolved = resolveAuthDisplayName(
    accessToken,
    cookiesData[CookieEnum.USER_CODE],
  )
  if (!resolved) return cookiesData

  return { ...cookiesData, [CookieEnum.USERNAME]: resolved }
}

export function writeAuthCookies(
  store: WritableCookieStore,
  data: AuthCookieData,
  domain?: string,
): void {
  store.set(CookieEnum.ACCESS_TOKEN, data.token, httpOnlyOpts(domain))
  store.set(CookieEnum.REFRESH_TOKEN, data.refreshToken, httpOnlyOpts(domain))
  // Aşağıdakiler client'tan okunabilir (expiredDate scheduler için, userCode/username UI için)
  store.set(
    CookieEnum.EXPIRED_DATE,
    String(data.expiredDate),
    readableOpts(domain),
  )
  store.set(CookieEnum.USER_CODE, data.userCode, readableOpts(domain))
  store.set(CookieEnum.USERNAME, data.username, readableOpts(domain))
}

export function clearAuthCookies(
  store: WritableCookieStore,
  domain?: string,
): void {
  const del = { path: '/', maxAge: 0, secure: isProd, domain }
  store.set(CookieEnum.ACCESS_TOKEN, '', { ...del, httpOnly: true })
  store.set(CookieEnum.REFRESH_TOKEN, '', { ...del, httpOnly: true })
  store.set(CookieEnum.EXPIRED_DATE, '', { ...del, httpOnly: false })
  store.set(CookieEnum.USER_CODE, '', { ...del, httpOnly: false })
  store.set(CookieEnum.USERNAME, '', { ...del, httpOnly: false })
}
