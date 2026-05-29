'use client'

import { useGuestChat } from '@/hooks/chat/useGuestChat'
import { ChatGroup } from '@/types/chat'
import { useEffect, useRef } from 'react'
import { ChatComposer } from './ChatComposer'
import { MessageBubble } from './MessageBubble'

export function ChatView({
  token,
  myName,
  group,
}: {
  token: string
  myName: string | null
  group: ChatGroup
}) {
  const { messages, connected, sendMessage } = useGuestChat(token, group.id)
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
            İlk mesajı siz yazın 👋
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
