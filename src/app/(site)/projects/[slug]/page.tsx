import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import React from 'react'

const ArchitectureDoc = dynamic(
  () => import('@/components/docs/ArchitectureDoc'),
)
const VideoDoc = dynamic(() => import('@/components/docs/VideoDoc'))
const SunumDoc = dynamic(() => import('@/components/docs/SunumDoc'))
const PresentationDoc = dynamic(
  () => import('@/components/docs/PresentationDoc'),
)

const COMPONENT_MAP: Record<string, React.ComponentType> = {
  'elly-architecture': ArchitectureDoc,
  'elly-video': VideoDoc,
  'elly-sunum': SunumDoc,
  'elly-presentation': PresentationDoc,
}

export default async function ProjectDocsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const { slug } = resolvedParams

  const Component = COMPONENT_MAP[slug]

  if (!Component) {
    notFound()
  }

  return (
    <div className="container mx-auto min-h-screen px-6 py-20 pt-12">
      <Component />
    </div>
  )
}
