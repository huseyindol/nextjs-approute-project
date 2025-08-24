import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Get all posts with pagination and filtering
 * @description Retrieves a list of all posts with optional pagination and filtering
 * @params PostsQueryParams
 * @response PostsListResponse
 * @openapi
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100)
    const published = searchParams.get('published')
    const authorId = searchParams.get('author_id')
    const search = searchParams.get('search') || ''
    const includeAuthor = searchParams.get('include_author') === 'true'

    const skip = (page - 1) * limit

    // Build where clause
    const where: Prisma.PostWhereInput = {}

    if (published !== null) {
      where.published = published === 'true'
    }

    if (authorId) {
      const id = parseInt(authorId)
      if (!isNaN(id)) {
        where.authorId = id
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' as const } },
        { content: { contains: search, mode: 'insensitive' as const } },
      ]
    }

    // Get posts with optional author
    const posts = await prisma.post.findMany({
      where,
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        authorId: true,
        ...(includeAuthor && {
          author: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        }),
      },
      orderBy: { id: 'desc' },
    })

    // Get total count for pagination
    const total = await prisma.post.count({ where })
    const pages = Math.ceil(total / limit)

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages,
      },
    })
  } catch (error) {
    console.error('Posts GET error:', error)
    return NextResponse.json(
      { error: 'Gönderiler alınırken hata oluştu.' },
      { status: 500 },
    )
  }
}

/**
 * Create a new post
 * @description Creates a new post with the provided information
 * @body CreatePostBody
 * @response 201:PostSuccessResponse:Post created successfully
 * @add 400:PostErrorResponse:Invalid input data
 * @add 404:PostErrorResponse:Author not found
 * @openapi
 */
export async function POST(request: NextRequest) {
  try {
    const { title, content, published = false, authorId } = await request.json()

    // Input validation
    if (!title || !authorId) {
      return NextResponse.json(
        { error: "Başlık ve yazar ID'si gereklidir." },
        { status: 400 },
      )
    }

    if (typeof authorId !== 'number' || authorId <= 0) {
      return NextResponse.json(
        { error: "Geçerli bir yazar ID'si giriniz." },
        { status: 400 },
      )
    }

    // Check if author exists
    const author = await prisma.user.findUnique({
      where: { id: authorId },
    })

    if (!author) {
      return NextResponse.json({ error: 'Yazar bulunamadı.' }, { status: 404 })
    }

    // Create post
    const post = await prisma.post.create({
      data: {
        title,
        content: content || null,
        published: Boolean(published),
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    })

    return NextResponse.json(
      {
        post,
        message: 'Gönderi başarıyla oluşturuldu.',
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Post POST error:', error)
    return NextResponse.json(
      { error: 'Gönderi oluşturulurken hata oluştu.' },
      { status: 500 },
    )
  }
}
