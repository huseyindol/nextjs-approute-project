import fs from 'node:fs'
import path from 'node:path'
import type { NextApiRequest, NextApiResponse } from 'next'

const VALID_TYPES = ['pages', 'posts', 'components', 'widgets'] as const
type TemplateType = (typeof VALID_TYPES)[number]

export type TemplateOption = { value: string; label: string }

function readTemplates(type: TemplateType): TemplateOption[] {
  const dir = path.join(process.cwd(), 'src/components/dynamic', type)
  const placeholder: TemplateOption = { value: '', label: 'Template Seçin' }
  if (!fs.existsSync(dir)) return [placeholder]

  const names = fs
    .readdirSync(dir)
    .filter(
      f => (f.endsWith('.tsx') || f.endsWith('.ts')) && !f.startsWith('index'),
    )
    .map(f => f.replace(/\.(tsx|ts)$/, ''))
    .sort()

  return [placeholder, ...names.map(n => ({ value: n, label: n }))]
}

/** Panel'in dinamik şablon listesini okur (CORS: admin origin). */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const adminOrigin = process.env.NEXT_PUBLIC_ADMIN_URL ?? '*'
  res.setHeader('Access-Control-Allow-Origin', adminOrigin)
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS')
    return res.status(405).end()
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400',
  )

  const raw = req.query.type
  const type = (Array.isArray(raw) ? raw[0] : raw) as TemplateType | undefined

  if (type && VALID_TYPES.includes(type)) {
    return res.status(200).json(readTemplates(type))
  }
  const all = Object.fromEntries(VALID_TYPES.map(t => [t, readTemplates(t)]))
  return res.status(200).json(all)
}
