import { buildApiUrl } from '../helpers/tenant'

/**
 * Public içerik fetch'inin tek giriş noktası (`/api/v1/public/{tenant}/...`).
 *
 * Auth httpOnly cookie'de yaşar ve YALNIZCA tenant'ın kendi origin'inde geçerlidir;
 * cross-domain `api.huseyindol.com`'a cookie GÖNDERİLMEZ (her tenant kendi
 * domain'inde). Bu yüzden tarayıcıdan doğrudan cookie ile auth yapılmaz —
 * `credentials: 'include'` kaldırıldı.
 *
 * Authenticated çağrılar SSR'da yapılır: ilgili server component / route handler
 * cookie'den token'ı okuyup `Authorization: Bearer` ekler (server-to-server; CORS
 * yok). CSR'dan authenticated bir mutation gerekirse server action kullan.
 */
export const fetcher = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const fullUrl = await buildApiUrl(url)
  const response = await fetch(fullUrl, options)

  if (response.status === 204) {
    return null as T
  }

  return response.json() as Promise<T>
}
