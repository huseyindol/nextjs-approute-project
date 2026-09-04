import { resCookieStore } from '@/lib/api-cookies'
import { writeAuthCookies } from '@/lib/auth-cookies'
import {
  buildRedirectUri,
  isSocialProvider,
  OAUTH_STATE_COOKIE,
} from '@/lib/social-auth'
import { socialLoginService } from '@/services/auth/authService'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Sosyal giriş callback'i: state (CSRF) doğrulanır, provider'dan gelen `code`
 * BACKEND'e iletilir (takas + kullanıcı bul/bağla/oluştur orada) ve dönen token
 * seti normal login ile aynı httpOnly cookie zincirine yazılır.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const provider = String(req.query.provider ?? '')
  const proto =
    (req.headers['x-forwarded-proto'] as string) ??
    (process.env.NODE_ENV === 'production' ? 'https' : 'http')
  const origin = `${proto}://${req.headers.host}`

  const clearState = () =>
    resCookieStore(res).set(OAUTH_STATE_COOKIE, '', {
      path: '/',
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })

  const fail = (msg: string) => {
    clearState()
    return res.redirect(302, `/login?error=${encodeURIComponent(msg)}`)
  }

  if (!isSocialProvider(provider)) return fail('Desteklenmeyen sağlayıcı')

  // Kullanıcı provider ekranında vazgeçti / provider hata döndürdü
  const providerError = req.query.error
  if (providerError) {
    return fail(
      providerError === 'access_denied'
        ? 'Giriş iptal edildi'
        : 'Sosyal giriş başarısız oldu',
    )
  }

  const code = typeof req.query.code === 'string' ? req.query.code : undefined
  const state =
    typeof req.query.state === 'string' ? req.query.state : undefined
  const expectedState = req.cookies[OAUTH_STATE_COOKIE]
  if (!code || !state || !expectedState || state !== expectedState) {
    return fail('Oturum doğrulaması başarısız — lütfen tekrar deneyin')
  }

  try {
    const r = await socialLoginService(provider, {
      code,
      redirectUri: buildRedirectUri(origin, provider),
    })

    const store = resCookieStore(res)
    // Tek kullanımlık state cookie'sini temizle
    store.set(OAUTH_STATE_COOKIE, '', {
      path: '/',
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    writeAuthCookies(store, {
      token: r.token,
      refreshToken: r.refreshToken,
      username: r.username,
      expiredDate: r.expiredDate,
      refreshExpiredDate: r.refreshExpiredDate,
      userCode: r.userCode,
    })
    return res.redirect(302, '/')
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Sosyal giriş başarısız oldu')
  }
}
