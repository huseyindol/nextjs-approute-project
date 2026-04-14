import { CookieEnum } from '@/utils/constant/cookieConstant'
import { getGlobalCookies } from '@/context/CookieContext'

/**
 * Cookie'den tenantId değerini okur.
 * SSR (Server Component) ve CSR (Client Component) ortamlarında çalışır.
 * Eğer tenantId yoksa env'deki DEFAULT_TENANT değerini döndürür.
 */
export async function getTenantId(): Promise<string> {
  const defaultTenant = process.env.DEFAULT_TENANT ?? 'default'

  // SSR: next/headers ile cookie oku
  if (globalThis.window === undefined) {
    try {
      const { cookies } = await import('next/headers')
      const cookieStore = await cookies()
      return cookieStore.get(CookieEnum.TENANT_ID)?.value ?? defaultTenant
    } catch {
      return defaultTenant
    }
  }

  // CSR: global cookie context'ten oku
  const cookieValues = getGlobalCookies()
  return cookieValues[CookieEnum.TENANT_ID] ?? defaultTenant
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
