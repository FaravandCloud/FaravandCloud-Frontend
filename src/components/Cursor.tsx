import { useEffect, useState } from 'react'

const FINE = '(pointer: fine) and (hover: hover)'
const REDUCED = '(prefers-reduced-motion: reduce)'
const HOT = 'a, button, [role="button"], summary, label, input, textarea, select'

/**
 * Custom cursor for mouse users: a precise dot plus a softly trailing ring.
 * The ring grows over anything clickable and presses in on click. Blend mode keeps it
 * visible on both the dark and the white sections. Touch devices and reduced-motion
 * users keep the native cursor; nothing renders on the server.
 */
export function Cursor() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia(FINE)
    const reduced = window.matchMedia(REDUCED)
    const update = () => setOn(fine.matches && !reduced.matches)
    update()
    fine.addEventListener('change', update)
    reduced.addEventListener('change', update)
    return () => {
      fine.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!on) return
    const root = document.documentElement
    const dot = document.getElementById('cursor-dot')!
    const ring = document.getElementById('cursor-ring')!
    let x = -100
    let y = -100
    let rx = x
    let ry = y
    let raf = 0
    let seen = false

    const frame = () => {
      rx += (x - rx) * 0.2
      ry += (y - ry) * 0.2
      dot.style.transform = `translate3d(${x}px,${y}px,0)`
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`
      raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.1 ? requestAnimationFrame(frame) : 0
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX
      y = e.clientY
      if (!seen) {
        seen = true
        rx = x
        ry = y
        root.classList.add('cursor-on')
      }
      const hot = (e.target as Element | null)?.closest?.(HOT)
      root.classList.toggle('cursor-hot', !!hot)
      kick()
    }
    const onDown = () => root.classList.add('cursor-down')
    const onUp = () => root.classList.remove('cursor-down')
    const onLeave = () => root.classList.remove('cursor-on')
    const onEnter = () => seen && root.classList.add('cursor-on')

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)
    root.classList.add('has-cursor')
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
      root.classList.remove('has-cursor', 'cursor-on', 'cursor-hot', 'cursor-down')
    }
  }, [on])

  if (!on) return null
  return (
    <div aria-hidden="true" className="cursor">
      <div id="cursor-ring" className="cursor-pos"><span className="cursor-ring" /></div>
      <div id="cursor-dot" className="cursor-pos"><span className="cursor-dot" /></div>
    </div>
  )
}
