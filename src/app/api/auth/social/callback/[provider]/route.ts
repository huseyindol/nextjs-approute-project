import { NextRequest, NextResponse } from 'next/server'
import { writeAuthCookies } from '@/lib/auth-cookies'
import {
  OAUTH_STATE_COOKIE,
  buildRedirectUri,
  isSocialProvider,
} from '@/lib/social-auth'
import { socialLoginService } from '@/services/auth/authService'

/**
 * Sosyal giriş callback'i: state (CSRF) doğrulanır, provider'dan gelen `code`
 * BACKEND'e iletilir (takas + kullanıcı bul/bağla/oluştur orada) ve dönen token
 * seti normal login ile aynı httpOnly cookie zincirine yazılır.
 * Hata durumlarında kullanıcı anlaşılır mesajla /login'e döner.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params
  const origin = request.nextUrl.origin
  const search = request.nextUrl.searchParams

  const fail = (message: string) =>
    NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(message)}`,
    )

  if (!isSocialProvider(provider)) {
    return fail('Desteklenmeyen sağlayıcı')
  }

  // Kullanıcı provider ekranında vazgeçti / provider hata döndürdü
  const providerError = search.get('error')
  if (providerError) {
    return fail(
      providerError === 'access_denied'
        ? 'Giriş iptal edildi'
        : 'Sosyal giriş başarısız oldu',
    )
  }

  const code = search.get('code')
  const state = search.get('state')
  const expectedState = request.cookies.get(OAUTH_STATE_COOKIE)?.value
  if (!code || !state || !expectedState || state !== expectedState) {
    return fail('Oturum doğrulaması başarısız — lütfen tekrar deneyin')
  }

  try {
    const r = await socialLoginService(provider, {
      code,
      redirectUri: buildRedirectUri(origin, provider),
    })

    const response = NextResponse.redirect(`${origin}/`)
    // Tek kullanımlık state cookie'sini temizle
    response.cookies.delete(OAUTH_STATE_COOKIE)
    writeAuthCookies(response.cookies, {
      token: r.token,
      refreshToken: r.refreshToken,
      username: r.username,
      expiredDate: r.expiredDate,
      refreshExpiredDate: r.refreshExpiredDate,
      userCode: r.userCode,
    })
    return response
  } catch (e) {
    const message =
      e instanceof Error ? e.message : 'Sosyal giriş başarısız oldu'
    const response = fail(message)
    response.cookies.delete(OAUTH_STATE_COOKIE)
    return response
  }
}
