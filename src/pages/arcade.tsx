import GameComponent from '@/components/games/overtakeandparking/GameComponent'
import { Seo } from '@/lib/seo'
import { getPageBySlugService } from '@/services/site/pages.services'
import type { PageResponseType, Page as PageType } from '@/types/BaseResponse'
import type { GetServerSideProps } from 'next'
import dynamicImport from 'next/dynamic'

const SITE_NAME = 'Hüseyin DOL'
const PAGE_SLUG = 'arcade'

type PageTemplateProps = {
  pageInfo: PageType
  searchParams?: { industry?: string }
}

const componentCache = new Map<string, React.ComponentType<PageTemplateProps>>()

function getTemplateComponent(template: string) {
  if (!componentCache.has(template)) {
    componentCache.set(
      template,
      dynamicImport<PageTemplateProps>(
        () => import(`@/components/dynamic/pages/${template}`),
      ),
    )
  }
  return componentCache.get(template)!
}

interface ArcadePageProps {
  pageInfo: PageType | null
  industry: string | null
}

export default function ArcadePage({ pageInfo, industry }: ArcadePageProps) {
  const Template = pageInfo?.template
    ? getTemplateComponent(pageInfo.template)
    : null

  return (
    <>
      <Seo
        rawTitle={`${SITE_NAME} | Arcade Oyunlar`}
        description="Hüseyin DOL - Arcade Oyunlar. Makas ve Park Etme oyunlarını oynayın."
        canonical="/arcade"
      />
      {Template && pageInfo && (
        // eslint-disable-next-line react-hooks/static-components -- template from API, module cache'de memoize
        <Template
          pageInfo={pageInfo}
          searchParams={industry ? { industry } : undefined}
        />
      )}
      {/* CMS bileşenlerinin altına oyunu entegre ediyoruz */}
      <GameComponent />
    </>
  )
}

/**
 * industry query'sini şablona geçirebilmek için getServerSideProps (App Router'daki
 * searchParams davranışının aynısı). CMS içeriği yoksa yalnız oyun render edilir.
 */
export const getServerSideProps: GetServerSideProps<ArcadePageProps> = async ({
  query,
  res,
}) => {
  let response: PageResponseType | null = null
  try {
    response = await getPageBySlugService(PAGE_SLUG)
  } catch (error) {
    console.error('Arcade page data error:', error)
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400',
  )

  const industry = typeof query.industry === 'string' ? query.industry : null

  return {
    props: {
      pageInfo: (response?.data as PageType) ?? null,
      industry,
    },
  }
}
