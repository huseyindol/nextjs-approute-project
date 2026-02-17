import { z } from 'zod'
import { INDUSTRY_OPTIONS } from '@/schemas/constants'

// Zod Schema - array alanlari icin z.array() kullanilir
export const ExperienceSchema = z.object({
  company: z.string().min(1).describe('Şirket Adı'),
  position: z.string().min(1).describe('Pozisyon'),
  period: z.string().describe('Çalışma Dönemi'),
  location: z.string().describe('Konum'),
  industry: z.string().describe('Sektör'),
  description: z.string().describe('Açıklama'),
  technologies: z.array(z.string()).describe('Teknolojiler'),
  achievements: z.array(z.string()).describe('Başarılar'),
})

// Type export
export type ExperienceType = z.infer<typeof ExperienceSchema>

// Form field configuration - array alanlari icin tags inputType
// industry options constants'dan import edilir
export const experienceFieldConfig = {
  company: {
    label: 'Şirket Adı',
    placeholder: 'örnek: Hangikredi',
    inputType: 'text' as const,
  },
  position: {
    label: 'Pozisyon',
    placeholder: 'örnek: Senior Frontend Developer',
    inputType: 'text' as const,
  },
  period: {
    label: 'Çalışma Dönemi',
    placeholder: 'örnek: Ekim 2023 - Günümüz',
    inputType: 'text' as const,
  },
  location: {
    label: 'Konum',
    placeholder: 'örnek: İstanbul',
    inputType: 'text' as const,
  },
  industry: {
    label: 'Sektör',
    inputType: 'select' as const,
    options: INDUSTRY_OPTIONS,
  },
  description: {
    label: 'Açıklama',
    placeholder: 'İş tanımı...',
    inputType: 'textarea' as const,
  },
  technologies: {
    label: 'Teknolojiler',
    placeholder: 'React, Next.js, TypeScript...',
    inputType: 'tags' as const,
    helpText: 'Teknolojileri virgül ile ayırın',
  },
  achievements: {
    label: 'Başarılar',
    placeholder: 'Başarılarınızı virgül ile ayırın...',
    inputType: 'tags' as const,
    helpText: 'Başarıları virgül ile ayırın',
  },
}

export type ExperienceFieldConfig = typeof experienceFieldConfig
