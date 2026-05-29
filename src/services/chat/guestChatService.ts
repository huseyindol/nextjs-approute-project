import { ELLY_API_URL } from '@/lib/chat-config'
import { BaseResponse } from '@/types/BaseResponse'
import { GuestTokenResponse } from '@/types/chat'

/**
 * Anonim ziyaretçi için kısa ömürlü guest JWT alır.
 *
 * Not: Bu endpoint public + tenant-prefix'siz olduğundan `fetcher`/`buildApiUrl`
 * kullanılmaz (onlar `/{tenantId}` ön eki ekler). Doğrudan ELLY API host'una gider.
 */
export const fetchGuestToken = async (
  displayName: string,
  tenantId: string,
): Promise<GuestTokenResponse> => {
  const res = await fetch(`${ELLY_API_URL}/api/v1/auth/guest-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ displayName, tenantId }),
  })
  const body: BaseResponse<GuestTokenResponse> = await res.json()
  if (!body.result) {
    throw new Error(body.message ?? `Bağlanılamadı (HTTP ${res.status})`)
  }
  return body.data
}
