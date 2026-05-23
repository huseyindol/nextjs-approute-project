'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { CookieEnum } from '../../utils/constant/cookieConstant'

export const siteLogout = async () => {
  const cookieStore = await cookies()
  const expired = { httpOnly: true, sameSite: 'strict' as const, maxAge: 0 }
  cookieStore.set(CookieEnum.ACCESS_TOKEN, '', expired)
  cookieStore.set(CookieEnum.REFRESH_TOKEN, '', expired)
  cookieStore.set(CookieEnum.EXPIRED_DATE, '', expired)
  cookieStore.set(CookieEnum.USER_CODE, '', expired)
  redirect('/login')
}
