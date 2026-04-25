'use client'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

interface AdSenseAdProps {
  slot: string
  layoutKey?: string
}

const AD_CLIENT = 'ca-pub-8068794859489939'

export default function AdSenseAd({ slot, layoutKey }: AdSenseAdProps) {
  const insRef = useRef<HTMLModElement | null>(null)
  // React 19 / Strict Mode: aynı slot'a iki kez push() edilirse AdSense
  // "already have ads in it" diyerek slot'u boş bırakır.
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    // Slot zaten doldurulmuşsa (HMR / re-mount) tekrar push etme
    if (insRef.current?.getAttribute('data-adsbygoogle-status')) {
      pushed.current = true
      return
    }
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushed.current = true
    } catch {
      // adsbygoogle script henüz yüklenmedi; afterInteractive Script
      // yüklenince bir sonraki render'da push tekrar denenir.
    }
  }, [slot, layoutKey])

  return (
    <div className="my-8 w-full overflow-hidden">
      {layoutKey ? (
        <ins
          ref={insRef}
          key={`${slot}-${layoutKey}`}
          className="adsbygoogle"
          style={{ display: 'block', minHeight: 250, width: '100%' }}
          data-ad-format="fluid"
          data-ad-layout-key={layoutKey}
          data-ad-client={AD_CLIENT}
          data-ad-slot={slot}
        />
      ) : (
        <ins
          ref={insRef}
          key={slot}
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
            minHeight: 250,
            width: '100%',
          }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client={AD_CLIENT}
          data-ad-slot={slot}
        />
      )}
    </div>
  )
}
