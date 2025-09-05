import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Get all users with pagination and filtering
 * @description Retrieves a list of all users with optional pagination and filtering
 * @params UsersQueryParams
 * @response UsersListResponse
 * @openapi
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100)
    const includePosts = searchParams.get('include_posts') === 'true'
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    // Build where clause for search
    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' as const } },
            { firstName: { contains: search, mode: 'insensitive' as const } },
            { lastName: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}

    // Get users with optional posts
    const users = await prisma.user.findMany({
      where,
      skip,
      take: limit,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
        ...(includePosts && {
          posts: {
            include: {
              post: {
                select: {
                  id: true,
                  title: true,
                  content: true,
                  published: true,
                },
              },
            },
          },
        }),
      },
      orderBy: { createdAt: 'desc' },
    })

    // Get total count for pagination
    const total = await prisma.user.count({ where })
    const pages = Math.ceil(total / limit)

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages,
      },
    })
  } catch (error) {
    console.error('Users GET error:', error)
    return NextResponse.json(
      { error: 'Kullanıcılar alınırken hata oluştu.' },
      { status: 500 },
    )
  }
}

/**
 * Create a new user
 * @description Creates a new user with the provided information
 * @body CreateUserBody
 * @response 201:UserSuccessResponse:User created successfully
 * @add 409:ErrorResponse:Email already exists
 * @openapi
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-posta ve şifre gereklidir.' },
        { status: 400 },
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Şifre en az 6 karakter olmalıdır.' },
        { status: 400 },
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kullanılmakta.' },
        { status: 409 },
      )
    }

    // Create user (Note: In production, hash the password!)
    const user = await prisma.user.create({
      data: {
        email,
        password, // In production: await bcrypt.hash(password, 10)
        firstName: firstName || null,
        lastName: lastName || null,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(
      {
        user,
        message: 'Kullanıcı başarıyla oluşturuldu.',
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('User POST error:', error)
    return NextResponse.json(
      { error: 'Kullanıcı oluşturulurken hata oluştu.' },
      { status: 500 },
    )
  }
}
