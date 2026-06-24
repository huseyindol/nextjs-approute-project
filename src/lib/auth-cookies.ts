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

// Cookie max-age, backend'in döndürdüğü epoch (ms) field'larından hesaplanır:
//   - accessToken cookie    → expiredDate
//   - refreshToken + UI'lar → refreshExpiredDate
// Backend JWE şifrelediği için token'ı frontend'de decode edemeyiz; backend epoch'u açıkça
// gönderir. Backend JWT_EXPIRATION / JWT_REFRESH_EXPIRATION değiştirince burası otomatik
// uyar (tek kaynak: backend). Fallback: epoch yoksa 1 saat.
const FALLBACK_MAX_AGE_SEC = 60 * 60

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

const baseOpts = {
  sameSite: 'strict' as const,
  secure: isProd,
  path: '/',
}

function maxAgeFromEpochMs(epochMs: number | undefined | null): number {
  if (typeof epochMs !== 'number' || !Number.isFinite(epochMs)) {
    return FALLBACK_MAX_AGE_SEC
  }
  const seconds = Math.floor((epochMs - Date.now()) / 1000)
  return seconds > 0 ? seconds : FALLBACK_MAX_AGE_SEC
}

export interface AuthCookieData {
  token: string
  refreshToken: string
  username: string
  /** Access token expire epoch (ms) — backend'den gelir. */
  expiredDate: number
  /** Refresh token expire epoch (ms) — backend'den gelir. */
  refreshExpiredDate?: number
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
  const accessMaxAge = maxAgeFromEpochMs(data.expiredDate)
  const refreshMaxAge = maxAgeFromEpochMs(data.refreshExpiredDate)
  const httpOnlyAccess = { ...baseOpts, httpOnly: true, maxAge: accessMaxAge }
  const httpOnlyRefresh = { ...baseOpts, httpOnly: true, maxAge: refreshMaxAge }
  // expiredDate / userCode / username ACCESS süresince yaşar (panel ile tutarlı): SessionRefresher
  // access expire'dan ÖNCE (LEAD_MS) silent refresh yapar → yeni cookie'ler yazılır. Yalnız
  // refreshToken cookie'si refresh süresi kadar yaşar (silent refresh için elde olması gerekli).
  const readable = { ...baseOpts, httpOnly: false, maxAge: accessMaxAge }

  store.set(CookieEnum.ACCESS_TOKEN, data.token, httpOnlyAccess)
  store.set(CookieEnum.REFRESH_TOKEN, data.refreshToken, httpOnlyRefresh)
  store.set(CookieEnum.EXPIRED_DATE, String(data.expiredDate), readable)
  store.set(CookieEnum.USER_CODE, data.userCode, readable)
  store.set(CookieEnum.USERNAME, data.username, readable)
}

export function clearAuthCookies(store: WritableCookieStore): void {
  const del = { path: '/', maxAge: 0, secure: isProd }
  store.set(CookieEnum.ACCESS_TOKEN, '', { ...del, httpOnly: true })
  store.set(CookieEnum.REFRESH_TOKEN, '', { ...del, httpOnly: true })
  store.set(CookieEnum.EXPIRED_DATE, '', { ...del, httpOnly: false })
  store.set(CookieEnum.USER_CODE, '', { ...del, httpOnly: false })
  store.set(CookieEnum.USERNAME, '', { ...del, httpOnly: false })
}
