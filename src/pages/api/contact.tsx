import ContactEmailTemplate from '@/components/email-template'
import { render } from '@react-email/render'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY || 'dummy-key')

/** İletişim formu e-postası (Resend). */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { name, email, message } = req.body ?? {}

  try {
    if (
      !process.env.NEXT_PUBLIC_RESEND_API_KEY ||
      process.env.NEXT_PUBLIC_RESEND_API_KEY === 'dummy-key'
    ) {
      return res.status(503).json({
        error:
          'Email servisi yapılandırılmamış. Lütfen daha sonra tekrar deneyin.',
      })
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Tüm alanlar gereklidir.' })
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: 'Geçerli bir e-posta adresi giriniz.' })
    }

    let senderEmail =
      process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL || 'noreply@huseyindol.com'
    const publicDomains = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
    ]
    const domain = senderEmail.split('@')[1]
    if (publicDomains.includes(domain) || !domain) {
      console.warn(
        `⚠️ Cannot send from public domain ${domain}. Falling back to onboarding@resend.dev`,
      )
      senderEmail = 'onboarding@resend.dev'
    }

    const emailHtml = await render(
      <ContactEmailTemplate name={name} email={email} message={message} />,
    )

    const { error } = await resend.emails.send({
      from: `Website <${senderEmail}>`,
      to: [process.env.NEXT_PUBLIC_RESEND_TO_EMAIL || 'huseyindol@gmail.com'],
      subject: `🌐 Website İletişim - ${name}`,
      html: emailHtml,
      replyTo: email,
    })

    if (error) {
      console.error('Resend error:', error)
      return res
        .status(500)
        .json({ error: 'E-posta gönderilirken bir hata oluştu.' })
    }

    return res.status(200).json({ message: 'Mesajınız başarıyla gönderildi!' })
  } catch {
    return res.status(500).json({ error: 'Sunucu hatası oluştu.' })
  }
}
