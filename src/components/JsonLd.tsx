const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'

export function PersonJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Hüseyin DOL',
    alternateName: 'huseyindol',
    url: SITE_URL,
    jobTitle: 'Senior Frontend Developer',
    image: `${SITE_URL}/assets/img/huseyindol.png`,
    email: 'huseyindol@gmail.com',
    identifier: 'huseyindol',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sancaktepe',
      addressRegion: 'İstanbul',
      addressCountry: 'TR',
    },
    sameAs: [
      'https://github.com/huseyindol',
      'https://www.linkedin.com/in/huseyindol/',
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Frontend Development',
      'Web Development',
      'Redux',
      'Node.js',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export interface ArticleJsonLdProps {
  title: string
  description: string
  url: string
  imageUrl?: string
  datePublished: string
  authorName: string
}

export function ArticleJsonLd({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  authorName,
}: Readonly<ArticleJsonLdProps>) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: imageUrl ? [imageUrl] : [],
    datePublished: datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hüseyin DOL',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/img/huseyindol.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
