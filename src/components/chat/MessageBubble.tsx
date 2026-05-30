import { ChatMessage } from '@/types/chat'

export function MessageBubble({
  message,
  isOwn,
}: {
  message: ChatMessage
  isOwn: boolean
}) {
  const isAdmin = message.senderType === 'ADMIN'
  const bubbleColor = isOwn
    ? 'bg-primary text-primary-foreground rounded-br-sm'
    : 'bg-muted text-foreground rounded-bl-sm'

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex max-w-[80%] flex-col gap-1 ${
          isOwn ? 'items-end' : 'items-start'
        }`}
      >
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-foreground">
            {message.senderUsername ?? 'Ziyaretçi'}
          </span>
          {isAdmin && (
            <span className="rounded bg-blue-500/15 px-1.5 py-0.5 text-[10px] font-medium text-blue-500">
              Destek
            </span>
          )}
          <time className="text-muted-foreground">
            {new Date(message.createdAt).toLocaleTimeString('tr-TR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </time>
        </div>
        <div
          className={`w-fit max-w-full whitespace-pre-wrap break-words rounded-2xl px-3 py-2 ${bubbleColor}`}
        >
          {message.deleted ? (
            <span className="italic opacity-70">[silinmiş mesaj]</span>
          ) : (
            message.content
          )}
        </div>
        {message.editedAt && (
          <span className="text-[10px] text-muted-foreground">
            (düzenlendi)
          </span>
        )}
      </div>
    </div>
  )
}
