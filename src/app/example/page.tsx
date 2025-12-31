import React from 'react'
import Link from 'next/link'

// SSG Ana Sayfa - Build time'da statik olarak oluşturulur
function ExampleHomePage() {
  return (
    <section
      id="example-home"
      className="flex flex-col items-center justify-center py-24 pt-24 md:pt-32"
    >
      <div className="container mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            SSG Examples
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
            Static Site Generation (SSG) örnekleri
          </p>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
            <h2 className="mb-2 text-lg font-semibold text-blue-900 dark:text-blue-100">
              SSG Nedir?
            </h2>
            <p className="text-left text-blue-800 dark:text-blue-200">
              Static Site Generation (SSG), sayfaların build time&apos;da
              önceden oluşturulması tekniğidir. Bu sayede sayfa içerikleri
              CDN&apos;de cache&apos;lenir ve kullanıcılara çok hızlı şekilde
              sunulur.
            </p>
          </div>
        </div>

        <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Dynamic SSG Examples */}
          <Link
            href="/example/static-todos"
            className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400">
                  Static Todos
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  generateStaticParams örneği
                </p>
              </div>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Build time&apos;da statik olarak oluşturulan todo listesi.
              generateStaticParams ile dinamik rota oluşturma.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900/30 dark:text-green-200">
                SSG
              </span>
              <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                generateStaticParams
              </span>
            </div>
          </Link>

          <Link
            href="/example/static-posts"
            className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <span className="text-2xl">📰</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  Static Posts
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  External API integration
                </p>
              </div>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              External API&apos;den veri çekerek statik blog post&apos;ları
              oluşturan örnek.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                SSG
              </span>
              <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                External API
              </span>
            </div>
          </Link>

          <Link
            href="/example/isr-products"
            className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <span className="text-2xl">🔄</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                  ISR Products
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Incremental Static Regeneration
                </p>
              </div>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              ISR ile otomatik güncellenen ürün katalogu. Background&apos;da
              revalidation örneği.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                ISR
              </span>
              <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900/30 dark:text-green-200">
                Revalidation
              </span>
            </div>
          </Link>

          <Link
            href="/example/dynamic-routes"
            className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <span className="text-2xl">🛣️</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                  Dynamic Routes
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  generateStaticParams detailed
                </p>
              </div>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              generateStaticParams ile dinamik rota oluşturma sürecinin detaylı
              açıklaması.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded bg-orange-100 px-2 py-1 text-xs text-orange-800 dark:bg-orange-900/30 dark:text-orange-200">
                Dynamic Routes
              </span>
              <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                Documentation
              </span>
            </div>
          </Link>

          {/* Legacy Examples */}
          <Link
            href="/example/promise"
            className="group block rounded-lg border border-gray-200 bg-white p-6 opacity-75 shadow-sm transition-all duration-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-400">
                  Legacy Promise
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Eski SSG implementasyonu
                </p>
              </div>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Önceki SSG implementasyonu (referans amaçlı).
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                Legacy
              </span>
            </div>
          </Link>

          <Link
            href="/example/isr"
            className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-4 flex items-center">
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/30">
                <span className="text-2xl">🏪</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400">
                  ISR Catalog
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Standalone ISR example
                </p>
              </div>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Standalone ISR örneği - ürün katalogu ile ISR&apos;ın nasıl
              çalıştığını detaylı gösterir.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded bg-teal-100 px-2 py-1 text-xs text-teal-800 dark:bg-teal-900/30 dark:text-teal-200">
                ISR
              </span>
              <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                revalidate: 60
              </span>
            </div>
          </Link>
        </div>

        {/* Documentation Link */}
        <div className="mb-12 text-center">
          <Link
            href="/example/docs"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
          >
            📖 Detaylı Dokümantasyon
          </Link>
        </div>

        {/* SSG Avantajları */}
        <div className="rounded-lg bg-gray-50 p-8 dark:bg-gray-800/50">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            SSG Avantajları
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-start">
              <div className="mr-3 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <span className="text-green-600 dark:text-green-400">⚡</span>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                  Süper Hızlı
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Sayfalar CDN&apos;den sunulur, yükleme süreleri çok düşüktür
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-3 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <span className="text-blue-600 dark:text-blue-400">🔍</span>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                  SEO Dostu
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  HTML önceden oluşturulur, arama motorları kolayca indexler
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-3 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <span className="text-purple-600 dark:text-purple-400">💰</span>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                  Düşük Maliyet
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Server kaynaklarına daha az ihtiyaç, hosting maliyetleri düşük
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-3 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <span className="text-red-600 dark:text-red-400">🛡️</span>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                  Güvenli
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Statik dosyalar, saldırı yüzeyi minimal
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-12 rounded-lg bg-gray-900 p-6 text-white dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-semibold">🔧 Teknik Detaylar</h3>
          <div className="grid gap-4 text-sm md:grid-cols-2">
            <div>
              <p className="mb-2">
                <strong>Build Time:</strong> Sayfalar `next build` sırasında
                oluşturulur
              </p>
              <p className="mb-2">
                <strong>Cache:</strong> `next: {' revalidate: false '}` ile
                tamamen statik
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong>Component:</strong> Async function component kullanılır
              </p>
              <p className="mb-2">
                <strong>Output:</strong> Statik HTML + minimal JavaScript
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExampleHomePage
