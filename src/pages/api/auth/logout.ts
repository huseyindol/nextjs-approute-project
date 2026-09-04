import { resCookieStore } from '@/lib/api-cookies'
import { clearAuthCookies } from '@/lib/auth-cookies'
import type { NextApiRequest, NextApiResponse } from 'next'

/** Tenant-site çıkışı: auth cookie'lerini sunucuda temizler. */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: boolean }>,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false })
  }
  clearAuthCookies(resCookieStore(res))
  return res.status(200).json({ ok: true })
}
