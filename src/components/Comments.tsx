'use client';

import { useQuery } from '@tanstack/react-query';
import { getPosts, type Post } from '@/services/typicode/typicode';

export default function Comments() {
  const { data: comments, isLoading, error } = useQuery<Post[]>({
    queryKey: ['comments'],
    queryFn: () => getPosts('comments'),
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading comments...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading comments</div>;
  }

  return (
    <div className="grid gap-6">
      {comments?.map((comment) => (
        <article key={comment.id} className="p-6 bg-[var(--background)] rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">{comment?.name}</h2>
          <p className="text-[var(--muted-foreground)]">{comment?.email}</p>
          <p className="text-[var(--muted-foreground)]">{comment?.body}</p>
        </article>
      ))}
    </div>
  );
} 