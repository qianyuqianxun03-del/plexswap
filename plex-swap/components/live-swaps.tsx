'use client'

import { useEffect, useState, useCallback } from 'react'

const COINS = ['BTC', 'ETH', 'USDT', 'BNB', 'SOL', 'TON', 'XMR', 'DOGE', 'XRP', 'LINK']

function rand(min: number, max: number) { return Math.random() * (max - min) + min }
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

function getAmount(sym: string) {
  if (sym === 'BTC') return rand(0.01, 20).toFixed(4)
  if (sym === 'ETH') return rand(0.2, 60).toFixed(3)
  return rand(10, 5000).toFixed(0)
}

export function LiveSwaps() {
  const [data, setData] = useState<{ from: string; to: string; amount: string } | null>(null)
  const [visible, setVisible] = useState(false)

  const trigger = useCallback(() => {
    const f = pick(COINS)
    let t = pick(COINS)
    while (t === f) t = pick(COINS)
    
    setData({ from: f, to: t, amount: getAmount(f) })
    setVisible(true)
    
    // 6秒后自动隐藏
    setTimeout(() => setVisible(false), 6000)
  }, [])

  useEffect(() => {
    // 首次加载后 5 秒弹出第一次
    const initialTimer = setTimeout(trigger, 5000)
    
    // 之后每 1-3 分钟随机弹出
    const schedule = () => {
      const delay = rand(60, 180) * 1000
      return setTimeout(() => {
        trigger()
        schedule()
      }, delay)
    }
    const loopTimer = schedule()

    return () => { clearTimeout(initialTimer); clearTimeout(loopTimer) }
  }, [trigger])

  if (!data) return null

  return (
    <div 
      className={`fixed bottom-6 left-6 z-50 transition-all duration-700 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="live-swaps rounded-xl border border-white/10 bg-black/70 p-4 shadow-2xl backdrop-blur-md">
        <div className="mb-2">
          🔥 <span style={{ fontWeight: 500, color: '#f8fafc', marginLeft: '5px' }}>Live Swap Notification:</span>
        </div>
        <div className="swap-container text-sm text-gray-300" id="swap-notification">
          An anonymous user just swapped <span className="swap-amount font-bold text-white">{data.amount} {data.from}</span> to <span className="swap-ticker font-bold text-white">{data.to}</span> via PlexSwap router ⚡
        </div>
      </div>
    </div>
  )
}
