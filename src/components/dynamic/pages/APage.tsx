import { ErrorBoundary } from '@/components/ErrorBoundary'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Experience from '@/components/experience'
import { Page } from '@/types/BaseResponse'
import dynamic from 'next/dynamic'

// Page props interface
interface HomeProps {
  searchParams?: { industry?: string }
  pageInfo: Page
}

export default async function APage({
  searchParams,
  pageInfo,
}: Readonly<HomeProps>) {
  // console.log('APage-pageInfo', pageInfo)

  const DynamicComponent = pageInfo.components.map(component => {
    return {
      ...component,
      component: dynamic(
        () => import(`@/components/dynamic/components/${component.template}`),
      ),
    }
  })

  return (
    <main className="min-h-screen">
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary>
        <Skills />
      </ErrorBoundary>
      <ErrorBoundary>
        <Experience searchParams={searchParams} />
      </ErrorBoundary>
      {DynamicComponent.map(Component => {
        const { component: ComponentName, template, ...rest } = Component
        return <ComponentName key={Component.id} {...rest} />
      })}
    </main>
  )
}
