'use client'

import Script from 'next/script'
import { useLanguage } from '@/components/language-provider'

export function SwapWidget() {
  const { lang } = useLanguage()
  // ChangeNow expects locale codes like "en-US" / "zh-CN"
  const widgetLang = lang === 'zh' ? 'zh-CN' : 'en-US'

  const params = new URLSearchParams({
    FAQ: 'true',
    amount: '0.1',
    backgroundColor: '0a0e27',
    darkMode: 'true',
    from: 'btc',
    horizontal: 'false',
    lang: widgetLang,
    link_id: '07aa49c61c9c94',
    locales: 'true',
    logo: 'true',
    primaryColor: '2c3bcc',
    to: 'usdterc20',
    toTheMoon: 'true',
  })

  const src = `https://changenow.io/embeds/exchange-widget/v2/widget.html?${params.toString()}`

  return (
    <div className="relative mx-auto w-full max-w-[420px] rounded-3xl border border-border bg-card p-2 shadow-2xl shadow-black/40">
      <iframe
        // Remount iframe on language change so widget re-renders in the right locale
        key={widgetLang}
        id="iframe-widget"
        title="PlexSwap Exchange"
        src={src}
        className="h-[421px] w-full rounded-2xl border-0"
      />
      {/*
        This script is what makes the "Change"/exchange button work.
        It connects the parent page to the iframe so the stepper can advance.
        Without it the widget renders but clicking "Change" does nothing.
      */}
      <Script
        id="changenow-stepper-connector"
        src="https://changenow.io/embeds/exchange-widget/v2/stepper-connector.js"
        strategy="afterInteractive"
      />
    </div>
  )
}
