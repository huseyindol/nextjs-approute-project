import { z } from 'zod'

// Query Parameters for GET /api/posts
export const PostsQueryParams = z.object({
  page: z.number().optional().describe('Page number for pagination'),
  limit: z.number().optional().describe('Number of posts per page'),
  published: z
    .boolean()
    .optional()
    .describe('Filter posts by published status'),
  author_id: z.number().optional().describe('Filter posts by author ID'),
  search: z.string().optional().describe('Search posts by title or content'),
  include_author: z
    .boolean()
    .optional()
    .describe('Include author details in response'),
})

// Path Parameters for post by ID
export const PostParams = z.object({
  id: z.string().describe('Post ID'),
})

// Request body for creating post
export const CreatePostBody = z.object({
  title: z.string().min(1, 'Title is required').describe('Post title'),
  content: z.string().optional().describe('Post content'),
  published: z
    .boolean()
    .optional()
    .default(false)
    .describe('Whether the post is published'),
  authorId: z.number().describe('Author ID'),
})

// Request body for updating post
export const UpdatePostBody = z.object({
  title: z.string().optional().describe('Post title'),
  content: z.string().optional().describe('Post content'),
  published: z.boolean().optional().describe('Whether the post is published'),
})

// Post response schema
export const PostResponse = z.object({
  id: z.number().describe('Post ID'),
  title: z.string().describe('Post title'),
  content: z.string().nullable().describe('Post content'),
  published: z.boolean().describe('Whether the post is published'),
  authorId: z.number().describe('Author ID'),
})

// Author schema for included author
export const AuthorResponse = z.object({
  id: z.number().describe('Author ID'),
  email: z.string().email().describe('Author email address'),
  firstName: z.string().nullable().describe('Author first name'),
  lastName: z.string().nullable().describe('Author last name'),
})

// Extended post response with author
export const PostWithAuthorResponse = PostResponse.extend({
  author: AuthorResponse.optional().describe('Post author details'),
})

// Posts list response
export const PostsListResponse = z.object({
  posts: z
    .array(PostResponse.or(PostWithAuthorResponse))
    .describe('List of posts'),
  pagination: z
    .object({
      page: z.number().describe('Current page number'),
      limit: z.number().describe('Items per page'),
      total: z.number().describe('Total number of posts'),
      pages: z.number().describe('Total number of pages'),
    })
    .describe('Pagination information'),
})

// Success response for post creation/update
export const PostSuccessResponse = z.object({
  post: PostResponse,
  message: z.string().describe('Success message'),
})

// Delete success response
export const DeletePostSuccessResponse = z.object({
  message: z.string().describe('Success message'),
})

// Error response
export const PostErrorResponse = z.object({
  error: z.string().describe('Error message'),
})

// Export types for use in components
export type PostsQueryParamsType = z.infer<typeof PostsQueryParams>
export type PostParamsType = z.infer<typeof PostParams>
export type CreatePostBodyType = z.infer<typeof CreatePostBody>
export type UpdatePostBodyType = z.infer<typeof UpdatePostBody>
export type PostResponseType = z.infer<typeof PostResponse>
export type PostWithAuthorResponseType = z.infer<typeof PostWithAuthorResponse>
export type PostsListResponseType = z.infer<typeof PostsListResponse>
export type PostSuccessResponseType = z.infer<typeof PostSuccessResponse>
export type DeletePostSuccessResponseType = z.infer<
  typeof DeletePostSuccessResponse
>
export type PostErrorResponseType = z.infer<typeof PostErrorResponse>
