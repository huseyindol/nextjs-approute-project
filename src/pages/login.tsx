import { useState } from 'react'
import Link from 'next/link'
import { Seo } from '@/lib/seo'
import { useRouter } from 'next/router'
import { login } from '@/actions/auth/login'
import {
  SocialAuthErrorNotice,
  SocialLoginButtons,
} from '@/components/SocialLoginButtons'
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

export default function LoginPage() {
  const router = useRouter()
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
      // BFF: login server-side (server-to-server → preflight/CORS yok). tenantId GÖNDERİLMEZ —
      // tenant URL'den (/api/v1/public/{tid}) çözülür (PublicApiFilter context'i kurar).
      const res = await login({
        usernameOrEmail: form.usernameOrEmail.trim(),
        password: form.password,
        loginType: 'tenant',
      })
      if (!res.ok) {
        setError(res.error)
        return
      }
      // Tam gezinme: giriş sonrası tüm istemci durumu (cookie'den okunan oturum,
      // TanStack Query cache'i) taze başlasın. Pages Router'da router.refresh() yok.
      window.location.assign('/')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Giriş başarısız.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Seo
        title="Giriş Yap"
        description="Hesabınıza giriş yapın; Google veya GitHub ile de devam edebilirsiniz."
        canonical="/login"
        noIndex
      />
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Giriş Yap</CardTitle>
            <CardDescription>Hesabınıza erişin.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Sosyal giriş callback hataları (?error=) */}
            <SocialAuthErrorNotice />
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
            <div className="mt-4">
              <SocialLoginButtons />
            </div>
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
    </>
  )
}
