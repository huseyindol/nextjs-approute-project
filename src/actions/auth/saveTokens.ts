'use server'
import { cookies } from 'next/headers'
import { CookieEnum } from '../../utils/constant/cookieConstant'

// 7 gün — www kopyalarının "Session" yerine kalıcı bir süresi olsun.
const MAX_AGE = 60 * 60 * 24 * 7

const secureOpts = {
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: MAX_AGE,
}

export const saveTokens = async (data: {
  token: string
  refreshToken: string
  username: string
}) => {
  const cookieStore = await cookies()
  cookieStore.set(CookieEnum.ACCESS_TOKEN, data.token, secureOpts)
  cookieStore.set(CookieEnum.REFRESH_TOKEN, data.refreshToken, secureOpts)
  // username chat'te okunacak — httpOnly DEĞİL (hassas değil, client JS de okuyabilsin)
  cookieStore.set(CookieEnum.USERNAME, data.username, {
    httpOnly: false,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  })
}
