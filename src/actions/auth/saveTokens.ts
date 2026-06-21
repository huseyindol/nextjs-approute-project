'use server'
import { writeAuthCookies, type AuthCookieData } from '@/lib/auth-cookies'
import { cookieDomainForHost } from '@/lib/cookie-domain'
import { cookies, headers } from 'next/headers'

export const saveTokens = async (data: AuthCookieData) => {
  const store = await cookies()
  const domain = cookieDomainForHost((await headers()).get('host'))
  writeAuthCookies(store, data, domain)
}
