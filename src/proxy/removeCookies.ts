import { NextResponse } from 'next/server'
import { CookieEnum } from '../utils/constant/cookieConstant'

/** Auth cookie'lerini siler (host-only — yazımla aynı attribute seti). */
export const removeCookies = async (response: NextResponse) => {
  const names = [
    CookieEnum.ACCESS_TOKEN,
    CookieEnum.REFRESH_TOKEN,
    CookieEnum.EXPIRED_DATE,
    CookieEnum.USER_CODE,
    CookieEnum.USERNAME,
  ]
  for (const name of names) {
    response.cookies.set(name, '', { path: '/', maxAge: 0 })
  }
}
