import { z } from 'zod'

// Banner target enum
export const BannerTargetEnum = z.enum(['_blank', '_self'])

// Create Banner Schema - POST /api/v1/banners (multipart/form-data)
export const CreateBannerSchema = z.object({
  title: z
    .string()
    .min(1, 'Başlık zorunludur')
    .max(200, 'Başlık 200 karakteri geçemez'),
  altText: z.string().optional(),
  link: z.string().url('Geçerli bir URL giriniz').optional().or(z.literal('')),
  target: BannerTargetEnum.default('_blank'),
  type: z.string().optional(),
  orderIndex: z.number().int().min(0).default(0),
  status: z.boolean().default(true),
  // image is handled separately as File in form
})

// Update Banner Schema - PUT /api/v1/banners/{id}
export const UpdateBannerSchema = CreateBannerSchema

// Type exports - use z.input for form input types
export type CreateBannerInput = z.input<typeof CreateBannerSchema>
export type UpdateBannerInput = z.input<typeof UpdateBannerSchema>
export type BannerTarget = z.infer<typeof BannerTargetEnum>
