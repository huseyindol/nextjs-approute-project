import ContactEmailTemplate from '@/components/email-template'
import { render } from '@react-email/render'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY || 'dummy-key')

/**
 * Send contact form email
 * @description Sends an email using the contact form data via Resend service
 * @body ContactRequest
 * @response 200:ContactResponse:Email sent successfully
 * @add 400:ContactErrorResponse:Missing required fields or invalid email
 * @add 500:ContactErrorResponse:Email sending failed
 * @add 503:ContactErrorResponse:Email service not configured
 * @openapi
 */
export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json()

  const emailHtml = await render(
    <ContactEmailTemplate name={name} email={email} message={message} />,
  )

  try {
    // Check if API key is configured
    if (
      !process.env.NEXT_PUBLIC_RESEND_API_KEY ||
      process.env.NEXT_PUBLIC_RESEND_API_KEY === 'dummy-key'
    ) {
      return NextResponse.json(
        {
          error:
            'Email servisi yapılandırılmamış. Lütfen daha sonra tekrar deneyin.',
        },
        { status: 503 },
      )
    }

    // Input validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tüm alanlar gereklidir.' },
        { status: 400 },
      )
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 },
      )
    }

    // Determine sender email
    let senderEmail =
      process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL || 'noreply@huseyindol.site'

    // Resend doesn't allow sending from public domains like gmail.com without verification
    // Fallback to testing domain if a public domain is detected or if we are in development
    const publicDomains = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
    ]
    const domain = senderEmail.split('@')[1]

    if (publicDomains.includes(domain) || !domain) {
      console.warn(
        `⚠️ Warning: Cannot send from public domain ${domain}. Falling back to onboarding@resend.dev`,
      )
      senderEmail = 'onboarding@resend.dev'
    }

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: `Website <${senderEmail}>`,
      to: [process.env.NEXT_PUBLIC_RESEND_TO_EMAIL || 'huseyindol@gmail.com'], // Sizin email adresiniz
      subject: `🌐 Website İletişim - ${name}`,
      html: emailHtml,
      replyTo: email, // Kullanıcının emaili reply-to olarak ayarlanır
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'E-posta gönderilirken bir hata oluştu.' },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { message: 'Mesajınız başarıyla gönderildi!' },
      { status: 200 },
    )
  } catch {
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu.' },
      { status: 500 },
    )
  }
}
