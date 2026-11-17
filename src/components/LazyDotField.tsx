import { useEffect, useState, type ComponentType } from 'react'

/** Loads the canvas dot-field after first paint (client only). */
export function LazyDotField() {
  const [Comp, setComp] = useState<ComponentType | null>(null)
  useEffect(() => {
    let cancelled = false
    const id = setTimeout(() => {
      import('./DotField').then((m) => {
        if (!cancelled) setComp(() => m.DotField)
      })
    }, 250)
    return () => {
      cancelled = true
      clearTimeout(id)
    }
  }, [])
  return Comp ? <Comp /> : null
}
