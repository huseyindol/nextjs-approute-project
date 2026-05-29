'use client'

import {
  CHAT_SUPPORT_GROUP_ID,
  CHAT_TENANT_ID,
  ELLY_API_URL,
} from '@/lib/chat-config'
import { ChatMessage } from '@/types/chat'
import { Client } from '@stomp/stompjs'
import { useCallback, useEffect, useRef, useState } from 'react'
import SockJS from 'sockjs-client'

/**
 * Guest WebSocket: CONNECT(+token) + SUBSCRIBE + SEND.
 *
 * - Guest için REST history YOK → mesajlar yalnızca connect sonrası gelir,
 *   client state'inde biriktirilir.
 * - Gönderilen mesaj aynı topic'ten echo olarak geri döner → optimistic ekleme
 *   YAPILMAZ, echo beklenir.
 */
export function useGuestChatSocket(token: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [connected, setConnected] = useState(false)
  const clientRef = useRef<Client | null>(null)

  useEffect(() => {
    if (!token) return

    const client = new Client({
      webSocketFactory: () => new SockJS(`${ELLY_API_URL}/ws`),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      onConnect: () => {
        setConnected(true)
        client.subscribe(
          `/topic/tenant/${CHAT_TENANT_ID}/group/${CHAT_SUPPORT_GROUP_ID}`,
          frame => {
            try {
              const msg: ChatMessage = JSON.parse(frame.body)
              setMessages(prev =>
                prev.some(m => m.id === msg.id) ? prev : [...prev, msg],
              )
            } catch (e) {
              console.error('Failed to parse chat message', e)
            }
          },
        )
      },
      onDisconnect: () => setConnected(false),
      onWebSocketClose: () => setConnected(false),
      onStompError: frame =>
        console.error('STOMP error', frame.headers, frame.body),
    })

    client.activate()
    clientRef.current = client

    return () => {
      void client.deactivate()
      clientRef.current = null
      setConnected(false)
    }
  }, [token])

  const sendMessage = useCallback((content: string) => {
    const c = clientRef.current
    if (!c || !c.connected || !content.trim()) return
    c.publish({
      destination: `/app/tenant-chat/${CHAT_TENANT_ID}/${CHAT_SUPPORT_GROUP_ID}/send`,
      body: JSON.stringify({ content: content.trim() }),
    })
  }, [])

  return { messages, connected, sendMessage }
}
