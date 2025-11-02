import Link, { type LinkProps } from 'next/link'

import config from '@/config'
import { fontHeading } from '@/lib/fonts'
import { cn } from '@/lib/utils'

type LogoProps = React.FC<LinkProps & React.HTMLProps<HTMLAnchorElement>>

export const Logo: LogoProps = ({ className, ...props }) => (
  <Link
    className={cn(
      'font-bold text-xl text-foreground/80 hover:text-foreground transition-colors duration-200 ease-in-out flex items-center space-x-4',
      fontHeading.className,
      className,
    )}
    {...props}>
    {config.site.name}
  </Link>
)
