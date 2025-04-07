'use client';

import { useQuery } from '@tanstack/react-query';
import { getPosts, type Post } from '@/services/typicode/typicode';

export default function Posts() {
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () => getPosts('posts'),
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading posts</div>;
  }

  return (
    <div className="grid gap-6">
      {posts?.map((post) => (
        <article key={post.id} className="p-6 bg-[var(--background)] rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">{post?.title}</h2>
          <h2 className="text-xl font-bold mb-2">{post?.name}</h2>
          <p className="text-[var(--muted-foreground)]">{post?.email}</p>
          <p className="text-[var(--muted-foreground)]">{post?.body}</p>
        </article>
      ))}
    </div>
  );
} 