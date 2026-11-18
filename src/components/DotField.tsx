import { useEffect, useRef } from 'react'

/**
 * Ambient dot-field canvas. The grid of dots ripples slowly; on fine pointers the
 * dots near the cursor swell and part. On touch / reduced motion it renders statically.
 */
export function DotField({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const parent = canvas.parentElement!
    const fine = window.matchMedia('(pointer: fine) and (hover: hover)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animated = fine && !reduced && window.innerWidth >= 768

    let w = 0
    let h = 0
    let gap = 38
    let dpr = 1
    let raf = 0
    let visible = true
    // pre-rendered dot: one drawImage per dot instead of path + fill
    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = 64
    const sc = sprite.getContext('2d')!
    sc.fillStyle = '#fff'
    sc.beginPath()
    sc.arc(32, 32, 31, 0, Math.PI * 2)
    sc.fill()
    const mouse = { x: -9999, y: -9999, px: -9999, py: -9999 }

    const resize = () => {
      const r = parent.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      gap = w < 640 ? 32 : 44
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(performance.now())
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h)
      // ease pointer
      mouse.px += (mouse.x - mouse.px) * 0.14
      mouse.py += (mouse.y - mouse.py) * 0.14
      const R = 190
      const cols = Math.ceil(w / gap) + 1
      const rows = Math.ceil(h / gap) + 1
      const ox = (w - (cols - 1) * gap) / 2
      const oy = (h - (rows - 1) * gap) / 2
      const time = animated ? t * 0.00055 : 0
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = ox + i * gap
          let y = oy + j * gap
          const wave = Math.sin(x * 0.0065 + y * 0.0042 + time * 2.2) * Math.cos(y * 0.006 - time * 1.4)
          let r = 1 + wave * 0.35
          let a = 0.2 + wave * 0.1
          if (animated) {
            const dx = x - mouse.px
            const dy = y - mouse.py
            const d = Math.hypot(dx, dy)
            if (d < R) {
              const f = Math.pow(1 - d / R, 2)
              r += f * 3.2
              a += f * 0.7
              x += (dx / (d || 1)) * f * 12
              y += (dy / (d || 1)) * f * 12
            }
          }
          ctx!.globalAlpha = Math.max(0.04, Math.min(1, a))
          const rr = Math.max(0.5, r)
          ctx!.drawImage(sprite, x - rr, y - rr, rr * 2, rr * 2)
        }
      }
    }

    const loop = (t: number) => {
      if (visible && !document.hidden) draw(t)
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = mouse.y = -9999
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(parent)
    if (animated) {
      parent.addEventListener('pointermove', onMove, { passive: true })
      parent.addEventListener('pointerleave', onLeave)
      raf = requestAnimationFrame(loop)
    }
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={`absolute inset-0 size-full ${className}`} />
}
