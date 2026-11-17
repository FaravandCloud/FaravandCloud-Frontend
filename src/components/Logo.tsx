import type { SVGProps } from 'react'

export const MARK_PATH = 'M0 328V80a80 80 0 0 1 80-80h220l-52 84H100a16 16 0 0 0-16 16v228z'

/** The Faravand mark (300x328). Uses currentColor. */
export function Mark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 300 328" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d={MARK_PATH} />
      <circle cx="180" cy="180" r="48" />
    </svg>
  )
}

/** Mark + wordmark text, for nav. */
export function Logo({ label, className = '' }: { label: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Mark className="h-7 w-auto shrink-0" />
      <span className="display-fa text-[1.25rem] leading-none font-bold tracking-tight">{label}</span>
    </span>
  )
}
