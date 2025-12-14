/**
 * Security utility functions
 */

import { createHash, randomBytes } from 'crypto'

/**
 * Generate a secure random token
 */
export function generateSecureToken(length: number = 32): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''

  // Use crypto for secure random generation
  if (typeof window !== 'undefined' && window.crypto) {
    const array = new Uint32Array(length)
    window.crypto.getRandomValues(array)

    for (let i = 0; i < length; i++) {
      token += characters[array[i] % characters.length]
    }
  } else {
    // Fallback for Node.js
    const buffer = randomBytes(length)

    for (let i = 0; i < length; i++) {
      token += characters[buffer[i] % characters.length]
    }
  }

  return token
}

/**
 * Sanitize user input to prevent XSS
 * Note: This is a basic implementation. For production, use a library like DOMPurify
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Check if a string contains only alphanumeric characters
 */
export function isAlphanumeric(str: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(str)
}

/**
 * Generate Content Security Policy header value
 */
export function generateCSP(): string {
  const policies = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://vercel.live https://*.vercel-insights.com https://www.google-analytics.com https://raw.githubusercontent.com https://avatars.githubusercontent.com",
    "frame-src 'self' https://vercel.live",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    'upgrade-insecure-requests',
  ]

  return policies.join('; ')
}

/**
 * Get client IP address from request headers
 */
export function getClientIp(headers: Headers): string {
  // Check common headers used by proxies and load balancers
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIp = headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  // Fallback to a default value
  return '127.0.0.1'
}

/**
 * Check if request is from a bot
 */
export function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false

  const botPatterns = [
    /bot/i,
    /spider/i,
    /crawl/i,
    /slurp/i,
    /mediapartners/i,
    /google/i,
    /bing/i,
    /yahoo/i,
    /duckduckbot/i,
  ]

  return botPatterns.some(pattern => pattern.test(userAgent))
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(
  token: string | null,
  expectedToken: string,
): boolean {
  if (!token) return false
  return token === expectedToken
}

/**
 * Hash a string using SHA-256
 */
export async function hashString(input: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    // Browser
    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  } else {
    // Node.js
    return createHash('sha256').update(input).digest('hex')
  }
}
