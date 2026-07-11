import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { CookieEnum } from '@/utils/constant/cookieConstant'

const ELLY_API_URL =
  process.env.NEXT_PUBLIC_ELLY_API_URL ?? 'https://api.huseyindol.com'

/**
 * Login'li tenant kullanıcısının backend userId'sini döndürür — WebRTC destek
 * araması için {@code /topic/user/{userId}/rtc} aboneliğinde kullanılır.
 *
 * accessToken httpOnly cookie'den server-side okunur; backend'in authenticated
 * {@code /api/v1/users/me}'sine Bearer ile gidilir (cross-origin/CORS yok — server-to-server).
 */
export async function GET() {
  const store = await cookies()
  const token = store.get(CookieEnum.ACCESS_TOKEN)?.value
  if (!token) return NextResponse.json({ userId: null }, { status: 401 })
  try {
    const res = await fetch(`${ELLY_API_URL}/api/v1/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    if (!res.ok) {
      return NextResponse.json({ userId: null }, { status: res.status })
    }
    const data = (await res.json()) as { data?: { id?: number } }
    return NextResponse.json({ userId: data?.data?.id ?? null })
  } catch {
    return NextResponse.json({ userId: null }, { status: 502 })
  }
}
