'use client'

import { Send } from 'lucide-react'
import Link from 'next/link' // 引入 Link 组件
import { useLanguage } from '@/components/language-provider'
import { PlexWordmark } from '@/components/plex-logo'

export function SiteFooter() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Domain explainer card */}
        <div className="rounded-2xl border border-border bg-card p-8">
          <h3 className="text-lg font-semibold text-foreground">
            {t.footer.domainTitle}
          </h3>
          <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground">
            {t.footer.domainText}
          </p>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-8 lg:flex-row">
          <div className="max-w-xs">
            <PlexWordmark />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-6 sm:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-foreground">{t.footer.product}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#swap" className="hover:text-foreground">{t.nav.swap}</a></li>
                <li><a href="#how" className="hover:text-foreground">{t.nav.how}</a></li>
                <li><a href="#why" className="hover:text-foreground">{t.nav.why}</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{t.footer.company}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#security" className="hover:text-foreground">{t.nav.security}</a></li>
                <li><a href="#faq" className="hover:text-foreground">{t.nav.faq}</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{t.footer.legal}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{t.footer.community}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://x.com/plexswap" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    X (Twitter)
                  </a>
                </li>
                <li>
                  <a href="https://t.me/tangxao1122" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground">
                    <Send className="h-4 w-4" />
                    Telegram @tangxao1122
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-xs leading-relaxed text-muted-foreground">{t.footer.disclaimer}</p>
          <p className="mt-4 text-xs text-muted-foreground">© {year} PlexSwap · plexswap.com · {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
