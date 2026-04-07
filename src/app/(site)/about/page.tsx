import Hero from '../../../components/Hero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakkımda',
  description:
    'Hüseyin DOL hakkında: 10+ yıllık deneyime sahip Senior Frontend Developer. React, Next.js ve TypeScript uzmanlığı, ekip liderliği ve mentorluk deneyimi.',
  keywords: [
    'Hüseyin DOL',
    'Hakkımda',
    'Frontend Developer',
    'Yazılım Geliştirici',
    'İstanbul',
    'Biyografi',
  ],
  alternates: {
    canonical: 'https://next.huseyindol.com/about',
  },
}

const About = () => {
  return (
    <div>
      About
      <hr />
      <Hero />
    </div>
  )
}

export default About
