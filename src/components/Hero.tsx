'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { siteInfo } from '@/data/mockData'
import { sendGTMEvent } from '@next/third-parties/google'
import { Download, GithubIcon, LinkedinIcon, Mail } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section
      id="about"
      className="flex items-center justify-center py-24 pt-24 md:pt-32"
    >
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl animate-fade-in-up text-center">
          <div className="mb-6">
            <Badge variant="secondary" xatt="hero" className="mb-4 text-sm">
              {siteInfo.sayHi}
            </Badge>
          </div>

          <h1 className="mb-6 text-5xl font-bold md:text-7xl">
            <span className="text-gradient">{siteInfo.title.highlight}</span>
            <br />
            {siteInfo.title.rest}
          </h1>

          <p
            className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl"
            dangerouslySetInnerHTML={{ __html: siteInfo.description }}
          ></p>

          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="hero-gradient shadow-elegant text-white transition-all hover:cursor-pointer hover:shadow-lg"
              onClick={() => {
                sendGTMEvent({
                  virtual: '/',
                  event: 'buttonClick',
                  platform: 'email',
                })
                window.open(siteInfo.email, '_blank')
              }}
            >
              <Mail className="mr-2 h-5 w-5" />
              İletişime Geç
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:cursor-pointer hover:bg-primary hover:text-white"
              onClick={() => {
                sendGTMEvent({
                  virtual: '/',
                  event: 'buttonClick',
                  platform: 'cv-download',
                })
                window.open(siteInfo.cvUrl, '_blank')
              }}
            >
              <Download className="mr-2 h-5 w-5" />
              CV İndir
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            {siteInfo.socialLinks.map(link => (
              <Link
                key={link.platform}
                href={link.url}
                target="_blank"
                className="transition-all hover:cursor-pointer hover:bg-primary hover:text-white"
              >
                {SocialIcon(link.platform)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const SocialIcon = (platform: string) => {
  switch (platform) {
    case 'github':
      return <GithubIcon className="size-4" />
    case 'linkedin':
      return <LinkedinIcon className="size-4" />
    case 'email':
      return <Mail className="size-4" />
    default:
      return <>Bu platform için icon bulunamadı</>
  }
}
