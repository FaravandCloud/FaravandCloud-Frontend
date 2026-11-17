import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { EASE, VIEW } from '../lib/ease'
import { useReduced } from '../lib/useReduced'

const D = 0.7

/** Fade/slide in when ~15% visible. */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'p' | 'li' | 'span' | 'h2' | 'h3'
}) {
  const reduced = useReduced()
  const Tag = motion[as] as typeof motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: reduced ? 0 : D, ease: EASE, delay: reduced ? 0 : delay }}
    >
      {children}
    </Tag>
  )
}

/** Hairline that grows from the inline-start edge. */
export function Rule({ className = '', dark = true, delay = 0 }: { className?: string; dark?: boolean; delay?: number }) {
  const reduced = useReduced()
  return (
    <motion.div
      aria-hidden="true"
      className={`h-px ltr:origin-left rtl:origin-right ${dark ? 'bg-line' : 'bg-line-ink'} ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEW}
      transition={{ duration: reduced ? 0 : 0.9, ease: EASE, delay }}
    />
  )
}

/** Masked line-by-line reveal. The trigger sits on the unclipped outer element. */
export function Lines({
  lines,
  className = '',
  lineClass = '',
  go = true,
  inView = false,
  delay = 0,
}: {
  lines: string[]
  className?: string
  lineClass?: string[] | string
  go?: boolean
  inView?: boolean
  delay?: number
}) {
  const reduced = useReduced()
  const cls = (i: number) => (Array.isArray(lineClass) ? lineClass[i] : lineClass)
  return (
    <motion.span
      className={`block ${className}`}
      initial="hidden"
      {...(inView ? { whileInView: 'show', viewport: VIEW } : { animate: go ? 'show' : 'hidden' })}
    >
      {lines.map((line, i) => (
        <span key={i} className="-my-[0.12em] block overflow-hidden py-[0.12em]">
          <motion.span
            className={`block ${cls(i) ?? ''}`}
            variants={{
              hidden: { y: '110%' },
              show: { y: 0, transition: { duration: reduced ? 0 : D, ease: EASE, delay: reduced ? 0 : delay + i * 0.07 } },
            }}
          >
            {line}
          </motion.span>
          {/* keeps the words apart when the heading is read as plain text */}
          {i < lines.length - 1 ? ' ' : null}
        </span>
      ))}
    </motion.span>
  )
}

/** Small magnetic pull toward the pointer (fine pointers only). */
export function Magnetic({ children, strength = 0.18, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 })
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <>
      <motion.span style={{ opacity }}>{word}</motion.span>{' '}
    </>
  )
}

/** Word-by-word scroll-linked reveal. */
export function ScrollWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReduced()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'end 0.6'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) =>
        reduced ? (
          <span key={i}>{w} </span>
        ) : (
          <Word key={i} word={w} range={[i / words.length, Math.min(1, (i + 1.6) / words.length)]} progress={scrollYProgress} />
        ),
      )}
    </p>
  )
}
