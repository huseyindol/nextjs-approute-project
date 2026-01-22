# Elly CMS API Endpoints

Base URL: `http://localhost:8080`

---

## Authentication

### POST /api/v1/auth/register

Yeni kullanıcı kaydı.

**Body:**

```json
{
  "username": "string", // zorunlu, min 3, max 50 karakter
  "email": "string", // zorunlu, geçerli email
  "password": "string", // zorunlu, min 6 karakter
  "firstName": "string", // opsiyonel
  "lastName": "string" // opsiyonel
}
```

---

### POST /api/v1/auth/login

Kullanıcı girişi.

**Body:**

```json
{
  "usernameOrEmail": "string", // zorunlu
  "password": "string" // zorunlu
}
```

**Response:**

```json
{
  "result": true,
  "data": {
    "token": "string",
    "refreshToken": "string",
    "type": "Bearer",
    "userId": 1,
    "username": "string",
    "email": "string",
    "userCode": "string",
    "expiredDate": 1735516528560
  }
}
```

---

### POST /api/v1/auth/refresh

Token yenileme.

**Body:**

```json
{
  "refreshToken": "string" // zorunlu
}
```

---

## Pages

### GET /api/v1/pages/{slug}

Sayfa getir (slug ile).

**Path Parameters:**

- `slug`: Sayfa slug'ı

**Response:**

```json
{
  "result": true,
  "data": {
    "id": 1,
    "title": "string",
    "description": "string",
    "slug": "string",
    "status": true,
    "seoInfo": { ... },
    "components": [ ... ]
  }
}
```

---

### GET /api/v1/pages/list

Tüm sayfaları listele.

**Response:**

```json
{
  "result": true,
  "data": [
    {
      "id": 1,
      "title": "string",
      "description": "string",
      "slug": "string",
      "status": true,
      "seoInfo": { ... },
      "components": [ ... ]
    }
  ]
}
```

---

### GET /api/v1/pages/list/summary

Sayfa özetlerini listele.

**Response:**

```json
{
  "result": true,
  "data": [
    {
      "id": 1,
      "title": "string",
      "slug": "string",
      "status": true
    }
  ]
}
```

---

### POST /api/v1/pages

Sayfa oluştur.

**Body:**

```json
{
  "title": "string",
  "description": "string",
  "slug": "string",
  "status": true,
  "componentIds": [1, 2], // opsiyonel
  "seoInfo": {
    "title": "string",
    "description": "string",
    "keywords": "string",
    "canonicalUrl": "string",
    "noIndex": false,
    "noFollow": false
  }
}
```

---

### PUT /api/v1/pages/{id}

Sayfa güncelle.

**Path Parameters:**

- `id`: Sayfa ID

**Body:** (POST ile aynı)

---

### DELETE /api/v1/pages/{id}

Sayfa sil.

**Path Parameters:**

- `id`: Sayfa ID

---

## Posts

### GET /api/v1/posts/{id}

Post getir.

**Path Parameters:**

- `id`: Post ID

---

### GET /api/v1/posts/list

Tüm postları listele.

**Response:**

```json
{
  "result": true,
  "data": [
    {
      "id": 1,
      "title": "string",
      "content": "string",
      "slug": "string",
      "status": true,
      "orderIndex": 1,
      "seoInfo": { ... }
    }
  ]
}
```

---

### GET /api/v1/posts/list/summary

Post özetlerini listele.

**Response:**

```json
{
  "result": true,
  "data": [
    {
      "id": 1,
      "title": "string",
      "slug": "string",
      "status": true,
      "orderIndex": 1
    }
  ]
}
```

---

### POST /api/v1/posts

Post oluştur.

**Body:**

```json
{
  "title": "string",
  "content": "string",
  "slug": "string",
  "status": true,
  "orderIndex": 1,
  "seoInfo": {
    "title": "string",
    "description": "string",
    "keywords": "string",
    "canonicalUrl": "string",
    "noIndex": false,
    "noFollow": false
  }
}
```

---

### PUT /api/v1/posts/{id}

Post güncelle.

**Path Parameters:**

- `id`: Post ID

**Body:** (POST ile aynı)

---

### DELETE /api/v1/posts/{id}

Post sil.

**Path Parameters:**

- `id`: Post ID

---

## Comments

### GET /api/v1/comments/{id}

Yorum getir.

**Path Parameters:**

- `id`: Yorum ID

---

### GET /api/v1/comments/post/{postId}

Post'a ait yorumları getir.

**Path Parameters:**

- `postId`: Post ID

---

### POST /api/v1/comments

Yorum ekle.

**Body:**

```json
{
  "name": "string",
  "email": "string", // zorunlu, geçerli email
  "content": "string",
  "postId": 1, // zorunlu
  "status": true,
  "parentCommentId": null // alt yorum için parent ID
}
```

---

### DELETE /api/v1/comments/{id}

Yorum sil.

**Path Parameters:**

- `id`: Yorum ID

---

## Ratings

### GET /api/v1/ratings/{id}

Rating getir.

**Path Parameters:**

- `id`: Rating ID

---

### GET /api/v1/ratings/post/{postId}

Post'a ait ratingleri getir.

**Path Parameters:**

- `postId`: Post ID

---

### GET /api/v1/ratings/stats/{postId}

Post rating istatistikleri.

**Path Parameters:**

- `postId`: Post ID

**Response:**

```json
{
  "postId": 1,
  "averageRating": 4.5,
  "totalRatings": 10
}
```

---

### POST /api/v1/ratings

Rating ekle.

**Body:**

```json
{
  "postId": 1, // zorunlu
  "rating": 5, // zorunlu, 1-5 arası
  "comment": "string" // opsiyonel
}
```

---

## Banners

### GET /api/v1/banners/{id}

Banner getir.

**Path Parameters:**

- `id`: Banner ID

**Response:**

```json
{
  "result": true,
  "data": {
    "id": 1,
    "title": "string",
    "altText": "string",
    "images": {
      "desktop": "string",
      "tablet": "string",
      "mobile": "string"
    },
    "link": "string",
    "target": "_blank",
    "type": "string",
    "orderIndex": 1,
    "status": true,
    "subFolder": "string"
  }
}
```

---

### GET /api/v1/banners/list

Tüm bannerları listele.

**Response:**

```json
{
  "result": true,
  "data": [
    {
      "id": 1,
      "title": "string",
      "altText": "string",
      "images": {
        "desktop": "string",
        "tablet": "string",
        "mobile": "string"
      },
      "link": "string",
      "target": "_blank",
      "type": "string",
      "orderIndex": 1,
      "status": true,
      "subFolder": "string"
    }
  ]
}
```

---

### GET /api/v1/banners/list/{subFolder}

Belirli bir subFolder'daki bannerları listele.

**Path Parameters:**

- `subFolder`: Alt klasör adı

**Response:** (list ile aynı format)

---

### GET /api/v1/banners/list/summary

Banner özetlerini listele.

**Response:**

```json
{
  "result": true,
  "data": [
    {
      "id": 1,
      "title": "string",
      "status": true,
      "orderIndex": 1
    }
  ]
}
```

---

### GET /api/v1/banners/list/summary/{subFolder}

Belirli bir subFolder'daki banner özetlerini listele.

**Path Parameters:**

- `subFolder`: Alt klasör adı

**Response:** (summary ile aynı format)

---

### GET /api/v1/banners/sub-folders

Tüm mevcut subFolder listesini döndürür.

**Response:**

```json
{
  "result": true,
  "data": ["promo", "hero", "sidebar"]
}
```

---

### POST /api/v1/banners

Banner oluştur.

**Content-Type:** `multipart/form-data`

**Form Fields:**

- `data`: JSON string (DtoBannerIU formatında, zorunlu)
- `desktop`: file (opsiyonel, desktop görsel)
- `tablet`: file (opsiyonel, tablet görsel)
- `mobile`: file (opsiyonel, mobil görsel)

**data JSON formatı:**

```json
{
  "title": "string",
  "altText": "string",
  "link": "string",
  "target": "_blank | _self",
  "type": "string",
  "orderIndex": 1,
  "status": true,
  "subFolder": "string",
  "images": {
    "desktop": "https://...",
    "tablet": "https://...",
    "mobile": "https://..."
  }
}
```

> **Not:** Dosya yüklemek istiyorsanız `desktop`, `tablet`, `mobile` form field'larını kullanın.
> Doğrudan URL göndermek istiyorsanız `data` JSON içindeki `images` objesini kullanın.

---

### PUT /api/v1/banners/{id}

Banner güncelle.

**Path Parameters:**

- `id`: Banner ID

**Content-Type:** `multipart/form-data`

**Form Fields:** (POST ile aynı)

---

### DELETE /api/v1/banners/{id}

Banner sil.

**Path Parameters:**

- `id`: Banner ID

---

## Components

### GET /api/v1/components/{id}

Component getir.

**Path Parameters:**

- `id`: Component ID

---

### GET /api/v1/components/list

Tüm componentleri listele.

**Response:**

```json
{
  "result": true,
  "data": [
    {
      "id": 1,
      "name": "string",
      "description": "string",
      "type": "BANNER | WIDGET",
      "content": "string",
      "orderIndex": 1,
      "status": true,
      "pages": [ ... ],
      "banners": [ ... ],
      "widgets": [ ... ]
    }
  ]
}
```

---

### GET /api/v1/components/list/summary

Component özetlerini listele.

**Response:**

```json
{
  "result": true,
  "data": [
    {
      "id": 1,
      "name": "string",
      "type": "BANNER | WIDGET",
      "status": true,
      "orderIndex": 1
    }
  ]
}
```

---

### POST /api/v1/components

Component oluştur.

**Body:**

```json
{
  "name": "string",
  "description": "string",
  "type": "BANNER | WIDGET",
  "content": "string",
  "orderIndex": 1,
  "status": true,
  "pageIds": [1, 2], // opsiyonel
  "bannerIds": [1], // opsiyonel
  "widgetIds": [1] // opsiyonel
}
```

---

### PUT /api/v1/components/{id}

Component güncelle.

**Path Parameters:**

- `id`: Component ID

**Body:** (POST ile aynı)

---

### DELETE /api/v1/components/{id}

Component sil.

**Path Parameters:**

- `id`: Component ID

---

## Widgets

### GET /api/v1/widgets/{id}

Widget getir.

**Path Parameters:**

- `id`: Widget ID

---

### GET /api/v1/widgets/list

Tüm widgetları listele.

**Response:**

```json
{
  "result": true,
  "data": [
    {
      "id": 1,
      "name": "string",
      "description": "string",
      "type": "BANNER | POST",
      "content": "string",
      "orderIndex": 1,
      "status": true,
      "banners": [ ... ],
      "posts": [ ... ]
    }
  ]
}
```

---

### GET /api/v1/widgets/list/summary

Widget özetlerini listele.

**Response:**

```json
{
  "result": true,
  "data": [
    {
      "id": 1,
      "name": "string",
      "type": "BANNER | POST",
      "status": true,
      "orderIndex": 1
    }
  ]
}
```

---

### POST /api/v1/widgets

Widget oluştur.

**Body:**

```json
{
  "name": "string",
  "description": "string",
  "type": "BANNER | POST",
  "content": "string",
  "orderIndex": 1,
  "status": true,
  "bannerIds": [1, 2], // opsiyonel
  "postIds": [1, 2] // opsiyonel
}
```

---

### PUT /api/v1/widgets/{id}

Widget güncelle.

**Path Parameters:**

- `id`: Widget ID

**Body:** (POST ile aynı)

---

### DELETE /api/v1/widgets/{id}

Widget sil.

**Path Parameters:**

- `id`: Widget ID

---

## Assets

### GET /api/v1/assets/id/{id}

Asset getir (ID ile).

**Path Parameters:**

- `id`: Asset ID

---

### GET /api/v1/assets/{name}

Asset getir (isim ile).

**Path Parameters:**

- `name`: Asset dosya adı

---

### POST /api/v1/assets

Asset yükle.

**Content-Type:** `multipart/form-data`

**Form Fields:**

- `subFolder`: string (opsiyonel, alt klasör)
- `file`: file (zorunlu)

---

### PUT /api/v1/assets/{id}

Asset güncelle.

**Path Parameters:**

- `id`: Asset ID

**Content-Type:** `multipart/form-data`

**Form Fields:**

- `file`: file (zorunlu)

---

### DELETE /api/v1/assets/{id}

Asset sil.

**Path Parameters:**

- `id`: Asset ID

---

## Response Format

Tüm API'ler şu formatta döner:

**Başarılı:**

```json
{
  "result": true,
  "data": { ... }
}
```

**Hata:**

```json
{
  "result": false,
  "status": 401,
  "error": "Unauthorized",
  "errorCode": "AUTHENTICATION_REQUIRED",
  "message": "Authentication required"
}
```
