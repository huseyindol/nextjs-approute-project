import ProjectsContent from '@/components/ProjectsContent'
import { Seo } from '@/lib/seo'

export default function ProjectsPage() {
  return (
    <>
      <Seo
        rawTitle="Projelerim | Hüseyin DOL"
        description="Elly headless CMS ekosistemi ve kişisel projelerim: Spring Boot backend, Next.js admin panel, portföy sitesi ve React Native mobil uygulama."
        canonical="/projects"
        keywords={[
          'Elly CMS',
          'Spring Boot',
          'Java',
          'Next.js',
          'React Native',
          'Headless CMS',
          'Multitenant',
          'Hüseyin DOL',
          'Projeler',
          'Portfolio',
        ]}
      />
      <ProjectsContent />
    </>
  )
}
