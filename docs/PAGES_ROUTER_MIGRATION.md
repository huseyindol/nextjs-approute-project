# App Router → Pages Router Taşıma Takibi

**Amaç:** Tavan RPS'i yükseltmek. Karar: tam geçiş (App Router kaldırılacak).

**Strateji:** İki router Next.js'te yan yana çalışabildiği için taşıma **rota rota** yapılır;
her adımda App Router karşılığı aynı commit'te silinir → build her zaman yeşil, site hep ayakta.

**RPS ilkesi:** Varsayılan `getStaticProps` + ISR. `getServerSideProps` yalnız gerçekten
kişiye özel/istek-anına bağlı sayfalarda. (Ölçümde ~33 rps tavan + p95 10sn kuyruklanma
görülmüştü; en büyük kazanç sayfayı istek başına render etmemekten gelir.)

## Faz Durumu

| Faz | Kapsam                                                                        | Durum                     |
| --- | ----------------------------------------------------------------------------- | ------------------------- |
| 1   | İskelet: `_app`, `_document`, `SiteLayout`, `Seo`, fonts, globals.css taşındı | ✅                        |
| 2   | Statik içerik sayfaları                                                       | 🔄 `/about`, `/skills` ✅ |
| 3   | Blog + MDX (`/blog`, `/blog/[slug]`) + `/makaleler`                           | ⏳                        |
| 4   | Auth/BFF: server action'lar → `pages/api` + cookie adaptörü                   | ⏳                        |
| 5   | Dinamik: `/[pages]`, `/projects/[slug]`, `/forms/[id]`, `/arcade`             | ⏳                        |
| 6   | Özel dosyalar: `robots`, `sitemap`, `manifest`, `404`, `500`                  | ⏳                        |
| 7   | Chat / WebRTC / sosyal giriş route'ları                                       | ⏳                        |
| 8   | `src/app` tamamen kaldırılır + doğrulama                                      | ⏳                        |

## Taşıma Karşılıkları

| App Router                                   | Pages Router                                                                         |
| -------------------------------------------- | ------------------------------------------------------------------------------------ |
| `layout.tsx` (root)                          | `_document.tsx` (html/head/body) + `_app.tsx` (provider'lar)                         |
| `(site)/layout.tsx`                          | `components/SiteLayout.tsx` (`_app` sarar, `getLayout` ile devre dışı bırakılabilir) |
| `export const metadata` / `generateMetadata` | `<Seo />` (`src/lib/seo.tsx`, next/head + key dedup)                                 |
| async Server Component'te veri çekme         | `getStaticProps` (+ `revalidate`)                                                    |
| `generateStaticParams`                       | `getStaticPaths`                                                                     |
| `export const revalidate = N`                | `getStaticProps → revalidate: N`                                                     |
| `app/api/*/route.ts`                         | `pages/api/*.ts` (`req`/`res`)                                                       |
| Server Action (`'use server'`)               | `pages/api/*` + client `fetch` (BFF aynen korunur)                                   |
| `not-found.tsx`                              | `404.tsx`                                                                            |
| `error.tsx` / `global-error.tsx`             | `_error.tsx` / `500.tsx`                                                             |

## Yol Boyunca Çıkan Tuzaklar

1. **`useSearchParams()` / `usePathname()` artık `| null`.** `pages/` var olunca tipleri
   nullable oluyor. Tüm kullanımlar null-safe hale getirildi (`?? ''`, `?.get()`).
2. **`experimental.optimizeCss` (critters) Pages Router'ı kırıyor** — `/404` ve `/500`
   prerender'ında `document.documentElement.setAttribute is not a function`. critters
   deprecated; `optimizeCss: false` yapıldı. Kritik CSS inline'i istenirse halefi
   `beasties` ile yeniden değerlendirilecek. **(Kullanıcı onayı bekleyen tek ödün.)**
3. **`SkillType` üç yerde kopyalanmıştı** — kanonik zod tanımında (`schemas/dynamic`)
   tekilleştirildi.
4. `next/font` `_app`'te yüklenip CSS değişkenleri `:root`'a enjekte ediliyor
   (globals.css'teki `body { @apply font-sans }` bunu okuyor).
