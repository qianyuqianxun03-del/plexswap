'use client'

import { useLanguage } from '@/components/language-provider'

export function SwapWidget() {
  const { lang } = useLanguage()
  const widgetLang = lang === 'zh' ? 'zh-CN' : 'en'

  //const src = `https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=true&amount=0.1&backgroundColor=0a0e27&darkMode=true&from=btc&horizontal=false&lang=${widgetLang}&link_id=07aa49c61c9c94&locales=true&logo=true&primaryColor=2c3bcc&to=usdterc20&toTheMoon=true`
       <div class="widget-container">
            <iframe id='iframe-widget' 
                src='https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=true&amount=0.1&backgroundColor=ffffff&darkMode=false&from=btc&horizontal=false&lang=en-US&link_id=07aa49c61c9c94&locales=true&logo=true&primaryColor=2c3bcc&to=usdterc20&toTheMoon=true' 
                style="border: none;"></iframe>
            <script defer type='text/javascript' src='https://changenow.io/embeds/exchange-widget/v2/stepper-connector.js'></script>
        </div>
  return (
    <div className="relative mx-auto w-full max-w-[420px] rounded-3xl border border-border bg-card p-2 shadow-2xl shadow-black/40">
      <iframe
        // Remount iframe on language change so widget re-renders in the right locale
        key={widgetLang}
        id="iframe-widget"
        title="PlexSwap Exchange"
        src={src}
        className="h-[640px] w-full rounded-2xl border-0"
      />
    </div>
  )
}
