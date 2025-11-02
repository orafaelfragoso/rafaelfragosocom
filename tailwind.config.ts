import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/components/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'],
}

export default config
