import {
  buildAuthorizeUrl,
  isSocialProvider,
  OAUTH_STATE_COOKIE,
} from '@/lib/social-auth'
import { resCookieStore } from '@/lib/api-cookies'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Sosyal giriş başlangıcı: CSRF için rastgele `state` üretir (httpOnly cookie, 10 dk)
 * ve kullanıcıyı provider'ın onay ekranına yönlendirir.
 * Dönüş: /api/auth/social/callback/{provider} (state orada doğrulanır).
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const provider = String(req.query.provider ?? '')
  const proto =
    (req.headers['x-forwarded-proto'] as string) ??
    (process.env.NODE_ENV === 'production' ? 'https' : 'http')
  const origin = `${proto}://${req.headers.host}`

  const fail = (msg: string) =>
    res.redirect(302, `/login?error=${encodeURIComponent(msg)}`)

  if (!isSocialProvider(provider)) return fail('Desteklenmeyen sağlayıcı')

  const state = crypto.randomUUID()
  const authorizeUrl = buildAuthorizeUrl(provider, origin, state)
  if (!authorizeUrl) return fail('Bu giriş yöntemi henüz yapılandırılmamış')

  resCookieStore(res).set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  })
  return res.redirect(302, authorizeUrl)
}
