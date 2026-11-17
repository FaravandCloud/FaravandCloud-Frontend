import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useVelocity } from 'motion/react'
import { useRef } from 'react'
import { site } from '../content/site'
import { useLang } from '../lib/langContext'
import { useReduced } from '../lib/useReduced'

/** Constant-speed marquee; scroll direction gently steers it. */
export function Marquee() {
  const { lang, t } = useLang()
  const reduced = useReduced()
  const x = useMotionValue(0)
  const track = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const vel = useVelocity(scrollY)
  const dir = useSpring(1, { stiffness: 40, damping: 20 })
  const words = site.marquee.words[lang]

  useAnimationFrame((_, delta) => {
    if (reduced || !track.current) return
    const half = track.current.scrollWidth / 2
    if (!half) return
    const v = vel.get()
    if (Math.abs(v) > 120) dir.set(v > 0 ? 1 : -1)
    let next = x.get() - dir.get() * 55 * (Math.min(delta, 50) / 1000)
    if (next <= -half) next += half
    if (next > 0) next -= half
    x.set(next)
  })

  const row = (k: string, hidden?: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined} key={k}>
      {words.map((w, i) => (
        <span key={i} className="flex items-center">
          <span className="px-[clamp(1.25rem,3vw,2.5rem)] text-[clamp(1.5rem,2.8vw,2.5rem)] leading-[1.5] font-bold whitespace-nowrap">{w}</span>
          <span className="size-[clamp(0.4rem,0.8vw,0.625rem)] shrink-0 rounded-full bg-ink" />
        </span>
      ))}
    </div>
  )

  return (
    <section aria-label={t(site.ui.marqueeLabel)} className="relative z-10 overflow-hidden bg-paper py-1 text-ink" dir="ltr">
      <motion.div ref={track} className="flex w-max" style={{ x }}>
        {row('a')}
        {row('b', true)}
      </motion.div>
    </section>
  )
}
