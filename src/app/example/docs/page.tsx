import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SSG Documentation | Next.js Examples',
  description:
    'Static Site Generation (SSG) ve Incremental Static Regeneration (ISR) detaylı dokümantasyonu',
}

export default function SSGDocsPage() {
  return (
    <div className="py-24 md:pt-32">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            SSG & ISR Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Next.js App Router ile Static Site Generation implementasyonu
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
            📖 İçindekiler
          </h2>
          <ul className="text-blue-800 dark:text-blue-200 space-y-2">
            <li>
              <Link href="#ssg-basics" className="hover:underline">
                1. SSG Temelleri
              </Link>
            </li>
            <li>
              <Link href="#generatestaticparams" className="hover:underline">
                2. generateStaticParams
              </Link>
            </li>
            <li>
              <Link href="#isr" className="hover:underline">
                3. Incremental Static Regeneration (ISR)
              </Link>
            </li>
            <li>
              <Link href="#examples" className="hover:underline">
                4. Örnek Implementasyonlar
              </Link>
            </li>
            <li>
              <Link href="#best-practices" className="hover:underline">
                5. Best Practices
              </Link>
            </li>
          </ul>
        </div>

        {/* SSG Basics */}
        <section id="ssg-basics" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            1. SSG Temelleri
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Static Site Generation Nedir?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              SSG, sayfaların build time&apos;da önceden oluşturulması
              tekniğidir. Bu sayede HTML dosyalar CDN&apos;de cache&apos;lenir
              ve kullanıcılara çok hızlı sunulur.
            </p>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Avantajlar:
              </h4>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• ⚡ Maksimum performans</li>
                <li>• 🔍 Mükemmel SEO</li>
                <li>• 💰 Düşük hosting maliyeti</li>
                <li>• 🛡️ Yüksek güvenlik</li>
                <li>• 🌍 Global CDN desteği</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-900 text-white rounded-lg p-6">
            <h4 className="font-semibold mb-4">Basic SSG Example:</h4>
            <pre className="text-sm overflow-x-auto">
              {`// app/blog/page.tsx
export default async function BlogPage() {
  // Build time'da çalışır
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: false } // Tamamen statik
  }).then(res => res.json())

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  )
}`}
            </pre>
          </div>
        </section>

        {/* generateStaticParams */}
        <section id="generatestaticparams" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            2. generateStaticParams
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Dinamik Rotalar için SSG
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              generateStaticParams fonksiyonu, dinamik segment&apos;ler için
              build time&apos;da hangi path&apos;lerin oluşturulacağını
              belirler.
            </p>
          </div>

          <div className="bg-gray-900 text-white rounded-lg p-6 mb-6">
            <h4 className="font-semibold mb-4">
              generateStaticParams Example:
            </h4>
            <pre className="text-sm overflow-x-auto">
              {`// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json())

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const post = await getPost(slug)
  
  return <Article post={post} />
}`}
            </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                Build Time
              </h4>
              <p className="text-green-800 dark:text-green-200 text-sm">
                generateStaticParams çalışır ve tüm rotalar oluşturulur
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Runtime
              </h4>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Sayfa anında yüklenir, server processing yok
              </p>
            </div>
          </div>
        </section>

        {/* ISR */}
        <section id="isr" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            3. Incremental Static Regeneration (ISR)
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              ISR ile Statik + Dinamik
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              ISR, statik sayfaların belirli aralıklarla background&apos;da
              güncellenmesini sağlar. Kullanıcılar her zaman hızlı sayfa görür.
            </p>
          </div>

          <div className="bg-gray-900 text-white rounded-lg p-6 mb-6">
            <h4 className="font-semibold mb-4">ISR Example:</h4>
            <pre className="text-sm overflow-x-auto">
              {`// app/products/page.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 } // 60 saniyede bir güncelle
  })
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    <div>
      <h1>Products (Updated every 60s)</h1>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}`}
            </pre>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-4">
              🔄 ISR Workflow
            </h4>
            <ol className="text-yellow-800 dark:text-yellow-200 space-y-2">
              <li>1. Build time&apos;da initial versiyon oluşturulur</li>
              <li>2. Kullanıcılar cache&apos;li versiyonu görür (hızlı)</li>
              <li>3. Background&apos;da yeni versiyon oluşturulur</li>
              <li>4. Sonraki kullanıcılar güncel versiyonu görür</li>
            </ol>
          </div>
        </section>

        {/* Examples */}
        <section id="examples" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            4. Örnek Implementasyonlar
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                📝 Static Todos
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                generateStaticParams ile dinamik todo sayfaları
              </p>
              <Link
                href="/example/static-todos"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                Örneği görüntüle →
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                🔄 ISR Products
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                60 saniyede bir güncellenen ürün katalogu
              </p>
              <Link
                href="/example/isr-products"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                Örneği görüntüle →
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                📰 Static Posts
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                External API ile statik blog post&apos;ları
              </p>
              <Link
                href="/example/static-posts"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                Örneği görüntüle →
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                🛣️ Dynamic Routes
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                generateStaticParams detaylı açıklama
              </p>
              <Link
                href="/example/dynamic-routes"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                Örneği görüntüle →
              </Link>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section id="best-practices" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            5. Best Practices
          </h2>

          <div className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
                ✅ Yapılması Gerekenler
              </h3>
              <ul className="text-green-800 dark:text-green-200 space-y-2">
                <li>
                  • Build time&apos;da veri çekme için async components kullanın
                </li>
                <li>
                  • generateStaticParams ile dinamik rotaları önceden tanımlayın
                </li>
                <li>
                  • ISR kullanarak fresh content ile performance dengesini kurun
                </li>
                <li>• TypeScript ile type safety sağlayın</li>
                <li>• Error handling implementasyonu yapın</li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-3">
                ❌ Yapılmaması Gerekenler
              </h3>
              <ul className="text-red-800 dark:text-red-200 space-y-2">
                <li>
                  • Client-side data fetching SSG sayfalarında kullanmayın
                </li>
                <li>
                  • generateStaticParams&apos;da çok fazla path oluşturmayın
                </li>
                <li>• ISR revalidate süresini çok düşük ayarlamayın</li>
                <li>
                  • Build time&apos;da fail olan API&apos;lere bağımlı olmayın
                </li>
                <li>
                  • Sensitive data&apos;yı build output&apos;a dahil etmeyin
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Back to Examples */}
        <div className="text-center">
          <Link
            href="/example"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← SSG Examples&apos;a Dön
          </Link>
        </div>
      </div>
    </div>
  )
}
