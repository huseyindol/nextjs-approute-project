import handler from '@/pages/api/templates'
import { createApiMocks } from '@tests/utils/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('node:fs', () => ({
  default: { existsSync: vi.fn(), readdirSync: vi.fn() },
  existsSync: vi.fn(),
  readdirSync: vi.fn(),
}))

import fs from 'node:fs'
const mockFs = vi.mocked(fs)

describe('Templates API (pages/api/templates)', () => {
  beforeEach(() => {
    mockFs.existsSync.mockReturnValue(false)
    mockFs.readdirSync.mockReturnValue([])
  })
  afterEach(() => vi.clearAllMocks())

  it('returns all types when no type param', async () => {
    const { req, res, state } = createApiMocks({ method: 'GET' })
    handler(req, res)
    expect(state.statusCode).toBe(200)
    expect(state.jsonBody).toHaveProperty('pages')
    expect(state.jsonBody).toHaveProperty('posts')
  })

  it('placeholder when directory missing', async () => {
    const { req, res, state } = createApiMocks({
      method: 'GET',
      query: { type: 'pages' },
    })
    handler(req, res)
    expect(state.statusCode).toBe(200)
    expect(state.jsonBody).toEqual([{ value: '', label: 'Template Seçin' }])
  })

  it('sorted with placeholder first, filters index & non-ts', async () => {
    mockFs.existsSync.mockReturnValue(true)
    mockFs.readdirSync.mockReturnValue([
      'BPage.tsx',
      'APage.tsx',
      'index.ts',
      'readme.md',
    ] as unknown as ReturnType<typeof fs.readdirSync>)
    const { req, res, state } = createApiMocks({
      method: 'GET',
      query: { type: 'pages' },
    })
    handler(req, res)
    expect(state.jsonBody).toEqual([
      { value: '', label: 'Template Seçin' },
      { value: 'APage', label: 'APage' },
      { value: 'BPage', label: 'BPage' },
    ])
  })

  it('all types for invalid type param', async () => {
    const { req, res, state } = createApiMocks({
      method: 'GET',
      query: { type: 'invalid' },
    })
    handler(req, res)
    expect(state.statusCode).toBe(200)
    expect(state.jsonBody).toHaveProperty('pages')
  })

  it('CORS + Cache-Control headers', async () => {
    const { req, res, state } = createApiMocks({ method: 'GET' })
    handler(req, res)
    expect(state.headers['access-control-allow-origin']).toBeDefined()
    expect(state.headers['cache-control']).toContain('s-maxage')
  })

  it('204 for OPTIONS', async () => {
    const { req, res, state } = createApiMocks({ method: 'OPTIONS' })
    handler(req, res)
    expect(state.statusCode).toBe(204)
  })
})
