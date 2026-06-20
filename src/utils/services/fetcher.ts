import { buildApiUrl } from '../helpers/tenant'

/**
 * Tüm API isteklerinin tek giriş noktası.
 *
 * Kimlik doğrulama tamamen httpOnly cookie üzerinden yürür:
 * - CSR (browser): `credentials: 'include'` ile accessToken/refreshToken
 *   cookie'leri istekle birlikte OTOMATİK gönderilir. Manuel `Authorization`
 *   header'ı eklemeye gerek yoktur (token JS'e hiç açılmaz → daha güvenli).
 * - SSR/ISR (server): server fetch'in cookie jar'ı olmadığı için kullanıcıya özel
 *   auth taşınmaz; bu yüzden burada yalnızca PUBLIC içerik çekilir ve sayfalar
 *   statik/ISR olarak render edilebilir. Auth gerektiren server render'ı için
 *   ilgili route açıkça dinamik olmalı ve cookie'yi kendisi okumalıdır.
 *
 * Not: Backend'in korumalı endpoint'lerde token'ı `Cookie` header'ından okuması
 * gerekir (yalnızca `Authorization: Bearer` değil). Mevcut site yalnızca public
 * endpoint'leri çağırdığı için bu, bugün hiçbir akışı etkilemez.
 */
export const fetcher = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  // httpOnly cookie'lerin cross-origin isteklerde gönderilmesi için zorunlu
  // (backend CORS: credentials=true, origin=specific olmalı).
  options.credentials = 'include'

  const fullUrl = await buildApiUrl(url)
  const response = await fetch(fullUrl, options)

  if (response.status === 204) {
    return null as T
  }

  const text = await response.text()
  if (!text.trim()) {
    return null as T
  }

  try {
    return JSON.parse(text) as T
  } catch {
    throw new Error(`Sunucu yanıtı geçersiz (HTTP ${response.status})`)
  }
}
