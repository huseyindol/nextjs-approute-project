# Blog Yazı Oluşturma Agent

## Amaç

Verilen konu için derinlemesine araştırılmış, SEO optimize edilmiş, AI toollarında görünür bir blog makalesi oluşturur ve `main` branch'e push eder.

## Tetikleme

```
Konu: <kategori> -> <başlık/konu>
```

Örnek: `Frontend -> JS'te Event Loop`

## Adımlar

### 1. Araştırma (Researcher)

- WebFetch ile resmi MDN/docs sayfası
- WebSearch ile güncel blog yazıları ve GitHub örnekleri
- Konuya özgü kod örnekleri, edge case'ler, performans notları topla
- Unsplash'tan konuya uygun `coverImage` URL belirle (format: `https://images.unsplash.com/photo-XXXXX?q=80&w=2000&auto=format&fit=crop`)

### 2. Makale Yazımı (Writer)

**Dosya:** `src/data/blog/{kategori-kebab}-{konu-kebab}.mdx`

**Frontmatter zorunlu alanlar:**

```
title: Türkçe başlık — kısa, keyword içeren, dikkat çekici
description: 150-160 karakter, keyword yoğun, okuyucuya değer vaat eden
publishedAt: bugünün tarihi (YYYY-MM-DD)
category: Frontend | Backend | DevOps | AI | Mobile
author: Hüseyin DOL
coverImage: Unsplash URL (konuyla ilgili, yüksek kalite)
readingTime: tahmini okuma süresi (dakika olarak)
```

**İçerik yapısı:**

- Giriş paragrafı: Neden bu konu önemli? Gerçek dünya problemi
- Minimum 6 bölüm (## H2 başlıkları)
- Her bölümde en az 1 kod bloğu (dil belirtilmiş: `js`, `ts`, `bash`, `yaml` vb.)
- Tablolar, listeler, callout (> blockquote) ile görsel çeşitlilik
- Gerçek örnek: `elly` projesi veya portfolio ile bağlantı (varsa)
- Sonuç bölümü + önerilen kaynaklar/sonraki adımlar

**Kalite kriterleri:**

- Minimum 1000 kelime
- Teknik doğruluk öncelikli
- Türkçe yazılır, teknik terimler İngilizce kalabilir
- `console.log` gibi basit örnekler yok — gerçek senaryolar

### 3. SEO Optimizasyonu

Blog post sayfası `src/app/(site)/blog/[slug]/page.tsx` zaten category-aware keywords kullanıyor.
Frontmatter `description` alanı 150-160 karakter olmalı.

### 4. AI Görünürlük

**`public/llms.txt` güncelle:**

- İlgili kategori bölümüne yeni makale satırı ekle

**`public/llms-full.txt` güncelle:**

- İlgili kategori bölümüne makale URL + açıklama satırı ekle (format: `- [Başlık](URL): Kısa açıklama`)

### 5. Sitemap Kontrolü

`src/app/sitemap.ts` içindeki `highPrioritySlugs` Set'ine ekle — eğer makale özellikle önemli/derin ise.

### 6. Validasyon

```bash
bun run type-check     # TypeScript hataları
bun run format         # Prettier ile otomatik format
bun run format:check   # Tüm dosyalar temiz mi?
```

### 7. Commit & Push

```bash
git add src/data/blog/{slug}.mdx public/llms.txt public/llms-full.txt src/app/sitemap.ts
git commit -m "feat(blog): add '{başlık}' article

- {kategori} kategorisi
- {konu özeti}
- SEO keywords: {anahtar kelimeler}
- llms.txt + llms-full.txt güncellendi"

git push origin main
```

## Checklist

- [ ] MDX frontmatter eksiksiz (7 alan)
- [ ] coverImage Unsplash URL çalışıyor
- [ ] Minimum 6 H2 bölüm
- [ ] Her bölümde kod örneği
- [ ] description 150-160 karakter
- [ ] llms.txt güncellendi
- [ ] llms-full.txt güncellendi
- [ ] sitemap highPrioritySlugs kontrol edildi
- [ ] type-check temiz
- [ ] format:check temiz
- [ ] main branch'e push edildi

## Notlar

- Blog slug formatı: `{kategori}-{konu-kebab-case}` (örn: `frontend-js-event-loop`)
- Mevcut makalelerle çakışmayı önle: `ls src/data/blog/` kontrol et
- readingTime hesabı: yaklaşık kelime sayısı ÷ 200 (dakika)
- coverImage: Unsplash arama — `https://unsplash.com/s/photos/{topic}` üzerinden uygun fotoğraf ID'si seç
