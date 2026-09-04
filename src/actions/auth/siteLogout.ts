/**
 * Tenant-site çıkışı — istemci sarmalayıcısı (`/api/auth/logout`).
 * Cookie temizliği sunucuda yapılır (httpOnly olanlar istemciden silinemez).
 */
export async function siteLogout(): Promise<void> {
  try {
    await fetch('/api/auth/logout', { method: 'POST' })
  } catch {
    // Ağ hatası: istemci tarafı temizlik çağıranda zaten yapılıyor.
  }
}
