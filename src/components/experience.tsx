import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { INDUSTRIES } from '@/schemas/constants'
import { ExperienceType } from '@/schemas/dynamic/experienceSchema'
import { Building, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'

// Mock data - API boşsa veya hata varsa kullanılır
const mockExperiences: ExperienceType[] = [
  {
    company: 'Hangikredi',
    position: 'Senior Frontend Developer & Team Lead',
    period: 'Ekim 2023 - Günümüz',
    location: 'İstanbul',
    industry: 'Fintech',
    description:
      "Türkiye'nin en büyük karşılaştırmalı finansal ürünler sunan şirketi. React ve Next.js kullanarak fintech uygulamaları geliştiriyorum. bulunduğum squadın developer ekibine liderlik ediyorum.",
    technologies: [
      'React',
      'Next.js',
      'React Query',
      'TypeScript',
      'C# .Net',
      'MVC Razor',
      'SCSS',
      'Context API',
      'SignalR',
      'Tailwind CSS',
      'CSR & SSR Rendering',
      'Docker',
      'Jenkins',
      'CI/CD',
      'Gulp',
    ],
    sortOrder: 0,
    achievements: [
      '40% performans artışı sağlayan optimizasyonlar',
      'NPM paketi kurulumu',
      'SEO, Analytics ve Datalayer entegrasyonları',
      'CI/CD Jenkins ve Docker kullanarak pipeline kurulumu',
      'Junior developer mentorluğu',
    ],
  },
  {
    company: 'Venhancer',
    position: 'Sr. Frontend Developer',
    period: 'Mayıs 2023 - Ekim 2023',
    location: 'İstanbul',
    industry: 'Fintech',
    description:
      "Fibabanka'nın Yaklaşan Ödemeler uygulaması, Müşteri kampanya yönetim ekranı ve şikayet yönetim ekranı geliştirmelerinde yer aldım.",
    technologies: ['React', 'Redux', 'TypeScript', 'SCSS', 'Context API'],
    sortOrder: 0,
    achievements: [
      'Müşteri kampanya yönetim ekranı geliştirme',
      'Şikayet yönetim ekranı geliştirme',
      'Yaklaşan Ödemeler uygulaması geliştirme',
    ],
  },
  {
    company: 'Azerion Turkey',
    position: 'Full Stack Developer',
    period: 'Mart 2022 - Mayıs 2023',
    location: 'İstanbul',
    industry: 'Media',
    description:
      'Kullanıcıların oyun oynayabildiği, oyunlara puan verebildiği, yorum yapabildiği ve gerçek zamanlı sohbetle iletişim kurabildiği çok oyunculu bir oyun platformu ve medya gruplarına ait whitelabel oyun portalları geliştirmelerinde yer aldım.',
    technologies: [
      'JavaScript',
      'jQuery',
      'Bootstrap',
      'React',
      'Redux',
      'TypeScript',
      'SCSS',
      'Context API',
      'GraphQL',
      'Express',
      'Socket.io',
      'Docker',
      'Jenkins',
      'CI/CD',
    ],
    sortOrder: 0,
    achievements: [
      'Medya gruplarına ait oyun portalları geliştirme',
      'SEO optimizasyonları',
      'Performans optimizasyonları, Code splitting, Lazy loading, Image optimization, Bundling optimization...',
    ],
  },
  {
    company: 'Defacto',
    position: 'Sr. Frontend Developer',
    period: 'Kasım 2020 - Mart 2022',
    location: 'İstanbul',
    industry: 'E-commerce',
    description:
      "Türkiye'nin en büyük e-ticaret platformlarından birisi olan Defacto'nun frontend geliştirme mimarısınde yer aldım.",
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Redux',
      'SCSS',
      'Context API',
      'Angular V6',
      'Webpack',
    ],
    sortOrder: 0,
    achievements: [
      'Frontend mimarisinde mobile ve desktop uygulamasını responsive olarak yönetilmesi',
      'SEO, Analytics ve Datalayer entegrasyonları',
      'Performans optimizasyonları (Code splitting, Lazy loading, Image optimization, Bundling optimization...)',
    ],
  },
  {
    company: 'Nuevo Softwarehouse',
    position: 'Frontend Developer',
    period: 'Nisan 2019 - Ekim 2020',
    location: 'İstanbul',
    industry: 'Agency',
    description:
      "Nuevo Softwarehouse'un frontend geliştirme ekibine katıldım. Junior developer mentorluğu yapıyordum. TCCB, OTİ, ATASUN ve BITTRT gibi büyük ölçekli firmaların frontend geliştirmelerinde yer aldım.",
    technologies: [
      'React',
      'Redux',
      'TypeScript',
      'SCSS',
      'Context API',
      'Angular V6',
      'Webpack',
      'Gulp',
    ],
    sortOrder: 0,
    achievements: [
      'Junior developer mentorluğu',
      'Performans optimizasyonları (Code splitting, Lazy loading, Image optimization, Bundling optimization...)',
    ],
  },
  {
    company: 'Freelancer',
    position: 'Full Stack Developer',
    period: 'Temmuz 2017 - Nisan 2019',
    location: 'İstanbul',
    industry: 'Freelancer',
    description:
      'Freelancer olarak çeşitli firmaların sistemlerinde frontend ve backend geliştirmelerinde yer aldım. Intranet projeler olduğundan panel geliştirmeleri, önyüz geliştirmeleri, Rest API ve entegrasyonları gibi geliştirmeler yapıyordum.',
    technologies: [
      'JavaScript',
      'jQuery',
      'Bootstrap',
      'SCSS',
      'PHP',
      'Twig',
      'Codeigniter',
      'mysql',
    ],
    sortOrder: 0,
    achievements: [
      'Bir çok firmanın sistemlerinde frontend ve backend geliştirmelerinde yer aldım.',
      'Rest API ve entegrasyonları gibi geliştirmeleri.',
      'Intranet projelerinde panel geliştirmeleri.',
    ],
  },
  {
    company: 'Projesoft',
    position: 'Frontend Developer',
    period: 'Aralık 2011 - Temmuz 2017',
    location: 'İstanbul',
    industry: 'E-commerce',
    description:
      "Projesoft'un frontend geliştirme ekibine katıldım. Bir çok firmanın E-Ticaret sistemlerinin frontend geliştirmelerinde yer aldım. bunlardan bazıları: kitapisler.com, kuyumcu.com.tr, feyioglu.com.tr, network.com.tr, divarese.com, beymen.com gibi.",
    technologies: ['JavaScript', 'jQuery', 'Bootstrap', 'SCSS', 'PHP', 'Twig'],
    sortOrder: 0,
    achievements: [
      'Bir çok firmanın E-Ticaret sistemlerinin frontend geliştirmelerinde yer aldım.',
    ],
  },
]

// Fallback section bilgisi
const DEFAULT_SECTION_INFO = {
  title: 'Profesyonel Deneyim',
  description: 'Çeşitli sektörlerde edindiğim deneyimler ve başarılar',
}

// Props interface - searchParams için
interface ExperienceProps {
  searchParams?: { industry?: string }
}

export default async function Experience({ searchParams }: ExperienceProps) {
  // URL'den industry parametresini al
  const selectedIndustry = searchParams?.industry || 'all'

  // API'den section verilerini çek (title, description + items)
  // const { sectionInfo, items } =
  //   await getSectionDataBySectionKey<ExperienceType>(
  //     'portfolio_experience',
  //     DEFAULT_SECTION_INFO,
  //   )

  // Fallback to mock data if API returns empty
  const allExperiences = mockExperiences

  // Section bilgileri (API'den veya fallback)
  const title = DEFAULT_SECTION_INFO.title
  const description = DEFAULT_SECTION_INFO.description

  // Filter experiences by industry - INDUSTRIES constant kullanılıyor
  const filteredExperiences =
    selectedIndustry === 'all'
      ? allExperiences
      : allExperiences.filter(exp => exp.industry === selectedIndustry)

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <h2 className="text-gradient mb-6 text-4xl font-bold md:text-5xl">
            {title}
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">{description}</p>

          {/* Industry Filter - Link ile URL değiştirme (SSR) */}
          <div className="flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map(industry => (
              <Link
                key={industry.value}
                href={
                  industry.value === 'all' ? '?' : `?industry=${industry.value}`
                }
                scroll={false}
                className={`inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  selectedIndustry === industry.value
                    ? 'hover:bg-primary/90 bg-primary text-primary-foreground'
                    : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {industry.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          {filteredExperiences.map((exp, index) => (
            <Card
              key={`${exp.company}-${index}`}
              className="hover:shadow-elegant animate-fade-in-up p-8 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="mb-2 text-2xl font-bold text-primary">
                    {exp.position}
                  </h3>
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      <span className="font-semibold">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="mb-4">
                    {exp.industry}
                  </Badge>
                </div>
              </div>

              <p className="mb-6 leading-relaxed text-muted-foreground">
                {exp.description}
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold">Teknolojiler</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map(tech => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="bg-skill-bg"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold">Başlıca Başarılar</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-sm text-muted-foreground"
                      >
                        <span className="mr-2 text-primary">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
