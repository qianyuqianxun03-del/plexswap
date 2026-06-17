'use client'

import { useEffect, useState } from 'react'
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
  // 我们不再用 bornAt 作为计算逻辑，而是存一个“过去的时间差(毫秒)”
  timeOffset: number 
}

function rand(min: number, max: number) { return Math.random() * (max - min) + min }
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

function getAmount(sym: string) {
  if (sym === 'BTC') return rand(0.01, 20).toFixed(4)
  if (sym === 'ETH') return rand(0.2, 60).toFixed(3)
  return rand(10, 5000).toFixed(0)
}

function CoinDot({ sym, color }: { sym: string; color: string }) {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-background" style={{ backgroundColor: color }}>
      {sym.slice(0, 3)}
    </span>
  )
}

export function LiveSwaps() {
  const { t } = useLanguage()
  // 在内存中初始化数据，且只初始化一次
  const [swaps] = useState(() => {
    const now = Date.now();
    return Array.from({ length: 12 }, (_, i) => {
      const f = pick(COINS); const t = pick(COINS);
      return {
        id: i, // 使用固定ID而非时间戳
        from: f.sym, fromColor: f.color,
        to: t.sym, toColor: t.color,
        amount: getAmount(f.sym),
        // 固化一个时间偏移量，这意味着刷新页面也不会改变这条数据的“过去程度”
        timeOffset: (i + 1) * rand(2, 8) * 60000 
      }
    })
  })

  // 使用一个 tick 状态强制每分钟刷新一次 UI，确保“X分钟前”更新
  const [, setTick] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setTick(n => n + 1), 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative border-y border-border bg-secondary/20 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight">{t.feed.title}</h2>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {swaps.map((s) => {
            const minAgo = Math.floor(s.timeOffset / 60000)
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
