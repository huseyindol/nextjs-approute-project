'use client'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdSenseAd() {
  const ref = useRef(false)

  useEffect(() => {
    if (ref.current) return
    ref.current = true
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // adsbygoogle henüz yüklenmedi
    }
  }, [])

  return (
    <div className="my-8 overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-8068794859489939"
        data-ad-slot="3777093516"
      />
    </div>
  )
}
