import { NextResponse } from 'next/server'

/**
 * Ana sayfanın AMP (Accelerated Mobile Pages) kopyası.
 *
 * Next.js App Router yerleşik AMP'i (Pages Router'daki `amp: true` / `useAmp`)
 * DESTEKLEMEZ. Bu yüzden valid AMP HTML'i bir Route Handler ile elle üretip
 * `text/html` olarak sunuyoruz. Çıktı https://validator.ampproject.org ile
 * doğrulanabilir (amp-boilerplate + v0.js + tek `<style amp-custom>` + amp-img,
 * custom JS yok).
 *
 * Not: AMP eşlemesi için asıl (non-AMP) ana sayfaya `<link rel="amphtml"
 * href="/amp">` eklenebilir; ana sayfa CMS-dinamik olduğundan bu handler
 * kendi içinde `<link rel="canonical">` ile ana sayfaya işaret eder.
 */

// Statik olarak üret, ISR ile tazele (site geneli 1 saat konvansiyonu).
export const revalidate = 3600

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'

const SITE_NAME = 'Hüseyin DOL'
const PAGE_TITLE = `${SITE_NAME} | Modern Web Uygulamaları Geliştiriyorum`
const PAGE_DESCRIPTION =
  '10+ yıllık deneyimle React, Next.js, TypeScript ile modern frontend, Java ve Spring Boot ile ölçeklenebilir backend çözümleri geliştiren bir Software Developer.'

// Ana sayfadaki Hero içeriğiyle aynı kaynak veriler (siteInfo + stats + values).
const HERO = {
  sayHi: '👋 Merhabalar, ben Hüseyin',
  titleHighlight: 'Modern Web',
  titleRest: 'Uygulamaları Geliştiriyorum',
  description:
    '10+ yıllık deneyimim ile <strong>React, Next.js ve TypeScript</strong> ile modern frontend, <strong>Java ve Spring Boot</strong> ile ölçeklenebilir backend çözümleri geliştiren bir Software Developer’ım. Uçtan uca performanslı, kullanıcı dostu web uygulamaları; ekip liderliği ve mentorluk konularında da deneyimliyim.',
  email: 'mailto:huseyindol@gmail.com',
  cvUrl: '/assets/files/HuseyinDOL.pdf',
  github: 'https://github.com/huseyindol',
  linkedin: 'https://www.linkedin.com/in/huseyindol/',
}

const STATS: ReadonlyArray<{ value: string; label: string }> = [
  { value: '10+', label: 'Yıl Deneyim' },
  { value: '7+', label: 'Şirket' },
  { value: '50+', label: 'Proje' },
  { value: '23', label: 'Teknoloji' },
]

const VALUES: ReadonlyArray<{ title: string; description: string }> = [
  {
    title: 'Temiz Kod',
    description:
      'Okunabilir, sürdürülebilir ve iyi yapılandırılmış kod yazmak en önemli önceliğim. SOLID prensiplerine ve kapsamlı code review süreçlerine büyük önem veriyorum.',
  },
  {
    title: 'Performans Odaklı',
    description:
      'Core Web Vitals, lazy loading, code splitting ve bundle optimizasyonu ile kullanıcı deneyimini her zaman merkeze alıyorum. Her ms önemlidir.',
  },
  {
    title: 'Ekip & Mentorluk',
    description:
      'Code review, bilgi paylaşımı ve junior geliştirici mentorluğu ile ekibin büyümesine ve teknik kültürün güçlenmesine katkıda bulunuyorum.',
  },
]

const TECHS = [
  'React',
  'Next.js',
  'TypeScript',
  'Java',
  'Kubernetes',
  'React Native',
]

// AMP zorunlu boilerplate (birebir bu içerik olmalı).
const AMP_BOILERPLATE =
  '<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>'

// Tek `<style amp-custom>` — `!important` yok, harici stylesheet yok (AMP kuralı).
const AMP_CUSTOM_CSS = `
  :root{--bg:#0f172a;--fg:#e2e8f0;--muted:#94a3b8;--card:#111827;--primary:#6366f1;--accent:#818cf8}
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--bg);color:var(--fg);font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.6}
  a{color:inherit;text-decoration:none}
  .container{max-width:960px;margin:0 auto;padding:0 24px}
  .hero{background:linear-gradient(135deg,#0f172a,#1e1b4b,#0f172a);padding:72px 0;text-align:center}
  .badge{display:inline-block;border:1px solid rgba(129,140,248,.35);background:rgba(99,102,241,.2);color:#c7d2fe;border-radius:999px;padding:6px 16px;font-size:14px;font-weight:500;margin-bottom:24px}
  h1{font-size:40px;line-height:1.15;font-weight:800;margin-bottom:24px}
  h1 .grad{background:linear-gradient(90deg,#60a5fa,#818cf8,#a78bfa);-webkit-background-clip:text;background-clip:text;color:transparent}
  .lead{max-width:680px;margin:0 auto 32px;font-size:19px;color:#cbd5e1}
  .lead strong{color:#fff}
  .cta{display:flex;flex-wrap:wrap;gap:16px;justify-content:center;margin-bottom:28px}
  .btn{display:inline-block;padding:12px 24px;border-radius:10px;font-weight:600;font-size:15px}
  .btn-primary{background:linear-gradient(90deg,#3b82f6,#6366f1);color:#fff}
  .btn-outline{border:1px solid rgba(255,255,255,.3);color:#fff}
  .social{display:flex;gap:12px;justify-content:center}
  .social a{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);font-size:13px}
  section{padding:56px 0}
  .stats{background:var(--card);border-top:1px solid rgba(148,163,184,.15);border-bottom:1px solid rgba(148,163,184,.15)}
  .stats-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:32px;text-align:center}
  .stat-value{font-size:40px;font-weight:800;color:var(--accent)}
  .stat-label{font-size:14px;color:var(--muted)}
  h2{font-size:30px;font-weight:800;margin-bottom:16px}
  .about{display:grid;grid-template-columns:1fr;gap:32px;align-items:center}
  .avatar{margin:0 auto;border-radius:999px;overflow:hidden;border:4px solid rgba(99,102,241,.2);width:180px;height:180px}
  .about p{color:var(--muted);margin-bottom:16px}
  .about strong{color:var(--fg)}
  .techs{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
  .tech{border:1px solid rgba(99,102,241,.2);background:rgba(99,102,241,.1);color:var(--accent);border-radius:8px;padding:4px 12px;font-size:13px}
  .values-grid{display:grid;grid-template-columns:1fr;gap:24px}
  .value-card{background:var(--card);border:1px solid rgba(148,163,184,.12);border-radius:16px;padding:28px}
  .value-card h3{font-size:19px;margin-bottom:12px}
  .value-card p{color:var(--muted)}
  footer{padding:32px 0;text-align:center;color:var(--muted);font-size:14px;border-top:1px solid rgba(148,163,184,.12)}
  footer a{color:var(--accent)}
  @media(min-width:768px){h1{font-size:56px}.stats-grid{grid-template-columns:repeat(4,1fr)}.about{grid-template-columns:220px 1fr}.values-grid{grid-template-columns:repeat(3,1fr)}}
`.trim()

const JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: 'Software Developer',
  image: 'https://github.com/huseyindol.png',
  sameAs: [HERO.github, HERO.linkedin],
})

function renderAmpDocument(): string {
  const statsHtml = STATS.map(
    s =>
      `<div><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`,
  ).join('')

  const techsHtml = TECHS.map(t => `<span class="tech">${t}</span>`).join('')

  const valuesHtml = VALUES.map(
    v =>
      `<div class="value-card"><h3>${v.title}</h3><p>${v.description}</p></div>`,
  ).join('')

  return `<!doctype html>
<html ⚡ lang="tr">
<head>
<meta charset="utf-8">
<link rel="canonical" href="${SITE_URL}/">
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<title>${PAGE_TITLE}</title>
<meta name="description" content="${PAGE_DESCRIPTION}">
${AMP_BOILERPLATE}
<script async src="https://cdn.ampproject.org/v0.js"></script>
<script type="application/ld+json">${JSON_LD}</script>
<style amp-custom>${AMP_CUSTOM_CSS}</style>
</head>
<body>
<header class="hero">
<div class="container">
<span class="badge">${HERO.sayHi}</span>
<h1><span class="grad">${HERO.titleHighlight}</span><br>${HERO.titleRest}</h1>
<p class="lead">${HERO.description}</p>
<div class="cta">
<a class="btn btn-primary" href="${HERO.email}">İletişime Geç</a>
<a class="btn btn-outline" href="${HERO.cvUrl}">CV İndir</a>
</div>
<div class="social">
<a href="${HERO.github}" rel="noopener">GitHub</a>
<a href="${HERO.linkedin}" rel="noopener">LinkedIn</a>
<a href="${HERO.email}">E-posta</a>
</div>
</div>
</header>

<section class="stats">
<div class="container">
<div class="stats-grid">${statsHtml}</div>
</div>
</section>

<section>
<div class="container about">
<amp-img class="avatar" src="https://github.com/huseyindol.png" width="180" height="180" layout="fixed" alt="${SITE_NAME}"></amp-img>
<div>
<h2>Hakkımda</h2>
<p>2011 yılında başladığım frontend yolculuğu bugün <strong>10+ yıllık deneyime</strong> dönüştü. E-ticaretten fintech'e, medya platformlarından kurumsal uygulamalara kadar çeşitli sektörlerde çalıştım.</p>
<p>React ekosisteminde uzmanlaşmanın yanı sıra <strong>Java Spring Boot</strong> ile backend, <strong>Kubernetes</strong> ile DevOps ve <strong>React Native</strong> ile mobil geliştirme alanlarında da derinleşiyorum.</p>
<div class="techs">${techsHtml}</div>
</div>
</div>
</section>

<section class="stats">
<div class="container">
<h2>Çalışma Yaklaşımım</h2>
<div class="values-grid">${valuesHtml}</div>
</div>
</section>

<footer>
<div class="container">
Bu, <a href="${SITE_URL}/">${SITE_NAME}</a> ana sayfasının AMP sürümüdür.
</div>
</footer>
</body>
</html>`
}

export function GET(): NextResponse {
  return new NextResponse(renderAmpDocument(), {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, must-revalidate',
    },
  })
}
