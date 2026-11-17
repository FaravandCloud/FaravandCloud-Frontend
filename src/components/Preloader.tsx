import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { EASE } from '../lib/ease'
import { useReduced } from '../lib/useReduced'
import { MARK_PATH } from './Logo'

/** ~1.3s: the stroke draws, fills, the dot fades in, then a quick curtain. */
export function Preloader({ onLeave, onDone }: { onLeave: () => void; onDone: () => void }) {
  const reduced = useReduced()
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const id = setTimeout(
      () => {
        setLeaving(true)
        onLeave()
      },
      reduced ? 200 : 850,
    )
    return () => clearTimeout(id)
  }, [reduced, onLeave])

  return (
    <motion.div
      id="preloader"
      className="fixed inset-0 z-[300] grid place-items-center bg-ink text-paper"
      role="status"
      aria-label="Loading"
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      animate={leaving ? { clipPath: 'inset(0 0 100% 0)' } : undefined}
      transition={{ duration: reduced ? 0.15 : 0.42, ease: EASE }}
      onAnimationComplete={() => leaving && onDone()}
    >
      <motion.svg
        viewBox="-6 -6 312 340"
        className="h-20 w-auto sm:h-24"
        aria-hidden="true"
        animate={leaving ? { opacity: 0 } : undefined}
        transition={{ duration: 0.2 }}
      >
        <motion.path
          d={MARK_PATH}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{
            pathLength: { duration: reduced ? 0 : 0.45, ease: EASE },
            fillOpacity: { duration: reduced ? 0 : 0.25, delay: reduced ? 0 : 0.35, ease: EASE },
          }}
        />
        <motion.circle
          cx="180"
          cy="180"
          r="48"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: '180px 180px', transformBox: 'view-box' }}
          transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.5, ease: EASE }}
        />
      </motion.svg>
    </motion.div>
  )
}
