import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// Create a new page SEO
/**
 * Create a new page SEO
 * @description Creates a new page SEO with the provided information
 * @body CreatePageSEOBody
 * @response PageSEOResponse:Page SEO created successfully
 * @openapi
 */
export async function POST(request: NextRequest) {
  const { title, description, keywords, canonical, noIndex, noFollow } =
    await request.json()

  const pageseo = await prisma.pageSEO.create({
    data: { title, description, keywords, canonical, noIndex, noFollow },
  })

  return NextResponse.json(pageseo)
}
