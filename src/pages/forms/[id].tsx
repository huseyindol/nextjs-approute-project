import { FormSubmitWrapper } from '@/components/forms/FormSubmitWrapper'
import { Seo } from '@/lib/seo'
import { getFormByIdService } from '@/services/site/forms.services'
import type { FormSchema } from '@/types/form'
import type { GetServerSideProps } from 'next'

interface FormPageProps {
  form: FormSchema
}

export default function FormPage({ form }: FormPageProps) {
  return (
    <>
      <Seo rawTitle={form.title} description={`${form.title} formu`} noIndex />
      <section className="py-24 pt-4 md:pt-12">
        <FormSubmitWrapper formId={form.id} schema={form} />
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<FormPageProps> = async ({
  params,
}) => {
  const id = params?.id as string
  try {
    const response = await getFormByIdService(id)
    const form = response.data
    if (!form?.active) return { notFound: true }
    return { props: { form } }
  } catch {
    return { notFound: true }
  }
}
