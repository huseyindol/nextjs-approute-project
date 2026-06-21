import { getDomain } from 'tldts'

/**
 * Request host'undan cookie domain'ini türetir (registrable domain / eTLD+1):
 *   www.acme.com         → .acme.com
 *   admin.huseyindol.com → .huseyindol.com
 *   site.com.tr          → .site.com.tr   (tldts ile çok parçalı TLD doğru)
 *
 * Böylece her tenant kendi domain'inde cookie alır; `.huseyindol.com` gibi sabit
 * bir domain'e bağlanmaz. localhost / IP / çözülemeyen host → undefined döner
 * (host-only cookie — dev ortamı ve kenar durumlar için güvenli varsayılan).
 *
 * Çağıran taraf host'u kendi context'inden verir:
 *   - server action / route handler: `(await headers()).get('host')`
 *   - middleware: `request.nextUrl.hostname`
 */
export function cookieDomainForHost(host?: string | null): string | undefined {
  if (!host) return undefined
  const hostname = host.replace(/:\d+$/, '').trim().toLowerCase() // :port'u at
  if (!hostname || hostname === 'localhost') return undefined
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) return undefined // IPv4
  const registrable = getDomain(hostname) // eTLD+1; .com.tr/.co.uk doğru hesaplanır
  return registrable ? `.${registrable}` : undefined
}
