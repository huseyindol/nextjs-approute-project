import handler from '@/pages/api/contact'
import { createApiMocks } from '@tests/utils/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('resend', () => {
  const MockResend = vi.fn().mockImplementation(function () {
    return { emails: { send: vi.fn().mockResolvedValue({ error: null }) } }
  })
  return { Resend: MockResend }
})

vi.mock('@react-email/render', () => ({
  render: vi.fn().mockResolvedValue('<html>Email content</html>'),
}))

describe('Contact API (pages/api/contact)', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_RESEND_API_KEY', 're_default_test_key')
  })
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('405 for non-POST', async () => {
    const { req, res, state } = createApiMocks({ method: 'GET' })
    await handler(req, res)
    expect(state.statusCode).toBe(405)
  })

  it('400 for missing fields', async () => {
    const { req, res, state } = createApiMocks({ method: 'POST', body: {} })
    await handler(req, res)
    expect(state.statusCode).toBe(400)
    expect((state.jsonBody as { error: string }).error).toContain(
      'Tüm alanlar gereklidir',
    )
  })

  it('400 for invalid email', async () => {
    const { req, res, state } = createApiMocks({
      method: 'POST',
      body: { name: 'John', email: 'invalid-email', message: 'Test' },
    })
    await handler(req, res)
    expect(state.statusCode).toBe(400)
    expect((state.jsonBody as { error: string }).error).toContain(
      'Geçerli bir e-posta',
    )
  })

  it('503 when API key not configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_RESEND_API_KEY', '')
    const { req, res, state } = createApiMocks({
      method: 'POST',
      body: { name: 'John', email: 'john@example.com', message: 'Test' },
    })
    await handler(req, res)
    expect(state.statusCode).toBe(503)
    expect((state.jsonBody as { error: string }).error).toContain(
      'Email servisi yapılandırılmamış',
    )
  })

  it('200 for valid request', async () => {
    vi.stubEnv('NEXT_PUBLIC_RESEND_API_KEY', 're_test_key')
    const { req, res, state } = createApiMocks({
      method: 'POST',
      body: { name: 'John', email: 'john@example.com', message: 'Test' },
    })
    await handler(req, res)
    expect(state.statusCode).toBe(200)
    expect((state.jsonBody as { message: string }).message).toContain(
      'başarıyla gönderildi',
    )
  })
})
