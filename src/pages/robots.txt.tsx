import type { GetServerSideProps } from 'next'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'

// AI crawler'lar dahil izinli user-agent'lar (App Router robots.ts'ten birebir).
const ALLOWED_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'anthropic-ai',
  'ClaudeBot',
  'PerplexityBot',
  'Googlebot',
  'Google-Extended',
  'meta-externalagent',
  'CCBot',
  'cohere-ai',
  'Diffbot',
  'Amazonbot',
  'YouBot',
]

function buildRobots(): string {
  const lines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    '',
    ...ALLOWED_AGENTS.flatMap(ua => [`User-agent: ${ua}`, 'Allow: /', '']),
    `Sitemap: ${BASE_URL}/sitemap.xml`,
    '',
  ]
  return lines.join('\n')
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate',
  )
  res.write(buildRobots())
  res.end()
  return { props: {} }
}

// getServerSideProps yanıtı yazıp bitirdiği için bileşen hiç render edilmez.
export default function Robots() {
  return null
}
