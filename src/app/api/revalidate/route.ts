import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

type RevalidateBody = {
  tag?: string
  path?: string
  type?: 'page' | 'layout'
  secret?: string
}

function isAuthorized(
  request: Request,
  providedSecret?: string | null,
): boolean {
  const configuredSecret = process.env.NEXT_PUBLIC_REVALIDATE_SECRET
  if (!configuredSecret) return true

  // Prefer Authorization header (Bearer <token>), fallback to body/query secret
  const authHeader = request.headers.get('authorization') || ''
  const bearer = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : undefined
  const token = bearer || providedSecret || undefined
  return token === configuredSecret
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as RevalidateBody

    if (!isAuthorized(request, body.secret ?? null)) {
      return NextResponse.json(
        { ok: false, error: 'Unauthorized' },
        { status: 401 },
      )
    }

    const actions: string[] = []

    if (body.tag) {
      revalidateTag(body.tag)
      actions.push(`tag:${body.tag}`)
    }

    if (body.path) {
      revalidatePath(body.path, body.type === 'layout' ? 'layout' : 'page')
      actions.push(`path:${body.path}`)
    }

    if (actions.length === 0) {
      return NextResponse.json(
        { ok: false, error: 'Provide at least one of: { tag, path }' },
        { status: 400 },
      )
    }

    return NextResponse.json({ ok: true, revalidated: actions })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: (error as Error).message ?? 'Unexpected error' },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  // Simple GET for debugging: /api/revalidate?path=/ or /api/revalidate?tag=mytag
  const url = new URL(request.url)
  const tag = url.searchParams.get('tag') || undefined
  const path = url.searchParams.get('path') || undefined
  const type =
    (url.searchParams.get('type') as 'page' | 'layout' | null) || undefined
  const secret = url.searchParams.get('secret') || undefined

  if (!isAuthorized(request, secret)) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401 },
    )
  }

  const actions: string[] = []
  if (tag) {
    revalidateTag(tag)
    actions.push(`tag:${tag}`)
  }
  if (path) {
    revalidatePath(path, type === 'layout' ? 'layout' : 'page')
    actions.push(`path:${path}`)
  }

  if (actions.length === 0) {
    return NextResponse.json(
      { ok: false, error: 'Provide at least one of: { tag, path }' },
      { status: 400 },
    )
  }

  return NextResponse.json({ ok: true, revalidated: actions })
}
