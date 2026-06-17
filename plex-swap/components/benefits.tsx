'use client'

import { ShieldOff, Zap, UserX, Coins } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export function Benefits() {
  const { t } = useLanguage()

  const items = [
    { icon: ShieldOff, title: t.benefits.b1t, desc: t.benefits.b1d },
    { icon: Zap, title: t.benefits.b2t, desc: t.benefits.b2d },
    { icon: UserX, title: t.benefits.b3t, desc: t.benefits.b3d },
    { icon: Coins, title: t.benefits.b4t, desc: t.benefits.b4d },
  ]

  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-primary">
            {t.benefits.tag}
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.benefits.title}
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.title}
              className="group bg-card p-7 transition-colors hover:bg-secondary/40"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <it.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">
                {it.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
