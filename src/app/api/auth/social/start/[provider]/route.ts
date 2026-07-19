import { NextRequest, NextResponse } from 'next/server'
import {
  OAUTH_STATE_COOKIE,
  buildAuthorizeUrl,
  isSocialProvider,
} from '@/lib/social-auth'

/**
 * Sosyal giriş başlangıcı: CSRF için rastgele `state` üretir (httpOnly cookie, 10 dk)
 * ve kullanıcıyı provider'ın onay ekranına yönlendirir.
 * Callback: /api/auth/social/callback/{provider} (state burada doğrulanır).
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params
  const origin = request.nextUrl.origin

  if (!isSocialProvider(provider)) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent('Desteklenmeyen sağlayıcı')}`,
    )
  }

  const state = crypto.randomUUID()
  const authorizeUrl = buildAuthorizeUrl(provider, origin, state)
  if (!authorizeUrl) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(
        'Bu giriş yöntemi henüz yapılandırılmamış',
      )}`,
    )
  }

  const response = NextResponse.redirect(authorizeUrl)
  response.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  })
  return response
}
