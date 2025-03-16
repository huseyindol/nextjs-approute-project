import Contact from '@/components/Contact'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim | Hüseyin DOL Portfolio',
  description: 'Benimle iletişime geçin, projeleriniz için iletişim bilgilerim',
  alternates: {
    canonical: 'https://huseyindol.site/contact'
  }
}

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20">
      <Contact />
    </main>
  )
} 