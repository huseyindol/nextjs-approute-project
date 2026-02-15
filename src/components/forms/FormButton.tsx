import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'

export interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  isLoading?: boolean
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground shadow-md hover:bg-primary/90 active:scale-[0.98]',
  secondary:
    'border-2 border-primary text-primary bg-transparent hover:bg-primary/5 active:scale-[0.98]',
  ghost: 'text-primary hover:bg-primary/5 active:scale-[0.98]',
  outline:
    'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-[0.98]',
}

const FormButton = React.forwardRef<HTMLButtonElement, FormButtonProps>(
  (
    {
      className,
      variant = 'primary',
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200',
          'focus:ring-ring/40 focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {children}
      </button>
    )
  },
)
FormButton.displayName = 'FormButton'

export { FormButton }
