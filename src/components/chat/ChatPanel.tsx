'use client'

import { useGuestToken } from '@/hooks/chat/useGuestToken'
import { LogOut, X } from 'lucide-react'
import { ChatView } from './ChatView'
import { GuestNameGate } from './GuestNameGate'

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const guest = useGuestToken()

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex flex-col">
          <span className="font-semibold">Destek</span>
          {guest.displayName && (
            <span className="text-xs text-muted-foreground">
              {guest.displayName}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {guest.token && (
            <button
              onClick={guest.reset}
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
        {guest.token ? (
          <ChatView token={guest.token} myName={guest.displayName} />
        ) : (
          <GuestNameGate
            onSubmit={guest.start}
            loading={guest.loading}
            error={guest.error}
          />
        )}
      </div>
    </div>
  )
}
