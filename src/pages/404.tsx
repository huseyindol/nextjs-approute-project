import { Seo } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'
import Link from 'next/link'

/** 404 — App Router not-found.tsx karşılığı. */
export default function NotFound() {
  return (
    <>
      <Seo title="Sayfa Bulunamadı" canonical="/404" noIndex />
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="flex justify-center">
            <div className="bg-primary/10 rounded-full p-6">
              <Search className="h-16 w-16 text-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-foreground">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">
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
              <Link href="/blog">
                <Search className="h-4 w-4" />
                Makaleler
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
