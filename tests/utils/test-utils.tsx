import { render, RenderOptions } from '@testing-library/react'
import { NextRequest } from 'next/server'
import { ReactElement, ReactNode } from 'react'
import { vi } from 'vitest'

/**
 * Custom render function that includes providers
 */
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  // Wrapper with all providers
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return <>{children}</>
  }

  return render(ui, { wrapper: Wrapper, ...options })
}

/**
 * Mock fetch function
 */
export function createMockFetch(
  response: unknown,
  status: number = 200,
  ok: boolean = true,
) {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => response,
    text: async () => JSON.stringify(response),
    headers: new Headers(),
  })
}

/**
 * Wait for async operations
 */
export function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Mock headers
 */
export function createMockHeaders(
  headers: Record<string, string> = {},
): Headers {
  const mockHeaders = new Headers()
  Object.entries(headers).forEach(([key, value]) => {
    mockHeaders.set(key, value)
  })
  return mockHeaders
}

/**
 * Mock NextRequest
 */
export function createMockRequest(options: {
  method?: string
  url?: string
  headers?: Record<string, string>
  body?: unknown
  ip?: string
}) {
  const {
    method = 'GET',
    url = 'http://localhost:3000',
    headers = {},
    body,
    ip = '127.0.0.1',
  } = options

  const mockHeaders = createMockHeaders(headers)

  return {
    method,
    url,
    headers: mockHeaders,
    nextUrl: new URL(url),
    ip,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as NextRequest
}

// Re-export everything from testing-library
export * from '@testing-library/react'
export { customRender as render }

// ─── Pages Router API (NextApiRequest/Response) mock'ları ───────────────
import type { NextApiRequest, NextApiResponse } from 'next'

export function createApiMocks(options: {
  method?: string
  query?: Record<string, string | string[]>
  headers?: Record<string, string>
  cookies?: Record<string, string>
  body?: unknown
}) {
  const req = {
    method: options.method ?? 'GET',
    query: options.query ?? {},
    headers: options.headers ?? {},
    cookies: options.cookies ?? {},
    body: options.body,
  } as unknown as NextApiRequest

  const state = {
    statusCode: 200,
    jsonBody: undefined as unknown,
    headers: {} as Record<string, string>,
    ended: false,
  }

  const res = {
    status(code: number) {
      state.statusCode = code
      return res
    },
    json(payload: unknown) {
      state.jsonBody = payload
      state.ended = true
      return res
    },
    end() {
      state.ended = true
      return res
    },
    setHeader(k: string, v: string) {
      state.headers[k.toLowerCase()] = v
      return res
    },
    getHeader(k: string) {
      return state.headers[k.toLowerCase()]
    },
    revalidate: async () => {},
  } as unknown as NextApiResponse

  return { req, res, state }
}
