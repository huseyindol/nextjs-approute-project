import { POST } from '@/app/api/contact/route'
import { createMockRequest } from '@tests/utils/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Mock Resend with proper class constructor
vi.mock('resend', () => {
  const MockResend = vi.fn().mockImplementation(function () {
    return {
      emails: {
        send: vi.fn().mockResolvedValue({ error: null }),
      },
    }
  })
  return { Resend: MockResend }
})

// Mock react-email render
vi.mock('@react-email/render', () => ({
  render: vi.fn().mockResolvedValue('<html>Email content</html>'),
}))

describe('Contact API', () => {
  describe('POST /api/contact', () => {
    beforeEach(() => {
      // Set default API key for all tests
      vi.stubEnv('NEXT_PUBLIC_RESEND_API_KEY', 're_default_test_key')
    })

    afterEach(() => {
      vi.unstubAllEnvs()
    })

    it('should return 400 for missing fields', async () => {
      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/contact',
        body: {},
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Tüm alanlar gereklidir')
    })

    it('should return 400 for invalid email', async () => {
      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/contact',
        body: {
          name: 'John Doe',
          email: 'invalid-email',
          message: 'Test message',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Geçerli bir e-posta')
    })

    it('should return 503 when API key is not configured', async () => {
      vi.stubEnv('NEXT_PUBLIC_RESEND_API_KEY', '')

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/contact',
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(503)
      expect(data.error).toContain('Email servisi yapılandırılmamış')

      vi.unstubAllEnvs()
    })

    it('should return 200 for valid request', async () => {
      vi.stubEnv('NEXT_PUBLIC_RESEND_API_KEY', 're_test_key')

      const request = createMockRequest({
        method: 'POST',
        url: 'http://localhost:3000/api/contact',
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toContain('başarıyla gönderildi')

      vi.unstubAllEnvs()
    })
  })
})
