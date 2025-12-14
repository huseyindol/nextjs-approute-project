import { POST } from '@/app/api/contact/route'
import { createMockRequest } from '@tests/utils/test-utils'
import { describe, expect, it, vi } from 'vitest'

// Mock Resend
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ error: null }),
    },
  })),
}))

// Mock react-email render
vi.mock('@react-email/render', () => ({
  render: vi.fn().mockResolvedValue('<html>Email content</html>'),
}))

describe('Contact API', () => {
  describe('POST /api/contact', () => {
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
      const originalKey = process.env.NEXT_PUBLIC_RESEND_API_KEY
      delete process.env.NEXT_PUBLIC_RESEND_API_KEY

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

      // Restore
      if (originalKey) {
        process.env.NEXT_PUBLIC_RESEND_API_KEY = originalKey
      }
    })

    it('should return 200 for valid request', async () => {
      // Set dummy API key
      process.env.NEXT_PUBLIC_RESEND_API_KEY = 're_test_key'

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
    })
  })
})
