'use client'

import { isFieldVisible } from '@/app/(admin)/admin/_utils/condition-evaluator'
import type { Field } from '@/types/form'
import { useFormContext, useWatch } from 'react-hook-form'
import { CheckboxGroup } from './CheckboxGroup'
import { FormInput } from './FormInput'
import { FormSelect } from './FormSelect'
import { FormTextarea } from './FormTextarea'
import { RadioGroup } from './RadioGroup'

interface FormFieldRendererProps {
  field: Field
}

export function FormFieldRenderer({ field }: FormFieldRendererProps) {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext()

  // Watch dependent field for conditional visibility
  const dependentFieldId = field.condition?.field
  useWatch({ name: dependentFieldId ?? '' })

  // Check visibility
  if (field.condition) {
    const allValues = getValues()
    if (!isFieldVisible(field, allValues)) {
      return null
    }
  }

  const error = errors[field.id]?.message as string | undefined

  switch (field.type) {
    case 'text':
    case 'email':
    case 'phone':
    case 'url':
      return (
        <FormInput
          label={field.label}
          type={field.type === 'phone' ? 'tel' : field.type}
          error={error}
          required={field.required}
          {...register(field.id)}
        />
      )

    case 'number':
      return (
        <FormInput
          label={field.label}
          type="number"
          error={error}
          required={field.required}
          {...register(field.id, { valueAsNumber: true })}
        />
      )

    case 'date':
      return (
        <FormInput
          label={field.label}
          type="date"
          error={error}
          required={field.required}
          {...register(field.id)}
        />
      )

    case 'textarea':
      return (
        <FormTextarea
          label={field.label}
          error={error}
          required={field.required}
          {...register(field.id)}
        />
      )

    case 'select':
      return (
        <FormSelect
          label={field.label}
          options={[]}
          placeholder="Seçiniz..."
          error={error}
          required={field.required}
          {...register(field.id)}
        />
      )

    case 'radio':
      return (
        <RadioGroup
          label={field.label}
          name={field.id}
          options={[]}
          value={getValues(field.id)}
          onChange={val => setValue(field.id, val, { shouldValidate: true })}
          error={error}
          required={field.required}
        />
      )

    case 'checkbox':
      return (
        <CheckboxGroup
          label={field.label}
          checked={getValues(field.id)}
          onChange={val => {
            console.log(val)
            setValue(field.id, val, { shouldValidate: true })
          }}
          name={field.id}
          error={error}
        />
      )

    default:
      return (
        <FormInput
          label={field.label}
          error={error}
          required={field.required}
          {...register(field.id)}
        />
      )
  }
}
