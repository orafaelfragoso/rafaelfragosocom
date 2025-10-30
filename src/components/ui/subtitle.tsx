interface SubtitleProps {
  children: React.ReactNode
  id?: string
}

export function Subtitle({ children, id }: SubtitleProps) {
  return (
    <p
      id={id}
      className="text-lg text-muted-foreground max-w-2xl mx-auto text-center opacity-0 delay-100 animate-fade-blur-in">
      {children}
    </p>
  )
}
