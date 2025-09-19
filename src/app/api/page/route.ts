import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Get page by slug
 * @description Retrieves a specific page by its slug with SEO information
 * @params PageParams
 * @response PageWithSEOResponse:Page with SEO data retrieved successfully
 * @openapi
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
  }

  const page = await prisma.page.findUnique({
    where: { slug },
    include: {
      pageSEO: true,
    },
  })

  if (!page) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 })
  }

  return NextResponse.json(page)
}
