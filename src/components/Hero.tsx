import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { site } from '../content/site'
import { EASE } from '../lib/ease'
import { useLang } from '../lib/langContext'
import { scrollToId } from '../lib/smooth'
import { useReduced } from '../lib/useReduced'
import { LazyDotField } from './LazyDotField'
import { MARK_PATH } from './Logo'
import { Lines, Magnetic } from './motion'

export function Hero({ ready }: { ready: boolean }) {
  const { t, lang } = useLang()
  const reduced = useReduced()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const markY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const fade = (d: number) => ({
    initial: { opacity: 0, y: 14 } as const,
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: reduced ? 0 : 0.7, ease: EASE, delay: reduced ? 0 : d },
  })

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          maskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, #000 15%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, #000 15%, transparent 80%)',
        }}
      >
        <LazyDotField />
      </div>

      {/* accent mark: outline draws once, node floats gently */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 end-[var(--gutter)] top-[16svh] h-[24svh] sm:top-[20svh] sm:h-[36svh] lg:end-[calc((100vw-1240px)/2+var(--gutter))] xl:end-[max(var(--gutter),calc((100vw-1240px)/2))]"
        style={{ y: reduced ? 0 : markY }}
      >
        <svg viewBox="0 0 300 328" className="h-full w-auto overflow-visible">
          <motion.path
            d={MARK_PATH}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.28"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={ready ? { pathLength: 1 } : undefined}
            transition={{ duration: reduced ? 0 : 1.4, ease: EASE, delay: 0.1 }}
          />
          <motion.g
            className="node-float"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.9 }}
          >
            <circle cx="180" cy="180" r="48" fill="#fff" />
          </motion.g>
        </svg>
      </motion.div>

      <div className="wrap relative flex flex-1 flex-col justify-center pt-28 pb-6">
        <motion.p className="label mb-6 flex items-center gap-3 text-mute" {...fade(0)}>
          <span className="inline-block size-1.5 rounded-full bg-paper" />
          {t(site.hero.eyebrow)}
        </motion.p>

        <h1 className="text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.15] font-extrabold tracking-[-0.025em]">
          <span className="sr-only">{t(site.brand)}: </span>
          <Lines key={lang} lines={site.hero.lines[lang]} go={ready} lineClass={['', 'muted-line']} />
        </h1>

        <div className="mt-8 grid items-end gap-6 lg:mt-10 lg:grid-cols-12">
          <motion.p className="max-w-[30rem] text-base leading-[1.9] text-mute sm:text-[1.0625rem] lg:col-span-6" {...fade(0.3)}>
            {t(site.hero.sub)}
          </motion.p>
          <motion.div className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end" {...fade(0.4)}>
            <Magnetic strength={0.14}>
              <a href="#projects" onClick={(e) => (e.preventDefault(), scrollToId('projects'))} className="btn btn-solid cut">
                {t(site.hero.primary)}
                <span className="arrow arrow-dir" aria-hidden="true">↗</span>
              </a>
            </Magnetic>
            <a href="#contact" onClick={(e) => (e.preventDefault(), scrollToId('contact'))} className="btn btn-ghost cut">
              {t(site.hero.secondary)}
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div className="wrap pb-6" {...fade(0.5)}>
        <div className="flex items-end justify-between border-t border-line pt-4">
          <a href="#about" onClick={(e) => (e.preventDefault(), scrollToId('about'))} className="label flex items-center gap-3 text-mute hover:text-paper">
            <span className="relative block h-8 w-px overflow-hidden bg-line" aria-hidden="true">
              <span className="cue-dot absolute inset-x-0 top-0 block h-full w-px bg-paper" />
            </span>
            {t(site.ui.scroll)}
          </a>
          <span className="label text-mute">
            {t(site.hero.side)} <span className="mx-1 text-paper">/</span> <span className="display">TrueFlow</span>
          </span>
        </div>
      </motion.div>
    </section>
  )
}
