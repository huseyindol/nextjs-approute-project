import { Page, PageSEO } from '@prisma/client'
import { Metadata } from 'next'

export const formatDate = (input: string | number): string => {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const absoluteUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_HOST}${path}`
}

export const formatMetadata = (
  page: Page & { pageSEO: PageSEO | null },
): Metadata => {
  console.log('page :>> ', page)

  // Eğer pageSEO yoksa, page bilgilerini kullan
  if (!page.pageSEO) {
    return {
      metadataBase: new URL(`${process.env.NEXT_PUBLIC_HOST}`),
      title: page.name || 'Hüseyin DOL',
      description:
        page.description || "Hüseyin DOL'un kişisel portfolio sitesi",
    }
  }

  const { title, description, keywords, canonical, noIndex, noFollow } =
    page.pageSEO

  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_HOST}`),
    title: title || page.name || 'Hüseyin DOL',
    description:
      description ||
      page.description ||
      "Hüseyin DOL'un kişisel portfolio sitesi",
    keywords: keywords && keywords.length > 0 ? keywords : undefined,
    alternates: canonical ? { canonical } : undefined,
    robots:
      noIndex || noFollow
        ? `${noIndex ? 'noindex' : ''}${noIndex && noFollow ? ',' : ''}${noFollow ? 'nofollow' : ''}`
        : undefined,
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      url: `${process.env.NEXT_PUBLIC_HOST}/${page.slug || ''}`,
      title: title || page.name || 'Hüseyin DOL',
      description:
        description ||
        page.description ||
        "Hüseyin DOL'un kişisel portfolio sitesi",
      siteName: 'Hüseyin DOL Portfolio',
    },
    twitter: {
      card: 'summary',
      title: title || page.name || 'Hüseyin DOL',
      description:
        description ||
        page.description ||
        "Hüseyin DOL'un kişisel portfolio sitesi",
    },
  }
}
