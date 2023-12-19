/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  const [link2, setLink2] = useState('')

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
      if (contentParse.buttonName2 && contentParse.buttonLink2) {
        setLink2(
          contentParse.buttonLink2.indexOf('http') !== -1
            ? contentParse.buttonLink2
            : `/page/${contentParse.buttonLink2}`
        )
      }
    }
    return () => {
      setContent({} as any)
      setLink1('')
      setLink2('')
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
      <div className="mx-auto flex md:flex-row flex-col items-center">
        {content.imageUrl && (
          <div
            className={cn(
              'lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0',
              {
                [`shadow${content.viewShadow}`]:
                  content.viewShadow && content.viewShadow !== '-none',
                [`p-${content.viewBorder}`]:
                  content.viewBorder && content.viewBorder !== '0',
                [`bg-accent-${content.viewBgColor}`]:
                  content.viewBgColor && content.viewBgColor !== 'none',
                [`rounded${content.viewRounded}`]:
                  content.viewRounded && content.viewRounded !== '-none',
              }
            )}
          >
            <Image
              alt=""
              className={cn('object-scale-down', {
                [`rounded${content.viewRounded}`]:
                  content.viewRounded && content.viewRounded !== '-none',
              })}
              src={content.imageUrl}
              width={
                content.aspectRatio ? content.aspectRatio.split(':')[0] : 100
              }
              height={
                content.aspectRatio ? content.aspectRatio.split(':')[1] : 100
              }
              layout="responsive"
            />
          </div>
        )}
        <div className="lg:flex-grow md:w-1/2 lg:pl-16 md:pl-12 flex flex-col md:items-start md:text-left items-center text-center">
          {content.title && (
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-accent-9">
              {content.title}
            </h1>
          )}
          {content.description && (
            <p
              className="mb-8 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.description }}
            ></p>
          )}
          {(link1 || link2) && (
            <div className="flex justify-center">
              {link1 && (
                <Link href={link1}>
                  <a className="inline-flex text-white bg-tertiary-2 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded text-lg">
                    {content.buttonName1}
                  </a>
                </Link>
              )}
              {link2 && (
                <Link href={link2}>
                  <a
                    className={`${
                      link1 && 'ml-4'
                    } inline-flex text-accent-7 bg-accent-2 border-0 py-2 px-6 focus:outline-none hover:bg-accent-5 rounded text-lg`}
                  >
                    {content.buttonName2}
                  </a>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
