'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { verifyEmailService } from '@/services/auth/authService'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const TENANT_ID =
  process.env.NEXT_PUBLIC_TENANT_ID ??
  process.env.NEXT_PUBLIC_DEFAULT_TENANT ??
  'default'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token') ?? ''
  const tenantId = searchParams.get('tenantId') ?? TENANT_ID

  // Token yoksa hemen error state'e geç — useEffect içinde senkron setState yok
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    token ? 'loading' : 'error',
  )
  const [errorMessage, setErrorMessage] = useState(
    token ? '' : 'Doğrulama bağlantısı geçersiz.',
  )

  useEffect(() => {
    if (!token) return

    verifyEmailService(token, tenantId)
      .then(() => setStatus('success'))
      .catch((err: unknown) => {
        setStatus('error')
        setErrorMessage(
          err instanceof Error ? err.message : 'Doğrulama başarısız.',
        )
      })
  }, [token, tenantId])

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          {status === 'loading' && (
            <div className="flex flex-col items-center gap-4 text-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-muted-foreground">E-posta doğrulanıyor...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">E-posta Doğrulandı!</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Hesabınız başarıyla etkinleştirildi. Artık giriş
                  yapabilirsiniz.
                </p>
              </div>
              <Button onClick={() => router.push('/login')}>Giriş Yap</Button>
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="bg-destructive/10 flex h-16 w-16 items-center justify-center rounded-full">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Doğrulama Başarısız</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {errorMessage}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push('/register')}
              >
                Tekrar Kayıt Ol
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
