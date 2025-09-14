import Image from 'next/image'

interface LogoProps {
  className?: string
}

export const Logo = ({ className }: LogoProps) => (
  <Image src="/apple-touch-icon.png" alt="Logo" width={32} height={32} className={className} priority />
)
