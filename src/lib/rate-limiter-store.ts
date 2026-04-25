import { RateLimiter, RateLimitPresets } from './rate-limiter'

const globalForRateLimiter = globalThis as unknown as {
  __apiRateLimiter?: RateLimiter
  __generalRateLimiter?: RateLimiter
}

export const apiRateLimiter: RateLimiter =
  globalForRateLimiter.__apiRateLimiter ??
  (globalForRateLimiter.__apiRateLimiter = new RateLimiter(
    RateLimitPresets.api,
  ))

export const generalRateLimiter: RateLimiter =
  globalForRateLimiter.__generalRateLimiter ??
  (globalForRateLimiter.__generalRateLimiter = new RateLimiter(
    RateLimitPresets.moderate,
  ))
