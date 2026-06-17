'use client'

import { useLanguage } from '@/components/language-provider'

const COINS = [
  'BTC', 'ETH', 'USDT', 'USDC', 'SOL', 'TON', 'XMR', 'BNB',
  'TRX', 'LTC', 'DOGE', 'ADA', 'XRP', 'DOT', 'AVAX', 'MATIC',
  'LINK', 'ATOM', 'NEAR', 'APT',
]

export function CoinsMarquee() {
  const { t } = useLanguage()
  const loop = [...COINS, ...COINS]

  return (
    <section className="border-y border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground">
          {t.coins.title}
        </p>
      </div>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
          className="animate-marquee-left flex w-max items-center gap-4"
          style={{ ['--marquee-duration' as string]: '40s' }}
        >
          {loop.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground"
            >
              <span className="size-2 rounded-full bg-primary" />
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
