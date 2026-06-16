'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { registerService } from '@/services/auth/authService'
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
import { CheckCircle, AlertCircle } from 'lucide-react'

const TENANT_ID = process.env.NEXT_PUBLIC_DEFAULT_TENANT ?? 'default'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (form.password !== form.passwordConfirm) {
      setError('Şifreler eşleşmiyor.')
      return
    }
    if (form.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.')
      return
    }

    setLoading(true)
    try {
      await registerService({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        firstName: form.firstName.trim() || undefined,
        lastName: form.lastName.trim() || undefined,
        tenantId: TENANT_ID,
      })
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Neredeyse tamam!</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  <strong>{form.email}</strong> adresine bir doğrulama e-postası
                  gönderdik. Lütfen e-postanızdaki bağlantıya tıklayarak
                  hesabınızı etkinleştirin.
                </p>
              </div>
              <Button variant="outline" onClick={() => router.push('/login')}>
                Giriş Sayfasına Git
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Hesap Oluştur</CardTitle>
          <CardDescription>
            Ücretsiz hesap oluşturun ve hemen başlayın.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="firstName">Ad</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Adınız"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">Soyad</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Soyadınız"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Kullanıcı Adı *</Label>
              <Input
                id="username"
                name="username"
                required
                value={form.username}
                onChange={handleChange}
                placeholder="kullaniciadi"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">E-posta *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="ornek@mail.com"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Şifre *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="En az 6 karakter"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="passwordConfirm">Şifre Tekrar *</Label>
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                required
                value={form.passwordConfirm}
                onChange={handleChange}
                placeholder="Şifrenizi tekrar girin"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Kaydediliyor...' : 'Hesap Oluştur'}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Zaten hesabınız var mı?{' '}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Giriş Yap
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
