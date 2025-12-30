import { NextRequest, NextResponse } from 'next/server'
import { refreshService } from '../services/auth/refreshService'
import { CookieEnum } from '../utils/constant/cookieConstant'

export const refreshTokenProxy = async (
  request: NextRequest,
  response: NextResponse,
) => {
  const refreshToken = request.cookies.get(CookieEnum.REFRESH_TOKEN)
  if (!refreshToken) {
    // remove cookies
    removeCookies(response)
  } else {
    const refreshResponse = await refreshService(refreshToken.value)
    if (!refreshResponse.result) {
      removeCookies(response)
      return response
    }
    // cookies update
    response.cookies.set(CookieEnum.ACCESS_TOKEN, refreshResponse.data.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    })
    response.cookies.set(
      CookieEnum.REFRESH_TOKEN,
      refreshResponse.data.refreshToken,
      {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
      },
    )
    response.cookies.set(
      CookieEnum.EXPIRED_DATE,
      refreshResponse.data.expiredDate,
      {
        httpOnly: false,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
      },
    )
    response.cookies.set(CookieEnum.USER_CODE, refreshResponse.data.userCode, {
      httpOnly: false,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    })
  }
}

const removeCookies = (response: NextResponse) => {
  response.cookies.delete(CookieEnum.ACCESS_TOKEN)
  response.cookies.delete(CookieEnum.REFRESH_TOKEN)
  response.cookies.delete(CookieEnum.EXPIRED_DATE)
  response.cookies.delete(CookieEnum.USER_CODE)
}
