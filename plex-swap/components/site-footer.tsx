'use client'

import { Send } from 'lucide-react'
import Link from 'next/link' // 关键：必须引入 Link
import { useLanguage } from '@/components/language-provider'
import { PlexWordmark } from '@/components/plex-logo'

export function SiteFooter() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-8">
          <h3 className="text-lg font-semibold text-foreground">{t.footer.domainTitle}</h3>
          <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground">
            {t.footer.domainText}
          </p>
        </div>
// 在 footer 对应的位置修改为：
<div>
  <p className="text-sm font-medium text-foreground">Legal</p>
  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
    <li>
      <a href="/terms" className="hover:text-foreground">Terms of Use</a>
    </li>
    <li>
      <a href="/privacy" className="hover:text-foreground">Privacy Policy</a>
    </li>
  </ul>
</div>
        <div className="mt-12 flex flex-col items-start justify-between gap-8 lg:flex-row">
          <div className="max-w-xs">
            <PlexWordmark />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.footer.tagline}</p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-6 sm:grid-cols-4">
            {/* Products */}
            <div>
              <p className="text-sm font-medium text-foreground">{t.footer.product}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#swap" className="hover:text-foreground">{t.nav.swap}</a></li>
                <li><a href="#how" className="hover:text-foreground">{t.nav.how}</a></li>
                <li><a href="#why" className="hover:text-foreground">{t.nav.why}</a></li>
              </ul>
            </div>
            {/* Company */}
            <div>
              <p className="text-sm font-medium text-foreground">{t.footer.company}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#security" className="hover:text-foreground">{t.nav.security}</a></li>
                <li><a href="#faq" className="hover:text-foreground">{t.nav.faq}</a></li>
              </ul>
            </div>
            {/* Legal - 确保这里使用了 Link */}
            
            {/* Community */}
            <div>
              <p className="text-sm font-medium text-foreground">{t.footer.community}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://x.com/plexswap" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
                    X (Twitter)
                  </a>
                </li>
                <li>
                  <a href="https://t.me/tangxao1122" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
                    <Send className="h-4 w-4" /> Telegram
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  )
}
