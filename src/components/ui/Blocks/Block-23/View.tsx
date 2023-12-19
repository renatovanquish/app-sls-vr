/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import NumberFormat from 'react-number-format'

interface Props {
  block: any
  user?: any
}

export default function View(props: Props) {
  const { block, user } = props
  const [content, setContent] = useState({} as any)
  const [config, setConfig] = useState({} as any)
  const [frequencySel, setFrequencySel] = useState('M')
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
      setContent({} as any)
      setConfig({} as any)
    }
  }, [block])

  return (
    <section
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
    >
      {config.anchor && <a id={`${config.anchor}`}></a>}

      <div className="mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          {content.title && (
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-accent-9">
              {content.title}
            </h1>
          )}
          {content.description && (
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-accent-7">
              {content.description}
            </p>
          )}
          <div className="flex mx-auto border-2 border-tertiary rounded overflow-hidden mt-6">
            <button
              className={cn('py-1 px-4 focus:outline-none', {
                'bg-tertiary text-tertiary': frequencySel === 'M',
              })}
              onClick={() => setFrequencySel('M')}
            >
              Mensal
            </button>
            <button
              className={cn('py-1 px-4 focus:outline-none', {
                'bg-tertiary text-tertiary': frequencySel === 'A',
              })}
              onClick={() => setFrequencySel('A')}
            >
              Anual
            </button>
          </div>
        </div>

        <div className="flex flex-wrap -m-4">
          {content.data && content.data.length === 2 && (
            <div className="p-4 xl:basis-1/4 md:basis-1/2 w-full"></div>
          )}

          {content.data &&
            content.data.map((p: any, i: number) => (
              <div key={i} className="p-4 xl:basis-1/4 md:basis-1/2 w-full">
                <div className={cn("h-full p-6 bg-accent-0 rounded shadow-lg flex flex-col relative overflow-hidden", {
                  'border-2 border-tertiary': (p.name && content.mostPopular && p.name.toLowerCase() === content.mostPopular.toLowerCase())
                })}>
                  {(p.name && content.mostPopular && p.name.toLowerCase() === content.mostPopular.toLowerCase()) && (<span className="bg-tertiary text-tertiary px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                  MAIS POPULAR
                </span>)}
                  <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                    {p.name}
                  </h2>
                  {frequencySel === 'M' && (
                    <h1 className="text-5xl text-tertiary-2 pb-4 mb-4 border-b border-gray-200 leading-none">
                      {p.price === 0 && <span>Grátis</span>}
                      {p.price > 0 && (
                        <NumberFormat
                          value={p.price}
                          thousandsGroupStyle="thousand"
                          prefix="R$ "
                          thousandSeparator={'.'}
                          decimalSeparator={','}
                          displayType="text"
                          allowNegative={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                        />
                      )}
                    </h1>
                  )}
                  {frequencySel === 'A' && (
                    <h1 className="text-5xl text-tertiary-2 pb-4 mb-4 border-b border-gray-200 leading-none">
                      {p.price2 === 0 && <span>Grátis</span>}
                      {p.price2 > 0 && (
                        <NumberFormat
                          value={p.price2}
                          thousandsGroupStyle="thousand"
                          prefix="R$ "
                          thousandSeparator={'.'}
                          decimalSeparator={','}
                          displayType="text"
                          allowNegative={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                        />
                      )}
                    </h1>
                  )}
                  {p.item1 && (
                    <p className="flex items-center text-accent-7 mb-2">
                      {' '}
                      <IconArrow /> {p.item1}{' '}
                    </p>
                  )}
                  {p.item2 && (
                    <p className="flex items-center text-accent-7 mb-2">
                      {' '}
                      <IconArrow /> {p.item2}{' '}
                    </p>
                  )}
                  {p.item3 && (
                    <p className="flex items-center text-accent-7 mb-2">
                      {' '}
                      <IconArrow /> {p.item3}{' '}
                    </p>
                  )}
                  {p.item4 && (
                    <p className="flex items-center text-accent-7 mb-2">
                      {' '}
                      <IconArrow /> {p.item4}{' '}
                    </p>
                  )}
                  {p.item5 && (
                    <p className="flex items-center text-accent-7 mb-2">
                      {' '}
                      <IconArrow /> {p.item5}{' '}
                    </p>
                  )}
                  {p.item6 && (
                    <p className="flex items-center text-accent-7 mb-2">
                      {' '}
                      <IconArrow /> {p.item6}{' '}
                    </p>
                  )}
                  {p.item7 && (
                    <p className="flex items-center text-accent-7 mb-2">
                      {' '}
                      <IconArrow /> {p.item7}{' '}
                    </p>
                  )}
                  {p.item8 && (
                    <p className="flex items-center text-accent-7 mb-2">
                      {' '}
                      <IconArrow /> {p.item8}{' '}
                    </p>
                  )}
                  {p.item9 && (
                    <p className="flex items-center text-accent-7 mb-2">
                      {' '}
                      <IconArrow /> {p.item9}{' '}
                    </p>
                  )}
                  {p.item10 && (
                    <p className="flex items-center text-accent-7 mb-2">
                      {' '}
                      <IconArrow /> {p.item10}{' '}
                    </p>
                  )}

                  <div className="mt-4"></div>

                  <button
                    onClick={() => {
                      router.push(p.link)
                    }}
                    className="mt-auto btn bg-tertiary text-tertiary border-0"
                  >
                    {content.buttonLabel}
                  </button>

                  <p className="text-xs text-accent-7 mt-3">{p.notes}&nbsp;</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

function IconArrow() {
  return (
    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-accent-3 text-white rounded-full flex-shrink-0">
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        className="w-3 h-3"
        viewBox="0 0 24 24"
      >
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
    </span>
  )
}
