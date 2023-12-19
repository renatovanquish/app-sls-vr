/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Search } from 'components/icons'
import cn from 'classnames'

interface Props {
  block: any
  user: any
}

export default function View(props: Props) {
  const { block, user } = props
  const [content, setContent] = useState({} as any)
  const [config, setConfig] = useState({} as any)
  const router = useRouter()

  useEffect(() => {
    if (block && block.config) {
      const configParse = JSON.parse(block.config)
      setConfig(configParse)
    }
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setContent(contentParse)
    }
    return () => {
      setConfig({} as any)
      setContent({} as any)
    }
  }, [block])

  return (
    <div
      className={cn({
        ['hidden']: config.view === 'hide' || (config.view === 'guest' && user),
        ['md:hidden']: config.view === 'sm',
        ['hidden md:block']: config.view === 'lg',
        ['px-0']: config.padX && config.padX === 'none',
        ['px-4']: !config.padX || config.padX === 'small',
        ['px-8']: config.padX && config.padX === 'normal',
        ['px-12']: config.padX && config.padX === 'large',
        ['px-24']: config.padX && config.padX === 'extra',
        ['py-0']: config.padY && config.padY === 'none',
        ['py-4']: !config.padY || config.padY === 'small',
        ['py-8']: config.padY && config.padY === 'normal',
        ['py-12']: config.padY && config.padY === 'large',
        ['py-24']: config.padY && config.padY === 'extra',
        ['bg-accent-1']: config.bgMode === 'auto',
        ['bg-local']: config.bgMode === 'image',
      })}
      style={{
        backgroundColor: config.bgMode === 'custom' && config.bgColor ? config.bgColor : null,
        backgroundImage: config.bgMode === 'image' ? `url(${config.bgImage})` : '',
        backgroundRepeat: config.bgMode === 'image' ? 'no-repeat' : '',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >{config.anchor && <a id={`${config.anchor}`}></a>}
      <div
        className={cn('w-full', {
          ['text-left']: content.align === 'left',
          ['text-center']: content.align === 'center',
          ['text-right']: content.align === 'right',
        })}
      >
        {content.title && (
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-accent-9 mb-4">
            {content.title}
          </h1>
        )}
        {content.description && (
          <p
            className={cn(
              'inline text-base leading-relaxed xl:w-2/4 lg:w-3/4 text-accent-7',
              {
                ['mx-auto']: content.align === 'center',
                ['text-right']: content.align === 'right',
              }
            )}
          >
            {content.description}
          </p>
        )}
        {content.showBar === 'show' && (
          <div
            className={cn('flex mt-6', {
              ['justify-start']: content.align === 'left',
              ['justify-center']: content.align === 'center',
              ['justify-end']: content.align === 'right',
            })}
          >
            <div className="w-16 h-1 rounded-full bg-tertiary-2 inline-flex"></div>
          </div>
        )}
      </div>
    </div>
  )
}
