'use client'

import { Button } from '@/components/ui/button'
import { AlertCircle, Home, RefreshCcw } from 'lucide-react'
import { useEffect } from 'react'

/**
 * Error Component for App Router
 * Automatically wraps route segments and catches errors
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Error caught by error.tsx:', error)

    // Send to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to monitoring service
      // Sentry.captureException(error, {
      //   extra: {
      //     digest: error.digest
      //   }
      // })
    }
  }, [error])

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="border-destructive/50 bg-card w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="bg-destructive/10 rounded-full p-3">
            <AlertCircle className="text-destructive h-8 w-8" />
          </div>
          <div>
            <h1 className="text-foreground text-2xl font-bold">
              Bir Hata Oluştu
            </h1>
            <p className="text-muted-foreground text-sm">
              Üzgünüz, beklenmeyen bir hata oluştu
            </p>
          </div>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="bg-muted rounded-md p-4">
            <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
              Hata Detayları (Sadece Geliştirme)
            </p>
            <p className="text-destructive font-mono text-sm">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-muted-foreground mt-2 font-mono text-xs">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset} className="flex-1 gap-2" size="lg">
            <RefreshCcw className="h-4 w-4" />
            Tekrar Dene
          </Button>
          <Button
            onClick={() => (window.location.href = '/')}
            variant="outline"
            className="flex-1 gap-2"
            size="lg"
          >
            <Home className="h-4 w-4" />
            Ana Sayfa
          </Button>
        </div>

        <p className="text-muted-foreground text-center text-xs">
          Sorun devam ederse lütfen bizimle iletişime geçin
        </p>
      </div>
    </div>
  )
}
