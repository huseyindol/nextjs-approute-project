'use client'

import { useCookie } from '@/context/CookieContext'
import { useGuestToken } from '@/hooks/chat/useGuestToken'
import { ChatGroup } from '@/types/chat'
import { CookieEnum } from '@/utils/constant/cookieConstant'
import { ArrowLeft, Loader2, LogOut, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChatView } from './ChatView'
import { GroupList } from './GroupList'
import { GuestNameGate } from './GuestNameGate'

// Token bitmeden bu kadar önce sessizce yenile
const REFRESH_LEAD_MS = 30_000

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const guest = useGuestToken()
  const {
    token: guestToken,
    displayName: guestDisplayName,
    expiresAt: guestExpiresAt,
    start: guestStart,
    refresh: guestRefresh,
  } = guest
  const [group, setGroup] = useState<ChatGroup | null>(null)

  // Login olmuşsa chat adını ad-girme ekranı yerine otomatik login username yap
  const { cookies } = useCookie()
  const loginUsername = cookies[CookieEnum.USERNAME] || null
  const autoStartRef = useRef<string | null>(null)

  useEffect(() => {
    if (!loginUsername) return
    if (autoStartRef.current === loginUsername) return
    // Zaten bu isimle bağlıysak tekrar başlatma
    if (guestToken && guestDisplayName === loginUsername) {
      autoStartRef.current = loginUsername
      return
    }
    autoStartRef.current = loginUsername
    guestStart(loginUsername).catch(() => {
      autoStartRef.current = null // başarısızsa tekrar denenebilsin
    })
  }, [loginUsername, guestToken, guestDisplayName, guestStart])

  // Token süresi dolmadan sessizce yenile (süresi geçmişse hemen)
  useEffect(() => {
    if (!guestToken || !guestExpiresAt) return
    const delay = guestExpiresAt - Date.now() - REFRESH_LEAD_MS
    if (delay <= 0) {
      void guestRefresh()
      return
    }
    const t = setTimeout(() => void guestRefresh(), delay)
    return () => clearTimeout(t)
  }, [guestToken, guestExpiresAt, guestRefresh])

  // WS auth hatası (token reddedildi) → yeni token al
  const handleAuthExpired = useCallback(() => {
    void guestRefresh()
  }, [guestRefresh])

  // Sohbetteyken geri = grup listesine dön; değilse paneli kapat
  const handleBack = group ? () => setGroup(null) : onClose
  const title = group ? group.name || 'Destek' : 'Destek'

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-border px-3 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <button
            onClick={handleBack}
            title={group ? 'Geri' : 'Kapat'}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {group ? (
              <ArrowLeft className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </button>
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-semibold">{title}</span>
            {guest.displayName && (
              <span className="truncate text-xs text-muted-foreground">
                {guest.displayName}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Reset yalnızca anonim guest için — login'liyken isim login'e bağlı */}
          {guest.token && !loginUsername && (
            <button
              onClick={() => {
                setGroup(null)
                guest.reset()
              }}
              title="Sohbeti sıfırla"
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            title="Kapat"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        {!guest.token ? (
          loginUsername ? (
            // Login'li: ad girme yok, token otomatik alınıyor
            <div className="flex h-full items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <GuestNameGate
              onSubmit={guest.start}
              loading={guest.loading}
              error={guest.error}
            />
          )
        ) : !group ? (
          <GroupList onSelect={setGroup} />
        ) : (
          <ChatView
            token={guest.token}
            mySessionId={guest.sessionId}
            group={group}
            onAuthExpired={handleAuthExpired}
          />
        )}
      </div>
    </div>
  )
}
