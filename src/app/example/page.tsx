'use client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

function ExamplePage() {
  const [postId, setPostId] = useState(5)

  return (
    <main className="min-h-screen">
      <section
        id="about"
        className="py-24 md:pt-32 flex items-center justify-center pt-24"
      >
        <div className="container mx-auto px-6">
          <button onClick={() => setPostId(Math.floor(Math.random() * 100))}>
            Random Post
          </button>
          <Post postId={postId} />
        </div>
      </section>
    </main>
  )
}

function Post({ postId }: { postId: number }) {
  // const [text, setText] = useState<string | null>(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: ({ signal }) =>
      fetch(`https://dummyjson.com/posts/${postId}`, { signal }).then(res =>
        res.json(),
      ),
  })
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  // useEffect(() => {
  //   const controller = new AbortController();
  //   fetch(`https://dummyjson.com/posts/${postId}`, {
  //     signal: controller.signal
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setText(data.body);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });

  //   return () => {
  //     controller.abort();
  //   }
  // }, [postId]);

  return <div>{data.body}</div>
}

export default ExamplePage
