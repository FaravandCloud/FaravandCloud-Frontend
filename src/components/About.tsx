import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { site } from '../content/site'
import { EASE, VIEW } from '../lib/ease'
import { useLang } from '../lib/langContext'
import { useReduced } from '../lib/useReduced'
import { Mark } from './Logo'
import { Reveal, Rule, ScrollWords } from './motion'

export function SectionLabel({ index, label, dark = true, as: Tag = 'div' }: { index: number; label: string; dark?: boolean; as?: 'div' | 'h2' }) {
  const { n, dir } = useLang()
  const reduced = useReduced()
  const from = dir === 'rtl' ? 14 : -14
  const slide = {
    initial: { opacity: 0, x: from },
    whileInView: { opacity: 1, x: 0 },
    viewport: VIEW,
  }
  return (
    <Tag className={`label m-0 flex items-center gap-4 ${dark ? 'text-mute' : 'text-mute-ink'}`}>
      <motion.span className="digits" {...slide} transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}>
        {n(String(index).padStart(2, '0'))}
      </motion.span>
      <Rule dark={dark} className="w-10 sm:w-14" delay={0.1} />
      <motion.span {...slide} transition={{ duration: reduced ? 0 : 0.6, ease: EASE, delay: 0.08 }}>
        {label}
      </motion.span>
    </Tag>
  )
}

export function About() {
  const { t, n } = useLang()
  const reduced = useReduced()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const markY = useTransform(scrollYProgress, [0, 1], [-24, 24])
  const a = site.about

  return (
    <section ref={ref} id="about" className="relative py-[var(--section)]">
      <div className="wrap">
        <SectionLabel index={1} label={t(a.label)} as="h2" />

        <ScrollWords
          text={t(a.statement)}
          className="mt-10 max-w-[34ch] text-[clamp(1.5rem,2.9vw,2.75rem)] leading-[1.6] font-bold lg:max-w-[40ch]"
        />

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Reveal><p className="label text-mute">{t(a.pointsTitle)}</p></Reveal>
          </div>
          <ul className="grid gap-8 sm:grid-cols-3 lg:col-span-9 lg:gap-10">
            {a.points.map((p, i) => (
              <Reveal as="li" key={i} delay={i * 0.06} className="border-t border-line pt-4">
                <span className="label digits text-mute">{n(String(i + 1).padStart(2, '0'))}</span>
                <h3 className="mt-3 text-lg leading-snug font-bold">{t(p.title)}</h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.85] text-mute">{t(p.body)}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mt-16 grid items-center gap-8 lg:mt-24 lg:grid-cols-12">
          <div className="relative grid place-items-center overflow-hidden border border-line py-10 lg:col-span-4 lg:py-14">
            <motion.div style={{ y: reduced ? 0 : markY }}>
              <Mark className="h-28 w-auto sm:h-32 lg:h-36" />
            </motion.div>
            <span className="label absolute start-4 top-4 text-mute">F / ف</span>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-6">
            <h3 className="label text-mute">{t(a.nameTitle)}</h3>
            <p className="mt-4 max-w-[34rem] text-base leading-[2] sm:text-lg">{t(a.nameBody)}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
