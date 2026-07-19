/**
 * Sosyal giriş (Google / GitHub) provider konfigürasyonu.
 *
 * Burada yalnız PUBLIC client id'ler bulunur (NEXT_PUBLIC_* build-time inline).
 * Client secret'lar BACKEND'dedir — code takası backend'de yapılır
 * (POST /api/v1/public/{tid}/auth/social/{provider}).
 */
import type { SocialProvider } from '@/services/auth/authService'

export const OAUTH_STATE_COOKIE = 'oauth_state'

interface ProviderConfig {
  clientId: string | undefined
  authUrl: string
  scope: string
  extraParams?: Record<string, string>
}

const PROVIDERS: Record<SocialProvider, ProviderConfig> = {
  google: {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scope: 'openid email profile',
    extraParams: { prompt: 'select_account' },
  },
  github: {
    clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    authUrl: 'https://github.com/login/oauth/authorize',
    scope: 'read:user user:email',
  },
}

export function isSocialProvider(value: string): value is SocialProvider {
  return value === 'google' || value === 'github'
}

/** Callback URL'i — provider konsollarındaki "Authorized redirect URI" ile birebir aynı olmalı. */
export function buildRedirectUri(
  origin: string,
  provider: SocialProvider,
): string {
  return `${origin}/api/auth/social/callback/${provider}`
}

/** Provider yetkilendirme URL'ini kurar; client id yapılandırılmamışsa null döner. */
export function buildAuthorizeUrl(
  provider: SocialProvider,
  origin: string,
  state: string,
): string | null {
  const cfg = PROVIDERS[provider]
  if (!cfg.clientId) return null
  const params = new URLSearchParams({
    client_id: cfg.clientId,
    redirect_uri: buildRedirectUri(origin, provider),
    scope: cfg.scope,
    state,
    ...(provider === 'google' ? { response_type: 'code' } : {}),
    ...cfg.extraParams,
  })
  return `${cfg.authUrl}?${params.toString()}`
}
