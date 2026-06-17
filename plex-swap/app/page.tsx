import { LanguageProvider } from '@/components/language-provider'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { LiveSwaps } from '@/components/live-swaps'
import { WhyUs } from '@/components/why-us'
import { Benefits } from '@/components/benefits'
import { Security } from '@/components/security'
import { HowItWorks } from '@/components/how-it-works'
import { CoinsMarquee } from '@/components/coins-marquee'
import { SwapSection } from '@/components/swap-section'
import { Faq } from '@/components/faq'
import { SiteFooter } from '@/components/site-footer'
import { FloatingCta } from '@/components/floating-cta'

export default function Page() {
  return (
    <LanguageProvider>
      <SiteHeader />
      <main>
        <Hero />
        <LiveSwaps />
        <WhyUs />
        <Benefits />
        <Security />
        <HowItWorks />
        <CoinsMarquee />
        <SwapSection />
        <Faq />
      </main>
      <SiteFooter />
      <FloatingCta />
    </LanguageProvider>
  )
}
