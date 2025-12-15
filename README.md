# Hüseyin DOL - Portfolio Sitesi

Bu proje, Next.js ve Tailwind CSS kullanılarak geliştirilmiş modern bir portfolio sitesidir.

## ✨ Özellikler

### 🎨 UI/UX

- ✅ Responsive tasarım
- ✅ Karanlık/Aydınlık mod desteği
- ✅ Modern UI/UX
- ✅ Smooth animasyonlar
- ✅ SEO optimizasyonu

### 🔒 Güvenlik & Hata Yönetimi

- ✅ Error Boundaries (React & Next.js)
- ✅ Rate Limiting (IP-based)
- ✅ Security Headers (OWASP best practices)
- ✅ Environment Validation (Zod)
- ✅ Input sanitization
- ✅ CSRF protection ready
- ✅ XSS protection

### 🧪 Testing & Quality

- ✅ Vitest test framework
- ✅ Testing Library (React)
- ✅ %70+ code coverage
- ✅ Component tests
- ✅ API tests
- ✅ Library/utility tests
- ✅ CI/CD pipeline (GitHub Actions)

### ⚡ Performance

- ✅ Server Components
- ✅ Server Actions
- ✅ Image optimization
- ✅ Bundle optimization
- ✅ Vercel Analytics
- ✅ Speed Insights

## 🚀 Teknolojiler

- [Next.js 16](https://nextjs.org/) - React Framework
- [React 19](https://react.dev/) - UI Library
- [TypeScript 5](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS 4](https://tailwindcss.com/) - Styling
- [Zod](https://zod.dev/) - Schema Validation
- [TanStack Query](https://tanstack.com/query) - Data Fetching
- [Vitest](https://vitest.dev/) - Testing Framework
- [Shadcn UI](https://ui.shadcn.com/) - Component Library

## 📦 Kurulum

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/huseyindol/portfolio.git
cd portfolio
```

### 2. Bağımlılıkları Yükleyin

```bash
bun install
```

### 3. Environment Variables

```bash
# .env.example'ı kopyalayın
cp .env.example .env.local

# Gerekli değişkenleri doldurun
nano .env.local
```

**Zorunlu Variables:**

```bash
NEXT_PUBLIC_HOST=http://localhost:3000
```

**Opsiyonel Variables:**

```bash
NEXT_PUBLIC_RESEND_API_KEY=your_api_key
NEXT_PUBLIC_RESEND_FROM_EMAIL=noreply@yourdomain.com
NEXT_PUBLIC_RESEND_TO_EMAIL=your@email.com
NEXT_PUBLIC_REVALIDATE_SECRET=your-secret-key-min-6-chars
```

### 4. Geliştirme Sunucusunu Başlatın

```bash
bun dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 🧪 Testing

### Test Komutları

```bash
# Tüm testleri çalıştır
bun test

# Watch mode (değişiklikleri izle)
bun test:watch

# UI ile test çalıştır
bun test:ui

# Coverage raporu oluştur
bun test:coverage

# CI için test çalıştır
bun test:ci
```

### Test Coverage

```bash
# Coverage raporu oluştur ve aç
bun test:coverage
open coverage/index.html
```

**Current Coverage:** %75+ (branches, functions, lines)

## 📚 API Dokümantasyonu

Bu proje, modern **Scalar UI** ile otomatik API dokümantasyonu kullanır:

### 🎯 Scalar UI Dokümantasyonu

- **Ana URL:** [http://localhost:3000/api-docs-auto](http://localhost:3000/api-docs-auto)
- **Alternatif:** [http://localhost:3000/docs](http://localhost:3000/docs)

### 🔗 OpenAPI Spesifikasyonu

- **JSON Endpoint:** [http://localhost:3000/openapi.json](http://localhost:3000/openapi.json)

### 🛠️ Mevcut API'lar

| Endpoint          | Açıklama         | Özellikler          |
| ----------------- | ---------------- | ------------------- |
| `/api/contact`    | E-posta gönderme | Resend entegrasyonu |
| `/api/revalidate` | Cache yenileme   | Tag/Path based      |

## 🔒 Güvenlik Özellikleri

### 1. Error Boundaries

- React Error Boundary component
- Next.js route-level error handlers
- Global error handler
- 404 sayfası

### 2. Rate Limiting

- IP-based request limiting
- Configurable time windows
- API routes: 60 req/min
- Other routes: 100 req/15min
- 429 Too Many Requests response

### 3. Security Headers

```
✅ Strict-Transport-Security
✅ X-Frame-Options
✅ X-Content-Type-Options
✅ X-XSS-Protection
✅ Content-Security-Policy
✅ Referrer-Policy
✅ Permissions-Policy
```

### 4. Environment Validation

- Zod-based validation
- Build-time checks
- Type-safe access
- Clear error messages

## 📊 Scripts

```bash
# Development
bun dev              # Start dev server
bun build            # Build for production
bun start            # Start production server

# Code Quality
bun lint             # Run ESLint
bun lint:fix         # Fix ESLint errors
bun type-check       # TypeScript type check
bun format           # Format code with Prettier
bun format:check     # Check formatting

# Testing
bun test             # Run tests
bun test:watch       # Run tests in watch mode
bun test:ui          # Run tests with UI
bun test:coverage    # Generate coverage report
bun test:ci          # Run tests for CI
```

## 📁 Proje Yapısı

```
nextjs-approute-project/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── docs/                   # Dokümantasyon
│   ├── SECURITY.md
│   ├── ERROR_HANDLING.md
│   ├── TESTING.md
│   └── IMPLEMENTATION_SUMMARY.md
├── public/                 # Statik dosyalar
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/          # API routes
│   │   ├── (site)/       # Public pages
│   │   ├── (admin)/      # Admin pages
│   │   ├── error.tsx     # Error handler
│   │   ├── global-error.tsx
│   │   └── not-found.tsx
│   ├── components/        # React components
│   │   ├── ui/           # Shadcn UI components
│   │   └── ErrorBoundary.tsx
│   ├── lib/              # Utilities & configs
│   │   ├── env.ts        # Environment validation
│   │   ├── rate-limiter.ts
│   │   └── security.ts
│   ├── types/            # TypeScript types
│   ├── schemas/          # Zod schemas
│   └── middleware.ts     # Next.js middleware
├── tests/                # Test files
│   ├── components/
│   ├── lib/
│   └── api/
├── vitest.config.ts      # Vitest configuration
└── package.json
```

## 🔄 CI/CD Pipeline

GitHub Actions workflows:

1. **Lint & Type Check** - ESLint, TypeScript, Prettier
2. **Tests** - Vitest with coverage
3. **Build** - Production build
4. **Security Scan** - Dependency audit

## 📖 Dokümantasyon

- **Güvenlik:** [docs/SECURITY.md](docs/SECURITY.md)
- **Error Handling:** [docs/ERROR_HANDLING.md](docs/ERROR_HANDLING.md)
- **Testing:** [docs/TESTING.md](docs/TESTING.md)
- **Implementation:** [docs/IMPLEMENTATION_SUMMARY.md](docs/IMPLEMENTATION_SUMMARY.md)

## 🎯 Production Checklist

- [x] Error Boundaries
- [x] Rate Limiting
- [x] Security Headers
- [x] Environment Validation
- [x] Testing Infrastructure
- [x] CI/CD Pipeline
- [x] Code Coverage (70%+)
- [x] TypeScript Strict Mode
- [x] ESLint Configuration
- [x] Prettier Configuration
- [x] Git Hooks (Husky)
- [ ] Sentry Integration (optional)
- [ ] Database Setup (optional)
- [ ] Authentication (optional)

## 🚀 Deployment

### Vercel (Önerilen)

```bash
# Vercel CLI ile deploy
vercel

# Production deploy
vercel --prod
```

### Docker

```bash
# Docker image oluştur
docker build -t nextjs-portfolio .

# Container çalıştır
docker run -p 3000:3000 nextjs-portfolio
```

### Manual Build

```bash
# Production build
bun run build

# Start production server
bun run start
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 📧 İletişim

Hüseyin DOL - [info@next.huseyindol.site](mailto:info@next.huseyindol.site)

Project Link: [https://github.com/huseyindol/portfolio](https://github.com/huseyindol/portfolio)

---

**Made with ❤️ by Hüseyin DOL**
