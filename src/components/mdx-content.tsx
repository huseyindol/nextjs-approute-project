import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import React from 'react'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import type { PluggableList } from 'unified'

const components = {
  h1: (props: React.ComponentPropsWithoutRef<'h1'>) => (
    <h1
      className="mb-4 mt-8 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
      {...props}
    >
      {props.children}
    </h1>
  ),
  h2: (props: React.ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="mb-4 mt-8 text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
      {...props}
    >
      {props.children}
    </h2>
  ),
  h3: (props: React.ComponentPropsWithoutRef<'h3'>) => (
    <h3
      className="mb-3 mt-6 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white"
      {...props}
    >
      {props.children}
    </h3>
  ),
  p: (props: React.ComponentPropsWithoutRef<'p'>) => (
    <p
      className="mb-6 leading-relaxed text-slate-700 dark:text-slate-300"
      {...props}
    >
      {props.children}
    </p>
  ),
  a: (props: React.ComponentPropsWithoutRef<'a'>) => (
    <a
      className="font-medium text-emerald-600 underline underline-offset-4 hover:text-emerald-500"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {props.children}
    </a>
  ),
  ul: (props: React.ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className="my-6 ml-6 list-disc text-slate-700 dark:text-slate-300 [&>li]:mt-2"
      {...props}
    >
      {props.children}
    </ul>
  ),
  ol: (props: React.ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className="my-6 ml-6 list-decimal text-slate-700 dark:text-slate-300 [&>li]:mt-2"
      {...props}
    >
      {props.children}
    </ol>
  ),
  li: (props: React.ComponentPropsWithoutRef<'li'>) => (
    <li {...props}>{props.children}</li>
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="mt-6 border-l-4 border-emerald-500 pl-6 italic text-slate-800 dark:text-slate-200"
      {...props}
    >
      {props.children}
    </blockquote>
  ),
  img: (props: React.ComponentPropsWithoutRef<'img'>) => (
    <div className="relative my-8 w-full overflow-hidden rounded-xl bg-slate-100 shadow-xl dark:bg-slate-800">
      <Image
        alt={props.alt || 'Blog Image'}
        src={(props.src as string) || ''}
        style={{ width: '100%', height: 'auto' }}
        width={1200}
        height={630}
        className="object-cover"
      />
    </div>
  ),
  pre: (props: React.ComponentPropsWithoutRef<'pre'>) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm shadow-lg dark:border-slate-800"
      {...props}
    >
      {props.children}
    </pre>
  ),
  code: (props: React.ComponentPropsWithoutRef<'code'>) => {
    if (typeof props.children === 'string' && !props.className) {
      return (
        <code
          className="rounded bg-slate-100 px-[0.3rem] py-[0.2rem] font-mono text-sm text-emerald-600 dark:bg-slate-800 dark:text-emerald-400"
          {...props}
        >
          {props.children}
        </code>
      )
    }
    return (
      <code className={props.className} {...props}>
        {props.children}
      </code>
    )
  },
}

const prettyCodeOptions = {
  theme: 'one-dark-pro',
  keepBackground: false,
}

export function MdxContent(props: Readonly<{ source: string }>) {
  return (
    <div className="prose-emerald prose-lg dark:prose-invert w-full max-w-none">
      <MDXRemote
        source={props.source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm] as PluggableList,
            rehypePlugins: [
              [rehypePrettyCode, prettyCodeOptions],
            ] as PluggableList,
          },
        }}
      />
    </div>
  )
}
