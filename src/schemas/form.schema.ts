import { z } from 'zod'

// ============================================
// Validation Rule Schema
// ============================================

export const ValidationRuleSchema = z.object({
  min: z.number().nullable().optional(),
  max: z.number().nullable().optional(),
  pattern: z.string().nullable().optional(),
})

// ============================================
// Condition Rule Schema
// ============================================

export const ConditionOperatorSchema = z.enum([
  'EQUALS',
  'NOT_EQUALS',
  'GT',
  'LT',
])

export const ConditionRuleSchema = z.object({
  field: z.string().min(1, 'Koşul alanı zorunludur'),
  operator: ConditionOperatorSchema,
  value: z.union([z.string(), z.number(), z.boolean()]),
})

// ============================================
// Field Type Schema
// ============================================

export const FieldTypeSchema = z.enum([
  'text',
  'email',
  'number',
  'select',
  'checkbox',
  'radio',
  'textarea',
  'date',
  'phone',
  'url',
])

// ============================================
// Field Schema
// ============================================

export const FieldSchema = z.object({
  id: z.string().min(1, 'Alan ID zorunludur'),
  type: FieldTypeSchema,
  label: z.string().min(1, 'Alan etiketi zorunludur'),
  required: z.boolean().default(false),
  validation: ValidationRuleSchema.nullable().optional(),
  condition: ConditionRuleSchema.nullable().optional(),
})

// ============================================
// Form Config Schema
// ============================================

export const FormLayoutSchema = z.enum(['single', 'vertical'])

export const FormConfigSchema = z.object({
  layout: FormLayoutSchema.default('vertical'),
  submitLabel: z.string().optional(),
})

// ============================================
// Schema Definition (nested inside form)
// ============================================

export const SchemaDefinitionSchema = z.object({
  config: FormConfigSchema,
  fields: z.array(FieldSchema).default([]),
})

// ============================================
// Create/Update Form Schema
// ============================================

export const CreateFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Form başlığı zorunludur')
    .max(200, 'Form başlığı 200 karakteri geçemez'),
  version: z.number().default(1),
  active: z.boolean().default(true),
  schema: SchemaDefinitionSchema,
})

export const UpdateFormSchema = CreateFormSchema

// ============================================
// Type Exports
// ============================================

export type ValidationRule = z.infer<typeof ValidationRuleSchema>
export type ConditionRule = z.infer<typeof ConditionRuleSchema>
export type FieldDefinition = z.infer<typeof FieldSchema>
export type FormConfig = z.infer<typeof FormConfigSchema>
export type SchemaDefinition = z.infer<typeof SchemaDefinitionSchema>
export type CreateFormInput = z.input<typeof CreateFormSchema>
export type UpdateFormInput = z.input<typeof UpdateFormSchema>
