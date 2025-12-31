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
    <section className="flex flex-col items-center justify-center py-24 pt-24 md:pt-32">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            ISR Product Catalog
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
            Incremental Static Regeneration ile güncellenen ürün katalogu
          </p>

          {/* ISR Info */}
          <div className="mb-8 rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-900/20">
            <h2 className="mb-4 text-lg font-semibold text-green-900 dark:text-green-100">
              🔄 ISR (Incremental Static Regeneration) Özellikleri
            </h2>
            <div className="grid gap-4 text-green-800 md:grid-cols-2 dark:text-green-200">
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
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productsData.products.map(product => (
            <div
              key={product.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {product.discountPercentage > 0 && (
                  <div className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                    -{Math.round(product.discountPercentage)}%
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {product.brand}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <span className="text-sm">⭐</span>
                    <span className="ml-1 text-sm font-medium">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 dark:text-white">
                  {product.title}
                </h3>

                <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
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
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ISR Explanation */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-8 dark:border-blue-800 dark:bg-blue-900/20">
          <h2 className="mb-6 text-2xl font-semibold text-blue-900 dark:text-blue-100">
            🚀 ISR Nasıl Çalışır?
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800">
                <span className="text-2xl">🏗️</span>
              </div>
              <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
                1. Build Time
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Sayfa ilk kez build sırasında statik olarak oluşturulur
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
                2. Serve Cached
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Kullanıcılar cache&apos;lenmiş versiyonu görür (süper hızlı)
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
                3. Background Update
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                60 saniye sonra background&apos;da yeni versiyon oluşturulur
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-blue-100 p-4 dark:bg-blue-800">
            <h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
              🎯 ISR Avantajları
            </h4>
            <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
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
