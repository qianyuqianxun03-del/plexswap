'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/language-provider'

const COINS = [
  { sym: 'BTC', color: 'oklch(0.78 0.13 60)' }, { sym: 'ETH', color: 'oklch(0.7 0.12 270)' },
  { sym: 'USDT', color: 'oklch(0.74 0.16 162)' }, { sym: 'BNB', color: 'oklch(0.82 0.15 90)' },
  { sym: 'SOL', color: 'oklch(0.65 0.2 310)' }, { sym: 'XRP', color: 'oklch(0.72 0.04 250)' },
  { sym: 'USDC', color: 'oklch(0.7 0.15 230)' }, { sym: 'DOGE', color: 'oklch(0.8 0.13 85)' },
  { sym: 'TRX', color: 'oklch(0.62 0.22 25)' }, { sym: 'TON', color: 'oklch(0.7 0.13 230)' }
]

interface Swap {
  id: number
  from: string
  to: string
  amount: string
  bornAt: number
}

function rand(min: number, max: number) { return Math.random() * (max - min) + min }
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

export function LiveSwaps() {
  const { t } = useLanguage()
  const [swaps, setSwaps] = useState<Swap[]>([])

  useEffect(() => {
    // 1. 初始化过去的数据，按时间倒序排列
    const now = Date.now()
    const initial: Swap[] = Array.from({ length: 15 }, (_, i) => ({
      id: now - i * 600000,
      from: pick(COINS).sym,
      to: pick(COINS).sym,
      amount: (Math.random() * 5000).toFixed(0),
      bornAt: now - (i + 1) * rand(5, 25) * 60 * 1000
    })).filter(s => s.from !== s.to)
    
    setSwaps(initial.sort((a, b) => b.bornAt - a.bornAt))

    // 2. 模拟真实随机交易触发逻辑
    const scheduleNext = () => {
      const delay = rand(1, 20) * 60 * 1000
      setTimeout(() => {
        const newSwap = {
          id: Date.now(),
          from: pick(COINS).sym,
          to: pick(COINS).sym,
          amount: (Math.random() * 5000).toFixed(0),
          bornAt: Date.now()
        }
        setSwaps(prev => [newSwap, ...prev].slice(0, 20))
        scheduleNext()
      }, delay)
    }
    scheduleNext()
  }, [])

  return (
    <section className="py-16 border-y border-border bg-secondary/10">
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex items-center gap-2 mb-8">
           <span className="relative flex size-3">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
             <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
           </span>
           <h2 className="text-2xl font-bold">{t.feed.title}</h2>
        </div>
        
        <div className="space-y-1">
          {swaps.map((s) => {
            const minAgo = Math.floor((Date.now() - s.bornAt) / 60000)
            return (
              <div key={s.id} className="flex justify-between items-center p-4 rounded-lg bg-card/50 border border-border/50 hover:bg-card transition-colors">
                <span className="font-mono text-sm">{s.amount} {s.from} → {s.to}</span>
                <span className="text-xs text-muted-foreground">
                  {minAgo < 1 ? '刚刚' : `${minAgo} 分钟前`}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
