'use client'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, Download } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function Hero() {
  return (
    <section
      id="about"
      className="py-24 md:pt-32 flex items-center justify-center pt-24"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="mb-6">
            <Badge variant="secondary" xatt="hero" className="mb-4 text-sm">
              👋 Merhabalar, ben Hüseyin
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Modern Web</span>
            <br />
            Uygulamaları Geliştiriyorum
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            10+ yıllık deneyimim ile{' '}
            <strong>React, Next.js ve TypeScript</strong> kullanarak
            ölçeklenebilir, performanslı ve kullanıcı dostu web uygulamaları
            geliştiriyorum. Ekip liderliği ve mentorluk konularında da
            deneyimliyim.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="hero-gradient text-white shadow-elegant hover:shadow-lg transition-all hover:cursor-pointer"
              onClick={() =>
                window.open('mailto:huseyindol@gmail.com', '_blank')
              }
            >
              <Mail className="mr-2 h-5 w-5" />
              İletişime Geç
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-white hover:cursor-pointer"
              onClick={() =>
                window.open('/assets/files/HuseyinDOL.pdf', '_blank')
              }
            >
              <Download className="mr-2 h-5 w-5" />
              CV İndir
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <Link
              href="https://github.com/huseyindol"
              target="_blank"
              className="hover:bg-primary hover:text-white transition-all hover:cursor-pointer"
            >
              <Github className="size-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/huseyindol/"
              target="_blank"
              className="hover:bg-primary hover:text-white transition-all hover:cursor-pointer"
            >
              <Linkedin className="size-4" />
            </Link>
            <Link
              href="mailto:huseyindol@gmail.com"
              target="_blank"
              className="hover:bg-primary hover:text-white transition-all hover:cursor-pointer"
            >
              <Mail className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
