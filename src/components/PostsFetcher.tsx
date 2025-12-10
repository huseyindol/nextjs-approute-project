'use client'

import { createPost, fetchPost, fetchPosts, type Post } from '@/actions/posts'
import { useState, useTransition } from 'react'

export default function PostsFetcher() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Form state for creating new post
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
  })

  const handleFetchPosts = async () => {
    setLoading(true)
    setError(null)

    try {
      // Use startTransition for better UX
      startTransition(async () => {
        const fetchedPosts = await fetchPosts()
        setPosts(fetchedPosts)
        setLoading(false)
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  const handleFetchSinglePost = async (id: number) => {
    setLoading(true)
    setError(null)

    try {
      startTransition(async () => {
        const post = await fetchPost(id)
        setSelectedPost(post)
        setLoading(false)
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newPost.title.trim() || !newPost.body.trim()) {
      setError('Title and body are required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      startTransition(async () => {
        const createdPost = await createPost(newPost.title, newPost.body)
        setPosts(prev => [createdPost, ...prev])
        setNewPost({ title: '', body: '' })
        setLoading(false)
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Server Actions Demo
        </h2>

        {/* Error Display */}
        {error && (
          <div className="mb-4 rounded border border-red-400 bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-100">
            {error}
          </div>
        )}

        {/* Fetch Posts Button */}
        <div className="mb-6">
          <button
            onClick={handleFetchPosts}
            disabled={loading || isPending}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading || isPending ? 'Loading...' : 'Fetch Posts'}
          </button>
        </div>

        {/* Create New Post Form */}
        <form onSubmit={handleCreatePost} className="mb-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create New Post
          </h3>
          <div>
            <input
              type="text"
              placeholder="Post title..."
              value={newPost.title}
              onChange={e =>
                setNewPost(prev => ({ ...prev, title: e.target.value }))
              }
              className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <textarea
              placeholder="Post body..."
              value={newPost.body}
              onChange={e =>
                setNewPost(prev => ({ ...prev, body: e.target.value }))
              }
              rows={3}
              className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading || isPending}
            className="rounded bg-green-500 px-4 py-2 font-bold text-white transition-colors hover:bg-green-600 disabled:bg-green-300"
          >
            {loading || isPending ? 'Creating...' : 'Create Post'}
          </button>
        </form>

        {/* Posts List */}
        {posts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Posts ({posts.length})
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {posts.map(post => (
                <div
                  key={post.id}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700"
                >
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                    {post.title}
                  </h4>
                  <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
                    {post.body.substring(0, 100)}...
                  </p>
                  <button
                    onClick={() => handleFetchSinglePost(post.id)}
                    className="text-sm font-medium text-blue-500 hover:text-blue-600"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Post Details */}
        {selectedPost && (
          <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900">
            <h3 className="mb-2 text-lg font-semibold text-blue-900 dark:text-blue-100">
              Post Details
            </h3>
            <h4 className="mb-2 font-semibold text-blue-800 dark:text-blue-200">
              {selectedPost.title}
            </h4>
            <p className="mb-2 text-blue-700 dark:text-blue-300">
              {selectedPost.body}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              User ID: {selectedPost.userId} | Post ID: {selectedPost.id}
            </p>
            <button
              onClick={() => setSelectedPost(null)}
              className="mt-2 text-sm font-medium text-blue-500 hover:text-blue-600"
            >
              Close Details
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
