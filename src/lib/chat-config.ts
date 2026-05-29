/**
 * Elly tenant chat (anonim GUEST akışı) konfigürasyonu.
 *
 * NEXT_PUBLIC_* değerleri client bundle'a build-time inline edilir; bu yüzden
 * burada doğrudan `process.env` okunur (env.ts validasyon objesi server tarafıdır).
 *
 * Gerekli .env değişkenleri:
 *   NEXT_PUBLIC_ELLY_API_URL=https://api.huseyindol.com   (WebSocket host)
 *   NEXT_PUBLIC_DEFAULT_TENANT=tenant1                    (WS topic tenant'ı)
 *
 * Grup id'si runtime'da listelenir (GET /tenant-chat/groups) — sabit env gerekmez.
 */

export const ELLY_API_URL =
  process.env.NEXT_PUBLIC_ELLY_API_URL ?? 'https://api.huseyindol.com'

export const CHAT_TENANT_ID =
  process.env.NEXT_PUBLIC_DEFAULT_TENANT ?? 'tenant1'
