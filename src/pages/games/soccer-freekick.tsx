import { SoccerFreekickGameFrame } from '@/components/games/soccer-freekick/SoccerFreekickGameFrame'
import { Seo } from '@/lib/seo'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function SoccerFreekickGamePage() {
  return (
    <>
      <Seo
        rawTitle="Soccer Freekick Oyunu | Hüseyin DOL"
        description="Flutter Web ile geliştirilmiş Soccer Freekick oyunu. Tarayıcıda tam ekran serbest vuruş heyecanı."
        canonical="/games/soccer-freekick"
      />
      <div className="bg-muted/30 min-h-screen">
        <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link
                href="/projects#soccer-freekick"
                className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Projeler
              </Link>
              <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Soccer Freekick
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Flutter Web Engine. Sağ alttaki
                <span className="font-medium text-foreground"> Tam ekran </span>
                düğmesi veya Esc ile tam ekrandan çıkabilirsiniz.
              </p>
            </div>
          </div>

          <SoccerFreekickGameFrame />
        </div>
      </div>
    </>
  )
}
