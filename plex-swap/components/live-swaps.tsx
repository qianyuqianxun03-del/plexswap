'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '@/components/language-provider'

const COINS = [
  { sym: 'BTC', color: 'oklch(0.78 0.13 60)' },
  { sym: 'ETH', color: 'oklch(0.7 0.12 270)' },
  { sym: 'USDT', color: 'oklch(0.74 0.16 162)' },
  { sym: 'USDC', color: 'oklch(0.7 0.15 230)' },
  { sym: 'SOL', color: 'oklch(0.65 0.2 310)' },
  { sym: 'TON', color: 'oklch(0.7 0.13 230)' },
  { sym: 'XMR', color: 'oklch(0.72 0.16 40)' },
  { sym: 'BNB', color: 'oklch(0.82 0.15 90)' },
  { sym: 'TRX', color: 'oklch(0.62 0.22 25)' },
  { sym: 'LTC', color: 'oklch(0.75 0.02 270)' },
  { sym: 'DOGE', color: 'oklch(0.8 0.13 85)' },
  { sym: 'ADA', color: 'oklch(0.68 0.14 250)' },
  { sym: 'XRP', color: 'oklch(0.72 0.04 250)' },
  { sym: 'DOT', color: 'oklch(0.66 0.22 350)' },
  { sym: 'AVAX', color: 'oklch(0.64 0.21 25)' },
  { sym: 'MATIC', color: 'oklch(0.62 0.2 295)' },
  { sym: 'LINK', color: 'oklch(0.66 0.16 255)' },
  { sym: 'ATOM', color: 'oklch(0.6 0.08 290)' },
  { sym: 'NEAR', color: 'oklch(0.7 0.05 160)' },
  { sym: 'BCH', color: 'oklch(0.74 0.16 150)' },
  { sym: 'XLM', color: 'oklch(0.72 0.03 250)' },
  { sym: 'SHIB', color: 'oklch(0.66 0.2 35)' },
  { sym: 'APT', color: 'oklch(0.68 0.06 200)' },
  { sym: 'ARB', color: 'oklch(0.66 0.14 245)' },
  { sym: 'OP', color: 'oklch(0.64 0.22 25)' },
  { sym: 'SUI', color: 'oklch(0.72 0.12 230)' },
  { sym: 'FIL', color: 'oklch(0.7 0.1 200)' },
  { sym: 'INJ', color: 'oklch(0.66 0.13 230)' },
]

interface Swap {
  id: number
  from: string
  fromColor: string
  to: string
  toColor: string
  amount: string
  bornAt: number
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function amountFor(sym: string) {
  switch (sym) {
    case 'BTC':
      return rand(0.01, 1.8)
    case 'ETH':
      return rand(0.2, 22)
    case 'USDT':
    case 'USDC':
      return rand(150, 48000)
    case 'SOL':
      return rand(2, 320)
    case 'XMR':
      return rand(0.5, 60)
    case 'BNB':
      return rand(0.3, 45)
    case 'LTC':
      return rand(1, 180)
    case 'BCH':
      return rand(0.3, 90)
    case 'XRP':
      return rand(50, 60000)
    case 'DOGE':
    case 'SHIB':
      return rand(2000, 900000)
    case 'DOT':
    case 'AVAX':
    case 'LINK':
    case 'ATOM':
    case 'NEAR':
    case 'APT':
    case 'ARB':
    case 'OP':
    case 'SUI':
    case 'INJ':
      return rand(5, 3500)
    default:
      return rand(20, 9000)
  }
}

function fmt(n: number) {
  if (n >= 1000) return n.toLocaleString('en-US', { maximumFractionDigits: 0 })
  if (n >= 1) return n.toFixed(2)
  return n.toFixed(4)
}

// build a swap born at a given timestamp
function makeSwap(id: number, bornAt: number): Swap {
  const from = pick(COINS)
  let to = pick(COINS)
  while (to.sym === from.sym) to = pick(COINS)
  return {
    id,
    from: from.sym,
    fromColor: from.color,
    to: to.sym,
    toColor: to.color,
    amount: fmt(amountFor(from.sym)),
    bornAt,
  }
}

function CoinDot({ sym, color }: { sym: string; color: string }) {
  return (
    <span
      className="flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-background"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {sym.slice(0, 3)}
    </span>
  )
}

function SwapRow({ swap, now }: { swap: Swap; now: number }) {
  const { t } = useLanguage()
  const secondsAgo = Math.max(1, Math.floor((now - swap.bornAt) / 1000))
  const timeLabel =
    secondsAgo < 5
      ? t.feed.justNow
      : secondsAgo < 60
        ? `${secondsAgo} ${t.feed.seconds}${t.feed.ago}`
        : `${Math.floor(secondsAgo / 60)} ${t.feed.minutes}${t.feed.ago}`

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3">
      <div className="flex -space-x-2">
        <CoinDot sym={swap.from} color={swap.fromColor} />
        <CoinDot sym={swap.to} color={swap.toColor} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-foreground">
          <span className="font-medium">
            {swap.amount} {swap.from}
          </span>
          <span className="text-muted-foreground"> → {swap.to}</span>
        </p>
      </div>
      <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-muted-foreground">
        <span className="size-1.5 rounded-full bg-success" />
        {timeLabel}
      </div>
    </div>
  )
}

const TOTAL = 16

export function LiveSwaps() {
  const { t } = useLanguage()
  const idRef = useRef(0)
  const [swaps, setSwaps] = useState<Swap[]>([])
  const [now, setNow] = useState(() => Date.now())

  // seed initial list: newest first, each older one further back in time
  useEffect(() => {
    const start = Date.now()
    let cursor = start - rand(3000, 14000) // newest is a few seconds ago
    const initial: Swap[] = []
    for (let i = 0; i < TOTAL; i++) {
      initial.push(makeSwap(idRef.current++, cursor))
      cursor -= rand(25000, 160000) // each subsequent one is older
    }
    setSwaps(initial)

    // add a brand-new swap at the top on a random interval
    let addTimer: ReturnType<typeof setTimeout>
    const tick = () => {
      setSwaps((prev) => [makeSwap(idRef.current++, Date.now()), ...prev].slice(0, TOTAL))
      addTimer = setTimeout(tick, rand(3000, 8000))
    }
    addTimer = setTimeout(tick, rand(3000, 6000))

    // keep displayed "x ago" labels fresh + monotonic
    const clock = setInterval(() => setNow(Date.now()), 1000)

    return () => {
      clearTimeout(addTimer)
      clearInterval(clock)
    }
  }, [])

  // left column = 3 most recent; right column = the older ones after those
  const recent = swaps.slice(0, 3)
  const older = swaps.slice(3)

  // duplicate older list for seamless vertical marquee
  const loopList = useMemo(() => [...older, ...older], [older])

  return (
    <section className="relative border-y border-border bg-secondary/20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-success">
              <span className="size-1.5 animate-pulse rounded-full bg-success" />
              LIVE
            </div>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.feed.title}
            </h2>
            <p className="mt-3 max-w-md text-pretty text-muted-foreground">
              {t.feed.subtitle}
            </p>

            {/* 3 most recent swaps */}
            <div className="mt-8 space-y-3">
              {recent.map((s) => (
                <SwapRow key={`hl-${s.id}`} swap={s} now={now} />
              ))}
            </div>
          </div>

          {/* scrolling marquee column: older swaps only */}
          <div className="relative h-[360px] overflow-hidden rounded-2xl border border-border bg-background/40 p-4 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
            <div
              className="animate-marquee-up space-y-3"
              style={{ ['--marquee-duration' as string]: '40s' }}
            >
              {loopList.map((s, i) => (
                <SwapRow key={`${s.id}-${i}`} swap={s} now={now} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
