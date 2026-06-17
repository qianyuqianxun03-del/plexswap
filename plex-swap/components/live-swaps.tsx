'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '@/components/language-provider'

const COINS = [
  { sym: 'BTC', color: 'oklch(0.78 0.13 60)' }, { sym: 'ETH', color: 'oklch(0.7 0.12 270)' },
  { sym: 'USDT', color: 'oklch(0.74 0.16 162)' }, { sym: 'BNB', color: 'oklch(0.82 0.15 90)' },
  { sym: 'SOL', color: 'oklch(0.65 0.2 310)' }, { sym: 'XRP', color: 'oklch(0.72 0.04 250)' },
  { sym: 'USDC', color: 'oklch(0.7 0.15 230)' }, { sym: 'ADA', color: 'oklch(0.68 0.14 250)' },
  { sym: 'DOGE', color: 'oklch(0.8 0.13 85)' }, { sym: 'TRX', color: 'oklch(0.62 0.22 25)' },
  { sym: 'DOT', color: 'oklch(0.66 0.22 350)' }, { sym: 'AVAX', color: 'oklch(0.64 0.21 25)' },
  { sym: 'SHIB', color: 'oklch(0.66 0.2 35)' }, { sym: 'TON', color: 'oklch(0.7 0.13 230)' },
  { sym: 'MATIC', color: 'oklch(0.62 0.2 295)' }, { sym: 'LINK', color: 'oklch(0.66 0.16 255)' },
  { sym: 'NEAR', color: 'oklch(0.7 0.05 160)' }, { sym: 'BCH', color: 'oklch(0.74 0.16 150)' },
  { sym: 'XLM', color: 'oklch(0.72 0.03 250)' }, { sym: 'UNI', color: 'oklch(0.68 0.18 330)' },
  { sym: 'ATOM', color: 'oklch(0.6 0.08 290)' }, { sym: 'APT', color: 'oklch(0.68 0.06 200)' },
  { sym: 'ETC', color: 'oklch(0.7 0.1 140)' }, { sym: 'LTC', color: 'oklch(0.75 0.02 270)' },
  { sym: 'FIL', color: 'oklch(0.7 0.1 200)' }, { sym: 'ARB', color: 'oklch(0.66 0.14 245)' },
  { sym: 'OP', color: 'oklch(0.64 0.22 25)' }, { sym: 'SUI', color: 'oklch(0.72 0.12 230)' },
  { sym: 'INJ', color: 'oklch(0.66 0.13 230)' }, { sym: 'XMR', color: 'oklch(0.72 0.16 40)' }
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

function rand(min: number, max: number) { return Math.random() * (max - min) + min }
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

function amountFor(sym: string) {
  const base = [150, 48000]
  return rand(base[0], base[1])
}

function fmt(n: number) {
  return n >= 1000 ? n.toLocaleString('en-US', { maximumFractionDigits: 0 }) : n.toFixed(2)
}

function makeSwap(id: number, bornAt: number): Swap {
  const from = pick(COINS)
  let to = pick(COINS)
  while (to.sym === from.sym) to = pick(COINS)
  return { id, from: from.sym, fromColor: from.color, to: to.sym, toColor: to.color, amount: fmt(amountFor(from.sym)), bornAt }
}

function CoinDot({ sym, color }: { sym: string; color: string }) {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-background" style={{ backgroundColor: color }}>
      {sym.slice(0, 3)}
    </span>
  )
}

function SwapRow({ swap, now }: { swap: Swap; now: number }) {
  const { t } = useLanguage()
  const secondsAgo = Math.max(1, Math.floor((now - swap.bornAt) / 1000))
  const timeLabel = secondsAgo < 5 ? t.feed.justNow : secondsAgo < 60 ? `${secondsAgo} ${t.feed.seconds}${t.feed.ago}` : `${Math.floor(secondsAgo / 60)} ${t.feed.minutes}${t.feed.ago}`

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3">
      <div className="flex -space-x-2">
        <CoinDot sym={swap.from} color={swap.fromColor} />
        <CoinDot sym={swap.to} color={swap.toColor} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-foreground">
          <span className="font-medium">{swap.amount} {swap.from}</span>
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

export function LiveSwaps() {
  const { t } = useLanguage()
  const idRef = useRef(0)
  const [swaps, setSwaps] = useState<Swap[]>([])
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    // 初始化 1000 条历史数据
    const initial: Swap[] = []
    let cursor = Date.now() - 5000000
    for (let i = 0; i < 1000; i++) {
      initial.push(makeSwap(idRef.current++, cursor))
      cursor += rand(2000, 5000)
    }
    setSwaps(initial.reverse())

    const tick = () => {
      setSwaps((prev) => [makeSwap(idRef.current++, Date.now()), ...prev.slice(0, 999)])
      setTimeout(tick, rand(60000, 180000))
    }
    const timer = setTimeout(tick, rand(60000, 180000))
    const clock = setInterval(() => setNow(Date.now()), 1000)
    return () => { clearTimeout(timer); clearInterval(clock) }
  }, [])

  const recent = swaps.slice(0, 3)
  // 渲染优化：右侧只显示最新的 50 条以保持流畅，但逻辑上保持了 1000 条的循环
  const loopList = useMemo(() => swaps.slice(0, 50), [swaps])

  return (
    <section className="relative border-y border-border bg-secondary/20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-success">
              <span className="size-1.5 animate-pulse rounded-full bg-success" />
              LIVE
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">{t.feed.title}</h2>
            <div className="mt-8 space-y-3">
              {recent.map((s) => <SwapRow key={`hl-${s.id}`} swap={s} now={now} />)}
            </div>
          </div>
          <div className="relative h-[360px] overflow-hidden rounded-2xl border border-border bg-background/40 p-4 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
            <div className="animate-marquee-up space-y-3" style={{ ['--marquee-duration' as string]: '300s' }}>
              {loopList.map((s, i) => <SwapRow key={`${s.id}-${i}`} swap={s} now={now} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
