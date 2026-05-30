export interface GuestTokenResponse {
  token: string
  expiresIn: number // saniye (varsayılan 3600)
  displayName: string // backend sanitize eder (HTML strip)
  tenantId: string
  sessionId: string // bu guest oturumunun kimliği (gönderilen clientId ile eşit) — "kendi mesajım" eşleşmesi için
}

export interface ChatGroup {
  id: string
  name: string | null
  description: string | null
  type: 'GROUP' | 'DM'
  visibilityLevel: number
  tenantId: string
  visitorAccess: boolean // bu listede hep true
  createdAt: string
  updatedAt: string
}

export type ChatSenderType = 'ADMIN' | 'VISITOR' | 'GUEST'

export type ChatContentType = 'TEXT' | 'IMAGE' | 'FILE' | 'SYSTEM'

export interface ChatMessage {
  id: string
  groupId: string
  senderType: ChatSenderType
  senderId: number | null // ADMIN ise dolu (basedb users.id)
  visitorId: number | null // VISITOR ise dolu (tenant DB visitor_identities.id)
  senderUsername: string | null // backend pre-resolved — GUEST'te display name; null olabilir
  sessionId: string | null // GUEST'te guest oturum kimliği — isOwn için (msg.sessionId === mySessionId)
  senderDisplayName: string | null // GUEST'te ekran adı (denormalize); ADMIN/VISITOR'da null
  content: string
  contentType: ChatContentType
  fileUrl: string | null
  parentId: string | null
  deleted: boolean
  editedAt: string | null
  createdAt: string
}

// Guest gönderiminde WS payload — sadece content yeterli
export interface SendMessagePayload {
  content: string
  contentType?: 'TEXT' | 'IMAGE' | 'FILE'
}

// Typing event — WS /topic/tenant/{tid}/group/{gid}/typing
export interface ChatTyping {
  groupId: string
  userId: number | null // ADMIN ise dolu; GUEST'te null
  username: string | null // yazan kişinin görünen adı
  typing: boolean
  sessionId: string | null // GUEST ise dolu — kendi typing echo'sunu ayırt etmek için
}
