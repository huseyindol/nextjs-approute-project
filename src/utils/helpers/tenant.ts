import { getGlobalCookies } from '@/context/CookieContext'
import { CookieEnum } from '@/utils/constant/cookieConstant'

/**
 * Aktif tenantId değerini çözer.
 *
 * SSR/ISR (server): yalnızca env okunur. `cookies()` BURADA ÇAĞRILMAZ — çağrılırsa
 * fetcher'ı kullanan her sayfa dinamik render'a (ƒ) zorlanır ve ISR/static bozulur.
 * Public site tek tenant'a hizmet ettiği için tenant cookie'si zaten set edilmez.
 *
 * CSR (client): runtime override gerekiyorsa cookie'den okunur, yoksa env.
 */
export async function getTenantId(): Promise<string> {
  const defaultTenant = process.env.NEXT_PUBLIC_DEFAULT_TENANT ?? 'default'

  if (globalThis.window === undefined) {
    return defaultTenant
  }

  return getGlobalCookies()[CookieEnum.TENANT_ID] ?? defaultTenant
}

/**
 * Tenant bazlı API URL oluşturur.
 * Örnek: buildApiUrl('/pages/home') → 'http://localhost:8080/api/v1/public/tenant1/pages/home'
 *
 * @param path - API yolu (başında / olmalı, örn: '/pages/home')
 */
export async function buildApiUrl(path: string): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_API ?? ''
  const tenantId = await getTenantId()
  return `${baseUrl}/${tenantId}${path}`
}
