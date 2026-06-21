import { CookieEnum } from '@/utils/constant/cookieConstant'

/**
 * Auth cookie'lerini tek noktadan yazar/temizler — login, refresh ve logout
 * aynı attribute setini üretsin diye (access/refresh httpOnly; expiredDate/userCode/
 * username client'tan okunabilir).
 *
 * Cookie HOST-ONLY yazılır (Domain attribute YOK) → cookie yalnız yanıtı veren host'a
 * bağlanır. Böylece www.huseyindol.com ile admin.huseyindol.com ayrı kalır; her custom
 * tenant domain'i de yalnız kendi cookie'sini alır. Auth, api'ye SSR'da
 * `Authorization: Bearer` ile (server-to-server) gider; cookie cross-domain api'ye
 * gönderilmez.
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

const httpOnlyOpts = {
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: isProd,
  path: '/',
  maxAge: MAX_AGE,
}

const readableOpts = {
  httpOnly: false,
  sameSite: 'strict' as const,
  secure: isProd,
  path: '/',
  maxAge: MAX_AGE,
}

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

/** accessToken + userCode'dan görünen ad çözümler (login'de username cookie eksik kalabilir). */
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
): void {
  store.set(CookieEnum.ACCESS_TOKEN, data.token, httpOnlyOpts)
  store.set(CookieEnum.REFRESH_TOKEN, data.refreshToken, httpOnlyOpts)
  // Aşağıdakiler client'tan okunabilir (expiredDate scheduler için, userCode/username UI için)
  store.set(CookieEnum.EXPIRED_DATE, String(data.expiredDate), readableOpts)
  store.set(CookieEnum.USER_CODE, data.userCode, readableOpts)
  store.set(CookieEnum.USERNAME, data.username, readableOpts)
}

export function clearAuthCookies(store: WritableCookieStore): void {
  const del = { path: '/', maxAge: 0, secure: isProd }
  store.set(CookieEnum.ACCESS_TOKEN, '', { ...del, httpOnly: true })
  store.set(CookieEnum.REFRESH_TOKEN, '', { ...del, httpOnly: true })
  store.set(CookieEnum.EXPIRED_DATE, '', { ...del, httpOnly: false })
  store.set(CookieEnum.USER_CODE, '', { ...del, httpOnly: false })
  store.set(CookieEnum.USERNAME, '', { ...del, httpOnly: false })
}
