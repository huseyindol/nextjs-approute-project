'use server'

import { revalidatePath } from 'next/cache'

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

/**
 * Server Action to fetch posts from JSONPlaceholder API
 */
export async function fetchPosts(): Promise<Post[]> {
  try {
    console.log('Server Action: Fetching posts...')

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      cache: 'no-store', // Always fetch fresh data
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: Post[] = await response.json()
    console.log(
      'Server Action: Posts fetched successfully',
      data.length,
      'posts',
    )

    // Optionally revalidate the page cache
    revalidatePath('/')

    return data.slice(0, 10) // Return first 10 posts
  } catch (error) {
    console.log('Server Action: Error fetching posts:', error)
    throw new Error('Failed to fetch posts')
  }
}

/**
 * Server Action to fetch a single post
 */
export async function fetchPost(id: number): Promise<Post> {
  try {
    console.log(`Server Action: Fetching post ${id}...`)

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        cache: 'no-store',
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: Post = await response.json()
    console.log('Server Action: Post fetched successfully', data.title)

    return data
  } catch (error) {
    console.log('Server Action: Error fetching post:', error)
    throw new Error(`Failed to fetch post ${id}`)
  }
}

/**
 * Server Action to create a new post
 */
export async function createPost(
  title: string,
  body: string,
  userId: number = 1,
): Promise<Post> {
  try {
    console.log('Server Action: Creating new post...', { title, body, userId })

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        userId,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: Post = await response.json()
    console.log('Server Action: Post created successfully', data)

    // Revalidate the page to show the new post
    revalidatePath('/')

    return data
  } catch (error) {
    console.log('Server Action: Error creating post:', error)
    throw new Error('Failed to create post')
  }
}
