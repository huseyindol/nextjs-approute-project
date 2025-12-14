'use client'

import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

/**
 * Error Boundary Component
 * Catches React errors and provides a fallback UI
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Send to monitoring service (Sentry, DataDog, etc.)
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to monitoring service
      // Sentry.captureException(error, {
      //   contexts: {
      //     react: {
      //       componentStack: errorInfo.componentStack
      //     }
      //   }
      // })
    }

    this.setState({ errorInfo })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="bg-background flex min-h-screen items-center justify-center p-4">
          <div className="border-destructive/50 bg-card w-full max-w-md rounded-lg border p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <AlertCircle className="text-destructive h-6 w-6" />
              <h2 className="text-foreground text-xl font-bold">
                Bir Hata Oluştu
              </h2>
            </div>

            <p className="text-muted-foreground mb-4">
              Üzgünüz, bir şeyler yanlış gitti. Lütfen sayfayı yenilemeyi
              deneyin.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="bg-muted mb-4 rounded p-3">
                <summary className="text-destructive cursor-pointer font-mono text-sm font-semibold">
                  Hata Detayları (Sadece Geliştirme)
                </summary>
                <pre className="mt-2 overflow-auto text-xs">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="flex gap-3">
              <Button
                onClick={this.handleReset}
                variant="default"
                className="flex-1"
              >
                Tekrar Dene
              </Button>
              <Button
                onClick={() => (window.location.href = '/')}
                variant="outline"
                className="flex-1"
              >
                Ana Sayfaya Dön
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
