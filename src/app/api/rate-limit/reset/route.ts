import { apiRateLimiter, generalRateLimiter } from '@/lib/rate-limiter-store'
import { getClientIp } from '@/lib/security'
import { NextResponse } from 'next/server'

function isAuthorized(request: Request, secret?: string | null): boolean {
  const configuredSecret = process.env.NEXT_PUBLIC_REVALIDATE_SECRET
  if (!configuredSecret) return true

  const authHeader = request.headers.get('authorization') || ''
  const bearer = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : undefined
  const token = bearer || secret || undefined
  return token === configuredSecret
}

/**
 * Reset rate limit for a specific IP or all IPs
 * GET /api/rate-limit/reset           → reset caller's own IP
 * GET /api/rate-limit/reset?ip=x.x.x  → reset specific IP
 * GET /api/rate-limit/reset?all=true   → clear all rate limits
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const targetIp = url.searchParams.get('ip') || undefined
  const clearAll = url.searchParams.get('all') === 'true'
  const secret = url.searchParams.get('secret') || undefined

  if (!isAuthorized(request, secret)) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401 },
    )
  }

  if (clearAll) {
    apiRateLimiter.clear()
    generalRateLimiter.clear()
    return NextResponse.json({
      ok: true,
      action: 'clear_all',
      message: 'All rate limits cleared',
    })
  }

  const ip = targetIp || getClientIp(request.headers)

  apiRateLimiter.reset(ip)
  generalRateLimiter.reset(ip)

  return NextResponse.json({
    ok: true,
    action: 'reset_ip',
    ip,
    message: `Rate limit reset for ${ip}`,
  })
}

/**
 * Reset rate limit via POST
 * @body { ip?: string, all?: boolean, secret?: string }
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      ip?: string
      all?: boolean
      secret?: string
    }

    if (!isAuthorized(request, body.secret ?? null)) {
      return NextResponse.json(
        { ok: false, error: 'Unauthorized' },
        { status: 401 },
      )
    }

    if (body.all) {
      apiRateLimiter.clear()
      generalRateLimiter.clear()
      return NextResponse.json({
        ok: true,
        action: 'clear_all',
        message: 'All rate limits cleared',
      })
    }

    const ip = body.ip || getClientIp(request.headers)

    apiRateLimiter.reset(ip)
    generalRateLimiter.reset(ip)

    return NextResponse.json({
      ok: true,
      action: 'reset_ip',
      ip,
      message: `Rate limit reset for ${ip}`,
    })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message ?? 'Unexpected error' },
      { status: 500 },
    )
  }
}
