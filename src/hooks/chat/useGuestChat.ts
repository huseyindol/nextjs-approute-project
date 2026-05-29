'use client'

import { CHAT_TENANT_ID, ELLY_API_URL } from '@/lib/chat-config'
import { publicChatApi } from '@/services/chat/publicChatApi'
import { ChatMessage } from '@/types/chat'
import { Client } from '@stomp/stompjs'
import { useCallback, useEffect, useRef, useState } from 'react'
import SockJS from 'sockjs-client'

/**
 * Bir grubun geçmişini (anonim public GET) yükler + canlı WS akışına bağlanır.
 *
 * - Geçmiş: GET /tenant-chat/groups/{groupId}/messages
 * - Canlı: WS CONNECT(+guest token) → SUBSCRIBE topic → SEND
 * - Gönderilen mesaj aynı topic'ten server id'siyle döner → optimistic ekleme YOK.
 */
export function useGuestChat(token: string, groupId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [connected, setConnected] = useState(false)
  const clientRef = useRef<Client | null>(null)

  const upsert = useCallback((msg: ChatMessage) => {
    setMessages(prev =>
      prev.some(m => m.id === msg.id) ? prev : [...prev, msg],
    )
  }, [])

  // 1) Geçmiş (anonim public GET)
  useEffect(() => {
    let alive = true
    publicChatApi
      .getHistory(groupId)
      .then(h => {
        if (alive) setMessages(h)
      })
      .catch(() => {
        /* geçmiş yoksa boş başlar */
      })
    return () => {
      alive = false
    }
  }, [groupId])

  // 2) Canlı (WS + guest token)
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
          `/topic/tenant/${CHAT_TENANT_ID}/group/${groupId}`,
          frame => {
            try {
              upsert(JSON.parse(frame.body) as ChatMessage)
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
  }, [token, groupId, upsert])

  const sendMessage = useCallback(
    (content: string) => {
      const c = clientRef.current
      if (!c || !c.connected || !content.trim()) return
      c.publish({
        destination: `/app/tenant-chat/${CHAT_TENANT_ID}/${groupId}/send`,
        body: JSON.stringify({ content: content.trim() }),
      })
    },
    [groupId],
  )

  return { messages, connected, sendMessage }
}
