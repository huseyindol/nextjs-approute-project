import { GET } from '@/app/amp/route'
import { describe, expect, it } from 'vitest'

/**
 * /amp — ana sayfanın AMP kopyası (Route Handler).
 * Yerleşik AMP validator'ı burada çalıştırmıyoruz (ağ/paket gerektirir);
 * bunun yerine valid AMP HTML'in yapısal zorunluluklarını doğruluyoruz.
 */
describe('GET /amp', () => {
  it('returns 200 with text/html content type', async () => {
    const res = GET()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('text/html')
  })

  it('is a valid AMP document skeleton', async () => {
    const html = await GET().text()

    // Zorunlu AMP işaretleri
    expect(html.startsWith('<!doctype html>')).toBe(true)
    expect(html).toContain('<html ⚡ lang="tr">')
    expect(html).toContain('<meta charset="utf-8">')
    expect(html).toContain('<link rel="canonical"')
    expect(html).toContain('width=device-width')
    expect(html).toContain('https://cdn.ampproject.org/v0.js')
    // amp-boilerplate (normal + noscript)
    expect(html).toContain('<style amp-boilerplate>')
    expect(html).toContain('<noscript><style amp-boilerplate>')
    // Tek bir amp-custom style bloğu olmalı
    expect(html.match(/<style amp-custom>/g)?.length).toBe(1)
  })

  it('obeys AMP restrictions (no custom JS, no !important, no external stylesheet)', async () => {
    const html = await GET().text()

    // İzin verilen tek harici script v0.js; ld+json dışında custom <script src> olmamalı
    const scriptSrcs = [...html.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)].map(
      m => m[1],
    )
    expect(scriptSrcs).toEqual(['https://cdn.ampproject.org/v0.js'])

    // amp-custom CSS içinde !important yasak
    expect(html).not.toContain('!important')

    // Harici stylesheet (rel="stylesheet") AMP'de yasak
    expect(html).not.toContain('rel="stylesheet"')

    // Görseller <amp-img> ile, ham <img> ile değil
    expect(html).toContain('<amp-img')
    expect(html).not.toMatch(/<img\s/)
  })

  it('mirrors the homepage content (hero, stats, values)', async () => {
    const html = await GET().text()

    expect(html).toContain('Modern Web')
    expect(html).toContain('Hakkımda')
    expect(html).toContain('Çalışma Yaklaşımım')
    // Stats
    expect(html).toContain('Yıl Deneyim')
    // Canonical ana sayfaya işaret etmeli
    expect(html).toMatch(/<link rel="canonical" href="https?:\/\/[^"]+\/">/)
  })
})
