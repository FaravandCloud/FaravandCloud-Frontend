import type Lenis from 'lenis'

let lenis: Lenis | null = null
let locked = false

/** Load and start Lenis lazily (after first paint). Returns a cleanup. */
export async function startSmooth(): Promise<() => void> {
  const { default: L } = await import('lenis')
  lenis = new L({ autoRaf: true, lerp: 0.12, wheelMultiplier: 1 })
  if (locked) lenis.stop()
  return () => {
    lenis?.destroy()
    lenis = null
  }
}

export function lockScroll() {
  locked = true
  lenis?.stop()
  document.documentElement.style.overflow = 'hidden'
}

export function unlockScroll() {
  locked = false
  lenis?.start()
  document.documentElement.style.overflow = ''
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { duration: 1, easing: (t) => 1 - Math.pow(1 - t, 3) })
  else el.scrollIntoView({ behavior: 'auto' })
}
