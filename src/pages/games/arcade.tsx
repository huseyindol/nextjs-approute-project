import GameComponent from '@/components/games/overtakeandparking/GameComponent'
import { Seo } from '@/lib/seo'

/**
 * Arcade oyunu (Makas & Park Etme — Phaser). Saf STATİK sayfa.
 *
 * Eski /arcade getServerSideProps + CMS template + industry param kullanıyordu; ama
 * 'arcade' diye bir CMS sayfası olmadığı için pageInfo HER ZAMAN null'dı (tüm o mekanizma
 * ölü koddu) ve Vercel'de serverless fonksiyon olarak 500 veriyordu. Sayfa aslında yalnız
 * <GameComponent /> — statiğe indirildi (/games/matching gibi). /arcade → buraya 308 redirect
 * (next.config redirects).
 */
export default function ArcadeGamePage() {
  return (
    <>
      <Seo
        rawTitle="Hüseyin DOL | Arcade Oyunlar"
        description="Hüseyin DOL - Arcade Oyunlar. Makas ve Park Etme oyununu tarayıcıda oynayın."
        canonical="/games/arcade"
      />
      <GameComponent />
    </>
  )
}
