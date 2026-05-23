'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { loginService } from '@/services/auth/authService'
import { saveTokens } from '@/actions/auth/saveTokens'
import { updateGlobalCookie } from '@/context/CookieContext'
import { CookieEnum } from '@/utils/constant/cookieConstant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

const TENANT_ID =
  process.env.NEXT_PUBLIC_TENANT_ID ??
  process.env.NEXT_PUBLIC_DEFAULT_TENANT ??
  'default'

export default function LoginPage() {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [form, setForm] = useState({ usernameOrEmail: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const result = await loginService({
        usernameOrEmail: form.usernameOrEmail.trim(),
        password: form.password,
        tenantId: TENANT_ID,
        loginType: 'tenant',
      })
      // Next.js tarafında da httpOnly kopyalar sakla → siteLogout güvenilir silebilsin
      await saveTokens({
        token: result.token,
        refreshToken: result.refreshToken,
        expiredDate: 0,
        userCode: String(result.userId),
      })
      updateGlobalCookie(CookieEnum.ACCESS_TOKEN, result.token)
      updateGlobalCookie(CookieEnum.REFRESH_TOKEN, result.refreshToken)
      updateGlobalCookie(CookieEnum.EXPIRED_DATE, '0')
      updateGlobalCookie(CookieEnum.USER_CODE, String(result.userId))
      startTransition(() => {
        router.push('/')
        router.refresh()
      })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Giriş başarısız.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Giriş Yap</CardTitle>
          <CardDescription>Hesabınıza erişin.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="usernameOrEmail">
                Kullanıcı Adı veya E-posta
              </Label>
              <Input
                id="usernameOrEmail"
                name="usernameOrEmail"
                required
                value={form.usernameOrEmail}
                onChange={handleChange}
                placeholder="kullaniciadi veya ornek@mail.com"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Şifreniz"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Hesabınız yok mu?{' '}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Kayıt Ol
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
