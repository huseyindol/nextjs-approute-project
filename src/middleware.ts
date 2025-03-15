import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // _next/static/chunks ile başlayan path'leri kontrol et
  if (request.nextUrl.pathname.startsWith('/_next/')) {
    // Response'u al
    const response = NextResponse.next()
    
    // X-Robots-Tag header'ını ekle
    response.headers.set('X-Robots-Tag', 'googlebot: nofollow')
    
    return response
  }

  return NextResponse.next()
}

// Middleware'in hangi path'lerde çalışacağını belirt
export const config = {
  matcher: '/_next/:path*'
} 