import React from 'react'

type Todo = {
  id: number
  todo: string
  completed: boolean
  userId: number
}

type TodosResponse = {
  todos: Todo[]
  total: number
  skip: number
  limit: number
}

// Bu fonksiyon build time'da çalışır ve statik veri sağlar
async function getStaticTodos(): Promise<TodosResponse> {
  const response = await fetch('https://dummyjson.com/todos', {
    // SSG için cache ayarları
    next: { revalidate: false }, // Tamamen statik
  })

  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }

  return response.json()
}

// SSG async component
async function PromisePage() {
  // Build time'da veri çekilir
  const todosData = await getStaticTodos()

  return (
    <section
      id="about"
      className="py-24 md:pt-32 flex flex-col items-center justify-center pt-24"
    >
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-4">SSG Promise Example</h1>
        <p className="text-lg mb-8">
          Bu sayfa Static Site Generation (SSG) kullanarak build time&apos;da
          oluşturuldu.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Todos (Statik Veri)</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Toplam {todosData.total} todo bulundu. İlk {todosData.todos.length}{' '}
            tanesi gösteriliyor.
          </p>

          <div className="grid gap-2 max-h-96 overflow-y-auto">
            {todosData.todos.map((todo: Todo) => (
              <div
                key={todo.id}
                className={`p-3 rounded border ${
                  todo.completed
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={
                      todo.completed ? 'line-through text-gray-500' : ''
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

        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>✅ Bu sayfa build time&apos;da statik olarak oluşturuldu</p>
          <p>🚀 Süper hızlı yükleme</p>
          <p>📱 SEO dostu</p>
        </div>
      </div>
    </section>
  )
}

export default PromisePage
