import type { FC } from 'react'

interface AdSenseAdProps {
  slot: string
  layoutKey?: string
}

/**
 * Reklamlar PASİFE ALINDI — siteye reklam gelmiyordu, boş rezerve alanları (280px) kaldırdık.
 * Bileşen artık hiçbir şey render etmez; çağrı yerlerine dokunmaya gerek yok.
 *
 * Geri açmak için: bu dosyayı git geçmişinden (IntersectionObserver + adsbygoogle push
 * implementasyonu) restore et ve layout.tsx'teki adsbygoogle Script'ini geri ekle.
 */
const AdSenseAd: FC<AdSenseAdProps> = () => null

export default AdSenseAd
