import { animate } from 'motion'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Mark } from '../components/Logo'
import { pathFor } from '../content/config'
import type { Lang } from '../content/site'
import { applyHead } from '../seo'
import { Ctx, toFa, type LangCtx } from './langContext'
import { scrollToTop } from './smooth'
import { useReduced } from './useReduced'

function applyDoc(l: Lang) {
  const el = document.documentElement
  el.lang = l
  el.dir = l === 'fa' ? 'rtl' : 'ltr'
  applyHead(l)
}

const SWIPE = [0.65, 0, 0.35, 1] as const

export function LangProvider({ children, initialLang }: { children: ReactNode; initialLang: Lang }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const reduced = useReduced()
  const curtain = useRef<HTMLDivElement>(null)
  const busy = useRef(false)

  // browser back/forward between / and /en/
  useEffect(() => {
    const onPop = () => {
      const l: Lang = location.pathname.startsWith('/en') ? 'en' : 'fa'
      setLangState(l)
      applyDoc(l)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const commit = useCallback((next: Lang) => {
    setLangState(next)
    applyDoc(next)
    history.pushState(null, '', pathFor(next) + location.hash)
    scrollToTop()
  }, [])

  const setLang = useCallback(
    async (next: Lang) => {
      if (busy.current || next === lang) return
      const el = curtain.current
      if (reduced || !el) {
        commit(next)
        return
      }
      busy.current = true
      el.style.visibility = 'visible'
      await animate(el, { clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'] }, { duration: 0.22, ease: SWIPE })
      commit(next)
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
      await animate(el, { clipPath: 'inset(0 0 100% 0)' }, { duration: 0.26, ease: SWIPE })
      el.style.visibility = 'hidden'
      busy.current = false
    },
    [lang, reduced, commit],
  )

  const value = useMemo<LangCtx>(
    () => ({
      lang,
      dir: lang === 'fa' ? 'rtl' : 'ltr',
      setLang,
      t: (v) => v[lang],
      n: (v) => (lang === 'fa' ? toFa(v) : String(v)),
    }),
    [lang, setLang],
  )

  return (
    <Ctx.Provider value={value}>
      {children}
      <div
        ref={curtain}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[150] grid place-items-center bg-paper text-ink"
        style={{ clipPath: 'inset(100% 0 0 0)', visibility: 'hidden' }}
      >
        <Mark className="h-12 w-auto" />
      </div>
    </Ctx.Provider>
  )
}
