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
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            {example.title}
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            {example.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {example.techStack.map((tech, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Features */}
          <div className="mx-auto mb-12 grid max-w-4xl gap-4 md:grid-cols-2 lg:grid-cols-4">
            {example.features.map((feature, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
              >
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  ✅ {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
          {example.content}
        </div>

        {/* SSG Info */}
        <div className="mt-12 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
          <h3 className="mb-4 text-lg font-semibold text-blue-900 dark:text-blue-100">
            🚀 SSG (Static Site Generation) Bilgileri
          </h3>
          <div className="grid gap-4 text-sm text-blue-800 md:grid-cols-2 dark:text-blue-200">
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
      <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        Static Todo List
      </h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Bu todo listesi build time&apos;da statik olarak generate edildi. Gerçek
        SSG implementation&apos;da bu data build sırasında çekilir.
      </p>

      <div className="space-y-3">
        {sampleTodos.map(todo => (
          <div
            key={todo.id}
            className={`rounded-lg border p-4 ${
              todo.completed
                ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={
                  todo.completed
                    ? 'text-gray-500 line-through'
                    : 'text-gray-900 dark:text-white'
                }
              >
                {todo.todo}
              </span>
              <span
                className={`rounded px-2 py-1 text-xs ${
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
      <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        Static Blog Posts
      </h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Bu blog postları statik olarak generate edildi. Gerçek implementasyonda
        external API&apos;den çekilir.
      </p>

      <div className="grid gap-6">
        {samplePosts.map(post => (
          <article
            key={post.id}
            className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-600 dark:bg-gray-700"
          >
            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
              {post.title}
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">{post.body}</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
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
      <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        ISR Product Catalog
      </h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Incremental Static Regeneration ile ürünler background&apos;da
        güncellenir.
      </p>

      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800 dark:bg-yellow-900/20">
        <h3 className="mb-2 text-lg font-semibold text-yellow-900 dark:text-yellow-100">
          🔄 ISR Özellikleri
        </h3>
        <ul className="space-y-2 text-yellow-800 dark:text-yellow-200">
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
      <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        Dynamic Routes with SSG
      </h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        generateStaticParams ile build time&apos;da dinamik rotalar
        oluşturuluyor.
      </p>

      <div className="mb-6 rounded-lg border border-purple-200 bg-purple-50 p-6 dark:border-purple-800 dark:bg-purple-900/20">
        <h3 className="mb-4 text-lg font-semibold text-purple-900 dark:text-purple-100">
          🛣️ generateStaticParams İşleyişi
        </h3>
        <div className="space-y-3 text-purple-800 dark:text-purple-200">
          <div className="rounded bg-purple-100 p-3 dark:bg-purple-800">
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

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
          <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
            Build Time
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Tüm sayfalar build sırasında statik HTML olarak oluşturulur
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
          <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
            Runtime
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Sayfa anında yüklenir, server processing&apos;e gerek yok
          </p>
        </div>
      </div>
    </div>
  )
}
