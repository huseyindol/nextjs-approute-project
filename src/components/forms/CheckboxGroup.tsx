import { cn } from '@/lib/utils'
import * as React from 'react'
import { FormError } from './FormError'

export interface CheckboxGroupProps {
  label: string
  error?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  name?: string
  id?: string
  disabled?: boolean
  className?: string
  helperText?: string
}

const CheckboxGroup = React.forwardRef<HTMLInputElement, CheckboxGroupProps>(
  (
    {
      label,
      error,
      checked,
      onChange,
      name,
      id,
      disabled,
      className,
      helperText,
    },
    ref,
  ) => {
    const checkboxId =
      id || `checkbox-${(name || label).toLowerCase().replace(/\s+/g, '-')}`
    const errorId = `${checkboxId}-error`

    return (
      <div className={cn('space-y-1.5', className)}>
        <div className="flex items-start gap-3">
          <input
            id={checkboxId}
            ref={ref}
            type="checkbox"
            name={name}
            checked={checked}
            onChange={e => onChange?.(e.target.checked)}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'h-4.5 w-4.5 mt-0.5 rounded border-input text-primary shadow-sm transition-colors',
              'focus:ring-ring/30 focus:outline-none focus:ring-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-destructive',
            )}
          />
          <label
            htmlFor={checkboxId}
            className={cn(
              'text-sm leading-relaxed text-foreground',
              disabled && 'cursor-not-allowed opacity-50',
              error && 'text-destructive',
            )}
          >
            {label}
          </label>
        </div>

        {helperText && !error && (
          <p className="pl-7 text-xs text-muted-foreground">{helperText}</p>
        )}

        <FormError message={error} id={errorId} className="pl-7" />
      </div>
    )
  },
)
CheckboxGroup.displayName = 'CheckboxGroup'

export { CheckboxGroup }
