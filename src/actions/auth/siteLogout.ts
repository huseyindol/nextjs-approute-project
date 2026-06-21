'use server'

import { clearAuthCookies } from '@/lib/auth-cookies'
import { cookies } from 'next/headers'

export async function siteLogout() {
  const store = await cookies()
  clearAuthCookies(store)
}
