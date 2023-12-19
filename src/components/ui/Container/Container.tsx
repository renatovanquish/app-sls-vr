import cn from 'classnames'
import React, { FC } from 'react'

interface ContainerProps {
  className?: string
  children?: any
  el?: HTMLElement
  clean?: boolean
}

const Container: FC<ContainerProps> = ({
  children,
  className,
  el = 'div',
  clean = process.env.FULL_WIDTH ? true : false,
}) => {
  const rootClassName = cn(className, {
    'mx-auto max-w-8xl px-6': !clean,
  })

  const Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any

  return <Component className={rootClassName}>{children}</Component>
}

export default Container
