import { m as motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { site, type Project } from '../content/site'
import { useLang } from '../lib/langContext'
import { useReduced } from '../lib/useReduced'
import { SectionLabel } from './About'
import { Lines, Reveal } from './motion'

/** Abstract "one cycle" visual: six nodes on a ring with one travelling node. CSS/SVG only. */
function CycleVisual({ nodes, center }: { nodes: string[]; center: string }) {
  const size = 560
  const c = size / 2
  const R = 170
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" role="img" aria-label={nodes.join(' > ')}>
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.11" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={c} cy={c} r={c - 4} fill="url(#glow)" />
      {[R + 62, R, R - 62, R - 112].map((r, i) => (
        <circle key={r} cx={c} cy={c} r={r} fill="none" stroke="#fff" strokeOpacity={i === 1 ? 0.34 : 0.12} strokeWidth="1" strokeDasharray={i === 0 ? '2 7' : i === 2 ? '1 5' : undefined} />
      ))}
      <g className="orbit" style={{ transformOrigin: `${c}px ${c}px`, transformBox: 'view-box' }}>
        <circle cx={c} cy={c - R} r="7" fill="#fff" />
        <circle cx={c} cy={c - R} r="16" fill="none" stroke="#fff" strokeOpacity="0.4" />
      </g>
      {nodes.map((label, i) => {
        const ang = (i / nodes.length) * Math.PI * 2 - Math.PI / 2
        const x = c + Math.cos(ang) * R
        const y = c + Math.sin(ang) * R
        const lx = c + Math.cos(ang) * (R + 36)
        const ly = c + Math.sin(ang) * (R + 36)
        const anchor = Math.abs(Math.cos(ang)) < 0.2 ? 'middle' : Math.cos(ang) > 0 ? 'start' : 'end'
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="4.5" fill="#0a0a0a" stroke="#fff" strokeWidth="1.5" />
            <text x={lx} y={ly + 4} textAnchor={anchor} fill="#fff" fillOpacity="0.75" fontSize="19" fontFamily="'Dana','Sora Variable',sans-serif">
              {label}
            </text>
          </g>
        )
      })}
      <text x={c} y={c + 8} textAnchor="middle" fill="#fff" fontSize="26" fontWeight="700" fontFamily="'Sora Variable','Dana',sans-serif">
        {center}
      </text>
    </svg>
  )
}

function FeaturedCard({ p }: { p: Project }) {
  const { t, lang, n } = useLang()
  const reduced = useReduced()
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const spot = useMotionTemplate`radial-gradient(480px circle at ${useTransform(mx, (v) => v * 100)}% ${useTransform(my, (v) => v * 100)}%, rgb(255 255 255 / 0.09), transparent 62%)`
  const spotOpacity = useMotionValue(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const vy = useTransform(scrollYProgress, [0, 1], [20, -20])

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
    spotOpacity.set(1)
  }

  return (
    <a
      ref={ref}
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t(p.name)} (${p.hrefLabel}) · ${t(p.kind)}`}
      onPointerMove={onMove}
      onPointerLeave={() => spotOpacity.set(0)}
      className="group cut shape-card relative block overflow-hidden bg-ink text-paper"
    >
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10" style={{ background: spot, opacity: spotOpacity, transition: 'opacity .3s' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.07)] transition-shadow duration-500 group-hover:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.28)]" />
      <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-6 lg:p-12">
        <div className="flex flex-col lg:col-span-6">
          <p className="label flex items-center gap-3 text-mute">
            <span className="digits">{n('01')}</span>
            <span className="h-px w-8 bg-line" />
            <span>{t(site.projects.featured)}</span>
          </p>
          <h3 className="display mt-10 text-[clamp(2.5rem,4.6vw,4.25rem)] leading-[1.05] font-semibold tracking-[-0.035em]">TrueFlow</h3>
          <p className="mt-2 text-lg leading-[1.5] text-mute sm:text-xl">{t(p.kind)}</p>
          <p className="mt-6 max-w-[32rem] text-[0.9375rem] leading-[2] text-mute sm:text-base">{t(p.description)}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {t(p.tags).map((tag) => (
              <li key={tag} className="rounded-full px-3.5 py-1 text-xs shadow-[inset_0_0_0_1px_rgb(255_255_255/0.22)]">{tag}</li>
            ))}
          </ul>
          <span className="mt-auto flex items-center gap-3 pt-10">
            <span className="display grid size-11 place-items-center overflow-hidden rounded-full bg-paper text-base text-ink">
              <span className="arrow arrow-dir">↗</span>
            </span>
            <span className="display font-medium"><span className="u-sweep">{p.hrefLabel}</span></span>
          </span>
        </div>
        <motion.div className="relative mx-auto aspect-square w-full max-w-[26rem] lg:col-span-6 lg:max-w-none" style={{ y: reduced ? 0 : vy }}>
          <CycleVisual nodes={p.cycle[lang]} center="TrueFlow" />
        </motion.div>
      </div>
    </a>
  )
}

export function Projects() {
  const { t, lang } = useLang()
  const pr = site.projects
  return (
    <section id="projects" className="slab">
      <div className="wrap">
        <SectionLabel index={3} label={t(pr.label)} dark={false} />
        <h2 className="mt-8 mb-10 text-[clamp(2rem,4vw,3.75rem)] leading-[1.25] font-extrabold tracking-[-0.02em] lg:mb-14">
          <Lines key={lang} lines={pr.title[lang]} inView lineClass={['', 'muted-line-ink']} />
        </h2>
        <div className="grid gap-6">
          {pr.items.map((p) => (
            <Reveal key={p.id} y={24}><FeaturedCard p={p} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
