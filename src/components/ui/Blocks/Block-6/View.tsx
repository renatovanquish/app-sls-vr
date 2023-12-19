/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Check2 } from 'components/icons'
import Link from 'next/link'
import cn from 'classnames'

interface Props {
  block: any
  user: any
}

export default function View(props: Props) {
  const { block, user } = props
  const [content, setContent] = useState({} as any)
  const [config, setConfig] = useState({} as any)
  const [link1, setLink1] = useState('')

  useEffect(() => {
    if (block && block.config) {
      const configParse = JSON.parse(block.config)
      setConfig(configParse)
    }
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setContent(contentParse)
      if (contentParse.buttonName1 && contentParse.buttonLink1) {
        setLink1(
          contentParse.buttonLink1.indexOf('http') !== -1
            ? contentParse.buttonLink1
            : `/page/${contentParse.buttonLink1}`
        )
      }
    }
    return () => {
      setContent({} as any)
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
    >{config.anchor && <a id={`${config.anchor}`}></a>}
      <div className="text-center mb-10">
        {content.title && (
          <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-accent-9 mb-4">
            {content.title}
          </h1>
        )}
        {content.description && (
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            {content.description}
          </p>
        )}
      </div>
      <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
        {content.topic1 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic1}
              </span>
            </div>
          </div>
        )}
        {content.topic2 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic2}
              </span>
            </div>
          </div>
        )}
        {content.topic3 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic3}
              </span>
            </div>
          </div>
        )}
        {content.topic4 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic4}
              </span>
            </div>
          </div>
        )}
        {content.topic5 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic5}
              </span>
            </div>
          </div>
        )}
        {content.topic6 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic6}
              </span>
            </div>
          </div>
        )}
        {content.topic7 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic7}
              </span>
            </div>
          </div>
        )}
        {content.topic8 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic8}
              </span>
            </div>
          </div>
        )}
        {content.topic9 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic9}
              </span>
            </div>
          </div>
        )}
        {content.topic10 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic10}
              </span>
            </div>
          </div>
        )}
        {content.topic11 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic11}
              </span>
            </div>
          </div>
        )}
        {content.topic12 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic12}
              </span>
            </div>
          </div>
        )}
        {content.topic13 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic13}
              </span>
            </div>
          </div>
        )}
        {content.topic14 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic14}
              </span>
            </div>
          </div>
        )}
        {content.topic15 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic15}
              </span>
            </div>
          </div>
        )}
        {content.topic16 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic16}
              </span>
            </div>
          </div>
        )}
        {content.topic17 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic17}
              </span>
            </div>
          </div>
        )}
        {content.topic18 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic18}
              </span>
            </div>
          </div>
        )}
        {content.topic19 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic19}
              </span>
            </div>
          </div>
        )}
        {content.topic20 && (
          <div className="p-0 sm:w-1/2 lg:w-1/3 w-full">
            <div className="rounded flex justify-center md:justify-start p-3 h-full items-center text-tertiary-2">
              <Check2 />
              <span className="ml-3 title-font font-bold text-lg">
                {content.topic20}
              </span>
            </div>
          </div>
        )}
      </div>
      {link1 && (
        <Link href={link1}>
          <a>
            <button className="flex mx-auto mt-16 text-white bg-tertiary-2 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              {content.buttonName1}
            </button>
          </a>
        </Link>
      )}
    </section>
  )
}
