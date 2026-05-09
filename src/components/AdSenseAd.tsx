'use client'
import { useEffect, useRef, useState } from 'react'

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
const RESERVED_HEIGHT = 280

export default function AdSenseAd({ slot, layoutKey }: AdSenseAdProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const insRef = useRef<HTMLModElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const pushed = useRef(false)

  // Sadece reklam viewport'a yaklaşınca AdSense'i tetikle.
  // Initial page load'da AdSense JS'in main thread'i bloklamasını önler.
  useEffect(() => {
    if (isVisible) return
    const node = containerRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
            break
          }
        }
      },
      { rootMargin: '300px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible || pushed.current) return
    if (insRef.current?.getAttribute('data-adsbygoogle-status')) {
      pushed.current = true
      return
    }
    // INP iyileştirmesi: push işini idle callback'e al, main thread'e basmayalım.
    const idle =
      typeof window !== 'undefined' &&
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback
        : (cb: IdleRequestCallback) =>
            window.setTimeout(() => cb(undefined as unknown as IdleDeadline), 1)
    const id = idle(() => {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        pushed.current = true
      } catch {
        // adsbygoogle script henüz yüklenmedi; lazyOnload Script
        // yüklenince bir sonraki visibility tetiklemesinde push tekrar denenir.
      }
    })
    return () => {
      if (
        typeof window !== 'undefined' &&
        typeof window.cancelIdleCallback === 'function'
      ) {
        window.cancelIdleCallback(id as number)
      } else {
        clearTimeout(id as unknown as number)
      }
    }
  }, [isVisible, slot, layoutKey])

  // CLS fix: sabit yükseklik + contain:layout ile reklam yüklendiğinde
  // dış DOM'u shift etmesi önlenir. height (min-height değil) net rezervasyon.
  return (
    <div
      ref={containerRef}
      className="my-8 w-full overflow-hidden"
      style={{
        height: RESERVED_HEIGHT,
        contain: 'layout style',
      }}
    >
      {isVisible &&
        (layoutKey ? (
          <ins
            ref={insRef}
            key={`${slot}-${layoutKey}`}
            className="adsbygoogle"
            style={{
              display: 'block',
              height: RESERVED_HEIGHT,
              width: '100%',
            }}
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
              height: RESERVED_HEIGHT,
              width: '100%',
            }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client={AD_CLIENT}
            data-ad-slot={slot}
          />
        ))}
    </div>
  )
}
