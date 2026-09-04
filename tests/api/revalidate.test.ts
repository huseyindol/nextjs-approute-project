import handler from '@/pages/api/revalidate'
import { createApiMocks } from '@tests/utils/test-utils'
import { describe, expect, it, vi } from 'vitest'

/**
 * NOT: App Router'daki revalidateTag/GET semantiği Pages Router'da yok.
 * Yeni davranış: POST-only, res.revalidate(path). Tag'ler path'e eşlenir
 * (cms-page-<slug> → '/' + '/<slug>').
 */
describe('Revalidate API (pages/api/revalidate)', () => {
  it('405 for non-POST', async () => {
    const { req, res, state } = createApiMocks({ method: 'GET' })
    await handler(req, res)
    expect(state.statusCode).toBe(405)
  })

  it('400 when no tag or path', async () => {
    const { req, res, state } = createApiMocks({ method: 'POST', body: {} })
    await handler(req, res)
    expect(state.statusCode).toBe(400)
    expect((state.jsonBody as { ok: boolean }).ok).toBe(false)
  })

  it('401 when unauthorized', async () => {
    vi.stubEnv('NEXT_PUBLIC_REVALIDATE_SECRET', 'secret-key')
    const { req, res, state } = createApiMocks({
      method: 'POST',
      body: { path: '/blog' },
    })
    await handler(req, res)
    expect(state.statusCode).toBe(401)
    vi.unstubAllEnvs()
  })

  it('revalidates by path', async () => {
    const { req, res, state } = createApiMocks({
      method: 'POST',
      body: { path: '/blog' },
    })
    const spy = vi.spyOn(res, 'revalidate')
    await handler(req, res)
    expect(state.statusCode).toBe(200)
    expect(spy).toHaveBeenCalledWith('/blog')
    expect((state.jsonBody as { revalidated: string[] }).revalidated).toContain(
      '/blog',
    )
  })

  it('maps cms-page-<slug> tag to paths', async () => {
    const { req, res, state } = createApiMocks({
      method: 'POST',
      body: { tag: 'cms-page-hakkimda' },
    })
    const spy = vi.spyOn(res, 'revalidate')
    await handler(req, res)
    expect(state.statusCode).toBe(200)
    expect(spy).toHaveBeenCalledWith('/hakkimda')
    expect(spy).toHaveBeenCalledWith('/')
  })

  it('accepts Bearer authorization', async () => {
    vi.stubEnv('NEXT_PUBLIC_REVALIDATE_SECRET', 'secret-key')
    const { req, res, state } = createApiMocks({
      method: 'POST',
      headers: { authorization: 'Bearer secret-key' },
      body: { path: '/' },
    })
    await handler(req, res)
    expect(state.statusCode).toBe(200)
    vi.unstubAllEnvs()
  })
})
