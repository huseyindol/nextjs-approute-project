'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Maximize2, Minimize2 } from 'lucide-react'
import { useCallback, useState, useSyncExternalStore } from 'react'

function subscribeFullscreen(onStoreChange: () => void) {
  document.addEventListener('fullscreenchange', onStoreChange)
  return () => document.removeEventListener('fullscreenchange', onStoreChange)
}

function getFullscreenElementSnapshot() {
  return document.fullscreenElement
}

function getServerFullscreenSnapshot() {
  return null
}

export function MatchingGameFrame() {
  const [shellEl, setShellEl] = useState<HTMLDivElement | null>(null)
  const fullscreenElement = useSyncExternalStore(
    subscribeFullscreen,
    getFullscreenElementSnapshot,
    getServerFullscreenSnapshot,
  )

  const isFullscreen = shellEl !== null && fullscreenElement === shellEl

  const toggleFullscreen = useCallback(async () => {
    const el = shellEl
    if (!el) return
    try {
      if (document.fullscreenElement === el) {
        await document.exitFullscreen()
      } else {
        await el.requestFullscreen()
      }
    } catch {
      /* Tarayıcı veya kullanıcı tam ekranı reddetti */
    }
  }, [shellEl])

  return (
    <div
      ref={setShellEl}
      className={cn(
        'relative flex w-full flex-col overflow-hidden rounded-xl border border-border bg-black shadow-2xl',
        isFullscreen &&
          'h-[100dvh] max-h-[100dvh] min-h-0 w-full max-w-none rounded-none border-0 shadow-none',
      )}
    >
      <div className="pointer-events-none absolute bottom-2 right-2 z-10 md:bottom-3 md:right-3">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={toggleFullscreen}
          className="pointer-events-auto shadow-md"
          aria-pressed={isFullscreen}
          aria-label={isFullscreen ? 'Tam ekrandan çık' : 'Tam ekran'}
        >
          {isFullscreen ? (
            <Minimize2 className="size-4 shrink-0" aria-hidden />
          ) : (
            <Maximize2 className="size-4 shrink-0" aria-hidden />
          )}
        </Button>
      </div>

      <iframe
        title="Eğitici Eşleştirme Oyunu"
        src="/assets/games/matching/index.html"
        className={cn(
          'w-full border-0',
          isFullscreen
            ? 'min-h-0 flex-1 basis-0'
            : 'h-[min(92dvh,580px)] shrink-0',
        )}
        allow="autoplay; fullscreen; gamepad"
        loading="lazy"
      />
    </div>
  )
}
