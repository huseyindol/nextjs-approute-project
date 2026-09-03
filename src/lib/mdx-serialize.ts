import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import { serialize } from 'next-mdx-remote/serialize'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import type { PluggableList } from 'unified'

const prettyCodeOptions = {
  theme: 'one-dark-pro',
  keepBackground: false,
}

/**
 * MDX kaynağını build zamanında derler (yalnız sunucu — getStaticProps).
 * Sonuç JSON-serileştirilebilir; sayfaya props olarak geçer.
 */
export function serializeMdx(
  source: string,
): Promise<MDXRemoteSerializeResult> {
  return serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm] as PluggableList,
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]] as PluggableList,
    },
  })
}
