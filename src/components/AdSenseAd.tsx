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

export default function AdSenseAd({ slot, layoutKey }: AdSenseAdProps) {
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    pushed.current = true
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // adsbygoogle henüz yüklenmedi
    }
  }, [])

  return (
    <div className="my-8 overflow-hidden">
      {layoutKey ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="fluid"
          data-ad-layout-key={layoutKey}
          data-ad-client="ca-pub-8068794859489939"
          data-ad-slot={slot}
        />
      ) : (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-8068794859489939"
          data-ad-slot={slot}
        />
      )}
    </div>
  )
}
