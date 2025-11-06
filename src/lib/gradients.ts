export const gradients = {
  javascript: {
    background: 'from-[#FF6F3C] to-[#FFF1AC]',
    text: 'text-black',
  },
  python: {
    background: 'from-[#5092C7] to-[#FFB005]',
    text: 'text-white',
  },
  react: {
    background: 'from-[#646cff] to-[#bfdbfe]',
    text: 'text-black',
  },
  development: {
    background: 'from-[#340B05] to-[#5092C7]',
    text: 'text-white',
  },
  rust: {
    background: 'from-red-500 to-orange-400',
    text: 'text-white',
  },
  'web-development': {
    background: 'from-[#340B05] to-[#5092C7]',
    text: 'text-white',
  },
  css: {
    background: 'from-purple-500 to-pink-400',
    text: 'text-white',
  },
  learning: {
    background: 'from-blue-500 to-green-400',
    text: 'text-white',
  },
  writing: {
    background: 'from-red-500 to-orange-400',
    text: 'text-white',
  },
} as const

export const getGradient = (category: string) => {
  return gradients[category?.toLowerCase() as keyof typeof gradients] ?? gradients.development
}
