import { site } from '../content/site'
import { useLang } from '../lib/langContext'
import { SectionLabel } from './About'
import { Lines, Reveal, Rule } from './motion'

export function Work() {
  const { t, n, lang } = useLang()
  const w = site.work

  return (
    <section id="work" className="relative pb-[var(--section)]">
      <div className="wrap">
        <SectionLabel index={2} label={t(w.label)} />
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <h2 className="text-[clamp(2rem,4vw,3.75rem)] leading-[1.25] font-extrabold tracking-[-0.02em] lg:col-span-7">
            <Lines key={lang} lines={w.title[lang]} inView lineClass={['', 'muted-line']} />
          </h2>
          <Reveal className="self-end lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="max-w-[26rem] text-base leading-[1.9] text-mute">{t(w.intro)}</p>
          </Reveal>
        </div>

        <ul className="mt-12 lg:mt-16">
          <Rule />
          {w.items.map((it, i) => (
            <li key={i} className="group relative">
              <Reveal className="grid items-baseline gap-x-8 gap-y-2 py-6 lg:grid-cols-12 lg:py-8">
                <span className="label digits text-mute lg:col-span-1">{n(String(i + 1).padStart(2, '0'))}</span>
                <h3 className="row-title flex items-center gap-4 text-[clamp(1.25rem,2vw,1.875rem)] leading-[1.4] font-bold lg:col-span-6">
                  {t(it.title)}
                  <span className="row-arrow text-lg" aria-hidden="true">←</span>
                </h3>
                <p className="max-w-[30rem] text-[0.9375rem] leading-[1.85] text-mute lg:col-span-4 lg:col-start-9">{t(it.body)}</p>
              </Reveal>
              <div className="absolute inset-x-0 bottom-0 h-px bg-line" aria-hidden="true" />
              <div className="row-line absolute inset-x-0 bottom-0 h-px bg-paper" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
