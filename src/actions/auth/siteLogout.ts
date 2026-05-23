'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { CookieEnum } from '../../utils/constant/cookieConstant'

export const siteLogout = async () => {
  const cookieStore = await cookies()
  const delOpts = {
    httpOnly: true,
    sameSite: 'strict' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  }
  cookieStore.set(CookieEnum.ACCESS_TOKEN, '', delOpts)
  cookieStore.set(CookieEnum.REFRESH_TOKEN, '', delOpts)
  cookieStore.set(CookieEnum.EXPIRED_DATE, '', delOpts)
  cookieStore.set(CookieEnum.USER_CODE, '', delOpts)
  redirect('/login')
}
