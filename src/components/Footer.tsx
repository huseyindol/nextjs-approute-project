'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

const currentYear = new Date().getFullYear()

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({
          type: 'success',
          message: data.message || 'Mesajınız başarıyla gönderildi!',
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Bir hata oluştu. Lütfen tekrar deneyin.',
        })
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Ağ hatası oluştu. Lütfen tekrar deneyin.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer id="contact" className="bg-muted/30 py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="text-gradient mb-6 text-4xl font-bold md:text-5xl">
              İletişime Geçin
            </h2>
            <p className="text-muted-foreground text-xl">
              Yeni projeler, iş birlikleri veya sadece merhaba demek için!
            </p>
          </div>

          <div className="mb-12 grid gap-8 md:grid-cols-2">
            <Card className="hover:shadow-elegant p-8 transition-all">
              <h3 className="mb-6 text-2xl font-bold">İletişim Bilgileri</h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-primary h-5 w-5" />
                  <span>
                    <a href="mailto:huseyindol@gmail.com">
                      huseyindol@gmail.com
                    </a>
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-primary h-5 w-5" />
                  <span>
                    <a href="tel:+905445582825">+90 (544) 558 28 25</a>
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-primary h-5 w-5" />
                  <span>Maltepe, İstanbul, Türkiye</span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="mb-4 font-semibold">Sosyal Medya</h4>
                <div className="flex space-x-4">
                  <Link
                    href="https://github.com/huseyindol"
                    target="_blank"
                    className="hover:bg-primary hover:text-white"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/huseyindol/"
                    target="_blank"
                    className="hover:bg-primary hover:text-white"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link
                    href="mailto:huseyindol@gmail.com"
                    className="hover:bg-primary hover:text-white"
                  >
                    <Mail className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="hover:shadow-elegant p-8 transition-all">
              <h3 className="mb-6 text-2xl font-bold">Hızlı Mesaj</h3>

              {status.type && (
                <div
                  className={`mb-4 rounded-md p-4 ${
                    status.type === 'success'
                      ? 'border border-green-200 bg-green-50 text-green-800'
                      : 'border border-red-200 bg-red-50 text-red-800'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Adınız"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="border-input bg-background w-full rounded-md border p-3 disabled:opacity-50"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="E-posta adresiniz"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="border-input bg-background w-full rounded-md border p-3 disabled:opacity-50"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Mesajınız"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="border-input bg-background w-full resize-none rounded-md border p-3 disabled:opacity-50"
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="hero-gradient w-full text-white disabled:opacity-50"
                >
                  {isLoading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                </Button>
              </form>
            </Card>
          </div>

          <div className="border-border border-t pt-8 text-center">
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              © {currentYear} Hüseyin DOL. Made with
              <Heart className="h-4 w-4 fill-current text-red-500" />
              using React & TypeScript & Spring Boot
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
