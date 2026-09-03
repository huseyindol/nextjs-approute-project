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

## Faz 2 Notları

- **Veri yükleyicileri ayrıştırıldı:** async server component'ler (`Skills`, `Experience`)
  `src/lib/section-data.ts` içindeki `loadSkillsSection()` / `loadExperienceSection()`
  fonksiyonlarına dönüştü. Sayfalar bunları `getStaticProps`'tan çağırıyor.
- **`APage` şablonu sync + props'lu oldu** — bölüm verisini artık kendi içinde çekmiyor,
  props olarak alıyor (`PageTemplateProps`). CMS şablon seçimi (`dynamic()` + module cache)
  aynen korundu.
- Taşınan 8 rotanın tamamı **statik (○) veya SSG+ISR (●)** — istek başına render eden
  sayfa yok.

## Faz 3 Notları

- **MDX derlemesi build zamanına alındı.** App Router `next-mdx-remote/rsc` ile render
  anında derliyordu; Pages Router'da `getStaticProps` içinde `serializeMdx()` (yeni:
  `src/lib/mdx-serialize.ts`) derler, `MdxContent` yalnız hazır çıktıyı render eder.
- **Liste sayfasından MDX gövdeleri ayıklandı.** Pages Router'da getStaticProps çıktısı
  `__NEXT_DATA__` ile HTML'e gömülür; 27 makalenin tam metnini göndermek sayfayı
  yüzlerce KB şişirirdi. `/blog` yalnız `slug` + `frontmatter` alıyor.
- **Detay sayfasında da `content` props'tan çıkarıldı** (derlenmiş hali `mdxSource`'ta
  zaten var); `wordCount` sunucuda hesaplanıp prop olarak geçiyor.
- **Bilinen ödün:** uzun makalelerde `mdxSource` props'u 128 kB eşiğini aşıyor (Next
  uyarısı). Sebep yapısal: RSC'de derlenmiş MDX sunucuda kalırken Pages Router'da
  hidrasyon için istemciye gitmek zorunda. **Sunucu RPS'ini etkilemez** (statik dosya
  servisi), okuyucunun indirme boyutunu etkiler. Taşıma sonrası seçenek: MDX'i build'de
  HTML'e render edip `HtmlContent` gibi basmak (etkileşimli MDX bileşeni yoksa mümkün).

## Doğrulama Notu (ÖNEMLİ)

Claude içi tarayıcı Pages Router sayfalarını **hidrate etmiyor** → istemci etkileşimi
orada test edilirse yanlış biçimde "hidrasyon kırık" görünür. Sunucu çıktısı (HTML, meta,
route tablosu) orada doğrulanır; tıklama/state testi kullanıcının kendi tarayıcısında
yapılır. (Tem 2026'da kullanıcı doğruladı: tema düğmesi + kategori filtresi çalışıyor.)

## Faz 3b Notu — dinamik → statik kazanımı

`/makaleler` App Router'da `searchParams.category`'yi SUNUCUDA okuduğu için **dinamikti (ƒ)**.
Kategori filtresi `MakalelerContent` içine (client state + `router.replace`) alınarak sayfa
**SSG'ye (●)** çevrildi — blog'da zaten uygulanan desen. Bu, taşımanın RPS hedefine doğrudan
katkısı olan ilk yapısal kazanç: sayfa artık istek başına render edilmiyor.

`/makaleler/[slug]` için `fallback: 'blocking'` seçildi (CMS'e yeni makale eklendiğinde
build gerekmeden ilk istekte üretilsin); blog MDX'inde ise `fallback: false` (dosyalar
repo'da, yeni makale zaten deploy ile gelir).
