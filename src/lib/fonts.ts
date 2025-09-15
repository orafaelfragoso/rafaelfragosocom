import { Zain as FontHeading, JetBrains_Mono as FontMono, Geist as FontSans } from 'next/font/google'

export const fontHeading = FontHeading({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['700'],
})

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
})
