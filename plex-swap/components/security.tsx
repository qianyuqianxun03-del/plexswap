'use client'

import {
  Lock,
  Tag,
  Link2,
  KeyRound,
  Headset,
  Network,
} from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export function Security() {
  const { t } = useLanguage()

  const items = [
    { icon: Lock, title: t.security.s1t, desc: t.security.s1d },
    { icon: Tag, title: t.security.s2t, desc: t.security.s2d },
    { icon: Link2, title: t.security.s3t, desc: t.security.s3d },
    { icon: KeyRound, title: t.security.s4t, desc: t.security.s4d },
    { icon: Headset, title: t.security.s5t, desc: t.security.s5d },
    { icon: Network, title: t.security.s6t, desc: t.security.s6d },
  ]

  return (
    <section
      id="security"
      className="relative overflow-hidden border-y border-border bg-secondary/20 py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute -bottom-40 right-0 size-[36rem] rounded-full bg-success/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium text-success">
            {t.security.tag}
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.security.title}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            {t.security.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-success/15 text-success">
                <it.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
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
