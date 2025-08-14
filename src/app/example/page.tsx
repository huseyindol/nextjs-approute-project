import React from 'react'
import Link from 'next/link'

// SSG Ana Sayfa - Build time'da statik olarak oluşturulur
function ExampleHomePage() {
  return (
    <section
      id="example-home"
      className="py-24 md:pt-32 flex flex-col items-center justify-center pt-24"
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            SSG Examples
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Static Site Generation (SSG) örnekleri
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              SSG Nedir?
            </h2>
            <p className="text-blue-800 dark:text-blue-200 text-left">
              Static Site Generation (SSG), sayfaların build time&apos;da
              önceden oluşturulması tekniğidir. Bu sayede sayfa içerikleri
              CDN&apos;de cache&apos;lenir ve kullanıcılara çok hızlı şekilde
              sunulur.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Dynamic SSG Examples */}
          <Link
            href="/example/static-todos"
            className="group block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-200 p-6"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  Static Todos
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  generateStaticParams örneği
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Build time&apos;da statik olarak oluşturulan todo listesi.
              generateStaticParams ile dinamik rota oluşturma.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded">
                SSG
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">
                generateStaticParams
              </span>
            </div>
          </Link>

          <Link
            href="/example/static-posts"
            className="group block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-200 p-6"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📰</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Static Posts
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  External API integration
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              External API&apos;den veri çekerek statik blog post&apos;ları
              oluşturan örnek.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">
                SSG
              </span>
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded">
                External API
              </span>
            </div>
          </Link>

          <Link
            href="/example/isr-products"
            className="group block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-200 p-6"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🔄</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  ISR Products
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Incremental Static Regeneration
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              ISR ile otomatik güncellenen ürün katalogu. Background&apos;da
              revalidation örneği.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded">
                ISR
              </span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded">
                Revalidation
              </span>
            </div>
          </Link>

          <Link
            href="/example/dynamic-routes"
            className="group block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-200 p-6"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🛣️</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  Dynamic Routes
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  generateStaticParams detailed
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              generateStaticParams ile dinamik rota oluşturma sürecinin detaylı
              açıklaması.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-xs rounded">
                Dynamic Routes
              </span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded">
                Documentation
              </span>
            </div>
          </Link>

          {/* Legacy Examples */}
          <Link
            href="/example/promise"
            className="group block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-200 p-6 opacity-75"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                  Legacy Promise
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Eski SSG implementasyonu
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Önceki SSG implementasyonu (referans amaçlı).
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded">
                Legacy
              </span>
            </div>
          </Link>

          <Link
            href="/example/isr"
            className="group block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-200 p-6"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🏪</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  ISR Catalog
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Standalone ISR example
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Standalone ISR örneği - ürün katalogu ile ISR&apos;ın nasıl
              çalıştığını detaylı gösterir.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 text-xs rounded">
                ISR
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded">
                revalidate: 60
              </span>
            </div>
          </Link>
        </div>

        {/* Documentation Link */}
        <div className="text-center mb-12">
          <Link
            href="/example/docs"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            📖 Detaylı Dokümantasyon
          </Link>
        </div>

        {/* SSG Avantajları */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            SSG Avantajları
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-green-600 dark:text-green-400">⚡</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Süper Hızlı
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Sayfalar CDN&apos;den sunulur, yükleme süreleri çok düşüktür
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-blue-600 dark:text-blue-400">🔍</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  SEO Dostu
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  HTML önceden oluşturulur, arama motorları kolayca indexler
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-purple-600 dark:text-purple-400">💰</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Düşük Maliyet
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Server kaynaklarına daha az ihtiyaç, hosting maliyetleri düşük
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-red-600 dark:text-red-400">🛡️</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Güvenli
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Statik dosyalar, saldırı yüzeyi minimal
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-12 bg-gray-900 dark:bg-gray-800 text-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">🔧 Teknik Detaylar</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
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
