import { useSyncExternalStore } from 'react'

// URL'de değişiklik olayı yok (replaceState popstate tetiklemez) — abonelik gereksiz.
const noopSubscribe = () => () => {}

/**
 * Adres çubuğundaki bir query parametresini okur (yalnız ilk yük için).
 *
 * Sayfalar statik üretildiği için `searchParams` sunucuda OKUNMAZ (okunsa sayfa
 * dinamikleşir ve RPS düşer). Bu yüzden `?category=...` gibi paylaşılan linkler
 * istemcide çözülür: sunucu anlık görüntüsü `undefined`, istemcininki gerçek değer —
 * React ikisi arasındaki geçişi hydration uyuşmazlığı üretmeden yönetir.
 */
export function useUrlQueryParam(name: string): string | undefined {
  return useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.search).get(name) ?? undefined,
    () => undefined,
  )
}
