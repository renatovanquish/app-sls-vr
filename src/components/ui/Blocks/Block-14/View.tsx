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
      setConfig({} as any)
      setLink1('')
      setLink2('')
    }
  }, [block])

  return (
    <section
      className={cn('mx-auto flex items-center justify-center flex-col', {
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
      <div className="mx-auto">
        <div className="flex flex-wrap -mx-4 -mb-10 text-center">
          <div className="sm:w-1/2 mb-10 px-4">
            <div className="px-0 md:px-8 lg:px-16 xl:px-32">
              {content.imageUrl1 && (
                <div
                  className={cn('overflow-hidden', {
                    [`shadow${content.viewShadow1}`]:
                      content.viewShadow1 && content.viewShadow1 !== '-none',
                    [`p-${content.viewBorder1}`]:
                      content.viewBorder1 && content.viewBorder1 !== '0',
                    [`bg-accent-${content.viewBgColor1}`]:
                      content.viewBgColor1 && content.viewBgColor1 !== 'none',
                    [`rounded${content.viewRounded1}`]:
                      content.viewRounded1 && content.viewRounded1 !== '-none',
                  })}
                >
                  <Image
                    alt=""
                    className={cn('object-cover object-center', {
                      [`rounded${content.viewRounded1}`]:
                        content.viewRounded1 &&
                        content.viewRounded1 !== '-none',
                    })}
                    src={content.imageUrl1}
                    width={
                      content.aspectRatio1
                        ? content.aspectRatio1.split(':')[0]
                        : 100
                    }
                    height={
                      content.aspectRatio1
                        ? content.aspectRatio1.split(':')[1]
                        : 100
                    }
                    layout="responsive"
                  />
                </div>
              )}
            </div>
            {content.topic1 && (
              <h2 className="title-font text-2xl font-medium text-accent-9 mt-6 mb-3">
                {content.topic1}
              </h2>
            )}
            {content.text1 && (
              <p className="leading-relaxed text-base">{content.text1}</p>
            )}
            {link1 && (
              <Link href={link1}>
                <a>
                  <button className="flex mx-auto mt-6 text-white bg-tertiary-2 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    {content.buttonName1}
                  </button>
                </a>
              </Link>
            )}
          </div>
          <div className="sm:w-1/2 mb-10 px-4">
            <div className="px-0 md:px-8 lg:px-16 xl:px-32">
              {content.imageUrl2 && (
                <div
                  className={cn('overflow-hidden', {
                    [`shadow${content.viewShadow2}`]:
                      content.viewShadow2 && content.viewShadow2 !== '-none',
                    [`p-${content.viewBorder2}`]:
                      content.viewBorder2 && content.viewBorder2 !== '0',
                    [`bg-accent-${content.viewBgColor1}`]:
                      content.viewBgColor2 && content.viewBgColor2 !== 'none',
                    [`rounded${content.viewRounded1}`]:
                      content.viewRounded2 && content.viewRounded2 !== '-none',
                  })}
                >
                  <Image
                    alt=""
                    className={cn('object-cover object-center', {
                      [`rounded${content.viewRounded2}`]:
                        content.viewRounded2 &&
                        content.viewRounded2 !== '-none',
                    })}
                    src={content.imageUrl2}
                    width={
                      content.aspectRatio2
                        ? content.aspectRatio2.split(':')[0]
                        : 100
                    }
                    height={
                      content.aspectRatio2
                        ? content.aspectRatio2.split(':')[1]
                        : 100
                    }
                    layout="responsive"
                  />
                </div>
              )}
            </div>
            {content.topic2 && (
              <h2 className="title-font text-2xl font-medium text-accent-9 mt-6 mb-3">
                {content.topic2}
              </h2>
            )}
            {content.text2 && (
              <p className="leading-relaxed text-base">{content.text2}</p>
            )}
            {link2 && (
              <Link href={link2}>
                <a>
                  <button className="flex mx-auto mt-6 text-white bg-tertiary-2 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    {content.buttonName2}
                  </button>
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
