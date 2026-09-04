import { resCookieStore } from '@/lib/api-cookies'
import { writeAuthCookies } from '@/lib/auth-cookies'
import { loginService, type LoginPayload } from '@/services/auth/authService'
import type { NextApiRequest, NextApiResponse } from 'next'

type LoginApiResponse = { ok: true } | { ok: false; error: string }

/**
 * BFF login (server action'ın Pages Router karşılığı).
 *
 * Backend login çağrısı SUNUCUDA yapılır (server-to-server → preflight yok, tenant
 * domain'ini API CORS'una eklemeye gerek yok). Dönen token'lar host-only httpOnly
 * cookie'ye yazılır; tarayıcı yalnız same-origin bu endpoint'i çağırır ve token'ı
 * hiç görmez. Güvenlik modeli server action ile birebir aynıdır.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginApiResponse>,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' })
  }

  try {
    const r = await loginService(req.body as LoginPayload)
    writeAuthCookies(resCookieStore(res), {
      token: r.token,
      refreshToken: r.refreshToken,
      username: r.username,
      expiredDate: r.expiredDate,
      refreshExpiredDate: r.refreshExpiredDate,
      userCode: r.userCode,
    })
    return res.status(200).json({ ok: true })
  } catch (e) {
    return res.status(200).json({
      ok: false,
      error: e instanceof Error ? e.message : 'Giriş başarısız.',
    })
  }
}
