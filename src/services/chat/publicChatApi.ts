import { BaseResponse } from '@/types/BaseResponse'
import { ChatGroup, ChatMessage, GuestTokenResponse } from '@/types/chat'
import { buildApiUrl } from '@/utils/helpers/tenant'

/**
 * Anonim (login'siz) tenant chat public REST yüzeyi.
 *
 * Tüm çağrılar `/api/v1/public/{tenantId}/...` prefix'i ile gider — bu prefix'i
 * projenin mevcut `buildApiUrl` helper'ı üretir (NEXT_PUBLIC_API zaten
 * `.../api/v1/public` ile biter). Guest token yalnızca WebSocket içindir;
 * liste ve geçmiş anonim public GET'tir (token gerekmez).
 */
async function publicRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const url = await buildApiUrl(path)
  const res = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    cache: 'no-store',
  })
  const body: BaseResponse<T> = await res.json()
  if (!body.result) throw new Error(body.message ?? `HTTP ${res.status}`)
  return body.data
}

export const publicChatApi = {
  // tenantId path'ten gelir; body'de göndermeye gerek yok
  guestToken: (displayName: string) =>
    publicRequest<GuestTokenResponse>('/auth/guest-token', {
      method: 'POST',
      body: JSON.stringify({ displayName }),
    }),
  listGroups: () => publicRequest<ChatGroup[]>('/tenant-chat/groups'),
  getHistory: (groupId: string, before?: string, limit = 50) => {
    const p = new URLSearchParams()
    if (before) p.set('before', before)
    p.set('limit', String(limit))
    return publicRequest<ChatMessage[]>(
      `/tenant-chat/groups/${groupId}/messages?${p.toString()}`,
    )
  },
}
