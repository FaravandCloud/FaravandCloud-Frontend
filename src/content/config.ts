/**
 * Single source of the public origin. Override with VITE_SITE_URL at build time.
 * It must be the address visitors end up on: the bare domain redirects to www,
 * so www is the canonical one.
 */
const env = (import.meta as { env?: Record<string, string | undefined> }).env
export const SITE_URL = (env?.VITE_SITE_URL || 'https://www.faravandtech.ir').replace(/\/+$/, '')

export const pathFor = (lang: 'fa' | 'en') => (lang === 'fa' ? '/' : '/en/')
export const urlFor = (lang: 'fa' | 'en') => SITE_URL + pathFor(lang)

/** Ownership codes for search engines (optional; DNS verification needs neither). */
export const GOOGLE_SITE_VERIFICATION = env?.VITE_GOOGLE_SITE_VERIFICATION || ''
export const BING_SITE_VERIFICATION = env?.VITE_BING_SITE_VERIFICATION || ''
