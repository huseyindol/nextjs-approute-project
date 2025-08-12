export async function getData() {
  const todos = await fetch(`https://dummyjson.com/todos`).then(res =>
    res.json(),
  )
  await new Promise(resolve => setTimeout(resolve, 3000))
  return todos
}
