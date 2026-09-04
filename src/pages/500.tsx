import { Seo } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { AlertCircle, Home } from 'lucide-react'
import Link from 'next/link'

/** 500 — App Router error.tsx/global-error.tsx karşılığı (statik hata sayfası). */
export default function ServerError() {
  return (
    <>
      <Seo title="Bir Hata Oluştu" canonical="/500" noIndex />
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-red-500/10 p-6">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-foreground">500</h1>
            <h2 className="text-2xl font-semibold text-foreground">
              Bir Şeyler Ters Gitti
            </h2>
            <p className="text-muted-foreground">
              Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.
            </p>
          </div>
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Ana Sayfaya Dön
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
