'use client'

import { useEffect, useState, useMemo } from 'react'
import { useLanguage } from '@/components/language-provider'

const COINS = [
  { sym: 'BTC', color: 'oklch(0.78 0.13 60)' }, { sym: 'ETH', color: 'oklch(0.7 0.12 270)' },
  { sym: 'USDT', color: 'oklch(0.74 0.16 162)' }, { sym: 'BNB', color: 'oklch(0.82 0.15 90)' },
  { sym: 'SOL', color: 'oklch(0.65 0.2 310)' }, { sym: 'TON', color: 'oklch(0.7 0.13 230)' },
  { sym: 'XMR', color: 'oklch(0.72 0.16 40)' }, { sym: 'DOGE', color: 'oklch(0.8 0.13 85)' },
  { sym: 'XRP', color: 'oklch(0.72 0.04 250)' }, { sym: 'LINK', color: 'oklch(0.66 0.16 255)' }
]

interface Swap {
  id: number
  from: string; fromColor: string
  to: string; toColor: string
  amount: string
  bornAt: number
}

function rand(min: number, max: number) { return Math.random() * (max - min) + min }
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

function CoinDot({ sym, color }: { sym: string; color: string }) {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-background" style={{ backgroundColor: color }}>
      {sym.slice(0, 3)}
    </span>
  )
}

export function LiveSwaps() {
  const { t } = useLanguage()
  const [swaps, setSwaps] = useState<Swap[]>([])
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    // 1. 初始化模拟数据，时间锚点固定，刷新也不会错位
    const initial: Swap[] = Array.from({ length: 12 }, (_, i) => {
      const f = pick(COINS); const t = pick(COINS)
      return {
        id: Date.now() - i * 10000,
        from: f.sym, fromColor: f.color,
        to: t.sym, toColor: t.color,
        amount: (Math.random() * 2000).toFixed(0),
        bornAt: Date.now() - rand(1, 45) * 60000
      }
    }).sort((a, b) => b.bornAt - a.bornAt)
    
    setSwaps(initial)

    // 2. 模拟真实交易：每 1-15 分钟随机产生一笔新交易
    const triggerNewSwap = () => {
      setTimeout(() => {
        const f = pick(COINS); const t = pick(COINS)
        setSwaps(prev => [{
          id: Date.now(),
          from: f.sym, fromColor: f.color,
          to: t.sym, toColor: t.color,
          amount: (Math.random() * 2000).toFixed(0),
          bornAt: Date.now()
        }, ...prev].slice(0, 12))
        triggerNewSwap()
      }, rand(1, 15) * 60000)
    }
    triggerNewSwap()

    // 3. 实时更新时间标签
    const clock = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(clock)
  }, [])

  return (
    <section className="relative border-y border-border bg-secondary/20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.feed.title}</h2>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {swaps.map((s) => {
            const minAgo = Math.floor((now - s.bornAt) / 60000)
            return (
              <div key={s.id} className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3">
                <div className="flex -space-x-2">
                  <CoinDot sym={s.from} color={s.fromColor} />
                  <CoinDot sym={s.to} color={s.toColor} />
                </div>
                <div className="flex-1 text-sm">
                  <span className="font-medium">{s.amount} {s.from}</span>
                  <span className="text-muted-foreground"> → {s.to}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {minAgo < 1 ? t.feed.justNow : `${minAgo} ${t.feed.minutes}${t.feed.ago}`}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
