import { Widget } from '@/types/BaseResponse'
import dynamic from 'next/dynamic'

export default function AWidget(props: Widget) {
  console.log('AWidget-props', props)
  const DynamicPosts = props.posts?.map(post => {
    return {
      ...post,
      component: dynamic(
        () => import(`@/components/dynamic/posts/${post.template}`),
      ),
    }
  })
  return (
    <div>
      {DynamicPosts?.map(Post => {
        const { component: PostName, template, ...rest } = Post
        return <PostName key={Post.id} {...rest} />
      })}
    </div>
  )
}
