import Hero from '../../../components/Hero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Deneyim',
  description:
    'Hüseyin DOL iş deneyimleri: 10+ yıllık frontend geliştirme kariyeri, çalıştığı şirketler, üstlendiği roller ve başarıları.',
  keywords: [
    'Hüseyin DOL',
    'İş Deneyimi',
    'Kariyer',
    'Frontend Developer',
    'React',
    'Next.js',
  ],
  alternates: {
    canonical: 'https://next.huseyindol.com/experience',
  },
}

const Experience = () => {
  return (
    <div>
      Experience <hr /> <Hero />
    </div>
  )
}

export default Experience
