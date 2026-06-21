import { NextRequest, NextResponse } from 'next/server'
import { refreshService } from '../services/auth/refreshService'
import { CookieEnum } from '../utils/constant/cookieConstant'
import { removeCookies } from './removeCookies'

export const refreshTokenProxy = async (
  request: NextRequest,
  response: NextResponse,
) => {
  const refreshToken = request.cookies.get(CookieEnum.REFRESH_TOKEN)
  if (!refreshToken) {
    // remove cookies
    await removeCookies(response)
    return false
  } else {
    const refreshResponse = await refreshService(refreshToken.value)
    if (!refreshResponse.result) {
      await removeCookies(response)
      return false
    }
    // cookies update (host-only — cookie yanıtı veren host'a bağlanır)
    const base = {
      secure: true,
      sameSite: 'strict' as const,
      maxAge: 60 * 60 * 24 * 7,
    }
    response.cookies.set(CookieEnum.ACCESS_TOKEN, refreshResponse.data.token, {
      ...base,
      httpOnly: true,
    })
    response.cookies.set(
      CookieEnum.REFRESH_TOKEN,
      refreshResponse.data.refreshToken,
      { ...base, httpOnly: true },
    )
    response.cookies.set(
      CookieEnum.EXPIRED_DATE,
      String(refreshResponse.data.expiredDate),
      { ...base, httpOnly: false },
    )
    response.cookies.set(CookieEnum.USER_CODE, refreshResponse.data.userCode, {
      ...base,
      httpOnly: false,
    })
    response.cookies.set(CookieEnum.USERNAME, refreshResponse.data.username, {
      ...base,
      httpOnly: false,
    })
    return true
  }
}
