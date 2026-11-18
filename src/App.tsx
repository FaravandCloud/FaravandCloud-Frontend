import { LazyMotion } from 'motion/react'
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { Preloader } from './components/Preloader'
import { Projects } from './components/Projects'
import { Team } from './components/Team'
import { Work } from './components/Work'
import { site } from './content/site'
import { useLang } from './lib/langContext'
import { lockScroll, startSmooth, unlockScroll } from './lib/smooth'
import { useReduced } from './lib/useReduced'

const loadFeatures = () => import('./lib/features').then((m) => m.default)
const SEEN = 'faravand-intro'
const noop = () => () => {}
const readSeen = () => {
  try {
    return sessionStorage.getItem(SEEN) === '1'
  } catch {
    return false
  }
}

export default function App() {
  const { t } = useLang()
  const reduced = useReduced()
  // server + hydration render the intro; returning visitors in the same session skip it
  const seen = useSyncExternalStore(noop, readSeen, () => false)
  const [leaving, setLeaving] = useState(false)
  const [finished, setFinished] = useState(false)
  const intro = !seen && !finished
  const ready = seen || leaving || finished

  useEffect(() => {
    if (!intro) return
    lockScroll()
    return () => unlockScroll()
  }, [intro])

  useEffect(() => {
    if (reduced) return
    let stop: (() => void) | undefined
    let cancelled = false
    const start = () => startSmooth().then((s) => (cancelled ? s() : (stop = s)))
    const id = window.setTimeout(start, 200)
    return () => {
      cancelled = true
      clearTimeout(id)
      stop?.()
    }
  }, [reduced])

  const onLeave = useCallback(() => setLeaving(true), [])
  const onDone = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN, '1')
    } catch {
      /* ignore */
    }
    setFinished(true)
  }, [])

  return (
    <LazyMotion features={loadFeatures}>
      <a href="#main" className="sr-only-focus fixed start-4 top-4 z-[500] bg-paper px-4 py-2 text-ink">
        {t(site.ui.skip)}
      </a>
      {intro && <Preloader onLeave={onLeave} onDone={onDone} />}
      <div className="gridlines" aria-hidden="true"><div><div /></div></div>
      <Nav ready={ready} />
      <main id="main">
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Work />
        <Projects />
        <Team />
        <Contact />
      </main>
      <Footer />
    </LazyMotion>
  )
}
