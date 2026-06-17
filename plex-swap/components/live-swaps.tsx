'use client'

import { useEffect, useState, useCallback } from 'react'

const COINS = [
  { sym: 'BTC', color: 'oklch(0.78 0.13 60)' }, { sym: 'ETH', color: 'oklch(0.7 0.12 270)' },
  { sym: 'USDT', color: 'oklch(0.74 0.16 162)' }, { sym: 'BNB', color: 'oklch(0.82 0.15 90)' },
  { sym: 'SOL', color: 'oklch(0.65 0.2 310)' }, { sym: 'DOGE', color: 'oklch(0.8 0.13 85)' }
]

function rand(min: number, max: number) { return Math.random() * (max - min) + min }
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

function getAmount(sym: string) {
  if (sym === 'BTC') return rand(0.01, 20).toFixed(4)
  if (sym === 'ETH') return rand(0.2, 60).toFixed(3)
  return rand(10, 5000).toFixed(0)
}

export function LiveSwaps() {
  const [toast, setToast] = useState<{ from: string; to: string; amount: string } | null>(null)

  // 触发一个弹出逻辑
  const triggerToast = useCallback(() => {
    const f = pick(COINS);
    let t = pick(COINS);
    while (t.sym === f.sym) t = pick(COINS);
    
    setToast({ from: f.sym, to: t.sym, amount: getAmount(f.sym) })
    
    // 5秒后自动隐藏
    setTimeout(() => setToast(null), 5000)
  }, [])

  useEffect(() => {
    // 设置随机间隔：1 到 3 分钟弹出一次
    const schedule = () => {
      const delay = rand(60, 180) * 1000
      setTimeout(() => {
        triggerToast()
        schedule()
      }, delay)
    }
    schedule()
  }, [triggerToast])

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {toast && (
        <div className="flex animate-in slide-in-from-bottom-4 duration-500 items-center gap-3 rounded-2xl border border-white/10 bg-black/80 p-4 text-white shadow-2xl backdrop-blur-md">
          <div className="text-2xl">🎉</div>
          <div className="text-sm">
            <p className="font-medium text-gray-300">匿名用户刚刚兑换了</p>
            <p className="font-bold text-white">
              {toast.amount} {toast.from} → {toast.to}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
