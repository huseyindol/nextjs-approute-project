import { NextResponse } from 'next/server'
import { CookieEnum } from '../utils/constant/cookieConstant'

/**
 * Auth cookie'lerini siler. `domain`, yazımla aynı registrable domain olmalı
 * (aksi halde domain-scoped cookie silinmez); undefined = host-only.
 */
export const removeCookies = async (
  response: NextResponse,
  domain?: string,
) => {
  const names = [
    CookieEnum.ACCESS_TOKEN,
    CookieEnum.REFRESH_TOKEN,
    CookieEnum.EXPIRED_DATE,
    CookieEnum.USER_CODE,
    CookieEnum.USERNAME,
  ]
  for (const name of names) {
    response.cookies.set(name, '', { path: '/', maxAge: 0, domain })
  }
}
