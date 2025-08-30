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
      className="flex flex-col items-center justify-center py-24 pt-24 md:pt-32"
    >
      <div className="container mx-auto px-6">
        <h1 className="mb-4 text-3xl font-bold">SSG Promise Example</h1>
        <p className="mb-8 text-lg">
          Bu sayfa Static Site Generation (SSG) kullanarak build time&apos;da
          oluşturuldu.
        </p>

        <div className="mb-8 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold">Todos (Statik Veri)</h2>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Toplam {todosData.total} todo bulundu. İlk {todosData.todos.length}{' '}
            tanesi gösteriliyor.
          </p>

          <div className="grid max-h-96 gap-2 overflow-y-auto">
            {todosData.todos.map((todo: Todo) => (
              <div
                key={todo.id}
                className={`rounded border p-3 ${
                  todo.completed
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                    : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={
                      todo.completed ? 'text-gray-500 line-through' : ''
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
