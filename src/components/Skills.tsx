import { skills as mockSkills } from '@/data/mockData'
import type { SkillType } from '@/schemas/dynamic'
import { getSectionDataBySectionKey } from '@/utils/services/contents'
import SkillsContent from './SkillsContent'

const DEFAULT_SECTION_INFO = {
  title: 'Teknolojiler & Yetenekler',
  description: '10+ yıllık deneyimimde uzmanlaştığım teknolojiler ve seviyeler',
}

export default async function Skills() {
  const { sectionInfo, items } = await getSectionDataBySectionKey<SkillType>(
    'portfolio_skills',
    DEFAULT_SECTION_INFO,
  )

  const skills = items && items.length > 0 ? items : mockSkills

  return (
    <SkillsContent
      skills={skills}
      title={sectionInfo.title ?? DEFAULT_SECTION_INFO.title}
      description={sectionInfo.description ?? DEFAULT_SECTION_INFO.description}
    />
  )
}
