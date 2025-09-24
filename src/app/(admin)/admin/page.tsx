'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginResponseType, LoginSchema } from '@/schemas/user'
import { fetcher } from '@/utils/services/fetcher'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Zod validation schema
type LoginFormData = z.infer<typeof LoginSchema>

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [generalError, setGeneralError] = useState('')
  const router = useRouter()

  // React Hook Form setup with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (formData: LoginFormData) => {
    setGeneralError('')
    clearErrors()

    try {
      const response = await fetcher<LoginResponseType>('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.error) {
        setGeneralError(response.error || 'Giriş yapılırken bir hata oluştu.')
        return
      }

      // Store authentication token
      localStorage.setItem('admin-auth', response.token)
      localStorage.setItem('admin-user', JSON.stringify(response.user))

      // Redirect to admin dashboard
      router.push('/admin/dashboard')
    } catch {
      setGeneralError(
        'Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyiniz.',
      )
    }
  }

  return (
    <div className="from-background to-muted flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <Shield className="text-primary h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Girişi</h1>
          <p className="text-muted-foreground mt-2">
            Yönetim paneline erişmek için giriş yapınız
          </p>
        </div>

        {/* Login Form */}
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl">Hoş Geldiniz</CardTitle>
            <CardDescription className="text-center">
              Hesabınıza giriş yaparak devam edin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {generalError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{generalError}</AlertDescription>
                </Alert>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">E-posta Adresi</Label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    {...register('email')}
                    className="pl-10"
                    disabled={isSubmitting}
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Şifrenizi giriniz"
                    {...register('password')}
                    className="pr-10 pl-10"
                    disabled={isSubmitting}
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <EyeOff className="text-muted-foreground h-4 w-4" />
                    ) : (
                      <Eye className="text-muted-foreground h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-destructive text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="border-background mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                    Giriş Yapılıyor...
                  </>
                ) : (
                  'Giriş Yap'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-muted-foreground text-center text-sm">
          <p>© 2024 Yönetim Paneli. Tüm hakları saklıdır.</p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-muted/50 rounded-lg p-4 text-sm">
          <p className="mb-2 text-center font-medium">Demo Bilgileri</p>
          <div className="text-muted-foreground space-y-1">
            <p>
              <strong>Zod Validasyonu:</strong> Form otomatik olarak e-posta
              formatını ve şifre uzunluğunu kontrol eder.
            </p>
            <p>
              Kullanıcı oluşturmak için{' '}
              <code className="bg-muted rounded px-1">POST /api/users</code>{' '}
              endpoint'ini kullanın.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
