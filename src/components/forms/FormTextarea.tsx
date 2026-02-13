import { cn } from '@/lib/utils'
import * as React from 'react'
import { FormError } from './FormError'

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  helperText?: string
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId =
      id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`
    const errorId = `${textareaId}-error`

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={textareaId}
          className={cn(
            'block text-sm font-medium text-foreground',
            error && 'text-destructive',
          )}
        >
          {label}
          {props.required && (
            <span className="ml-0.5 text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <textarea
          id={textareaId}
          ref={ref}
          rows={4}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'flex min-h-[100px] w-full resize-y rounded-lg border bg-background px-4 py-3 text-sm shadow-sm transition-all duration-200',
            'placeholder:text-muted-foreground',
            'focus:ring-ring/30 focus:border-ring focus:outline-none focus:ring-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'focus:ring-destructive/30 border-destructive focus:border-destructive'
              : 'hover:border-ring/50 border-input',
            className,
          )}
          {...props}
        />

        {helperText && !error && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}

        <FormError message={error} id={errorId} />
      </div>
    )
  },
)
FormTextarea.displayName = 'FormTextarea'

export { FormTextarea }
