'use server'
import { clearAuthCookies } from '@/lib/auth-cookies'
import { cookieDomainForHost } from '@/lib/cookie-domain'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const logout = async () => {
  const cookieStore = await cookies()
  const domain = cookieDomainForHost((await headers()).get('host'))
  clearAuthCookies(cookieStore, domain)
  redirect('/admin/login')
}
