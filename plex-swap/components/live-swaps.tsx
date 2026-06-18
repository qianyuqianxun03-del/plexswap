'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/language-provider'

const COINS = ['BTC', 'ETH', 'USDT', 'BNB', 'SOL', 'TON', 'XMR', 'DOGE', 'XRP', 'LINK']

function rand(min: number, max: number) { return Math.random() * (max - min) + min }
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

export function LiveSwaps() {
  const { t } = useLanguage()
  const [toast, setToast] = useState<{ amount: string; from: string; to: string } | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const trigger = () => {
      const f = pick(COINS)
      let t = pick(COINS)
      while (t === f) t = pick(COINS)
      
      const amount = f === 'BTC' ? rand(0.01, 2).toFixed(4) : rand(10, 1000).toFixed(0)

      setToast({ amount, from: f, to: t })
      setVisible(true)
      setTimeout(() => setVisible(false), 5000) // 提示显示 5 秒后消失
    }

    // 逻辑：刷新后首次延迟 3 到 5 分钟 (180s - 300s)
    const initialDelay = rand(180, 300) * 1000
    
    const initialTimer = setTimeout(() => {
      trigger()
      
      // 首次之后，后续循环间隔设置为随机 2 到 8 分钟 (120s - 480s)
      const scheduleLoop = () => {
        return setTimeout(() => {
          trigger()
          scheduleLoop()
        }, rand(120, 480) * 1000)
      }
      scheduleLoop()
    }, initialDelay)

    return () => clearTimeout(initialTimer)
  }, [])

  if (!toast) return null

  return (
    <div className={`fixed bottom-6 left-6 z-50 transition-all duration-700 ease-out ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="rounded-xl border border-white/10 bg-black/70 p-4 shadow-2xl backdrop-blur-md text-white">
        <div className="mb-2 text-sm font-medium">Live Swap Notification ⚡</div>
        <div className="text-sm text-gray-300">
          Anonymous user swapped <span className="font-bold text-white">{toast.amount} {toast.from}</span> to <span className="font-bold text-white">{toast.to}</span>
        </div>
      </div>
    </div>
  )
}
