import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { CookieEnum } from '@/utils/constant/cookieConstant'

/**
 * Login'li tenant kullanıcısının chat WS handshake'i için accessToken'ı verir.
 *
 * httpOnly accessToken'ı yalnız sunucu okuyabilir; burada SAME-ORIGIN bir route
 * olarak page JS'ine (WS CONNECT Authorization header'ı için) iletilir. Cookie
 * cross-domain `api`'ye gönderilmediğinden, WS kimliği bu yolla taşınır.
 *
 * Not: token yalnız WS handshake için bellekte kullanılır; cookie olarak JS'e
 * açılmaz. (Guest-token zaten JS'te tutuluyordu; bu, kullanıcının gerçek kimliği.)
 */
export async function GET() {
  const store = await cookies()
  const token = store.get(CookieEnum.ACCESS_TOKEN)?.value
  if (!token) {
    return NextResponse.json({ token: null }, { status: 401 })
  }
  return NextResponse.json({ token })
}
