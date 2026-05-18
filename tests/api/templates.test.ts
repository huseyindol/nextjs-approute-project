import { GET, OPTIONS } from '@/app/api/templates/route'
import { createMockRequest } from '@tests/utils/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('node:fs', () => ({
  default: {
    existsSync: vi.fn(),
    readdirSync: vi.fn(),
  },
  existsSync: vi.fn(),
  readdirSync: vi.fn(),
}))

vi.mock('@/lib/rate-limiter-store', () => ({
  apiRateLimiter: {
    check: vi.fn(),
  },
}))

vi.mock('@/lib/security', () => ({
  getClientIp: vi.fn(() => '127.0.0.1'),
}))

import fs from 'node:fs'
import { apiRateLimiter } from '@/lib/rate-limiter-store'

const mockFs = vi.mocked(fs)
const mockRateLimiter = vi.mocked(apiRateLimiter)

describe('Templates API', () => {
  beforeEach(() => {
    mockRateLimiter.check.mockResolvedValue({
      success: true,
      limit: 60,
      remaining: 59,
      reset: Date.now() + 60000,
    })
    mockFs.existsSync.mockReturnValue(false)
    mockFs.readdirSync.mockReturnValue([])
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /api/templates', () => {
    it('should return 429 when rate limit exceeded', async () => {
      mockRateLimiter.check.mockResolvedValue({
        success: false,
        limit: 60,
        remaining: 0,
        reset: Date.now() + 60000,
      })

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/templates',
      })

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(429)
      expect(data.error).toBe('Too many requests')
    })

    it('should return all template types when no type param', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/templates',
      })

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('pages')
      expect(data).toHaveProperty('posts')
      expect(data).toHaveProperty('components')
      expect(data).toHaveProperty('widgets')
    })

    it('should return placeholder when directory does not exist', async () => {
      mockFs.existsSync.mockReturnValue(false)

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/templates?type=pages',
      })

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual([{ value: '', label: 'Template Seçin' }])
    })

    it('should return templates sorted with placeholder first', async () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue([
        'ZTemplate.tsx',
        'ATemplate.tsx',
        'MTemplate.tsx',
      ] as unknown as ReturnType<typeof fs.readdirSync>)

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/templates?type=pages',
      })

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data[0]).toEqual({ value: '', label: 'Template Seçin' })
      expect(data[1].value).toBe('ATemplate')
      expect(data[2].value).toBe('MTemplate')
      expect(data[3].value).toBe('ZTemplate')
    })

    it('should filter out index files and non-tsx/ts files', async () => {
      mockFs.existsSync.mockReturnValue(true)
      mockFs.readdirSync.mockReturnValue([
        'PageTemplate.tsx',
        'index.tsx',
        'index.ts',
        'readme.md',
        'styles.css',
      ] as unknown as ReturnType<typeof fs.readdirSync>)

      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/templates?type=pages',
      })

      const response = await GET(request)
      const data = await response.json()

      expect(data).toHaveLength(2)
      expect(data[0]).toEqual({ value: '', label: 'Template Seçin' })
      expect(data[1]).toEqual({ value: 'PageTemplate', label: 'PageTemplate' })
    })

    it('should return 200 for valid type param', async () => {
      const validTypes = ['pages', 'posts', 'components', 'widgets']

      for (const type of validTypes) {
        const request = createMockRequest({
          method: 'GET',
          url: `http://localhost:3000/api/templates?type=${type}`,
        })

        const response = await GET(request)
        expect(response.status).toBe(200)
      }
    })

    it('should return all types for invalid type param', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/templates?type=invalid',
      })

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('pages')
      expect(data).toHaveProperty('posts')
      expect(data).toHaveProperty('components')
      expect(data).toHaveProperty('widgets')
    })

    it('should include CORS headers', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/templates',
      })

      const response = await GET(request)

      expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET')
    })

    it('should include Cache-Control header', async () => {
      const request = createMockRequest({
        method: 'GET',
        url: 'http://localhost:3000/api/templates',
      })

      const response = await GET(request)

      expect(response.headers.get('Cache-Control')).toContain('s-maxage=3600')
    })
  })

  describe('OPTIONS /api/templates', () => {
    it('should return 204 with CORS headers', async () => {
      const response = await OPTIONS()

      expect(response.status).toBe(204)
      expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET')
    })
  })
})
