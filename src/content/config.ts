/** Single source of the public origin. Override with VITE_SITE_URL at build time. */
const env = (import.meta as { env?: Record<string, string | undefined> }).env
export const SITE_URL = (env?.VITE_SITE_URL || 'https://faravandtech.ir').replace(/\/+$/, '')

export const pathFor = (lang: 'fa' | 'en') => (lang === 'fa' ? '/' : '/en/')
export const urlFor = (lang: 'fa' | 'en') => SITE_URL + pathFor(lang)
