'use client'

import { isFieldVisible } from '@/app/(admin)/admin/_utils/condition-evaluator'
import {
  generateDefaultValues,
  generateZodSchema,
} from '@/app/(admin)/admin/_utils/zod-generator'
import type { FormSchema } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormButton } from './FormButton'
import { FormFieldRenderer } from './FormFieldRenderer'
import { FormLayout } from './layout/FormLayout'

interface DynamicFormRendererProps {
  readonly formSchema: FormSchema
  readonly onSubmit?: (data: Record<string, unknown>) => Promise<void>
}

export function DynamicFormRenderer({
  formSchema,
  onSubmit,
}: DynamicFormRendererProps) {
  const { config, fields } = formSchema.schema

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Default values
  const defaultValues = useMemo(() => generateDefaultValues(fields), [fields])

  // Zod schema
  const zodSchema = useMemo(() => generateZodSchema(fields), [fields])

  const methods = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues,
    mode: 'onTouched',
  })

  const { handleSubmit } = methods

  // Submit handler
  const onFormSubmit = async (data: Record<string, unknown>) => {
    setIsSubmitting(true)
    try {
      // Filter out hidden field values
      const visibleData: Record<string, unknown> = {}
      for (const field of fields) {
        if (isFieldVisible(field, data)) {
          visibleData[field.id] = data[field.id]
        }
      }

      if (onSubmit) {
        await onSubmit(visibleData)
      }
      setIsSuccess(true)
    } catch (err) {
      console.error('Form submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state
  if (isSuccess) {
    return (
      <FormLayout>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Form başarıyla gönderildi!
          </h2>
          <p className="mt-2 text-muted-foreground">
            Yanıtınız kaydedildi. Teşekkür ederiz.
          </p>
        </div>
      </FormLayout>
    )
  }

  return (
    <FormLayout title={formSchema.title}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          noValidate
          className="space-y-6"
        >
          {/* Form fields */}
          <div className="space-y-5">
            {fields.map(field => (
              <FormFieldRenderer key={field.id} field={field} />
            ))}
          </div>

          {/* Submit button */}
          <div className="flex items-center gap-3 pt-4">
            <div className="ml-auto flex gap-3">
              <FormButton
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
              >
                {config.submitLabel || 'Gönder'}
              </FormButton>
            </div>
          </div>
        </form>
      </FormProvider>
    </FormLayout>
  )
}
