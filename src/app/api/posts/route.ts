import prisma from '@/lib/prisma'
import { PostRole, Prisma } from '@prisma/client'
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
    const userId = searchParams.get('user_id')
    const search = searchParams.get('search') || ''
    const includeUser = searchParams.get('include_user') === 'true'

    const skip = (page - 1) * limit

    // Build where clause
    const where: Prisma.PostWhereInput = {}

    if (published !== null) {
      where.published = published === 'true'
    }

    if (userId) {
      const id = parseInt(userId)
      if (!isNaN(id)) {
        where.users = {
          some: {
            userId: id,
          },
        }
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' as const } },
        { content: { contains: search, mode: 'insensitive' as const } },
      ]
    }

    // Get posts with optional user
    const posts = await prisma.post.findMany({
      where,
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        ...(includeUser && {
          users: {
            select: {
              user: {
                select: {
                  id: true,
                  email: true,
                  firstName: true,
                  lastName: true,
                },
              },
              role: true,
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
 * @add 404:PostErrorResponse:User not found
 * @openapi
 */
export async function POST(request: NextRequest) {
  try {
    const {
      title,
      content,
      published = false,
      userId,
      role = PostRole.AUTHOR,
    } = await request.json()

    // Input validation
    if (!title || !userId) {
      return NextResponse.json(
        { error: "Başlık ve yazar ID'si gereklidir." },
        { status: 400 },
      )
    }

    if (typeof userId !== 'number' || userId <= 0) {
      return NextResponse.json(
        { error: "Geçerli bir yazar ID'si giriniz." },
        { status: 400 },
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'Yazar bulunamadı.' }, { status: 404 })
    }

    // Create post
    const post = await prisma.post.create({
      data: {
        title,
        content: content || null,
        published: Boolean(published),
        users: {
          create: {
            userId,
            role,
          },
        },
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
              },
            },
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
