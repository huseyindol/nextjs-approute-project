import { z } from 'zod'

// Query Parameters for GET /api/page
export const PageParams = z.object({
  slug: z.string().describe('Page slug'),
})

export const CreatePageBody = z.object({
  slug: z.string().describe('Page slug'),
  name: z.string().describe('Name'),
  description: z.string().describe('Page description'),
  content: z.string().describe('Page content'),
  userId: z.number().describe('User ID'),
})
