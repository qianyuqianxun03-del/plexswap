'use client'

import { useEffect, useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export function FloatingCta() {
  const { t } = useLanguage()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#swap"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-xl shadow-primary/30 transition-all duration-300 md:hidden ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowLeftRight className="size-4" />
      {t.cta.floating}
    </a>
  )
}
