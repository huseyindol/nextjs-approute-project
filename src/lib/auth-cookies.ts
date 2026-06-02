import { CookieEnum } from '@/utils/constant/cookieConstant'

/**
 * Auth cookie'lerini tek noktadan yazar/temizler — login, refresh ve logout
 * aynı attribute setini üretsin diye (backend AuthCookieWriter ile aynı model:
 * access/refresh httpOnly; expiredDate/userCode/username client'tan okunabilir).
 *
 * Not: Backend prod'da Domain=.huseyindol.com ile Set-Cookie yazar; bunlar
 * tarayıcıda zaten saklanır. Bu helper Next.js tarafındaki host kopyalarını yazar
 * (özellikle localhost dev'de backend cross-site cookie set edemediği için gerekli).
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

const isProd = process.env.NODE_ENV === 'production'
// Prod'da backend ile aynı domain → cookie'ler aynı isim+domain ile değişir (çift kayıt olmaz).
// Dev'de domainsiz (host = localhost). Gerekirse NEXT_PUBLIC_COOKIE_DOMAIN ile override.
const COOKIE_DOMAIN = isProd
  ? (process.env.NEXT_PUBLIC_COOKIE_DOMAIN ?? '.huseyindol.com')
  : undefined

const httpOnlyOpts = {
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: isProd,
  path: '/',
  maxAge: MAX_AGE,
  domain: COOKIE_DOMAIN,
}

const readableOpts = {
  httpOnly: false,
  sameSite: 'strict' as const,
  secure: isProd,
  path: '/',
  maxAge: MAX_AGE,
  domain: COOKIE_DOMAIN,
}

export interface AuthCookieData {
  token: string
  refreshToken: string
  username: string
  expiredDate: number
  userCode: string
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
  const del = { path: '/', maxAge: 0, secure: isProd, domain: COOKIE_DOMAIN }
  store.set(CookieEnum.ACCESS_TOKEN, '', { ...del, httpOnly: true })
  store.set(CookieEnum.REFRESH_TOKEN, '', { ...del, httpOnly: true })
  store.set(CookieEnum.EXPIRED_DATE, '', { ...del, httpOnly: false })
  store.set(CookieEnum.USER_CODE, '', { ...del, httpOnly: false })
  store.set(CookieEnum.USERNAME, '', { ...del, httpOnly: false })
}
