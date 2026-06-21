'use server'
import { writeAuthCookies, type AuthCookieData } from '@/lib/auth-cookies'
import { cookies } from 'next/headers'

export const saveTokens = async (data: AuthCookieData) => {
  const store = await cookies()
  writeAuthCookies(store, data)
}
