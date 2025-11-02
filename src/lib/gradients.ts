export const gradients = {
  javascript: {
    background: 'from-yellow-500 to-yellow-300',
    text: 'text-black',
  },
  python: {
    background: 'from-blue-500 to-yellow-400',
    text: 'text-black',
  },
  react: {
    background: 'from-blue-500 to-cyan-400',
    text: 'text-black',
  },
  development: {
    background: 'from-gray-600 to-gray-400',
    text: 'text-white',
  },
  'web-development': {
    background: 'from-orange-500 to-yellow-300',
    text: 'text-black',
  },
  design: {
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
  return gradients[category.toLowerCase() as keyof typeof gradients] || gradients.development
}
