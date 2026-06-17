'use client'

import { Check, X } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export function WhyUs() {
  const { t } = useLanguage()

  const rows = [
    { label: t.why.row1, ex: t.why.row1ex, us: t.why.row1us, exBad: false, usBad: true },
    { label: t.why.row2, ex: t.why.row2ex, us: t.why.row2us, exBad: true, usBad: false },
    { label: t.why.row3, ex: t.why.row3ex, us: t.why.row3us, exBad: true, usBad: false },
    { label: t.why.row4, ex: t.why.row4ex, us: t.why.row4us, exBad: true, usBad: false },
    { label: t.why.row5, ex: t.why.row5ex, us: t.why.row5us, exBad: true, usBad: false },
    { label: t.why.row6, ex: t.why.row6ex, us: t.why.row6us, exBad: true, usBad: false },
  ]

  return (
    <section id="why" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary">{t.why.tag}</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.why.title}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">{t.why.subtitle}</p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border">
          {/* header row */}
          <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-secondary/40 text-sm font-medium">
            <div className="px-4 py-4 text-muted-foreground">
              {t.why.compareTitle}
            </div>
            <div className="px-4 py-4 text-center text-muted-foreground">
              {t.why.ex}
            </div>
            <div className="bg-primary/15 px-4 py-4 text-center text-foreground">
              {t.why.us}
            </div>
          </div>

          {rows.map((r, i) => (
            <div
              key={r.label}
              className={`grid grid-cols-[1.2fr_1fr_1fr] items-center text-sm ${
                i % 2 ? 'bg-card/40' : 'bg-transparent'
              }`}
            >
              <div className="px-4 py-4 text-foreground">{r.label}</div>
              <div className="flex items-center justify-center gap-1.5 px-4 py-4 text-center text-muted-foreground">
                {r.exBad ? (
                  <X className="size-3.5 shrink-0 text-destructive" />
                ) : null}
                <span>{r.ex}</span>
              </div>
              <div className="flex h-full items-center justify-center gap-1.5 bg-primary/10 px-4 py-4 text-center text-foreground">
                {!r.usBad ? (
                  <Check className="size-3.5 shrink-0 text-success" />
                ) : null}
                <span>{r.us}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-pretty text-center text-sm leading-relaxed text-muted-foreground">
          {t.why.conclusion}
        </p>
      </div>
    </section>
  )
}
