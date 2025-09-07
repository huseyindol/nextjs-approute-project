import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Admin login endpoint
 * @description Authenticates admin user credentials
 * @body LoginBody
 * @response 200:LoginSuccessResponse:Login successful
 * @add 401:ErrorResponse:Invalid credentials
 * @openapi
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-posta ve şifre gereklidir.' },
        { status: 400 },
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Geçersiz e-posta veya şifre.' },
        { status: 400 },
      )
    }

    // TODO: In production, use proper password hashing comparison
    // For now, direct comparison (replace with bcrypt.compare in production)
    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Geçersiz e-posta veya şifre.' },
        { status: 400 },
      )
    }

    // Create session token (simple approach for demo)
    const sessionToken = `session_${user.id}_${Date.now()}`

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      token: sessionToken,
      message: 'Giriş başarılı.',
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Giriş yapılırken hata oluştu.' },
      { status: 500 },
    )
  }
}
