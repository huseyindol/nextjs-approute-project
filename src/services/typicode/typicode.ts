export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  name: string;
  email: string;
}

export async function getPosts(searchParams: string): Promise<Post[]> {
  console.log('getPosts',searchParams);
  const response = await fetch(`https://jsonplaceholder.typicode.com/${searchParams}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
}