import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Get user by ID
 * @description Retrieves a specific user by their ID with optional posts
 * @pathParams UserParams
 * @params { include_posts?: boolean }
 * @response UserWithPostsResponse
 * @add 404:ErrorResponse:User not found
 * @openapi
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Geçerli bir kullanıcı ID'si giriniz." },
        { status: 400 },
      )
    }

    const { searchParams } = new URL(request.url)
    const includePosts = searchParams.get('include_posts') === 'true'
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
        ...(includePosts && {
          posts: {
            select: {
              id: true,
              title: true,
              content: true,
              published: true,
            },
            orderBy: { id: 'desc' },
          },
        }),
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı.' },
        { status: 404 },
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('User GET by ID error:', error)
    return NextResponse.json(
      { error: 'Kullanıcı alınırken hata oluştu.' },
      { status: 500 },
    )
  }
}

/**
 * Update user by ID
 * @description Updates a specific user's information
 * @pathParams UserParams
 * @body UpdateUserBody
 * @response UserSuccessResponse:User updated successfully
 * @add 404:ErrorResponse:User not found
 * @add 409:ErrorResponse:Email already exists
 * @openapi
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Geçerli bir kullanıcı ID'si giriniz." },
        { status: 400 },
      )
    }

    const { email, firstName, lastName } = await request.json()

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı.' },
        { status: 404 },
      )
    }

    // Validate email if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Geçerli bir e-posta adresi giriniz.' },
          { status: 400 },
        )
      }

      // Check if email is already taken by another user
      const emailExists = await prisma.user.findFirst({
        where: {
          email,
          NOT: { id },
        },
      })

      if (emailExists) {
        return NextResponse.json(
          { error: 'Bu e-posta adresi zaten kullanılmakta.' },
          { status: 409 },
        )
      }
    }

    // Update user
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(email && { email }),
        ...(firstName !== undefined && { firstName: firstName || null }),
        ...(lastName !== undefined && { lastName: lastName || null }),
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

    return NextResponse.json({
      user,
      message: 'Kullanıcı başarıyla güncellendi.',
    })
  } catch (error) {
    console.error('User PUT error:', error)
    return NextResponse.json(
      { error: 'Kullanıcı güncellenirken hata oluştu.' },
      { status: 500 },
    )
  }
}

/**
 * Delete user by ID
 * @description Deletes a specific user and all their posts
 * @pathParams UserParams
 * @response DeleteSuccessResponse:User deleted successfully
 * @add 404:ErrorResponse:User not found
 * @openapi
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Geçerli bir kullanıcı ID'si giriniz." },
        { status: 400 },
      )
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı.' },
        { status: 404 },
      )
    }

    // Delete user (posts will be deleted automatically due to cascade)
    await prisma.user.delete({
      where: { id },
    })

    return NextResponse.json({
      message: 'Kullanıcı başarıyla silindi.',
    })
  } catch (error) {
    console.error('User DELETE error:', error)
    return NextResponse.json(
      { error: 'Kullanıcı silinirken hata oluştu.' },
      { status: 500 },
    )
  }
}
