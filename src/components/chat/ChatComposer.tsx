'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import { FormEvent, useState } from 'react'

export function ChatComposer({
  onSubmit,
  disabled,
}: {
  onSubmit: (content: string) => Promise<unknown> | void
  disabled?: boolean
}) {
  const [content, setContent] = useState('')
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!content.trim() || sending || disabled) return
    setSending(true)
    try {
      await onSubmit(content.trim())
      setContent('')
    } finally {
      setSending(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-border p-2"
    >
      <Input
        type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Mesajınızı yazın…"
        disabled={sending || disabled}
        maxLength={4000}
        className="flex-1"
      />
      <Button
        type="submit"
        size="icon"
        disabled={!content.trim() || sending || disabled}
        aria-label="Gönder"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
