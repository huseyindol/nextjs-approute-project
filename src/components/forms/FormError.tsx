import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'

interface FormErrorProps {
  message?: string
  className?: string
  id?: string
}

export function FormError({ message, className, id }: FormErrorProps) {
  if (!message) return null

  return (
    <p
      id={id}
      role="alert"
      className={cn(
        'mt-1.5 flex items-center gap-1.5 text-sm text-destructive',
        className,
      )}
    >
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      <span>{message}</span>
    </p>
  )
}
