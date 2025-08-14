import React from 'react'
import Image from 'next/image'

type Product = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

// ISR ile veri çekme - 60 saniyede bir revalidate
async function getProducts(): Promise<ProductsResponse> {
  const response = await fetch('https://dummyjson.com/products?limit=12', {
    next: {
      revalidate: 60, // 60 saniyede bir background'da güncelle
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  return response.json()
}

// ISR example page
export default async function ISRProductsPage() {
  const productsData = await getProducts()
  const currentTime = new Date().toLocaleString('tr-TR')

  return (
    <section className="py-24 md:pt-32 flex flex-col items-center justify-center pt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            ISR Product Catalog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Incremental Static Regeneration ile güncellenen ürün katalogu
          </p>

          {/* ISR Info */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
              🔄 ISR (Incremental Static Regeneration) Özellikleri
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-green-800 dark:text-green-200">
              <div>
                <p className="mb-2">
                  <strong>Revalidation:</strong> 60 saniye
                </p>
                <p className="mb-2">
                  <strong>Generation:</strong> Build time + Background
                </p>
                <p className="mb-2">
                  <strong>Cache Strategy:</strong> Stale-while-revalidate
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <strong>Son güncelleme:</strong> {currentTime}
                </p>
                <p className="mb-2">
                  <strong>Toplam ürün:</strong> {productsData.total}
                </p>
                <p className="mb-2">
                  <strong>Gösterilen:</strong> {productsData.products.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {productsData.products.map(product => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {product.discountPercentage > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{Math.round(product.discountPercentage)}%
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {product.brand}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <span className="text-sm">⭐</span>
                    <span className="text-sm font-medium ml-1">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {product.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                    <span
                      className={`text-xs ${
                        product.stock > 10
                          ? 'text-green-600 dark:text-green-400'
                          : product.stock > 0
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} stokta`
                        : 'Tükendi'}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ISR Explanation */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-blue-900 dark:text-blue-100">
            🚀 ISR Nasıl Çalışır?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                1. Build Time
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Sayfa ilk kez build sırasında statik olarak oluşturulur
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                2. Serve Cached
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Kullanıcılar cache&apos;lenmiş versiyonu görür (süper hızlı)
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                3. Background Update
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                60 saniye sonra background&apos;da yeni versiyon oluşturulur
              </p>
            </div>
          </div>

          <div className="mt-8 bg-blue-100 dark:bg-blue-800 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              🎯 ISR Avantajları
            </h4>
            <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
              <li>• Kullanıcılar her zaman hızlı sayfa yüklemesi görür</li>
              <li>• İçerik otomatik olarak güncellenir</li>
              <li>• Server kaynaklarını verimli kullanır</li>
              <li>• Build süreleri kısa kalır</li>
              <li>• SEO performansı mükemmel</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
