import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { skills } from '@/data/mockData'
import Image from 'next/image'
import Link from 'next/link'

export default function Skills() {
  return (
    <section id="skills" className="bg-muted/30 py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <h2 className="text-gradient mb-6 text-4xl font-bold md:text-5xl">
            Teknolojiler & Yetenekler
          </h2>
          <p className="text-muted-foreground text-xl">
            10+ yıllık deneyimimde uzmanlaştığım teknolojiler ve seviyeler
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex flex-wrap justify-center space-y-4 space-x-4">
            {[...skills].map((skill, index) => (
              <Card
                key={`${skill.name}-${index}`}
                className={`bg-card flex-shrink-0 border-0 p-6 py-3 transition-all duration-300 hover:shadow-lg ${skills.length === index + 1 ? 'mb-4' : ''}`}
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
                  <p className="text-muted-foreground mb-4 hidden">
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
