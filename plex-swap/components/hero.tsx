'use client'

import { ShieldCheck, Zap, Layers } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { Button } from '@/components/ui/button'
import { SwapWidget } from '@/components/swap-widget'

export function Hero() {
  const { t } = useLanguage()

  const stats = [
    { value: t.hero.stat1, label: t.hero.stat1label },
    { value: t.hero.stat2, label: t.hero.stat2label },
    { value: t.hero.stat3, label: t.hero.stat3label },
    { value: t.hero.stat4, label: t.hero.stat4label },
  ]

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background grid + glow */}
      <div className="grid-glow pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {t.hero.badge}
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {t.hero.title1}
              <br />
              <span className="text-primary">{t.hero.title2}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground lg:mx-0">
              {t.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="w-full rounded-full sm:w-auto">
                <a href="#swap">{t.hero.ctaPrimary}</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full rounded-full border-border bg-transparent sm:w-auto"
              >
                <a href="#security">{t.hero.ctaSecondary}</a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4 text-success" />
                {t.benefits.b1t}
              </span>
              <span className="inline-flex items-center gap-2">
                <Zap className="size-4 text-success" />
                {t.benefits.b2t}
              </span>
              <span className="inline-flex items-center gap-2">
                <Layers className="size-4 text-success" />
                {t.benefits.b4t}
              </span>
            </div>
          </div>

          {/* Right widget */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
            <SwapWidget />
          </div>
        </div>

        {/* Stat row */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card px-6 py-6 text-center lg:text-left">
              <div className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
