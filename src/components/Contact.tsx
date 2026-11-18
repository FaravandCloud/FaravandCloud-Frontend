import { m as motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { site } from '../content/site'
import { useLang } from '../lib/langContext'
import { useReduced } from '../lib/useReduced'
import { SectionLabel } from './About'
import { MARK_PATH } from './Logo'
import { Lines, Magnetic, Reveal, Rule } from './motion'

export function Contact() {
  const { t, lang } = useLang()
  const reduced = useReduced()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], [-30, 20])
  const c = site.contact

  return (
    <section ref={ref} id="contact" className="relative isolate overflow-hidden py-[var(--section)]">
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 300 328"
        className="pointer-events-none absolute -z-10 end-[4%] top-[8%] h-[70%] w-auto opacity-[0.07]"
        style={{ y: reduced ? 0 : y }}
      >
        <path d={MARK_PATH} fill="none" stroke="#fff" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <circle cx="180" cy="180" r="48" fill="#fff" fillOpacity="0.6" />
      </motion.svg>
      <div className="wrap">
        <SectionLabel index={5} label={t(c.label)} />
        <h2 className="mt-8 text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.2] font-extrabold tracking-[-0.025em]">
          <Lines key={lang} lines={c.lines[lang]} inView lineClass={['', 'muted-line']} />
        </h2>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="max-w-[28rem] text-base leading-[2] text-mute">{t(c.body)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Magnetic strength={0.14}>
                <a href={site.phone.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-solid cut">
                  {t(c.button)}
                  <span className="arrow arrow-dir" aria-hidden="true">↗</span>
                </a>
              </Magnetic>
              <a href={`tel:${site.phone.tel}`} className="btn btn-ghost cut">
                {t(c.call)}
              </a>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <a
              href={`tel:${site.phone.tel}`}
              className="display block text-[clamp(1.25rem,2.6vw,2.25rem)] leading-[1.3] font-medium tracking-[-0.02em]"
              style={{ unicodeBidi: 'isolate' }}
            >
              <span dir="ltr" className="u-sweep u-line inline-block" style={{ paddingBottom: '0.12em' }}>{t(site.phone.display)}</span>
            </a>
            <Rule className="mt-8" />
            <p className="label mt-5 text-mute">{t(c.followTitle)}</p>
            <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-2">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="u-sweep display inline-flex items-center gap-2 text-base font-medium">
                    {s.label}
                    <span className="arrow arrow-dir text-xs" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-mute"><bdi dir="ltr" className="display">@{site.handle}</bdi></p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
