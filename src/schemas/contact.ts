import { z } from 'zod'

// Contact form request schema
export const ContactRequest = z.object({
  name: z.string().min(1, 'Name is required').describe('Contact person name'),
  email: z
    .string()
    .email('Valid email is required')
    .describe('Contact email address'),
  message: z.string().min(1, 'Message is required').describe('Contact message'),
})

// Contact success response schema
export const ContactResponse = z.object({
  message: z.string().describe('Success message'),
})

// Contact error response schema
export const ContactErrorResponse = z.object({
  error: z.string().describe('Error message'),
})

// Export types for use in components
export type ContactRequestType = z.infer<typeof ContactRequest>
export type ContactResponseType = z.infer<typeof ContactResponse>
export type ContactErrorResponseType = z.infer<typeof ContactErrorResponse>
