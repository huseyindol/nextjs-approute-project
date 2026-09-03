import type { PageTemplateProps } from '@/components/dynamic/pages/APage'
import {
  loadExperienceSection,
  loadSkillsSection,
  type ExperienceSectionData,
  type SkillsSectionData,
} from '@/lib/section-data'
import { Seo, SITE_URL } from '@/lib/seo'
import { getPageBySlugService } from '@/services/site/pages.services'
import type { PageResponseType, Page as PageType } from '@/types/BaseResponse'
import type { GetStaticProps } from 'next'
import dynamicImport from 'next/dynamic'

const SITE_NAME = 'Hüseyin DOL'
const HOME_SLUG = 'home'

// Module-level cache — dynamic() render içinde çağrılmamalı
const componentCache = new Map<string, React.ComponentType<PageTemplateProps>>()

function getTemplateComponent(template: string) {
  if (!componentCache.has(template)) {
    componentCache.set(
      template,
      dynamicImport<PageTemplateProps>(
        () => import(`@/components/dynamic/pages/${template}`),
      ),
    )
  }
  return componentCache.get(template)!
}

const FallbackPage = dynamicImport<PageTemplateProps>(
  () => import('@/components/dynamic/pages/APage'),
)

const FALLBACK_PAGE_INFO = {
  title: SITE_NAME,
  slug: HOME_SLUG,
  template: 'APage',
  components: [],
} as unknown as PageType

interface HomeProps {
  pageInfo: PageType | null
  skills: SkillsSectionData
  experience: ExperienceSectionData
  seo: {
    title: string
    description: string
    keywords: string
    canonical: string
    noIndex: boolean
  }
}

export default function Home({ pageInfo, skills, experience, seo }: HomeProps) {
  const Template = pageInfo?.template
    ? getTemplateComponent(pageInfo.template)
    : FallbackPage

  return (
    <>
      <Seo
        rawTitle={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        keywords={
          seo.keywords ? seo.keywords.split(',').map(k => k.trim()) : undefined
        }
        noIndex={seo.noIndex}
      />
      <Template
        pageInfo={pageInfo ?? FALLBACK_PAGE_INFO}
        skills={skills}
        experience={experience}
      />
    </>
  )
}

/**
 * Ana sayfa CMS'ten şablon + bölüm verileriyle build'de üretilir (ISR 1s).
 * Eskiden async Server Component'lerin içinde yapılan üç ayrı fetch burada tek
 * yerde toplandı; sayfa istek başına render EDİLMEZ → RPS tavanı yükselir.
 */
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  let response: PageResponseType | null = null
  try {
    response = await getPageBySlugService(HOME_SLUG)
  } catch (error) {
    console.error('Home page data error:', error)
  }

  const [skills, experience] = await Promise.all([
    loadSkillsSection(),
    loadExperienceSection(),
  ])

  const data = response?.data ?? null
  const seoInfo = data?.seoInfo
  const description =
    seoInfo?.description ||
    data?.description ||
    'Hüseyin DOL - Software Developer & Team Lead. React, Next.js, TypeScript ile frontend, Java & Spring Boot ile backend uzmanı.'

  return {
    props: {
      pageInfo: (data as PageType) ?? null,
      skills,
      experience,
      seo: {
        title:
          seoInfo?.title || data?.title || `${SITE_NAME} | Software Developer`,
        description,
        keywords: seoInfo?.keywords || '',
        canonical: seoInfo?.canonicalUrl
          ? `${SITE_URL}${seoInfo.canonicalUrl}`
          : SITE_URL,
        noIndex: Boolean(seoInfo?.noIndex),
      },
    },
    revalidate: 3600,
  }
}
