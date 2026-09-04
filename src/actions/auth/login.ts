import type { LoginPayload } from '@/services/auth/authService'

/**
 * BFF login — istemci sarmalayıcısı.
 *
 * Eskiden server action'dı; Pages Router'da server action olmadığı için aynı iş
 * `/api/auth/login` route'una taşındı. GÜVENLİK MODELİ AYNI: backend çağrısı ve
 * httpOnly cookie yazımı sunucuda olur, tarayıcı token'ı hiç görmez. Çağrı
 * same-origin olduğu için CORS/preflight de yok.
 *
 * İmza bilinçli olarak korundu — çağıran sayfaların değişmesi gerekmiyor.
 */
export async function login(
  payload: LoginPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return (await res.json()) as { ok: true } | { ok: false; error: string }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Giriş başarısız.',
    }
  }
}
