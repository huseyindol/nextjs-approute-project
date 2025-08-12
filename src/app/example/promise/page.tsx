import React, { Suspense, use } from 'react'
import { getData } from './services'

type TodoPromise = Promise<{
  todos: Todo[]
  total: number
  skip: number
  limit: number
}>

type Todo = {
  id: number
  todo: string
  completed: boolean
  userId: number
}

function PromisePage() {
  const todos = getData()

  return (
    <section
      id="about"
      className="py-24 md:pt-32 flex flex-col items-center justify-center pt-24"
    >
      <h1>Promise</h1>
      <p>Promise is a way to handle asynchronous operations in JavaScript.</p>
      <br />
      <br />
      <Suspense fallback={<div>Loading...</div>}>
        <PromiseComponent todos={todos} />
      </Suspense>
    </section>
  )
}

function PromiseComponent({ todos }: { todos: TodoPromise }) {
  const todosData = use(todos)
  return (
    <div>
      {todosData.todos.map((todo: Todo) => (
        <div key={todo.id}>{todo.todo}</div>
      ))}
    </div>
  )
}

export default PromisePage
