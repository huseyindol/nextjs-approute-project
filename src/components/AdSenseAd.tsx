'use client'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

interface AdSenseAdProps {
  slot: string
}

export default function AdSenseAd({ slot }: AdSenseAdProps) {
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
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-8068794859489939"
        data-ad-slot={slot}
      />
    </div>
  )
}
