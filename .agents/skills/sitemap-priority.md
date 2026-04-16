# Skill: Sitemap Öncelik Yönetimi

## Amaç

Derin teknik makaleleri `src/app/sitemap.ts` içindeki `highPrioritySlugs` Set'ine ekleyerek
Google'a `priority: 0.9` sinyali gönder (normal makaleler: `0.8`).

## Karar Kriterleri

Makale aşağıdaki kriterleri karşılıyorsa `highPrioritySlugs`'a ekle:

| Kriter          | Açıklama                                 |
| --------------- | ---------------------------------------- |
| Derinlik        | 1500+ kelime, 6+ H2 bölüm                |
| Kod yoğunluğu   | 5+ kod bloğu                             |
| Özgün içerik    | Gerçek proje (elly, portfolio) deneyimi  |
| Teknik doğruluk | Resmi dokümana dayanan içerik            |
| Bağlantı değeri | Diğer makaleler veya projelerle bağlantı |

Herhangi **3+** kriter sağlanıyorsa → `highPrioritySlugs`'a ekle.

## Adımlar

### 1. Makaleyi değerlendir

Yazan makaleyi yukarıdaki kriterlere göre puanla.

### 2. Gerekiyorsa sitemap.ts güncelle

`src/app/sitemap.ts` içindeki `highPrioritySlugs` Set'ine slug ekle:

```typescript
const highPrioritySlugs = new Set([
  'backend-java-elly',
  'devops-kubernetes-master',
  'devops-docker-postgresql',
  'devops-postgresql',
  'frontend-js-event-loop',
  '{yeni-slug}', // ← YENİ MAKALE
])
```

### 3. Doğrulama

```bash
grep "yeni-slug" src/app/sitemap.ts
```

## Kural

- Basit/kısa makaleler (< 1000 kelime) `highPrioritySlugs`'a eklenmez
- Her kategori için 2-4 makale ideal sayıdır
- `highPrioritySlugs` büyümesi: +1 makale / commit
