import { getFormByIdService } from '@/app/(admin)/admin/_services/forms.services'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FormSubmitWrapper } from './FormSubmitWrapper'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  try {
    const response = await getFormByIdService(id)
    return {
      title: response.data.title,
      description: `${response.data.title} formu`,
    }
  } catch {
    return { title: 'Form Bulunamadı' }
  }
}

export default async function FormPage({ params }: Props) {
  const { id } = await params

  let form

  try {
    const response = await getFormByIdService(id)
    form = response.data
    console.log('form', form)
  } catch {
    notFound()
  }

  if (!form || !form.active) {
    notFound()
  }

  return (
    <section className="py-24 pt-24 md:pt-32">
      <FormSubmitWrapper formId={form.id} schema={form} />
    </section>
  )
}
