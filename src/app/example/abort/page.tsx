import React from 'react'

type Post = {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
}

// SSG için statik veri çekme fonksiyonu
async function getStaticPosts(): Promise<Post[]> {
  const response = await fetch('https://dummyjson.com/posts?limit=10', {
    // SSG için cache ayarları
    next: { revalidate: false }, // Tamamen statik
  })

  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }

  const data = await response.json()
  return data.posts
}

// SSG async component
async function AbortExamplePage() {
  // Build time'da veri çekilir
  const posts = await getStaticPosts()

  return (
    <section
      id="about"
      className="py-24 md:pt-32 flex items-center justify-center pt-24"
    >
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-4">SSG Posts Example</h1>
        <p className="text-lg mb-8">
          Bu sayfa Static Site Generation (SSG) kullanarak build time&apos;da
          oluşturuldu. AbortController örneği yerine statik post listesi
          gösteriliyor.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Posts (Statik Veri)</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {posts.length} post statik olarak yüklendi.
          </p>

          <div className="grid gap-6">
            {posts.map((post: Post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg border shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {post.body}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
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

        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>✅ Bu sayfa build time&apos;da statik olarak oluşturuldu</p>
          <p>🚀 Süper hızlı yükleme</p>
          <p>📱 SEO dostu</p>
          <p>🔄 Client-side JavaScript gerektirmez</p>
        </div>
      </div>
    </section>
  )
}

export default AbortExamplePage
