import { motion } from 'motion/react'
import { site } from '../content/site'
import { EASE, VIEW } from '../lib/ease'
import { useLang } from '../lib/langContext'
import { scrollToId, scrollToTop } from '../lib/smooth'
import { useReduced } from '../lib/useReduced'
import { Reveal, Rule } from './motion'

const NOW = new Date()

export function Footer() {
  const { t, lang, n } = useLang()
  const reduced = useReduced()
  const year = new Intl.DateTimeFormat(lang === 'fa' ? 'fa-IR-u-ca-persian' : 'en-US', { year: 'numeric' }).format(NOW)
  const f = site.footer
  const mark = lang === 'fa' ? { w: 694, h: 386, cls: 'w-[min(100%,20vw)] min-w-[9rem]' } : { w: 1418, h: 260, cls: 'w-[min(100%,60vw)]' }
  return (
    <footer className="relative pt-12 pb-6">
      <div className="wrap">
        <Rule />
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xl font-bold">{t(site.legalName)}</p>
            <p className="mt-2 max-w-xs text-[0.9375rem] leading-[1.9] text-mute">{t(site.hero.sub)}</p>
          </div>
          <nav aria-label={t(f.sitemapTitle)} className="lg:col-span-2 lg:col-start-7">
            <p className="label text-mute">{t(f.sitemapTitle)}</p>
            <ul className="mt-3 grid gap-1.5 text-[0.9375rem]">
              {site.nav.links.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} onClick={(e) => (e.preventDefault(), scrollToId(l.id))} className="u-sweep">{t(l.label)}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-2">
            <p className="label text-mute">{t(f.productsTitle)}</p>
            <ul className="mt-3 grid gap-1.5 text-[0.9375rem]">
              {site.projects.items.map((p) => (
                <li key={p.id}>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="u-sweep">{t(p.name)} ↗</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="label text-mute">{t(site.contact.label)}</p>
            <ul className="mt-3 grid gap-1.5 text-[0.9375rem]">
              <li><a href={`mailto:${site.email}`} className="u-sweep display" style={{ unicodeBidi: 'isolate' }}>{site.email}</a></li>
              {site.social.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="u-sweep display">{s.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div className="mt-14 overflow-hidden sm:mt-20" initial="hidden" whileInView="show" viewport={VIEW}>
          <motion.div
            variants={{ hidden: { y: '100%' }, show: { y: 0, transition: { duration: reduced ? 0 : 0.8, ease: EASE } } }}
          >
            <img
              key={lang}
              src={`/brand/wordmark-${lang}-white.svg`}
              width={mark.w}
              height={mark.h}
              alt={t(site.brand)}
              loading="lazy"
              decoding="async"
              className={`mx-auto block h-auto select-none ${mark.cls}`}
              draggable={false}
            />
          </motion.div>
        </motion.div>

        <Reveal y={12} className="mt-8 flex flex-col gap-3 border-t border-line pt-5 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <span className="digits">{n(year)}</span> {t(site.legalName)}. {t(f.rights)}
          </p>
          <div className="flex items-center gap-6">
            <span className="display">{site.domain}</span>
            <button type="button" onClick={scrollToTop} className="u-sweep cursor-pointer">{t(f.top)} ↑</button>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
