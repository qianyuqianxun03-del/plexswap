'use client'

import { useLanguage } from '@/components/language-provider'

export function HowItWorks() {
  const { t } = useLanguage()

  const steps = [
    { n: '01', title: t.how.step1t, desc: t.how.step1d },
    { n: '02', title: t.how.step2t, desc: t.how.step2d },
    { n: '03', title: t.how.step3t, desc: t.how.step3d },
    { n: '04', title: t.how.step4t, desc: t.how.step4d },
  ]

  return (
    <section id="how" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary">{t.how.tag}</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.how.title}
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-3xl font-semibold text-primary/40">
                  {s.n}
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="absolute right-[-13px] top-1/2 hidden h-px w-6 -translate-y-1/2 bg-border lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
