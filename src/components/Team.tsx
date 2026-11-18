import { m as motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { site, type Member } from '../content/site'
import { EASE, VIEW } from '../lib/ease'
import { useLang } from '../lib/langContext'
import { useReduced } from '../lib/useReduced'
import { SectionLabel } from './About'
import { Lines, Reveal } from './motion'

function Portrait({ m }: { m: Member }) {
  const { t, n } = useLang()
  const reduced = useReduced()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  return (
    <div ref={ref} className="group relative">
      {/* the trigger sits on the frame: a fully clipped element never reports as visible */}
      <motion.div
        className="cut shape-card relative aspect-[4/5] overflow-hidden bg-[#141414]"
        initial="hidden"
        whileInView="show"
        viewport={VIEW}
      >
        <motion.div
          className="absolute inset-0"
          variants={{
            hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
            show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: reduced ? 0 : 1, ease: EASE } },
          }}
        >
          <motion.img
            src={m.photo}
            alt={t(m.name)}
            width={460}
            height={460}
            loading="lazy"
            decoding="async"
            className="absolute inset-[-6%] h-[112%] w-[112%] max-w-none object-cover grayscale contrast-[1.08] transition-[filter] duration-700 group-hover:grayscale-0"
            style={{ y: reduced ? 0 : y }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
        </motion.div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1)]" />
        <span aria-hidden="true" className="absolute start-6 top-6 size-2.5 rounded-full bg-paper" />
        <p className="label absolute inset-x-5 bottom-5 flex items-center justify-between text-paper">
          <span className="digits">{n('01')}</span>
          <bdi dir="ltr" className="display">{m.handle}</bdi>
        </p>
      </motion.div>
      <Reveal delay={0.15}>
        <blockquote className="mt-6 border-s border-line ps-4 text-[0.9375rem] leading-[1.9] text-mute">
          {t(m.motto)}
        </blockquote>
      </Reveal>
    </div>
  )
}

function MemberBlock({ m }: { m: Member }) {
  const { t, lang } = useLang()
  return (
    <article className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="mx-auto w-full max-w-[22rem] lg:col-span-4 lg:mx-0 lg:max-w-none">
        <Portrait m={m} />
      </div>

      <div className="lg:col-span-7 lg:col-start-6 lg:self-center">
        <Reveal>
          <p className="label text-mute">{t(m.role)}</p>
        </Reveal>
        <h3 className="mt-3 text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.2] font-extrabold tracking-[-0.02em]">
          <Lines key={lang} lines={[t(m.name)]} inView />
        </h3>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-[38rem] text-base leading-[2] text-mute sm:text-[1.0625rem]">{t(m.bio)}</p>
        </Reveal>
        <Reveal delay={0.14}>
          <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
            {m.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="group u-sweep display inline-flex items-center gap-2 text-[0.9375rem] font-medium">
                  {l.label}
                  <span className="arrow arrow-dir text-xs" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </article>
  )
}

export function Team() {
  const { t, lang } = useLang()
  const tm = site.team
  return (
    <section id="team" className="relative py-[var(--section)]">
      <div className="wrap">
        <SectionLabel index={4} label={t(tm.label)} />
        <h2 className="mt-8 mb-10 text-[clamp(2rem,4vw,3.75rem)] leading-[1.25] font-extrabold tracking-[-0.02em] lg:mb-14">
          <Lines key={lang} lines={tm.title[lang]} inView lineClass={['', 'muted-line']} />
        </h2>
        <div className="grid gap-16">
          {tm.members.map((m) => (
            <MemberBlock key={m.id} m={m} />
          ))}
        </div>
      </div>
    </section>
  )
}
