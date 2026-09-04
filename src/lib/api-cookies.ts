import type { NextApiResponse } from 'next'

interface CookieOptions {
  httpOnly?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  secure?: boolean
  path?: string
  maxAge?: number
  domain?: string
}

/** Set-Cookie başlık değeri üretir (yalnız bu projede kullanılan seçenekler). */
function serializeCookie(
  name: string,
  value: string,
  o: CookieOptions = {},
): string {
  const parts = [`${name}=${encodeURIComponent(value)}`]
  if (o.path) parts.push(`Path=${o.path}`)
  if (o.domain) parts.push(`Domain=${o.domain}`)
  if (typeof o.maxAge === 'number') {
    parts.push(`Max-Age=${Math.floor(o.maxAge)}`)
    // Max-Age'i anlamayan eski istemciler için Expires de yaz.
    parts.push(
      `Expires=${new Date(Date.now() + o.maxAge * 1000).toUTCString()}`,
    )
  }
  if (o.httpOnly) parts.push('HttpOnly')
  if (o.secure) parts.push('Secure')
  if (o.sameSite) {
    const v = o.sameSite
    parts.push(`SameSite=${v.charAt(0).toUpperCase()}${v.slice(1)}`)
  }
  return parts.join('; ')
}

/**
 * `writeAuthCookies` / `clearAuthCookies`'in beklediği store arayüzünü
 * `NextApiResponse` üzerinde uygular.
 *
 * Böylece cookie kuralları (isimler, httpOnly/sameSite/secure, JWT süresinden
 * türetilen max-age) TEK yerde — `lib/auth-cookies.ts` — kalmaya devam eder;
 * Pages Router API route'ları aynı fonksiyonları yeniden kullanır.
 */
export function resCookieStore(res: NextApiResponse) {
  const jar: string[] = []
  return {
    set(name: string, value: string, options?: CookieOptions) {
      jar.push(serializeCookie(name, value, options))
      res.setHeader('Set-Cookie', jar)
    },
  }
}
