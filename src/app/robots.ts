import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: tüm crawler'lara izin ver
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/example/'],
      },
      // OpenAI — ChatGPT Browse & Search
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      // Anthropic — Claude
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      // Perplexity
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      // Google — Gemini / AI Overviews
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      // Meta — Meta AI
      {
        userAgent: 'meta-externalagent',
        allow: '/',
      },
      // Common Crawl — LLM eğitim verisi
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      // Diğer AI sistemleri
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
      {
        userAgent: 'Diffbot',
        allow: '/',
      },
      {
        userAgent: 'Amazonbot',
        allow: '/',
      },
      {
        userAgent: 'YouBot',
        allow: '/',
      },
    ],
    sitemap: 'https://www.huseyindol.com/sitemap.xml',
  }
}
