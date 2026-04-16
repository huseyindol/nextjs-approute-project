import { ExperienceType } from '@/schemas/dynamic/experienceSchema'
import { getSectionDataBySectionKey } from '@/utils/services/contents'
import ExperienceTimeline from './ExperienceTimeline'

const mockExperiences: ExperienceType[] = [
  {
    company: 'Hangikredi',
    position: 'Senior Frontend Developer & Team Lead',
    period: 'Ekim 2023 - Günümüz',
    location: 'İstanbul',
    industry: 'Fintech',
    description:
      "Türkiye'nin en büyük karşılaştırmalı finansal ürünler sunan şirketi. React ve Next.js kullanarak fintech uygulamaları geliştiriyorum. Bulunduğum squadın developer ekibine liderlik ediyorum.",
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
      '%40 performans artışı sağlayan optimizasyonlar',
      'NPM paketi kurulumu ve yayınlanması',
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
      "Fibabanka'nın Yaklaşan Ödemeler uygulaması, müşteri kampanya yönetim ekranı ve şikayet yönetim ekranı geliştirmelerinde yer aldım.",
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
      'Kullanıcıların oyun oynayabildiği, puan verebildiği, yorum yapabildiği ve gerçek zamanlı sohbetle iletişim kurabildiği çok oyunculu oyun platformu ve medya gruplarına ait whitelabel oyun portalları geliştirdim.',
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
      'Medya gruplarına ait whitelabel oyun portalları geliştirme',
      'SEO optimizasyonları',
      'Performans optimizasyonları: code splitting, lazy loading, image optimization',
    ],
  },
  {
    company: 'Defacto',
    position: 'Sr. Frontend Developer',
    period: 'Kasım 2020 - Mart 2022',
    location: 'İstanbul',
    industry: 'E-commerce',
    description:
      "Türkiye'nin en büyük e-ticaret platformlarından biri olan Defacto'nun frontend geliştirme mimarisinde yer aldım.",
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
      'Frontend mimarisinde mobil ve desktop uygulamasını responsive olarak yönetmek',
      'SEO, Analytics ve Datalayer entegrasyonları',
      'Performans optimizasyonları: code splitting, lazy loading, image optimization',
    ],
  },
  {
    company: 'Nuevo Softwarehouse',
    position: 'Frontend Developer',
    period: 'Nisan 2019 - Ekim 2020',
    location: 'İstanbul',
    industry: 'Agency',
    description:
      "Nuevo Softwarehouse'un frontend geliştirme ekibine katıldım. TCCB, OTİ, ATASUN ve BITTRT gibi büyük ölçekli firmaların frontend geliştirmelerinde yer aldım.",
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
      'Performans optimizasyonları: code splitting, lazy loading, image optimization',
    ],
  },
  {
    company: 'Freelancer',
    position: 'Full Stack Developer',
    period: 'Temmuz 2017 - Nisan 2019',
    location: 'İstanbul',
    industry: 'Freelancer',
    description:
      'Freelancer olarak çeşitli firmaların sistemlerinde frontend ve backend geliştirmelerinde yer aldım. Panel geliştirmeleri, önyüz geliştirmeleri ve REST API entegrasyonları yaptım.',
    technologies: [
      'JavaScript',
      'jQuery',
      'Bootstrap',
      'SCSS',
      'PHP',
      'Twig',
      'Codeigniter',
      'MySQL',
    ],
    sortOrder: 0,
    achievements: [
      'Birçok firmanın sistemlerinde frontend ve backend geliştirmeleri',
      'REST API ve entegrasyonları',
      'Intranet projelerinde panel geliştirmeleri',
    ],
  },
  {
    company: 'Projesoft',
    position: 'Frontend Developer',
    period: 'Aralık 2011 - Temmuz 2017',
    location: 'İstanbul',
    industry: 'E-commerce',
    description:
      "Projesoft'un frontend geliştirme ekibinde birçok firmanın e-ticaret sistemlerinin frontend geliştirmelerinde yer aldım. kitapisler.com, kuyumcu.com.tr, feyioglu.com.tr, beymen.com gibi markalar.",
    technologies: ['JavaScript', 'jQuery', 'Bootstrap', 'SCSS', 'PHP', 'Twig'],
    sortOrder: 0,
    achievements: [
      'Birçok firmanın e-ticaret sistemlerinin frontend geliştirmeleri',
    ],
  },
]

const DEFAULT_SECTION_INFO = {
  title: 'Profesyonel Deneyim',
  description: 'Çeşitli sektörlerde 10+ yıllık kariyer yolculuğum',
}

interface ExperienceProps {
  searchParams?: { industry?: string }
}

export default async function Experience({ searchParams }: ExperienceProps) {
  const initialIndustry = searchParams?.industry ?? 'all'

  const { sectionInfo, items } =
    await getSectionDataBySectionKey<ExperienceType>(
      'portfolio_experience',
      DEFAULT_SECTION_INFO,
    )

  const allExperiences = items && items.length > 0 ? items : mockExperiences

  return (
    <ExperienceTimeline
      experiences={allExperiences}
      title={sectionInfo.title ?? DEFAULT_SECTION_INFO.title}
      description={sectionInfo.description ?? DEFAULT_SECTION_INFO.description}
      initialIndustry={initialIndustry}
    />
  )
}
