import { Widget } from '@/types/BaseResponse'
import dynamic from 'next/dynamic'

export default function AWidget(props: Widget) {
  const { posts, name, description } = props
  const DynamicPosts = posts?.map(post => {
    return {
      ...post,
      component: dynamic(
        () => import(`@/components/dynamic/posts/${post.template}`),
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
      {DynamicPosts?.map(Post => {
        const { component: PostName, template, ...rest } = Post
        return <PostName key={Post.id} {...rest} />
      })}
    </section>
  )
}
