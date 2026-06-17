'use client'

import { ShieldCheck, Zap, UserX } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { SwapWidget } from '@/components/swap-widget'

export function SwapSection() {
  const { t } = useLanguage()

  const points = [
    { icon: ShieldCheck, label: t.benefits.b1t },
    { icon: Zap, label: t.benefits.b2t },
    { icon: UserX, label: t.benefits.b3t },
  ]

  return (
    <section
      id="swap"
      className="relative overflow-hidden border-y border-border bg-secondary/20 py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="text-sm font-medium text-primary">{t.swap.tag}</span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t.swap.title}
          </h2>
          <p className="mt-4 max-w-md text-pretty text-muted-foreground">
            {t.swap.subtitle}
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p.label} className="flex items-center gap-3 text-sm text-foreground">
                <span className="flex size-7 items-center justify-center rounded-full bg-success/15 text-success">
                  <p.icon className="size-4" />
                </span>
                {p.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
          <SwapWidget />
        </div>
      </div>
    </section>
  )
}
