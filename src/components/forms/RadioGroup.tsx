import { cn } from '@/lib/utils'
import * as React from 'react'
import { FormError } from './FormError'

export interface RadioOption {
  label: string
  value: string
}

export interface RadioGroupProps {
  label: string
  error?: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  name: string
  id?: string
  disabled?: boolean
  required?: boolean
  className?: string
  direction?: 'vertical' | 'horizontal'
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      label,
      error,
      options,
      value,
      onChange,
      name,
      id,
      disabled,
      required,
      className,
      direction = 'vertical',
    },
    ref,
  ) => {
    const groupId = id || `radio-${name}`
    const errorId = `${groupId}-error`

    return (
      <div
        ref={ref}
        className={cn('space-y-2', className)}
        role="radiogroup"
        aria-labelledby={`${groupId}-label`}
      >
        <span
          id={`${groupId}-label`}
          className={cn(
            'block text-sm font-medium text-foreground',
            error && 'text-destructive',
          )}
        >
          {label}
          {required && (
            <span className="ml-0.5 text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </span>

        <div
          className={cn(
            'flex gap-3',
            direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
          )}
        >
          {options.map(option => {
            const optionId = `${groupId}-${option.value}`
            return (
              <div key={option.value} className="flex items-center gap-2.5">
                <input
                  id={optionId}
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => onChange?.(option.value)}
                  disabled={disabled}
                  aria-invalid={!!error}
                  aria-describedby={error ? errorId : undefined}
                  className={cn(
                    'h-4.5 w-4.5 border-input text-primary shadow-sm transition-colors',
                    'focus:ring-ring/30 focus:outline-none focus:ring-2',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    error && 'border-destructive',
                  )}
                />
                <label
                  htmlFor={optionId}
                  className={cn(
                    'text-sm text-foreground',
                    disabled && 'cursor-not-allowed opacity-50',
                  )}
                >
                  {option.label}
                </label>
              </div>
            )
          })}
        </div>

        <FormError message={error} id={errorId} />
      </div>
    )
  },
)
RadioGroup.displayName = 'RadioGroup'

export { RadioGroup }
