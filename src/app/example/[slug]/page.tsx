import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Todo, Post } from '@/types/ssgTypes'

// SSG Example Types
type ExamplePageData = {
  slug: string
  title: string
  description: string
  content: React.JSX.Element
  techStack: string[]
  features: string[]
}

// Sample data for demonstration
const sampleTodos: Todo[] = [
  { id: 1, todo: 'SSG ile statik sayfa oluşturma', completed: true, userId: 1 },
  {
    id: 2,
    todo: 'generateStaticParams implementasyonu',
    completed: true,
    userId: 1,
  },
  { id: 3, todo: 'ISR example yazma', completed: false, userId: 1 },
  { id: 4, todo: 'TypeScript type definitions', completed: true, userId: 1 },
  { id: 5, todo: 'Performance optimization', completed: false, userId: 1 },
]

const samplePosts: Post[] = [
  {
    id: 1,
    title: 'Next.js SSG ile Modern Web Development',
    body: "Static Site Generation, modern web geliştirmede kritik bir tekniktir. Build time'da oluşturulan statik HTML dosyaları, maksimum performans ve SEO avantajı sağlar.",
    tags: ['nextjs', 'ssg', 'performance'],
    reactions: { likes: 45, dislikes: 2 },
    views: 1250,
    userId: 1,
  },
  {
    id: 2,
    title: 'generateStaticParams ile Dinamik Rotalar',
    body: "Next.js App Router'da generateStaticParams fonksiyonu, dinamik segment'ler için build time'da path oluşturma işlemini gerçekleştirir. Bu sayede tüm rotalar önceden statik olarak hazırlanır.",
    tags: ['nextjs', 'routing', 'static'],
    reactions: { likes: 38, dislikes: 1 },
    views: 890,
    userId: 1,
  },
  {
    id: 3,
    title: 'ISR: Statik ve Dinamik Arasındaki Denge',
    body: "Incremental Static Regeneration, statik sayfaların background'da güncellenmesini sağlar. Bu sayede hem performance hem de fresh content avantajı elde edilir.",
    tags: ['isr', 'performance', 'optimization'],
    reactions: { likes: 52, dislikes: 0 },
    views: 1560,
    userId: 1,
  },
]

// SSG Examples Data - Bu data gerçek projede API'den gelir
const ssgExamples: Record<string, ExamplePageData> = {
  'static-todos': {
    slug: 'static-todos',
    title: 'Static Todo List',
    description: 'Build time&apos;da çekilen statik todo listesi örneği',
    techStack: ['Next.js', 'SSG', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Build time data fetching',
      'Statik HTML oluşturma',
      'Hızlı sayfa yükleme',
      'SEO optimizasyonu',
    ],
    content: <StaticTodosContent />,
  },
  'static-posts': {
    slug: 'static-posts',
    title: 'Static Blog Posts',
    description: 'External API&apos;den çekilen statik blog post&apos;ları',
    techStack: ['Next.js', 'SSG', 'Fetch API', 'Responsive Design'],
    features: [
      'External API integration',
      'Statik generation',
      'Modern UI',
      'Mobile responsive',
    ],
    content: <StaticPostsContent />,
  },
  'isr-products': {
    slug: 'isr-products',
    title: 'ISR Product Catalog',
    description:
      'Incremental Static Regeneration ile güncellenebilen ürün katalogu',
    techStack: ['Next.js', 'ISR', 'Revalidation', 'TypeScript'],
    features: [
      'Incremental regeneration',
      'Background revalidation',
      'Fresh content',
      'Performance optimization',
    ],
    content: <ISRProductsContent />,
  },
  'dynamic-routes': {
    slug: 'dynamic-routes',
    title: 'Dynamic Routes with SSG',
    description: 'generateStaticParams ile dinamik rotalar',
    techStack: [
      'Next.js',
      'generateStaticParams',
      'Dynamic Routes',
      'TypeScript',
    ],
    features: [
      'Dynamic path generation',
      'Build time optimization',
      'Parameterized routes',
      'Static generation',
    ],
    content: <DynamicRoutesContent />,
  },
}

// generateStaticParams - Build time'da çalışır
export async function generateStaticParams() {
  // Gerçek projede bu data API'den gelir
  const slugs = Object.keys(ssgExamples)

  return slugs.map(slug => ({
    slug: slug,
  }))
}

// Ana SSG sayfa component'i
export default async function SSGExamplePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const example = ssgExamples[slug]

  // 404 döndür eğer example bulunamazsa
  if (!example) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-24">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {example.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {example.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {example.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {example.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  ✅ {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
          {example.content}
        </div>

        {/* SSG Info */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
            🚀 SSG (Static Site Generation) Bilgileri
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
            <div>
              <p className="mb-2">
                <strong>Route:</strong> /example/{slug}
              </p>
              <p className="mb-2">
                <strong>Generated at:</strong> Build time
              </p>
              <p className="mb-2">
                <strong>Method:</strong> generateStaticParams
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong>Cache:</strong> Statik HTML
              </p>
              <p className="mb-2">
                <strong>Performance:</strong> Maksimum hız
              </p>
              <p className="mb-2">
                <strong>SEO:</strong> Mükemmel
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Content Components - SSG-compatible (no hooks)
function StaticTodosContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Static Todo List
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Bu todo listesi build time&apos;da statik olarak generate edildi. Gerçek
        SSG implementation&apos;da bu data build sırasında çekilir.
      </p>

      <div className="space-y-3">
        {sampleTodos.map(todo => (
          <div
            key={todo.id}
            className={`p-4 rounded-lg border ${
              todo.completed
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={
                  todo.completed
                    ? 'line-through text-gray-500'
                    : 'text-gray-900 dark:text-white'
                }
              >
                {todo.todo}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  todo.completed
                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                    : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                }`}
              >
                {todo.completed ? 'Tamamlandı' : 'Bekliyor'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StaticPostsContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Static Blog Posts
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Bu blog postları statik olarak generate edildi. Gerçek implementasyonda
        external API&apos;den çekilir.
      </p>

      <div className="grid gap-6">
        {samplePosts.map(post => (
          <article
            key={post.id}
            className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              {post.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{post.body}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span>👍 {post.reactions.likes}</span>
                <span>👎 {post.reactions.dislikes}</span>
                <span>👀 {post.views} görüntüleme</span>
              </div>
              <span>Post ID: {post.id}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function ISRProductsContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        ISR Product Catalog
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Incremental Static Regeneration ile ürünler background&apos;da
        güncellenir.
      </p>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
          🔄 ISR Özellikleri
        </h3>
        <ul className="text-yellow-800 dark:text-yellow-200 space-y-2">
          <li>• Sayfa build time&apos;da oluşturulur</li>
          <li>
            • Belirli aralıklarla background&apos;da yeniden generate edilir
          </li>
          <li>• Kullanıcılar her zaman hızlı sayfa yüklemesi görür</li>
          <li>• İçerik güncel tutulur</li>
          <li>• Cache stratejisi: revalidate: 60 (60 saniye)</li>
          <li>
            • Gerçek ISR örneği için{' '}
            <Link href="/example/isr" className="underline">
              buraya
            </Link>{' '}
            tıklayın
          </li>
        </ul>
      </div>
    </div>
  )
}

function DynamicRoutesContent() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Dynamic Routes with SSG
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        generateStaticParams ile build time&apos;da dinamik rotalar
        oluşturuluyor.
      </p>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">
          🛣️ generateStaticParams İşleyişi
        </h3>
        <div className="text-purple-800 dark:text-purple-200 space-y-3">
          <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded">
            <code className="text-sm">
              export async function generateStaticParams() {'{'}
              <br />
              &nbsp;&nbsp;return [{'{slug: "static-todos"}'},{' '}
              {'{slug: "static-posts"}'}, ...]
              <br />
              {'}'}
            </code>
          </div>
          <p>
            Bu fonksiyon build time&apos;da çalışır ve tüm dinamik rotaları
            önceden oluşturur.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            Build Time
          </h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Tüm sayfalar build sırasında statik HTML olarak oluşturulur
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            Runtime
          </h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Sayfa anında yüklenir, server processing&apos;e gerek yok
          </p>
        </div>
      </div>
    </div>
  )
}
