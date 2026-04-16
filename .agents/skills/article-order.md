# Skill: Makale Sıralama (Article Order)

## Amaç

Yeni yazılan makaleyi blog listesinde **1. sıraya** yerleştir. Mevcut makalelerin `order` değerlerini kaydır.

## Kullanım

Blog writer agent her yeni makale oluştururken bu skill'i adım 2'de uygular.

## Adımlar

### 1. Mevcut order değerlerini listele

```bash
grep -r "^order:" src/data/blog/*.mdx | sort -t: -k3 -n
```

Bu komut mevcut sıraları gösterir. `order` alanı **olmayan** makaleler `99` (en sona) düşer.

### 2. Mevcut order'ları 1 artır

Kategori filtresi **yoktur** — tüm kategorilerde 1. sıra tek bir makaleye ait olmalı (en son eklenen).

Her `order: N` → `order: N+1` olarak güncelle. Yalnızca sayısal değeri olan satırları değiştir (order: 99 olanları dahil **etme** — onlar zaten en sonda, değiştirme):

```bash
# order: 99 olanlar hariç, diğerlerini +1 artır
# Örnek: order: 1 → order: 2, order: 2 → order: 3, order: 3 → order: 4, order: 4 → order: 5
```

Her dosyayı **tek tek** Edit tool ile güncelle (`sed` yerine Edit tercih et):

```
old_string: "order: 1"
new_string: "order: 2"
```

> **Not:** Aynı order değeri birden fazla dosyada olabilir — hepsini güncelle.

### 3. Yeni makaleye order: 1 ekle

Yeni makalenin frontmatter'ına `readingTime` satırından sonra ekle:

```yaml
readingTime: '8'
order: 1
```

### 4. Doğrulama

```bash
grep -r "^order:" src/data/blog/*.mdx | sort -t: -k3 -n | head -5
```

İlk satırda yeni makale görünmeli.

## Kural

- `order: 99` olan makaleler **dokunulmaz** — bunlar "arşiv" makalelerdir
- Aynı `order` değeri iki makalede olmamalı (shift sonrası çakışma kontrol et)
- Shift işlemi **büyükten küçüğe** sırayla yap: önce en büyük order'ı artır, sonra küçüklere in (overwrite sorunu önleme)
