import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { skills as mockSkills } from '@/data/mockData'
import { SkillType } from '@/schemas/dynamic/skillsSchema'
import { getSectionDataBySectionKey } from '@/utils/services/contents'
import Image from 'next/image'
import Link from 'next/link'

// Fallback section bilgisi
const DEFAULT_SECTION_INFO = {
  title: 'Teknolojiler & Yetenekler',
  description: '10+ yıllık deneyimimde uzmanlaştığım teknolojiler ve seviyeler',
}

export default async function Skills() {
  // API'den section verilerini çek (title, description + items)
  const { sectionInfo, items } = await getSectionDataBySectionKey<SkillType>(
    'portfolio_skills',
    DEFAULT_SECTION_INFO,
  )

  // Fallback to mock data if API returns empty
  const skills = items.length > 0 ? items : mockSkills

  // Section bilgileri (API'den veya fallback)
  const title = sectionInfo.title || DEFAULT_SECTION_INFO.title
  const description =
    sectionInfo.description || DEFAULT_SECTION_INFO.description

  return (
    <section id="skills" className="bg-muted/30 py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <h2 className="text-gradient mb-6 text-4xl font-bold md:text-5xl">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground">{description}</p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex flex-wrap justify-center space-x-4 space-y-4">
            {skills.map((skill, index) => (
              <Card
                key={`${skill.name}-${index}`}
                className={`shrink-0 border-0 bg-card p-6 py-3 transition-all duration-300 hover:shadow-lg ${skills.length === index + 1 ? 'mb-4' : ''}`}
              >
                <Link
                  href={skill.url}
                  title={skill.name}
                  target="_blank"
                  className="flex h-full w-full flex-col items-center justify-center text-center"
                >
                  <div
                    className={`mb-4 flex items-center justify-between ${skill.name === 'Express' ? 'rounded-full bg-gray-200 p-1' : ''}`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center">
                      <Image
                        src={skill.imageUrl}
                        alt=""
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <Badge variant="secondary" className="hidden">
                      {skill.years}
                    </Badge>
                  </div>

                  <h3 className="text-sm font-semibold">{skill.name}</h3>
                  <p className="mb-4 hidden text-muted-foreground">
                    {skill.level} seviye
                  </p>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
