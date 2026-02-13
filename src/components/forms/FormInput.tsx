import { cn } from '@/lib/utils'
import * as React from 'react'
import { FormError } from './FormError'

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    { className, label, error, helperText, id, type = 'text', ...props },
    ref,
  ) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`
    const errorId = `${inputId}-error`

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
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

        <input
          id={inputId}
          ref={ref}
          type={type}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'flex h-11 w-full rounded-lg border bg-background px-4 py-2 text-sm shadow-sm transition-all duration-200',
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
FormInput.displayName = 'FormInput'

export { FormInput }
