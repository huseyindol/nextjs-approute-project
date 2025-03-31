import { Suspense } from 'react';
import Posts from '@/components/Posts';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getPosts } from '@/services/typicode/typicode';

export default async function PostsPage() {
  const queryClient = new QueryClient();

  // Prefetch the posts data
  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts('comments'),
  });

  return (
    <div className="container py-12">
      <h1 className="text-3xl @md:text-4xl font-bold mb-8 text-center">Blog Posts</h1>
      <Suspense fallback={<div className="text-center py-8">Loading posts...</div>}>
        <Posts dehydratedState={dehydrate(queryClient)} />
      </Suspense>
    </div>
  );
} 