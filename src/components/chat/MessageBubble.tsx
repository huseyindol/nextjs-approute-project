import { ChatMessage } from '@/types/chat'

export function MessageBubble({
  message,
  isOwn,
}: {
  message: ChatMessage
  isOwn: boolean
}) {
  const isAdmin = message.senderType === 'ADMIN'
  const containerClass = isOwn ? 'flex justify-end' : 'flex justify-start'
  const bubbleClass = isOwn
    ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-3 py-2 max-w-[80%]'
    : 'bg-muted text-foreground rounded-2xl rounded-bl-sm px-3 py-2 max-w-[80%]'

  return (
    <div className={containerClass}>
      <div className={isOwn ? 'flex flex-col items-end' : 'flex flex-col'}>
        <div className="mb-1 flex items-center gap-2 text-xs">
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
        <div className={bubbleClass}>
          {message.deleted ? (
            <span className="italic opacity-70">[silinmiş mesaj]</span>
          ) : (
            message.content
          )}
        </div>
        {message.editedAt && (
          <span className="mt-0.5 text-[10px] text-muted-foreground">
            (düzenlendi)
          </span>
        )}
      </div>
    </div>
  )
}
