'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { dict, type Lang, type Dictionary } from '@/lib/i18n'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh')

  useEffect(() => {
    const stored = window.localStorage.getItem('plexswap-lang') as Lang | null
    if (stored === 'zh' || stored === 'en') {
      setLang(stored)
    } else if (typeof navigator !== 'undefined') {
      setLang(navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en')
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('plexswap-lang', lang)
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang((p) => (p === 'zh' ? 'en' : 'zh')),
      t: dict[lang],
    }),
    [lang],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
