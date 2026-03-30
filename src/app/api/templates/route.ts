import fs from 'node:fs'
import path from 'node:path'
import { type NextRequest, NextResponse } from 'next/server'
import { RateLimiter, RateLimitPresets } from '@/lib/rate-limiter'
import { getClientIp } from '@/lib/security'

const VALID_TYPES = ['pages', 'posts', 'components', 'widgets'] as const
type TemplateType = (typeof VALID_TYPES)[number]

export type TemplateOption = { value: string; label: string }

const limiter = new RateLimiter(RateLimitPresets.api)

function readTemplates(type: TemplateType): TemplateOption[] {
  const dir = path.join(process.cwd(), 'src/components/dynamic', type)
  const placeholder: TemplateOption = { value: '', label: 'Template Seçin' }

  if (!fs.existsSync(dir)) return [placeholder]

  const names = fs
    .readdirSync(dir)
    .filter(
      f => (f.endsWith('.tsx') || f.endsWith('.ts')) && !f.startsWith('index'),
    )
    .map(f => f.replace(/\.(tsx|ts)$/, ''))
    .sort()

  return [placeholder, ...names.map(n => ({ value: n, label: n }))]
}

export async function GET(request: NextRequest) {
  const ip = getClientIp(request.headers)
  const limit = await limiter.check(ip)
  const adminOrigin = process.env.NEXT_PUBLIC_ADMIN_URL ?? '*'

  const headers = {
    'Access-Control-Allow-Origin': adminOrigin,
    'Access-Control-Allow-Methods': 'GET',
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
  }

  if (!limit.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers },
    )
  }

  const type = request.nextUrl.searchParams.get('type') as TemplateType | null

  if (type && VALID_TYPES.includes(type)) {
    return NextResponse.json(readTemplates(type), { headers })
  }

  const all = Object.fromEntries(VALID_TYPES.map(t => [t, readTemplates(t)]))
  return NextResponse.json(all, { headers })
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_ADMIN_URL ?? '*',
      'Access-Control-Allow-Methods': 'GET',
    },
  })
}
