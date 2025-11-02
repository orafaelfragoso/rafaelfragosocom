import { Zain as FontHeading } from 'next/font/google'
import localFont from 'next/font/local'

export const fontHeading = FontHeading({
  subsets: ['latin'],
  display: 'swap',
  weight: ['700'],
  preload: true,
  variable: '--font-heading',
})

export const fontSans = localFont({
  src: [
    { path: '../../public/fonts/ABCOracle-Light.woff2', weight: '400' },
    { path: '../../public/fonts/ABCOracle-Book.woff2', weight: '500' },
    { path: '../../public/fonts/ABCOracle-Medium.woff2', weight: '600' },
  ],
  display: 'swap',
  preload: true,
  variable: '--font-sans',
})
