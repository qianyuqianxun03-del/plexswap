'use client'

import { useEffect, useState } from 'react'
import { Globe } from 'lucide-react'
import { PlexWordmark } from '@/components/plex-logo'
import { useLanguage } from '@/components/language-provider'
import { Button } from '@/components/ui/button'

export function SiteHeader() {
  const { t, lang, toggle } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#why', label: t.nav.why },
    { href: '#security', label: t.nav.security },
    { href: '#how', label: t.nav.how },
    { href: '#faq', label: t.nav.faq },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" aria-label="PlexSwap">
          <PlexWordmark />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            aria-label="Switch language"
          >
            <Globe className="size-4" />
            {lang === 'zh' ? 'EN' : '中文'}
          </button>
          <Button asChild className="rounded-full">
            <a href="#swap">{t.nav.swap}</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
