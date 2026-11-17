import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(QUERY)
  m.addEventListener('change', cb)
  return () => m.removeEventListener('change', cb)
}

/** Hydration-safe reduced-motion flag (false on the server and during hydration). */
export function useReduced() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false)
}
