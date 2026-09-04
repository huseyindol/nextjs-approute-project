/**
 * Sessiz oturum yenileme — istemci sarmalayıcısı (`/api/auth/refresh`).
 *
 * refreshToken httpOnly olduğu için istemci onu okuyamaz; yenileme sunucuda
 * yapılır ve yeni cookie'ler yanıtla yazılır.
 */
export async function refreshSession(): Promise<{
  ok: boolean
  expiredDate?: number
}> {
  try {
    const res = await fetch('/api/auth/refresh', { method: 'POST' })
    return (await res.json()) as { ok: boolean; expiredDate?: number }
  } catch {
    return { ok: false }
  }
}
