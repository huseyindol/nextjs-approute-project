# Hüseyin DOL - Portfolio Sitesi

Bu proje, Next.js ve Tailwind CSS kullanılarak geliştirilmiş modern bir portfolio sitesidir.

## Özellikler

- Responsive tasarım
- Karanlık/Aydınlık mod desteği
- Modern UI/UX
- Animasyonlar
- SEO optimizasyonu
- Performans odaklı yapı

## Teknolojiler

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/huseyindol/portfolio.git
cd portfolio
```

2. Bağımlılıkları yükleyin:

```bash
npm install
# veya
yarn install
# veya
pnpm install
# veya
bun install
```

3. Geliştirme sunucusunu başlatın:

```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
# veya
bun dev
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📚 API Dokümantasyonu

Bu proje, modern **Scalar UI** ile otomatik API dokümantasyonu kullanır:

### 🎯 Scalar UI Dokümantasyonu (Next OpenAPI Gen)

- **Ana URL:** [http://localhost:3000/api-docs-auto](http://localhost:3000/api-docs-auto)
- **Alternatif:** [http://localhost:3000/docs](http://localhost:3000/docs) _(otomatik yönlendirme)_
- **Kaynak:** Zod şemaları + minimal JSDoc yorumları
- **Özellikler:**
  - ⚡ Otomatik şema üretimi
  - 🔐 TypeScript tip güvenliği
  - 🎨 Modern interaktif arayüz
  - 📊 Gerçek zamanlı validasyon

### 🔗 OpenAPI Spesifikasyonu

- **JSON Endpoint:** [http://localhost:3000/openapi.json](http://localhost:3000/openapi.json)
- **Format:** OpenAPI 3.0.0 standardı

### 🛠️ Mevcut API'lar

| **Endpoint**      | **Açıklama**             | **Özellikler**               |
| ----------------- | ------------------------ | ---------------------------- |
| `/api/users`      | Kullanıcı CRUD işlemleri | Pagination, Search, Posts    |
| `/api/users/[id]` | Tek kullanıcı işlemleri  | GET, PUT, DELETE             |
| `/api/posts`      | Gönderi CRUD işlemleri   | Author filtering, Publishing |
| `/api/contact`    | E-posta gönderme         | Resend entegrasyonu          |
| `/api/revalidate` | Cache yenileme           | Tag/Path based               |

### ⚙️ Dokümantasyon Oluşturma

```bash
# Otomatik dokümantasyon üret
bun run build:docs

# Build ile otomatik oluştur
bun run build
```

### 🔧 Geliştirme

- **Şema Düzenleme:** `src/schemas/` klasöründeki Zod dosyaları
- **Minimal JSDoc:** Sadece 3-4 satır yorum yeterli
- **Otomatik Sync:** Kod değişikliklerinde otomatik güncelleme

## Yapı

- `src/app`: Next.js App Router yapısı
- `src/components`: Yeniden kullanılabilir bileşenler
- `public`: Statik dosyalar (görseller, fontlar, vb.)

## Dağıtım

Bu proje Vercel, Netlify veya diğer statik site hosting hizmetlerine kolayca dağıtılabilir.

```bash
npm run build
# veya
yarn build
# veya
pnpm build
# veya
bun build
```

## Lisans

MIT

## İletişim

Hüseyin DOL - [info@next.huseyindol.site](mailto:info@next.huseyindol.site)

Proje Linki: [https://github.com/huseyindol/portfolio](https://github.com/huseyindol/portfolio)
