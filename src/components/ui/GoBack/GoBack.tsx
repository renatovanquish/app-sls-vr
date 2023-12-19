import React, { FC } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'components/icons'
import { useBreakPoints } from 'hooks/useBreakPoints'

interface Props {
  className?: string
  link?: string
  label?: string
}

const GoBack: FC<Props> = (props: Props) => {
  const { isSm, isMd, isLg, isXl, is2xl } = useBreakPoints()

  return (
    <Link href={`/${props.link}`}>
      <a className="text-tertiary-2 z-10 cursor-pointer bg-accent-1 p-2 pr-3 rounded-xl flex items-center justify-center">
        <ArrowLeft className="-ml-2 mr-2 h-7 w-7" />{' '}
        <span className="font-semibold md:font-medium text-lg md:text-base">
          {props.label ? props.label : 'VOLTAR'}
        </span>
      </a>
    </Link>
  )
}

export default GoBack
