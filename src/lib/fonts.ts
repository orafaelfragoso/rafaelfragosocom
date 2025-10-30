import { Zain as FontHeading, JetBrains_Mono as FontMono, Geist as FontSans } from 'next/font/google'

export const fontHeading = FontHeading({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['700'],
  preload: true,
})

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: false, // Only preload if used above the fold
})
