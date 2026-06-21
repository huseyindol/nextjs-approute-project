'use server'

import { saveTokens } from './saveTokens'
import { loginService, type LoginPayload } from '@/services/auth/authService'

/**
 * BFF login: backend login çağrısı SUNUCUDA yapılır (server-to-server → preflight
 * yok, tenant domain'ini api CORS'una eklemeye gerek yok). Dönen token'lar host-only
 * httpOnly cookie'ye yazılır. Tarayıcı yalnız same-origin bu server action'ı çağırır.
 */
export async function login(
  payload: LoginPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const r = await loginService(payload)
    await saveTokens({
      token: r.token,
      refreshToken: r.refreshToken,
      username: r.username,
      expiredDate: r.expiredDate,
      userCode: r.userCode,
    })
    return { ok: true }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Giriş başarısız.',
    }
  }
}
