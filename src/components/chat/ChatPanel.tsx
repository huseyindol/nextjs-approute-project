'use client'

import { useGuestToken } from '@/hooks/chat/useGuestToken'
import { ChatGroup } from '@/types/chat'
import { ArrowLeft, LogOut, X } from 'lucide-react'
import { useState } from 'react'
import { ChatView } from './ChatView'
import { GroupList } from './GroupList'
import { GuestNameGate } from './GuestNameGate'

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const guest = useGuestToken()
  const [group, setGroup] = useState<ChatGroup | null>(null)

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
          {guest.token && (
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
          <GuestNameGate
            onSubmit={guest.start}
            loading={guest.loading}
            error={guest.error}
          />
        ) : !group ? (
          <GroupList onSelect={setGroup} />
        ) : (
          <ChatView
            token={guest.token}
            myName={guest.displayName}
            group={group}
          />
        )}
      </div>
    </div>
  )
}
