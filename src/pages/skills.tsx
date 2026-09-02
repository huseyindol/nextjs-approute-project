import { ErrorBoundary } from '@/components/ErrorBoundary'
import SkillsContent from '@/components/SkillsContent'
import { skills as mockSkills } from '@/data/mockData'
import { Seo } from '@/lib/seo'
import type { SkillType } from '@/schemas/dynamic'
import { getSectionDataBySectionKey } from '@/utils/services/contents'
import type { GetStaticProps } from 'next'

const DEFAULT_SECTION_INFO = {
  title: 'Teknolojiler & Yetenekler',
  description: '10+ yıllık deneyimimde uzmanlaştığım teknolojiler ve seviyeler',
}

interface SkillsPageProps {
  skills: SkillType[]
  title: string
  description: string
}

export default function SkillsPage({
  skills,
  title,
  description,
}: SkillsPageProps) {
  return (
    <>
      <Seo
        title="Yetenekler"
        description="Hüseyin DOL teknik yetenekleri: React, Next.js, TypeScript, Node.js, Docker ve daha fazlası. 10+ yıllık deneyimle uzman seviyesinde frontend teknolojileri."
        canonical="/skills"
        keywords={[
          'Hüseyin DOL',
          'Teknik Yetenekler',
          'React',
          'Next.js',
          'TypeScript',
          'JavaScript',
          'Node.js',
          'Docker',
          'Frontend Teknolojileri',
          'Yazılım',
          'Web Geliştirme',
        ]}
      />
      <main className="min-h-screen">
        <ErrorBoundary>
          <SkillsContent
            skills={skills}
            title={title}
            description={description}
          />
        </ErrorBoundary>
      </main>
    </>
  )
}

/**
 * App Router'daki async `Skills` server component'inin karşılığı: veri build'de
 * çekilir, sayfa statik HTML olarak servis edilir ve ISR ile tazelenir.
 */
export const getStaticProps: GetStaticProps<SkillsPageProps> = async () => {
  const { sectionInfo, items } = await getSectionDataBySectionKey<SkillType>(
    'portfolio_skills',
    DEFAULT_SECTION_INFO,
  )
  const skills = items && items.length > 0 ? items : mockSkills

  return {
    props: {
      skills,
      title: sectionInfo.title ?? DEFAULT_SECTION_INFO.title,
      description: sectionInfo.description ?? DEFAULT_SECTION_INFO.description,
    },
    revalidate: 3600,
  }
}
