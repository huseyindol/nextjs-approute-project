import prisma from '@/lib/prisma'
import { PostRole, User } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import {
  APIResponseErrorType,
  APIResponseSuccessType,
} from '../../../types/APITypes'

// Type definition for users with posts response
type UserWithPosts = {
  id: number
  email: string
  firstName: string | null
  lastName: string | null
  createdAt: Date
  updatedAt: Date
  posts?: {
    postId: number
    userId: number
    role: PostRole
    createdAt: Date
  }[]
}

/**
 * Get all users with pagination and filtering
 * @description Retrieves a list of all users with optional pagination and filtering
 * @params UsersQueryParams
 * @response UsersListResponse
 * @openapi
 */
export async function GET(
  request: NextRequest,
): Promise<
  NextResponse<APIResponseSuccessType<UserWithPosts[]> | APIResponseErrorType>
> {
  try {
    const { searchParams } = new URL(request.url)
    const includePosts = searchParams.get('include_posts') === 'true'
    const search = searchParams.get('search') || ''

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
                  users: {
                    select: {
                      role: true,
                    },
                  },
                },
              },
            },
          },
        }),
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(
      {
        success: true,
        data: users,
        message: 'Kullanıcılar başarıyla alındı.',
        status: 200,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Users GET error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Kullanıcılar alınırken hata oluştu.',
        message: 'Kullanıcılar alınırken hata oluştu.',
        status: 500,
      },
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
export async function POST(
  request: NextRequest,
): Promise<
  NextResponse<
    APIResponseSuccessType<Omit<User, 'password'>> | APIResponseErrorType
  >
> {
  try {
    const { email, password, firstName, lastName } = await request.json()

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'E-posta ve şifre gereklidir.',
          message: 'E-posta ve şifre gereklidir.',
          status: 400,
        },
        { status: 400 },
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: 'Şifre en az 6 karakter olmalıdır.',
          message: 'Şifre en az 6 karakter olmalıdır.',
          status: 400,
        },
        { status: 400 },
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Geçerli bir e-posta adresi giriniz.',
          message: 'Geçerli bir e-posta adresi giriniz.',
          status: 400,
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bu e-posta adresi zaten kullanılmakta.',
          message: 'Bu e-posta adresi zaten kullanılmakta.',
          status: 409,
        },
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
        success: true,
        data: user,
        message: 'Kullanıcı başarıyla oluşturuldu.',
        status: 201,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('User POST error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Kullanıcı oluşturulurken hata oluştu.',
        message: 'Kullanıcı oluşturulurken hata oluştu.',
        status: 500,
      },
      { status: 500 },
    )
  }
}
