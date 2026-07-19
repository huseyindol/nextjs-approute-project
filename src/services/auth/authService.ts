import { BaseResponse } from '@/types/BaseResponse'
import { fetcher } from '@/utils/services/fetcher'

// --- Register ---

export interface RegisterPayload {
  username: string
  email: string
  password: string
  firstName?: string
  lastName?: string
  tenantId: string
}

export interface RegisterResult {
  userId: number
  username: string
  email: string
  message: string
}

export const registerService = async (
  payload: RegisterPayload,
): Promise<RegisterResult> => {
  const res = await fetcher<BaseResponse<RegisterResult>>('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.result) throw new Error(res.message ?? 'Kayıt başarısız')
  return res.data
}

// --- Login ---

export interface LoginPayload {
  usernameOrEmail: string
  password: string
  /** Gönderilmez — tenant URL'den (/api/v1/public/{tid}) çözülür. Opsiyonel bırakıldı. */
  tenantId?: string
  loginType: 'tenant'
}

export interface LoginResult {
  token: string
  refreshToken: string
  userId: number
  username: string
  email: string
  userCode: string
  expiredDate: number
  refreshExpiredDate?: number
  roles: string[]
  permissions: string[]
}

export const loginService = async (
  payload: LoginPayload,
): Promise<LoginResult> => {
  const res = await fetcher<BaseResponse<LoginResult>>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.result) throw new Error(res.message ?? 'Giriş başarısız')
  return res.data
}

// --- Sosyal Giriş (Google / GitHub) ---

export type SocialProvider = 'google' | 'github'

/**
 * Provider'dan gelen authorization code'u backend'e iletir; takas + kullanıcı
 * bul/bağla/oluştur backend'de yapılır ve normal login ile aynı LoginResult döner.
 * Tenant URL'den çözülür (/api/v1/public/{tid}) — payload'da tenantId yok.
 */
export const socialLoginService = async (
  provider: SocialProvider,
  payload: { code: string; redirectUri: string },
): Promise<LoginResult> => {
  const res = await fetcher<BaseResponse<LoginResult>>(
    `/auth/social/${provider}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
  )
  if (!res.result) throw new Error(res.message ?? 'Sosyal giriş başarısız')
  return res.data
}

// --- Email Verify ---

export const verifyEmailService = async (
  token: string,
  tenantId: string,
): Promise<void> => {
  const params = new URLSearchParams({ token, tenantId })
  const res = await fetcher<BaseResponse<boolean>>(
    `/auth/verify?${params.toString()}`,
    { method: 'GET' },
  )
  if (!res.result) throw new Error(res.message ?? 'Doğrulama başarısız')
}
