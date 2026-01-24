import { Page } from '@/types/BaseResponse'
import dynamic from 'next/dynamic'

export default async function APage({
  pageInfo,
}: Readonly<{ pageInfo: Page }>) {
  console.log('APage-pageInfo', pageInfo)
  const DynamicComponent = pageInfo.components.map(component => {
    return {
      ...component,
      component: dynamic(
        () => import(`@/components/dynamic/components/${component.template}`),
      ),
    }
  })

  return (
    <div className="container mx-auto px-6">
      {DynamicComponent.map(Component => {
        const { component: ComponentName, template, ...rest } = Component
        return <ComponentName key={Component.id} {...rest} />
      })}
    </div>
  )
}
