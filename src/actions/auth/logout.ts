'use server'
import { clearAuthCookies } from '@/lib/auth-cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const logout = async () => {
  const cookieStore = await cookies()
  clearAuthCookies(cookieStore)
  redirect('/admin/login')
}
