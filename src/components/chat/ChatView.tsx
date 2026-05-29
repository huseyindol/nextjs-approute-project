'use client'

import { useGuestChatSocket } from '@/hooks/chat/useGuestChatSocket'
import { useEffect, useRef } from 'react'
import { ChatComposer } from './ChatComposer'
import { MessageBubble } from './MessageBubble'

export function ChatView({
  token,
  myName,
}: {
  token: string
  myName: string | null
}) {
  const { messages, connected, sendMessage } = useGuestChatSocket(token)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  return (
    <div className="flex h-full flex-col">
      {!connected && (
        <div className="px-3 py-1 text-xs text-amber-500">Bağlanıyor…</div>
      )}
      <div className="flex-1 space-y-3 overflow-y-auto p-3">
        {messages.length === 0 && (
          <p className="text-xs text-muted-foreground">
            Henüz mesaj yok. İlk mesajı siz yazın 👋
          </p>
        )}
        {messages.map(msg => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.senderType === 'GUEST' && msg.senderUsername === myName}
          />
        ))}
        <div ref={bottomRef} />
      </div>
      <ChatComposer
        disabled={!connected}
        onSubmit={content => sendMessage(content)}
      />
    </div>
  )
}
