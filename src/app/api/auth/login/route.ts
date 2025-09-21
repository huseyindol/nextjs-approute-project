import prisma from '@/lib/prisma'
import { APIResponseErrorType, APIResponseSuccessType } from '@/types/APITypes'
import { User } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Admin login endpoint
 * @description Authenticates admin user credentials
 * @body LoginBody
 * @response LoginSuccessResponse:User successful
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
    const { email, password } = await request.json()
    console.log(email, password)

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

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Geçersiz e-posta veya şifre.',
          message: 'Geçersiz e-posta veya şifre.',
          status: 400,
        },
        { status: 400 },
      )
    }

    // For now, direct comparison (replace with bcrypt.compare in production)
    if (user.password !== password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Geçersiz e-posta veya şifre.',
          message: 'Geçersiz e-posta veya şifre.',
          status: 400,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: user,
        message: 'Giriş başarılı.',
        status: 200,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Giriş yapılırken hata oluştu.',
        message: 'Giriş yapılırken hata oluştu.',
        status: 500,
      },
      { status: 500 },
    )
  }
}
