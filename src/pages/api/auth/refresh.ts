import { resCookieStore } from '@/lib/api-cookies'
import { clearAuthCookies, writeAuthCookies } from '@/lib/auth-cookies'
import type { RefreshTokenResponseType } from '@/types/AuthResponse'
import { CookieEnum } from '@/utils/constant/cookieConstant'
import type { NextApiRequest, NextApiResponse } from 'next'

const ELLY_API_URL =
  process.env.NEXT_PUBLIC_ELLY_API_URL ?? 'https://api.huseyindol.com'

/**
 * Sessiz oturum yenileme (server action'ın Pages Router karşılığı).
 *
 * refreshToken httpOnly cookie'den SUNUCUDA okunur ve backend'in /auth/refresh
 * endpoint'ine body ile gönderilir (bu uç permitAll'dır ve public-prefix istemez;
 * tenant, refresh token JWT'sinden çözülür). Yeni token seti aynı httpOnly
 * modeliyle cookie'lere yazılır — token tarayıcıya hiç değmez.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: boolean; expiredDate?: number }>,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false })
  }

  const refreshToken = req.cookies[CookieEnum.REFRESH_TOKEN]
  if (!refreshToken) return res.status(200).json({ ok: false })

  try {
    const upstream = await fetch(`${ELLY_API_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      cache: 'no-store',
    })
    const data: RefreshTokenResponseType = await upstream.json()

    if (!upstream.ok || !data.result || !data.data) {
      clearAuthCookies(resCookieStore(res))
      return res.status(200).json({ ok: false })
    }

    const d = data.data
    writeAuthCookies(resCookieStore(res), {
      token: d.token,
      refreshToken: d.refreshToken,
      username: d.username,
      expiredDate: d.expiredDate,
      refreshExpiredDate: d.refreshExpiredDate,
      userCode: d.userCode,
    })
    return res.status(200).json({ ok: true, expiredDate: d.expiredDate })
  } catch {
    // Ağ hatası → cookie'lere DOKUNMA, tekrar denenebilir
    return res.status(200).json({ ok: false })
  }
}
