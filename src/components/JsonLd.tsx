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
