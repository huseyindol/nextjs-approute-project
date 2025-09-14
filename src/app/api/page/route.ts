import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  console.log('searchParams :>> ', searchParams)
  console.log('slug :>> ', slug)

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
  }

  const page = await prisma.page.findUnique({
    where: { slug },
  })
  console.log('page GET route :>> ', page)
  if (!page) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 })
  }

  return NextResponse.json(page)
}
