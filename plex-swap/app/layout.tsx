import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'PlexSwap — 极速、安全、无需注册的数字货币兑换',
  description:
    'PlexSwap 提供非托管、无需 KYC 的即时数字货币兑换服务，5 分钟内到账，支持 900+ 币种。资金永不经手，安全透明。',
  generator: 'v0.app',
  keywords: [
    'PlexSwap',
    '数字货币兑换',
    'crypto swap',
    'BTC 兑换',
    '非托管',
    'no KYC',
    'instant exchange',
  ],
  openGraph: {
    title: 'PlexSwap — 极速、安全、无需注册的数字货币兑换',
    description:
      '非托管、无需 KYC 的即时数字货币兑换。5 分钟内到账，支持 900+ 币种。',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0e27',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-CN"
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
