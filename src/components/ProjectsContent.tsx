'use client'
import AdSenseAd from '@/components/AdSenseAd'
import { motion, useInView } from 'framer-motion'
import {
  GithubIcon,
  ExternalLinkIcon,
  ServerIcon,
  SmartphoneIcon,
  LayoutDashboardIcon,
  GlobeIcon,
  DatabaseIcon,
  ShieldCheckIcon,
  ZapIcon,
  LayersIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ElementType
  gradient: string
  status: 'live' | 'beta' | 'soon'
  statusLabel: string
  techStack: string[]
  highlights: string[]
  githubUrl: string
  liveUrl?: string
  liveLabel?: string
}

const projects: Project[] = [
  {
    id: 'elly-backend',
    title: 'Elly',
    subtitle: 'Headless CMS Backend',
    description:
      'Spring Boot 3.5 + Java 21 üzerine kurulu multitenant headless CMS API. Database-per-tenant mimarisi, RBAC yetkilendirme, Redis cache ve RabbitMQ ile kurumsal ölçekte içerik yönetimi altyapısı.',
    icon: ServerIcon,
    gradient: 'from-emerald-500 to-teal-600',
    status: 'live',
    statusLabel: 'Canlı',
    techStack: [
      'Java 21',
      'Spring Boot 3.5',
      'PostgreSQL',
      'Redis',
      'RabbitMQ',
      'Docker',
      'Kubernetes',
      'JWT & OAuth2',
      'Zipkin',
      'Prometheus',
    ],
    highlights: [
      'Database-per-Tenant multitenant mimarisi',
      'RBAC + OAuth2 (Google/GitHub) entegrasyonu',
      'Redis tenant-aware cache (AOF + LRU)',
      'RabbitMQ async email worker',
      'Zipkin dağıtık izleme & Prometheus metrics',
    ],
    githubUrl: 'https://github.com/huseyindol/elly',
    liveUrl: 'https://api.huseyindol.com/swagger-ui/index.html',
    liveLabel: 'API Docs',
  },
  {
    id: 'elly-admin',
    title: 'Elly Admin Panel',
    subtitle: 'Headless CMS Yönetim Paneli',
    description:
      "Elly CMS'in tüm içeriklerini yöneten modern admin paneli. Sayfalar, bileşenler, widget'lar, banner'lar, yazılar ve formları tek arayüzden yönetin. Google Gemini AI entegrasyonu ile içerik üretimi.",
    icon: LayoutDashboardIcon,
    gradient: 'from-blue-500 to-indigo-600',
    status: 'live',
    statusLabel: 'Canlı',
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'TanStack Query 5',
      'TipTap 3',
      'Google Gemini AI',
      'Framer Motion',
      'Zod 4',
    ],
    highlights: [
      'Hiyerarşik içerik yönetimi (sayfa → bileşen → widget)',
      'AI destekli makale ve alan içeriği üretimi',
      'Dinamik form oluşturucu (wizard, multi-step, validasyonlu)',
      'SEO metadata yönetimi & canonical URL kontrolü',
      'Server Actions üzerinden RBAC-aware data mutasyonları',
    ],
    githubUrl: 'https://github.com/huseyindol/elly-admin-panel',
    liveUrl: 'https://admin.huseyindol.com/login',
    liveLabel: 'Admin Panel',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Site',
    subtitle: 'Kişisel Portföy & Blog',
    description:
      "Şu an gezdiğiniz site. Elly CMS'den beslenen dinamik sayfa sistemi, MDX tabanlı teknik blog, Framer Motion animasyonları ve Next.js App Router mimarisi ile inşa edilmiş modern bir portföy sitesi.",
    icon: GlobeIcon,
    gradient: 'from-violet-500 to-purple-600',
    status: 'live',
    statusLabel: 'Canlı',
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'Framer Motion',
      'Shadcn UI',
      'MDX',
      'Vercel',
    ],
    highlights: [
      "Elly CMS'den beslenen dinamik sayfa sistemi",
      'MDX tabanlı teknik blog (31+ makale)',
      'unstable_cache ile 24 saatlik blog cache',
      'Framer Motion scroll animasyonları',
      'Tam light/dark tema desteği',
    ],
    githubUrl: 'https://github.com/huseyindol/nextjs-approute-project',
    liveUrl: 'https://www.huseyindol.com',
    liveLabel: 'Siteyi Gör',
  },
  {
    id: 'elly-mobile',
    title: 'Elly Mobile',
    subtitle: 'React Native Mobil Uygulama',
    description:
      'Elly ekosisteminin mobil ayağı. Feature-based mimarisi, type-safe navigation, tam karanlık mod desteği ve React Native Reanimated 3 ile native hissiyatlı animasyonlar.',
    icon: SmartphoneIcon,
    gradient: 'from-pink-500 to-rose-600',
    status: 'soon',
    statusLabel: 'Flight Test',
    techStack: [
      'React Native',
      'Expo',
      'TypeScript',
      'React Navigation v6',
      'Reanimated 3',
      'Zustand',
      'TanStack Query',
    ],
    highlights: [
      'Feature-based modüler mimari',
      'Strongly-typed navigation (compile-time doğrulama)',
      'Deep linking & push notification routing',
      'Karanlık mod odaklı tam tema sistemi',
      "App Store & Play Store'a çıkmaya hazırlanıyor",
    ],
    githubUrl: 'https://github.com/huseyindol/elly-mobile-app',
  },
]

const ecosystemFeatures = [
  {
    icon: DatabaseIcon,
    title: 'Database-per-Tenant',
    description: 'Her tenant kendi PostgreSQL veritabanında izole çalışır',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Merkezi Auth',
    description: 'JWT + OAuth2 ile tüm istemciler tek noktadan doğrulanır',
  },
  {
    icon: ZapIcon,
    title: 'Redis Cache',
    description: 'Tenant-aware önbellekleme ile milisaniye altı yanıt süreleri',
  },
  {
    icon: LayersIcon,
    title: 'API-First',
    description: 'Admin, web ve mobil aynı RESTful API üzerinden beslenir',
  },
]

const statusConfig = {
  live: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  beta: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  soon: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
}

export default function ProjectsContent() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const ecoRef = useRef(null)
  const ecoInView = useInView(ecoRef, { once: true, margin: '-80px' })
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-32 pt-32 text-white md:py-40 md:pt-40">
        <motion.div
          className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-emerald-600/15 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container relative mx-auto px-6">
          <motion.div
            ref={headerRef}
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <Badge className="mb-6 border border-violet-400/30 bg-violet-500/20 px-4 py-1.5 text-sm font-medium text-violet-200">
              Açık Kaynak
            </Badge>
            <h1 className="mb-5 text-4xl font-extrabold md:text-6xl">
              Projelerim
            </h1>
            <p className="text-lg text-slate-300 md:text-xl">
              Elly ekosistemi ve kişisel projelerim. Backend'den mobil'e, admin
              panelinden portföy sitesine kadar uçtan uca bir yazılım ailesi.
            </p>

            <div className="mt-10 flex justify-center gap-8 text-sm text-slate-400">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">4</p>
                <p>Proje</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">3</p>
                <p>Canlı</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">1</p>
                <p>Flight Test</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Elly Ecosystem */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-6">
          <motion.div
            ref={ecoRef}
            initial="hidden"
            animate={ecoInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="mx-auto max-w-5xl"
          >
            <motion.div variants={fadeInUp} className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-extrabold">Elly Ekosistemi</h2>
              <p className="text-muted-foreground">
                4 proje, tek omurga. Elly CMS backend her katmanı besler.
              </p>
            </motion.div>

            {/* Architecture diagram */}
            <motion.div
              variants={fadeInUp}
              className="mb-12 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 text-white"
            >
              <div className="flex flex-col items-center gap-4">
                {/* Backend node */}
                <div className="flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-500/20 px-6 py-3">
                  <ServerIcon className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="font-bold text-emerald-300">Elly Backend</p>
                    <p className="text-xs text-slate-400">
                      Spring Boot 3.5 · Java 21 · PostgreSQL · Redis · RabbitMQ
                    </p>
                  </div>
                </div>

                {/* Connectors */}
                <div className="flex w-full max-w-2xl items-start justify-center gap-0">
                  <div className="flex flex-1 flex-col items-center">
                    <div className="h-6 w-px bg-slate-600" />
                    <div className="h-px w-full bg-slate-600" />
                  </div>
                  <div className="flex flex-1 flex-col items-center">
                    <div className="h-6 w-px bg-slate-600" />
                    <div className="h-px w-full bg-slate-600" />
                  </div>
                  <div className="flex flex-1 flex-col items-center">
                    <div className="h-6 w-px bg-slate-600" />
                    <div className="h-px w-full bg-slate-600" />
                  </div>
                </div>

                {/* Client nodes */}
                <div className="grid w-full max-w-2xl grid-cols-3 gap-3">
                  {[
                    {
                      icon: LayoutDashboardIcon,
                      label: 'Admin Panel',
                      sub: 'Next.js 16',
                      color: 'blue',
                    },
                    {
                      icon: GlobeIcon,
                      label: 'Portfolio Site',
                      sub: 'Next.js 16',
                      color: 'violet',
                    },
                    {
                      icon: SmartphoneIcon,
                      label: 'Mobile App',
                      sub: 'React Native',
                      color: 'pink',
                    },
                  ].map(item => (
                    <div
                      key={item.label}
                      className={`flex flex-col items-center gap-2 rounded-xl border px-4 py-3 text-center ${
                        item.color === 'blue'
                          ? 'border-blue-400/30 bg-blue-500/20'
                          : item.color === 'violet'
                            ? 'border-violet-400/30 bg-violet-500/20'
                            : 'border-pink-400/30 bg-pink-500/20'
                      }`}
                    >
                      <item.icon
                        className={`h-5 w-5 ${
                          item.color === 'blue'
                            ? 'text-blue-400'
                            : item.color === 'violet'
                              ? 'text-violet-400'
                              : 'text-pink-400'
                        }`}
                      />
                      <div>
                        <p className="text-sm font-bold">{item.label}</p>
                        <p className="text-xs text-slate-400">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Ecosystem features */}
            <motion.div
              variants={stagger}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {ecosystemFeatures.map(f => (
                <motion.div
                  key={f.title}
                  variants={fadeInUp}
                  className="bg-muted/30 rounded-xl border border-border p-5"
                >
                  <f.icon className="mb-3 h-6 w-6 text-primary" />
                  <p className="mb-1 font-semibold">{f.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {f.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ad — ekosistem bölümü sonrası */}
      <div className="container mx-auto max-w-5xl px-6">
        <AdSenseAd />
      </div>

      {/* Project cards */}
      <section className="bg-muted/20 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            ref={gridRef}
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="mx-auto max-w-5xl space-y-8"
          >
            {projects.map((project, index) => (
              <>
                <ProjectCard key={project.id} project={project} />
                {/* Ad — 2. ve 4. karttan sonra */}
                {(index === 1 || index === 3) && (
                  <div key={`ad-${index}`}>
                    <AdSenseAd />
                  </div>
                )}
              </>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon

  return (
    <motion.div variants={fadeInUp}>
      <Card className="overflow-hidden border-0 shadow-sm transition-shadow duration-300 hover:shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left accent */}
          <div
            className={`flex w-full items-center justify-center bg-gradient-to-br p-8 md:w-52 md:shrink-0 ${project.gradient}`}
          >
            <Icon className="h-16 w-16 text-white/90" />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6 md:p-8">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <h3 className="text-xl font-extrabold">{project.title}</h3>
                  <Badge
                    className={`border-0 text-xs font-semibold ${statusConfig[project.status]}`}
                  >
                    {project.statusLabel}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {project.subtitle}
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  aria-label="GitHub"
                  className="hover:border-foreground/30 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GithubIcon className="h-4 w-4" />
                </Link>
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="hover:border-foreground/30 inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-muted px-4 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ExternalLinkIcon className="h-3.5 w-3.5" />
                    {project.liveLabel}
                  </Link>
                )}
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            {/* Highlights */}
            <ul className="mb-5 space-y-1.5">
              {project.highlights.map(h => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {h}
                </li>
              ))}
            </ul>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map(tech => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
