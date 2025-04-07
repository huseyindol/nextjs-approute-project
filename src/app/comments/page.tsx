import { Suspense } from 'react';
import Posts from '@/components/Posts';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getPosts } from '@/services/typicode/typicode';
import Comments from '@/components/Comments';
import Link from 'next/link';
import HydrationProvider from '@/providers/HydrationProvider';
export default async function PostsPage() {
  const queryClient = new QueryClient();

  // Prefetch the posts data
  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts('posts'),
  });
  await queryClient.prefetchQuery({
    queryKey: ['comments'],
    queryFn: () => getPosts('comments'),
  });

  return (
    <HydrationProvider dehydratedState={dehydrate(queryClient)}>
      <div className="container py-12">
        <div className="flex justify-center gap-4">
          <Link href="/posts" prefetch={false}>Posts</Link>
          <Link href="/comments" prefetch={false}>Comments</Link>
        </div>
        <h1 className="text-3xl @md:text-4xl font-bold mb-8 text-center">Blog Comments</h1>
        <Suspense fallback={<div className="text-center py-8">Loading comments...</div>}>
          <Comments />
        </Suspense>
        <h1 className="text-3xl @md:text-4xl font-bold mb-8 text-center">Blog Posts</h1>
        <Suspense fallback={<div className="text-center py-8">Loading posts...</div>}>
          <Posts />
        </Suspense>
      </div>
    </HydrationProvider>
  );
} 