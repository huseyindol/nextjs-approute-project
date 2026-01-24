import { Component } from '@/types/BaseResponse'
import dynamic from 'next/dynamic'

export default function CComponent(props: Component) {
  const { name, description, widgets } = props
  const DynamicWidgets = widgets?.map(widget => {
    return {
      ...widget,
      component: dynamic(
        () => import(`@/components/dynamic/widgets/${widget.template}`),
      ),
    }
  })
  return (
    <section className="w-full py-8">
      {/* Section Header */}
      {(name || description) && (
        <div className="mb-6 text-center">
          {name && (
            <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">
              {name}
            </h2>
          )}
          {description && <p className="text-slate-400">{description}</p>}
        </div>
      )}
      {DynamicWidgets?.map(Widget => {
        const { component: WidgetName, template, ...rest } = Widget
        return <WidgetName key={Widget.id} {...rest} />
      })}
    </section>
  )
}
