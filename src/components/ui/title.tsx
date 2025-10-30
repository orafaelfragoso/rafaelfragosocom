import { AuroraText } from '@/components/ui/aurora-text'

interface TitleProps {
  children: React.ReactNode
  id?: string
}

export function Title({ children, id }: TitleProps) {
  return (
    <h1 id={id} className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center opacity-0 delay-100 animate-fade-blur-in">
      <AuroraText speed={2} colors={['#8f5cff', '#c084fc', '#6d28d9']}>
        {children}
      </AuroraText>
    </h1>
  )
}
