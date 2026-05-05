import { MatchingGameFrame } from '@/components/games/matching/MatchingGameFrame'
import { ArrowLeftIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'

export const metadata: Metadata = {
  title: 'Eğitici Eşleştirme Oyunu | Hüseyin DOL',
  description:
    'Godot 4 web export ile hazırlanmış okul öncesi eşleştirme oyunu: renkler, hayvanlar ve meyveler. 24 seviye, ebeveyn paneli ve tarayıcıda tam ekran oynanış.',
  alternates: { canonical: `${SITE_URL}/games/matching` },
  openGraph: {
    title: 'Eğitici Eşleştirme Oyunu | Hüseyin DOL',
    description:
      'Godot 4 ile geliştirilmiş tarayıcı tabanlı eğitici eşleştirme oyununu oynayın.',
    url: `${SITE_URL}/games/matching`,
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eğitici Eşleştirme Oyunu | Hüseyin DOL',
    description: 'Godot 4 web export ile tarayıcıda eğitici eşleştirme oyunu.',
  },
}

export default function MatchingGamePage() {
  return (
    <div className="bg-muted/30 min-h-screen">
      <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/projects#godot-engine-games"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Projeler
            </Link>
            <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Eğitici Eşleştirme
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Godot Engine 4 web export (HTML5 Canvas + WASM). Sağ alttaki
              <span className="font-medium text-foreground"> Tam ekran </span>
              düğmesi veya Esc ile tam ekrandan çıkabilirsiniz.
            </p>
          </div>
          <Link
            href="https://github.com/huseyindol/game-ge"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Kaynak kodu (GitHub)
          </Link>
        </div>

        <MatchingGameFrame />
      </div>
    </div>
  )
}
