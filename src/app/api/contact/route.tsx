import React from 'react'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import ContactEmailTemplate from '@/components/email-template'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY || 'dummy-key')

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.NEXT_PUBLIC_RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY === 'dummy-key') {
      return NextResponse.json(
        { error: 'Email servisi yapılandırılmamış. Lütfen daha sonra tekrar deneyin.' },
        { status: 503 }
      )
    }

    const { name, email, message } = await request.json()

    // Input validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir.' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      )
    }

    // Render email template
    const emailHtml = await render(
      <ContactEmailTemplate
        name={name}
        email={email}
        message={message}
      />
    )

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: `Website <${process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL || 'noreply@huseyindol.site'}>`, // Doğrulanmış domain kullan
      to: [process.env.NEXT_PUBLIC_RESEND_TO_EMAIL || 'huseyindol@gmail.com'], // Sizin email adresiniz
      subject: `🌐 Website İletişim - ${name}`,
      html: emailHtml,
      replyTo: email, // Kullanıcının emaili reply-to olarak ayarlanır
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'E-posta gönderilirken bir hata oluştu.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Mesajınız başarıyla gönderildi!' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu.' },
      { status: 500 }
    )
  }
} 