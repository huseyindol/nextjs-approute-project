'use server'

import { clearAuthCookies } from '@/lib/auth-cookies'
import { cookieDomainForHost } from '@/lib/cookie-domain'
import { cookies, headers } from 'next/headers'

export async function siteLogout() {
  const store = await cookies()
  const domain = cookieDomainForHost((await headers()).get('host'))
  clearAuthCookies(store, domain)
}
