'use client'
import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { siteInfo } from '@/data/mockData'
import { sendGTMEvent } from '@next/third-parties/google'
import {
  Code2,
  Download,
  GithubIcon,
  LinkedinIcon,
  Mail,
  MapPin,
  Users,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [end, isInView])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 10, suffix: '+', label: 'Yıl Deneyim' },
  { value: 7, suffix: '+', label: 'Şirket' },
  { value: 50, suffix: '+', label: 'Proje' },
  { value: 23, suffix: '', label: 'Teknoloji' },
]

const values: Array<{
  icon: LucideIcon
  title: string
  description: string
  color: string
}> = [
  {
    icon: Code2,
    title: 'Temiz Kod',
    description:
      'Okunabilir, sürdürülebilir ve iyi yapılandırılmış kod yazmak en önemli önceliğim. SOLID prensiplerine ve kapsamlı code review süreçlerine büyük önem veriyorum.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Zap,
    title: 'Performans Odaklı',
    description:
      'Core Web Vitals, lazy loading, code splitting ve bundle optimizasyonu ile kullanıcı deneyimini her zaman merkeze alıyorum. Her ms önemlidir.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Users,
    title: 'Ekip & Mentorluk',
    description:
      'Code review, bilgi paylaşımı ve junior geliştirici mentorluğu ile ekibin büyümesine ve teknik kültürün güçlenmesine katkıda bulunuyorum.',
    color: 'from-violet-500 to-purple-600',
  },
]

export default function Hero() {
  return (
    <div>
      <HeroBanner />
      <StatsSection />
      <AboutSection />
      <ValuesSection />
    </div>
  )
}

function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-36 pt-36 text-white md:py-48 md:pt-48">
      <motion.div
        className="pointer-events-none absolute -left-52 -top-52 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-3xl"
        animate={{ x: [0, 60, -20, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-52 -right-52 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-3xl"
        animate={{ x: [0, -50, 20, 0], y: [0, 60, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container relative mx-auto px-6">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-6 border border-blue-400/30 bg-blue-500/20 px-4 py-1.5 text-sm font-medium text-blue-200">
              {siteInfo.sayHi}
            </Badge>
          </motion.div>

          <motion.h1
            className="mb-6 text-5xl font-extrabold leading-tight md:text-7xl"
            variants={fadeInUp}
          >
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              {siteInfo.title.highlight}
            </span>
            <br />
            <span className="text-white/90">{siteInfo.title.rest}</span>
          </motion.h1>

          <motion.p
            className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-slate-300 md:text-2xl"
            variants={fadeInUp}
            dangerouslySetInnerHTML={{ __html: siteInfo.description }}
          />

          <motion.div
            className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            variants={fadeInUp}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-blue-500/50"
              onClick={() => {
                sendGTMEvent({ event: 'buttonClick', platform: 'email' })
                window.open(siteInfo.email, '_blank')
              }}
            >
              <Mail className="mr-2 h-5 w-5" />
              İletişime Geç
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white backdrop-blur transition-all hover:scale-105 hover:border-white/50 hover:bg-white/10"
              onClick={() => {
                sendGTMEvent({ event: 'buttonClick', platform: 'cv-download' })
                window.open(siteInfo.cvUrl, '_blank')
              }}
            >
              <Download className="mr-2 h-5 w-5" />
              CV İndir
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            variants={fadeInUp}
          >
            {siteInfo.socialLinks.map(link => (
              <Link
                key={link.platform}
                href={link.url}
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/70 transition-all hover:scale-110 hover:bg-white/20 hover:text-white"
              >
                {link.platform === 'github' && (
                  <GithubIcon className="h-4 w-4" />
                )}
                {link.platform === 'linkedin' && (
                  <LinkedinIcon className="h-4 w-4" />
                )}
                {link.platform === 'email' && <Mail className="h-4 w-4" />}
              </Link>
            ))}
            <div className="flex items-center gap-1.5 text-sm text-slate-400">
              <MapPin className="h-4 w-4" />
              <span>{siteInfo.location}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="border-b bg-card py-16">
      <div className="container mx-auto px-6">
        <motion.div
          className="mx-auto grid max-w-4xl grid-cols-2 gap-12 md:grid-cols-4"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {stats.map(stat => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="text-center"
            >
              <div className="mb-2 text-5xl font-extrabold text-primary">
                {isInView && <CountUp end={stat.value} suffix={stat.suffix} />}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-muted/30 py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="grid gap-20 md:grid-cols-2 md:items-center"
          >
            <motion.div variants={fadeInUp} className="flex justify-center">
              <div className="relative">
                <motion.div
                  className="border-primary/40 absolute inset-0 rounded-full border-2"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="border-primary/20 absolute inset-0 rounded-full border"
                  animate={{ scale: [1, 1.28, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 3, delay: 0.8, repeat: Infinity }}
                />
                <div className="border-primary/20 ring-primary/10 relative h-72 w-72 overflow-hidden rounded-full border-4 shadow-2xl ring-4">
                  <Image
                    src="https://github.com/huseyindol.png"
                    alt="Hüseyin DOL"
                    fill
                    className="object-cover"
                  />
                </div>
                <motion.div
                  className="absolute -bottom-3 -right-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  10+ yıl deneyim
                </motion.div>
                <motion.div
                  className="absolute -left-3 top-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 px-4 py-2 text-xs font-bold text-white shadow-lg"
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Full Stack
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={stagger} className="space-y-6">
              <motion.div variants={fadeInUp}>
                <h2 className="text-gradient mb-3 text-3xl font-extrabold md:text-4xl">
                  Hakkımda
                </h2>
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" />
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="leading-relaxed text-muted-foreground"
              >
                2011 yılında Projesoft&apos;ta başladığım frontend yolculuğu,
                bugün{' '}
                <strong className="text-foreground">10+ yıllık deneyime</strong>{' '}
                dönüştü. E-ticaret&apos;ten fintech&apos;e, medya
                platformlarından kurumsal uygulamalara kadar çeşitli sektörlerde
                çalıştım. jQuery ve PHP&apos;den React ve Next.js&apos;e,
                monolitik yapılardan mikroservis mimarilerine kadar teknolojinin
                evrimini bizzat yaşadım.
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="leading-relaxed text-muted-foreground"
              >
                React ekosisteminde uzmanlaşmanın yanı sıra, son yıllarda{' '}
                <strong className="text-foreground">Java Spring Boot</strong>{' '}
                ile backend geliştirme,{' '}
                <strong className="text-foreground">Kubernetes</strong> ile
                DevOps altyapısı ve{' '}
                <strong className="text-foreground">React Native</strong> ile
                mobil uygulama geliştirme alanlarında da derinleşiyorum.
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="leading-relaxed text-muted-foreground"
              >
                <strong className="text-foreground">
                  Hangikredi&apos;de takım lideri
                </strong>{' '}
                olarak teknik kararların yanı sıra junior geliştiricilerin
                mentorluğunu yapıyor, code review süreçlerini yönetiyor ve CI/CD
                pipeline&apos;larını optimize ediyorum.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-2 pt-2"
              >
                {[
                  'React',
                  'Next.js',
                  'TypeScript',
                  'Java',
                  'Kubernetes',
                  'React Native',
                ].map(tech => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="border-primary/20 bg-primary/10 text-primary"
                  >
                    {tech}
                  </Badge>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-card py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="mb-16 text-center">
              <h2 className="text-gradient mb-4 text-3xl font-extrabold md:text-4xl">
                Çalışma Yaklaşımım
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Her projede kaliteyi, performansı ve ekip iletişimini ön planda
                tutuyorum.
              </p>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-3"
              variants={stagger}
            >
              {values.map(value => (
                <motion.div key={value.title} variants={fadeInUp}>
                  <Card className="group h-full overflow-hidden border-0 p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div
                      className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${value.color} shadow-lg`}
                    >
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
