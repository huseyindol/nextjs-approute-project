'use server'

import { cookies } from 'next/headers'
import { CookieEnum } from '../../utils/constant/cookieConstant'

export async function siteLogout() {
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
  // username httpOnly değil — aynı şekilde sil
  cookieStore.set(CookieEnum.USERNAME, '', { ...delOpts, httpOnly: false })
}
