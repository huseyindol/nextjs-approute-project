import Hero from '../../../components/Hero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yetenekler',
  description:
    'Hüseyin DOL teknik yetenekleri: React, Next.js, TypeScript, Node.js, Docker ve daha fazlası. 10+ yıllık deneyimle uzman seviyesinde frontend teknolojileri.',
  keywords: [
    'Hüseyin DOL',
    'Teknik Yetenekler',
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Frontend',
    'Yazılım',
  ],
  alternates: {
    canonical: 'https://next.huseyindol.com/skills',
  },
}

const Skills = () => {
  return (
    <div>
      Skills <hr /> <Hero />
    </div>
  )
}
export default Skills
