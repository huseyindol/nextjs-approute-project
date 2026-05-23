'use server'
import { cookies } from 'next/headers'
import { CookieEnum } from '../../utils/constant/cookieConstant'

const cookieOpts = {
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
}

export const saveTokens = async (data: {
  token: string
  refreshToken: string
  expiredDate: number
  userCode: string
}) => {
  const cookieStore = await cookies()
  cookieStore.set(CookieEnum.ACCESS_TOKEN, data.token, cookieOpts)
  cookieStore.set(CookieEnum.REFRESH_TOKEN, data.refreshToken, cookieOpts)
  cookieStore.set(CookieEnum.EXPIRED_DATE, String(data.expiredDate), cookieOpts)
  cookieStore.set(CookieEnum.USER_CODE, data.userCode, cookieOpts)
}
