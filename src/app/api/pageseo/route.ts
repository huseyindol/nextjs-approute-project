import prisma from '@/lib/prisma'
import { PageSEO } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import {
  APIResponseErrorType,
  APIResponseSuccessType,
} from '../../../types/APITypes'

// Create a new page SEO
/**
 * Create a new page SEO
 * @description Creates a new page SEO with the provided information
 * @body CreatePageSEOBody
 * @response PageSEOResponse:Page SEO created successfully
 * @openapi
 */
export async function POST(
  request: NextRequest,
): Promise<
  NextResponse<APIResponseSuccessType<PageSEO> | APIResponseErrorType>
> {
  const { title, description, keywords, canonical, noIndex, noFollow } =
    await request.json()

  const pageseo = await prisma.pageSEO.create({
    data: { title, description, keywords, canonical, noIndex, noFollow },
  })

  return NextResponse.json(
    {
      success: true,
      data: pageseo,
      message: 'PageSEO başarıyla oluşturuldu.',
      status: 201,
    },
    { status: 201 },
  )
}
