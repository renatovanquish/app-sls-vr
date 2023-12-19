/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames'
import { useBreakPoints } from 'hooks/useBreakPoints'

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
  const [link3, setLink3] = useState('')
  const { isSm } = useBreakPoints()

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
      if (contentParse.buttonName3 && contentParse.buttonLink3) {
        setLink3(
          contentParse.buttonLink3.indexOf('http') !== -1
            ? contentParse.buttonLink3
            : `/page/${contentParse.buttonLink3}`
        )
      }
    }
    return () => {
      setContent({} as any)
      setConfig({} as any)
      setLink1('')
      setLink2('')
      setLink3('')
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
      <div className="mx-auto">
        {(content.title || content.description) && (
          <div className="w-full text-center mb-10">
            {content.title && (
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-accent-9 mb-4">
                {content.title}
              </h1>
            )}
            {content.description && (
              <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-accent-7">
                {content.description}
              </p>
            )}
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-tertiary-2 inline-flex"></div>
            </div>
          </div>
        )}
        <div className="w-full flex flex-wrap md:space-y-0 space-y-6">
          <div className="w-full p-4 md:w-1/3 flex flex-col text-center items-center">
            {content.imageUrl1 && (
              <div className="inline-flex items-center justify-center rounded-full  mb-5 flex-shrink-0">
                <div className="avatar">
                  <div className="mask mask-squircle">
                    <Image
                      alt=""
                      src={content.imageUrl1}
                      width={isSm ? 256 : 128}
                      height={isSm ? 256 : 128}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="flex-grow">
              {content.topic1 && (
                <h2 className="title-font font-bold text-xl text-accent-9 mb-3">
                  {content.topic1}
                </h2>
              )}
              {content.text1 && (
                <p className="tleading-relaxed text-base text-accent-6">{content.text1}</p>
              )}
              {link1 && (
                <Link href={link1}>
                  <a className="mt-3 text-tertiary-2 inline-flex items-center">
                    {content.buttonName1}
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </Link>
              )}
            </div>
          </div>
          <div className="w-full p-4 md:w-1/3 flex flex-col text-center items-center">
            {content.imageUrl2 && (
              <div className="inline-flex items-center justify-center rounded-full  mb-5 flex-shrink-0">
                <div className="avatar">
                  <div className="mask mask-squircle">
                    <Image
                      alt=""
                      src={content.imageUrl2}
                      width={isSm ? 256 : 128}
                      height={isSm ? 256 : 128}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="flex-grow">
              {content.topic2 && (
                <h2 className="title-font font-bold text-xl text-accent-9 mb-3">
                  {content.topic2}
                </h2>
              )}
              {content.text2 && (
                <p className="tleading-relaxed text-base text-accent-6">{content.text2}</p>
              )}
              {link2 && (
                <Link href={link2}>
                  <a className="mt-3 text-tertiary-2 inline-flex items-center">
                    {content.buttonName2}
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </Link>
              )}
            </div>
          </div>
          <div className="w-full p-4 md:w-1/3 flex flex-col text-center items-center">
            {content.imageUrl3 && (
              <div className="inline-flex items-center justify-center rounded-full  mb-5 flex-shrink-0">
                <div className="avatar">
                  <div className="mask mask-squircle">
                    <Image
                      alt=""
                      src={content.imageUrl3}
                      width={isSm ? 256 : 128}
                      height={isSm ? 256 : 128}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="flex-grow">
              {content.topic3 && (
                <h2 className="title-font font-bold text-xl text-accent-9 mb-2">
                  {content.topic3}
                </h2>
              )}
              {content.text3 && (
                <p className="tleading-relaxed text-base text-accent-6">{content.text3}</p>
              )}
              {link3 && (
                <Link href={link3}>
                  <a className="mt-3 text-tertiary-2 inline-flex items-center">
                    {content.buttonName3}
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
