import { z } from 'zod'

export const PageParams = z.object({
  slug: z.string().describe('Slug'),
})
