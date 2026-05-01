import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import React from 'react'

const ArchitectureDoc = dynamic(
  () => import('@/components/docs/ArchitectureDoc'),
)
const VideoDoc = dynamic(() => import('@/components/docs/VideoDoc'))
const HtmlShadowDoc = dynamic(() => import('@/components/docs/HtmlShadowDoc'))

const COMPONENT_MAP: Record<string, React.ComponentType> = {
  'elly-architecture': ArchitectureDoc,
  'elly-video': VideoDoc,
}

const HTML_MAP: Record<string, { url: string; scripts: string[] }> = {
  'elly-sunum': {
    url: '/docs/elly_sunum.html',
    scripts: ['/docs/deck-stage.js'],
  },
  'elly-presentation': {
    url: '/docs/elly_presentation.html',
    scripts: ['/docs/deck-stage.js'],
  },
}

export default async function ProjectDocsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const { slug } = resolvedParams

  const Component = COMPONENT_MAP[slug]
  const htmlConfig = HTML_MAP[slug]

  if (!Component && !htmlConfig) {
    notFound()
  }

  // If it's a native component
  if (Component) {
    return (
      <div className="container mx-auto min-h-screen px-6 py-20 pt-32">
        <Component />
      </div>
    )
  }

  // If it's a shadow doc (legacy HTML)
  if (htmlConfig) {
    return (
      <div className="container mx-auto min-h-screen px-6 py-20 pt-32">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold capitalize text-white">
            {slug.split('-').join(' ')}
          </h1>
        </div>
        <HtmlShadowDoc url={htmlConfig.url} scripts={htmlConfig.scripts} />
      </div>
    )
  }

  return notFound()
}
