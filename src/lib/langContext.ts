import { createContext, useContext } from 'react'
import type { L, Lang } from '../content/site'

export interface LangCtx {
  lang: Lang
  dir: 'rtl' | 'ltr'
  setLang: (l: Lang) => void
  /** pick the active-language value */
  t: <T>(v: L<T>) => T
  /** localise digits (Persian digits in fa) */
  n: (v: number | string) => string
}

export const Ctx = createContext<LangCtx | null>(null)

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹'
export const toFa = (v: number | string) => String(v).replace(/\d/g, (d) => FA_DIGITS[Number(d)])

export function useLang() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useLang outside LangProvider')
  return c
}
