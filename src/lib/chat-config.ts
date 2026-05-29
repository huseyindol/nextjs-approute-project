/**
 * Elly tenant chat (anonim GUEST akışı) konfigürasyonu.
 *
 * NEXT_PUBLIC_* değerleri client bundle'a build-time inline edilir; bu yüzden
 * burada doğrudan `process.env` okunur (env.ts validasyon objesi server tarafıdır).
 *
 * Gerekli .env değişkenleri:
 *   NEXT_PUBLIC_ELLY_API_URL=https://api.huseyindol.com
 *   NEXT_PUBLIC_DEFAULT_TENANT=tenant1
 *   NEXT_PUBLIC_SUPPORT_GROUP_ID=<admin panelde açılan visitorAccess=true grup id>
 */

export const ELLY_API_URL =
  process.env.NEXT_PUBLIC_ELLY_API_URL ?? 'https://api.huseyindol.com'

export const CHAT_TENANT_ID =
  process.env.NEXT_PUBLIC_DEFAULT_TENANT ?? 'tenant1'

export const CHAT_SUPPORT_GROUP_ID =
  process.env.NEXT_PUBLIC_SUPPORT_GROUP_ID ?? ''
