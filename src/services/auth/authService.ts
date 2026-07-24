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
  if (!res || !res.result) throw new Error(res?.message ?? 'Kayıt başarısız')
  return res.data
}

// --- Login ---

export interface LoginPayload {
  usernameOrEmail: string
  password: string
  tenantId: string
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
  if (!res || !res.result) throw new Error(res?.message ?? 'Giriş başarısız')
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
  if (!res || !res.result)
    throw new Error(res?.message ?? 'Doğrulama başarısız')
}
