import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { FormError } from './FormError'

export interface SelectOption {
  label: string
  value: string
}

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  options: SelectOption[]
  placeholder?: string
  helperText?: string
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    { className, label, error, options, placeholder, helperText, id, ...props },
    ref,
  ) => {
    const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`
    const errorId = `${selectId}-error`

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={selectId}
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

        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'flex h-11 w-full appearance-none rounded-lg border bg-background px-4 py-2 pr-10 text-sm shadow-sm transition-all duration-200',
              'focus:ring-ring/30 focus:border-ring focus:outline-none focus:ring-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error
                ? 'focus:ring-destructive/30 border-destructive focus:border-destructive'
                : 'hover:border-ring/50 border-input',
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        {helperText && !error && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}

        <FormError message={error} id={errorId} />
      </div>
    )
  },
)
FormSelect.displayName = 'FormSelect'

export { FormSelect }
