import prisma from '@/lib/prisma'
import { Page } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import {
  APIResponseErrorType,
  APIResponseSuccessType,
} from '../../../types/APITypes'

/**
 * Get page by slug
 * @description Retrieves a specific page by its slug with SEO information
 * @params PageParams
 * @openapi
 */
export async function GET(
  request: NextRequest,
): Promise<NextResponse<APIResponseSuccessType<Page> | APIResponseErrorType>> {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json(
      {
        success: false,
        error: 'Slug is required',
        message: 'Slug is required',
        status: 400,
      },
      { status: 400 },
    )
  }

  const page = await prisma.page.findUnique({
    where: { slug },
    include: {
      pageSEO: true,
    },
  })

  if (!page) {
    return NextResponse.json(
      {
        success: false,
        error: 'Page not found',
        message: 'Page not found',
        status: 404,
      },
      { status: 404 },
    )
  }

  return NextResponse.json(
    {
      success: true,
      data: page,
      message: 'Page başarıyla alındı.',
      status: 200,
    },
    { status: 200 },
  )
}

/**
 * Create a new page
 * @description Creates a new page with the provided information
 * @body CreatePageBody
 * @openapi
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<APIResponseSuccessType<Page> | APIResponseErrorType>> {
  const { slug, name, description, content, userId } = await request.json()

  const page = await prisma.page.create({
    data: { slug, name, description, content, userId },
    include: {
      pageSEO: true,
    },
  })

  return NextResponse.json(
    {
      success: true,
      data: page,
      message: 'Page başarıyla oluşturuldu.',
      status: 201,
    },
    { status: 201 },
  )
}
