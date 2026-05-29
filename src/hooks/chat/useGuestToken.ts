'use client'

import { publicChatApi } from '@/services/chat/publicChatApi'
import { GuestTokenResponse } from '@/types/chat'
import { useCallback, useState } from 'react'

const SS_TOKEN = 'elly_guest_token'
const SS_NAME = 'elly_guest_name'

export function useGuestToken() {
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== 'undefined' ? sessionStorage.getItem(SS_TOKEN) : null,
  )
  const [displayName, setDisplayName] = useState<string | null>(() =>
    typeof window !== 'undefined' ? sessionStorage.getItem(SS_NAME) : null,
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const start = useCallback(
    async (name: string): Promise<GuestTokenResponse> => {
      setLoading(true)
      setError(null)
      try {
        const res = await publicChatApi.guestToken(name.trim())
        sessionStorage.setItem(SS_TOKEN, res.token)
        sessionStorage.setItem(SS_NAME, res.displayName)
        setToken(res.token)
        setDisplayName(res.displayName)
        return res
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Bağlanılamadı')
        throw e
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const reset = useCallback(() => {
    sessionStorage.removeItem(SS_TOKEN)
    sessionStorage.removeItem(SS_NAME)
    setToken(null)
    setDisplayName(null)
  }, [])

  return { token, displayName, loading, error, start, reset }
}
