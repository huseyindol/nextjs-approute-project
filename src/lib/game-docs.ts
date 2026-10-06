import fs from 'node:fs'
import path from 'node:path'
import remarkGfm from 'remark-gfm'
import { serialize } from 'next-mdx-remote/serialize'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import type { PluggableList } from 'unified'

export type GameDocLang = 'tr' | 'en'

export interface GameDoc {
  title: string
  source: MDXRemoteSerializeResult
}

/**
 * Oyun belgesi (gizlilik politikası, destek) — `src/data/games/<oyun>/<ad>.<dil>.md`.
 * İlk satır `# Başlık`; gövde düz Markdown (MDX değil) olarak build zamanında derlenir.
 * Kaynak oyunun reposundaki `docs/store/*.md`; buraya yalnız yayınlanan kısım kopyalanır.
 */
export async function loadGameDoc(
  game: string,
  name: string,
  lang: GameDocLang,
): Promise<GameDoc> {
  const file = path.join(
    process.cwd(),
    'src',
    'data',
    'games',
    game,
    `${name}.${lang}.md`,
  )
  const [first, ...rest] = fs.readFileSync(file, 'utf8').split('\n')
  const source = await serialize(rest.join('\n'), {
    mdxOptions: {
      format: 'md',
      remarkPlugins: [remarkGfm] as PluggableList,
    },
  })
  return { title: first.replace(/^#\s*/, '').trim(), source }
}
