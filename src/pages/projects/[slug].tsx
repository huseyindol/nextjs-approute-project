import { Seo } from '@/lib/seo'
import type { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
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

const TITLES: Record<string, string> = {
  'elly-architecture': 'Elly Mimari Dokümanı',
  'elly-video': 'Elly Tanıtım Videosu',
  'elly-sunum': 'Elly Sunumu',
  'elly-presentation': 'Elly Presentation',
}

export default function ProjectDocsPage({ slug }: { slug: string }) {
  const Component = COMPONENT_MAP[slug]
  return (
    <>
      <Seo
        rawTitle={`${TITLES[slug] ?? 'Elly'} | Hüseyin DOL`}
        canonical={`/projects/${slug}`}
      />
      <div className="container mx-auto min-h-screen px-6 py-20 pt-12">
        <Component />
      </div>
    </>
  )
}

// Sabit doküman seti → build'de üretilir.
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: Object.keys(COMPONENT_MAP).map(slug => ({ params: { slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<{ slug: string }> = async ({
  params,
}) => {
  const slug = params?.slug as string
  if (!COMPONENT_MAP[slug]) return { notFound: true }
  return { props: { slug } }
}
