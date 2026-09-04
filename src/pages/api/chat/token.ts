import { CookieEnum } from '@/utils/constant/cookieConstant'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Login'li tenant kullanıcısının chat WS handshake'i için accessToken'ı verir.
 * httpOnly accessToken'ı yalnız sunucu okuyabilir; SAME-ORIGIN bu route onu page
 * JS'ine (WS CONNECT Authorization header'ı için) iletir.
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ token: string | null }>,
) {
  const token = req.cookies[CookieEnum.ACCESS_TOKEN]
  if (!token) return res.status(401).json({ token: null })
  return res.status(200).json({ token })
}
