import { cn } from '@/lib/utils'
import * as React from 'react'
import { FormError } from './FormError'

export interface CheckboxOption {
  label: string
  value: string
}

export interface CheckboxGroupProps {
  label: string
  error?: string
  checked?: boolean | string[]
  onChange?: (checked: boolean | string[]) => void
  name?: string
  id?: string
  disabled?: boolean
  className?: string
  helperText?: string
  options?: CheckboxOption[]
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
      options = [],
    },
    ref,
  ) => {
    const groupId =
      id || `checkbox-${(name || label).toLowerCase().replace(/\s+/g, '-')}`
    const errorId = `${groupId}-error`

    // Multiple Checkbox Mode
    if (options.length > 0) {
      const selectedValues = Array.isArray(checked) ? checked : []

      const handleOptionChange = (value: string, isChecked: boolean) => {
        if (isChecked) {
          onChange?.([...selectedValues, value])
        } else {
          onChange?.(selectedValues.filter(v => v !== value))
        }
      }

      return (
        <div className={cn('space-y-3', className)}>
          <div>
            <span
              className={cn(
                'block text-sm font-medium text-foreground',
                error && 'text-destructive',
              )}
            >
              {label}
            </span>
            {helperText && !error && (
              <p className="text-xs text-muted-foreground">{helperText}</p>
            )}
          </div>

          <div className="space-y-2">
            {options.map(option => {
              const optionId = `${groupId}-${option.value}`
              const isSelected = selectedValues.includes(option.value)

              return (
                <div key={option.value} className="flex items-start gap-3">
                  <input
                    id={optionId}
                    type="checkbox"
                    checked={isSelected}
                    onChange={e =>
                      handleOptionChange(option.value, e.target.checked)
                    }
                    disabled={disabled}
                    className={cn(
                      'h-4.5 w-4.5 mt-0.5 rounded border-input text-primary shadow-sm transition-colors',
                      'focus:ring-ring/30 focus:outline-none focus:ring-2',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                      error && 'border-destructive',
                    )}
                  />
                  <label
                    htmlFor={optionId}
                    className={cn(
                      'text-sm leading-relaxed text-foreground',
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
    }

    // Single Checkbox Mode (Boolean)
    return (
      <div className={cn('space-y-1.5', className)}>
        <div className="flex items-start gap-3">
          <input
            id={groupId}
            ref={ref}
            type="checkbox"
            name={name}
            checked={!!checked}
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
            htmlFor={groupId}
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
