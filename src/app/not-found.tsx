import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'
import Link from 'next/link'

/**
 * Not Found Page
 * Shown when a route doesn't exist
 */
export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className="bg-primary/10 rounded-full p-6">
            <Search className="text-primary h-16 w-16" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-foreground text-6xl font-bold">404</h1>
          <h2 className="text-foreground text-2xl font-semibold">
            Sayfa Bulunamadı
          </h2>
          <p className="text-muted-foreground">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Ana Sayfaya Dön
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/admin">
              <Search className="h-4 w-4" />
              Admin Paneli
            </Link>
          </Button>
        </div>

        <div className="pt-8">
          <p className="text-muted-foreground text-sm">
            Yardıma mı ihtiyacınız var?{' '}
            <Link
              href="/api/contact"
              className="text-primary underline-offset-4 hover:underline"
            >
              İletişime Geçin
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
