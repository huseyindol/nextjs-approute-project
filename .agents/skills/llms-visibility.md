# Skill: LLMs Görünürlük Güncellemesi

## Amaç

Yeni blog makalesini AI crawler'lar ve LLM'ler için görünür kıl.
`public/llms.txt` ve `public/llms-full.txt` dosyalarını güncelle.

## Dosya Formatları

### llms.txt (Özet Liste)

`llmstxt.org` standardına uygun kısa link listesi. AI crawler'lar bu dosyayı tarar.

```
## Blog — Featured Articles

### {Kategori}
- [{Başlık}](https://www.huseyindol.com/blog/{slug})
```

**Kural:** Makale ilgili kategorinin **en üstüne** eklenir (en yeni makale ilk sırada).

### llms-full.txt (Detaylı Açıklama)

Her makalenin bir satırlık açıklamasını içerir. LLM'ler içerik çıkarımında kullanır.

```
- [{Başlık}](https://www.huseyindol.com/blog/{slug}): {Teknik açıklama — anahtar kavramlar, kullanılan teknolojiler, ele alınan problem}
```

**Kural:** Açıklama 1-2 cümle, keyword yoğun, Türkçe.

## Adımlar

### 1. Kategori bölümünü belirle

`public/llms.txt` ve `public/llms-full.txt` dosyalarında ilgili `### {Kategori}` başlığını bul.

Desteklenen kategoriler: `Backend`, `DevOps`, `Frontend`, `Mobile`, `AI`

### 2. llms.txt güncelle

İlgili kategorinin altındaki **ilk** link satırından önce yeni makaleyi ekle:

```
### Frontend
- [Yeni Makale Başlığı](https://www.huseyindol.com/blog/yeni-slug)   ← YENİ
- [Eski Makale](https://www.huseyindol.com/blog/eski-slug)
```

### 3. llms-full.txt güncelle

İlgili kategorinin altındaki **ilk** makale satırından önce ekle:

```
- [Yeni Makale](https://www.huseyindol.com/blog/yeni-slug): Açıklama burada.   ← YENİ
- [Eski Makale](https://www.huseyindol.com/blog/eski-slug): Eski açıklama.
```

### 4. Doğrulama

```bash
grep "yeni-slug" public/llms.txt public/llms-full.txt
```

Her iki dosyada da makale görünmeli.

## Format Kuralları

- URL formatı: `https://www.huseyindol.com/blog/{slug}`
- Başlık: makale frontmatter'ındaki `title` ile aynı
- Açıklama: makaledeki `description` frontmatter'ını baz al, gerekirse genişlet
- Türkçe açıklama + teknik terimler İngilizce kalabilir
