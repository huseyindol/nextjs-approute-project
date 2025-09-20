// Update a page SEO

import prisma from '@/lib/prisma'
import { APIResponseErrorType, APIResponseSuccessType } from '@/types/APITypes'
import { PageSEO } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Get a page SEO
 * @description Get a page SEO with the provided information
 * @pathParams PageSEOParams
 * @response PageSEOResponse:Page SEO get successfully
 * @openapi
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<
  NextResponse<APIResponseSuccessType<PageSEO> | APIResponseErrorType>
> {
  try {
    // 1. ID'yi al ve kontrol et
    const { id: idStr } = await params
    const id = parseInt(idStr)

    if (isNaN(id)) {
      return NextResponse.json<APIResponseErrorType>(
        {
          success: false,
          error: 'Geçerli bir sayısal ID giriniz.',
          message: 'ID parametresi sayısal olmalıdır.',
          status: 400,
        },
        { status: 400 },
      )
    }

    // 2. PageSEO'yu veritabanından al
    const pageseo = await prisma.pageSEO.findUnique({
      where: { id },
    })

    if (!pageseo) {
      return NextResponse.json<APIResponseErrorType>(
        {
          success: false,
          error: 'PageSEO bulunamadı.',
          message: `ID ${id} ile eşleşen PageSEO kaydı bulunamadı.`,
          status: 404,
        },
        { status: 404 },
      )
    }

    // 3. Success response döndür
    return NextResponse.json<APIResponseSuccessType<PageSEO>>(
      {
        success: true,
        data: pageseo,
        message: 'PageSEO başarıyla alındı.',
        status: 200,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('PageSEO GET error:', error)
    return NextResponse.json<APIResponseErrorType>(
      {
        success: false,
        error: 'PageSEO alınırken hata oluştu.',
        message: error instanceof Error ? error.message : 'Bilinmeyen hata',
        status: 500,
      },
      { status: 500 },
    )
  }
}

/**
 * Update a page SEO
 * @description Updates a page SEO with the provided information
 * @pathParams PageSEOParams
 * @body UpdatePageSEOBody
 * @response PageSEOResponse:Page SEO updated successfully
 * @openapi
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<
  NextResponse<APIResponseSuccessType<PageSEO> | APIResponseErrorType>
> {
  try {
    // 1. ID'yi al ve kontrol et
    const { id: idStr } = await params
    const id = parseInt(idStr)

    if (isNaN(id)) {
      return NextResponse.json<APIResponseErrorType>(
        {
          success: false,
          error: 'Geçerli bir sayısal ID giriniz.',
          message: 'ID parametresi sayısal olmalıdır.',
          status: 400,
        },
        { status: 400 },
      )
    }

    // 2. Request body'yi parse et ve validate et
    let requestBody
    try {
      requestBody = await request.json()
    } catch (parseError) {
      return NextResponse.json<APIResponseErrorType>(
        {
          success: false,
          error: 'Geçersiz JSON formatı.',
          message:
            parseError instanceof Error
              ? parseError.message
              : 'JSON parse hatası',
          status: 400,
        },
        { status: 400 },
      )
    }

    // 3. Body'yi Zod ile validate et
    const { title, description, keywords, canonical, noIndex, noFollow } =
      requestBody

    // 3. Mevcut PageSEO'yu kontrol et
    const existingPageSEO = await prisma.pageSEO.findUnique({
      where: { id },
    })

    if (!existingPageSEO) {
      return NextResponse.json<APIResponseErrorType>(
        {
          success: false,
          error: 'PageSEO bulunamadı.',
          message: `ID ${id} ile eşleşen PageSEO kaydı bulunamadı.`,
          status: 404,
        },
        { status: 404 },
      )
    }

    // 4. PageSEO'yu güncelle
    const updatedPageSEO = await prisma.pageSEO.update({
      where: { id },
      data: {
        title,
        description,
        keywords,
        canonical: canonical || null,
        noIndex,
        noFollow,
        updatedAt: new Date(),
      },
    })

    // 5. Success response döndür
    return NextResponse.json<APIResponseSuccessType<PageSEO>>(
      {
        success: true,
        data: updatedPageSEO,
        message: 'PageSEO başarıyla güncellendi.',
        status: 200,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('PageSEO PUT error:', error)

    return NextResponse.json<APIResponseErrorType>(
      {
        success: false,
        error: 'Sunucu hatası.',
        message: error instanceof Error ? error.message : 'Bilinmeyen hata',
        status: 500,
      },
      { status: 500 },
    )
  }
}
