import { AnimatePresence, m as motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { site } from '../content/site'
import { EASE } from '../lib/ease'
import { useLang } from '../lib/langContext'
import { lockScroll, scrollToId, scrollToTop, unlockScroll } from '../lib/smooth'
import { Logo } from './Logo'
import { Magnetic } from './motion'

function LangToggle() {
  const { lang, setLang, t } = useLang()
  const target = lang === 'fa' ? 'en' : 'fa'
  return (
    <a
      href={target === 'en' ? '/en/' : '/'}
      hrefLang={target}
      onClick={(e) => (e.preventDefault(), setLang(target))}
      aria-label={`${t(site.ui.langShort)} · ${t(site.ui.langLabel)}`}
      className="relative grid h-9 min-w-9 place-items-center overflow-hidden rounded-full px-3 text-[0.8125rem] font-semibold ring-1 ring-current/40 ring-inset transition-colors hover:bg-white hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={lang}
          className="display block"
          initial={{ y: '80%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-80%', opacity: 0 }}
          transition={{ duration: 0.18, ease: EASE }}
        >
          {t(site.ui.langShort)}
        </motion.span>
      </AnimatePresence>
    </a>
  )
}

export function Nav({ ready }: { ready: boolean }) {
  const { t } = useLang()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    if (open) return
    if (y > prev && y > 160) setHidden(true)
    else if (y < prev - 2 || y < 80) setHidden(false)
  })

  useEffect(() => {
    if (!open) return
    lockScroll()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      unlockScroll()
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => scrollToId(id), 30)
  }

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-[120] transition-[background-color,box-shadow,color] duration-300 ${
          open
            ? 'text-ink'
            : scrolled
              ? 'bg-ink/80 text-white shadow-[inset_0_-1px_0_var(--color-line)] backdrop-blur-md'
              : 'text-white'
        }`}
        initial={{ y: '-100%' }}
        animate={{ y: ready && !hidden ? 0 : '-100%' }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className="wrap flex h-16 items-center justify-between gap-6">
          <a href="#top" onClick={(e) => (e.preventDefault(), setOpen(false), scrollToTop())} aria-label={t(site.brand)}>
            <Logo label={t(site.brand)} />
          </a>

          <nav aria-label={t(site.ui.mainNav)} className="hidden items-center gap-8 md:flex">
            {site.nav.links.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={go(l.id)} className="u-sweep text-sm font-medium">
                {t(l.label)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LangToggle />
            <Magnetic strength={0.14} className="hidden md:inline-block">
              <a href="#contact" onClick={go('contact')} className="btn btn-solid cut !px-4 !py-2 !text-[0.8125rem]">
                {t(site.nav.cta)}
              </a>
            </Magnetic>
            <button
              type="button"
              className="grid size-9 cursor-pointer place-items-center md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t(site.ui.close) : t(site.ui.menu)}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-2.5 w-6" aria-hidden="true">
                <span className={`absolute inset-x-0 h-px bg-current transition-all duration-300 ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
                <span className={`absolute inset-x-0 h-px bg-current transition-all duration-300 ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[110] flex flex-col bg-paper px-[var(--gutter)] pt-24 pb-8 text-ink"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <nav aria-label={t(site.ui.mainNav)} className="flex flex-1 flex-col justify-center">
              {site.nav.links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  className="border-b border-line-ink py-4 text-4xl font-bold"
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }}
                >
                  {t(l.label)}
                </motion.a>
              ))}
            </nav>
            <a href="#contact" onClick={go('contact')} className="btn btn-ink cut justify-center">
              {t(site.nav.cta)}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
