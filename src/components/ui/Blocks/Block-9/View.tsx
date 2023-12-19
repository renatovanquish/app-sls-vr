/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import cn from 'classnames'
import { useBreakPoints } from 'hooks/useBreakPoints'
import Image from 'next/image'

interface Props {
  block: any
  user: any
}

export default function View(props: Props) {
  const { block, user } = props
  const [content, setContent] = useState({} as any)
  const [config, setConfig] = useState({} as any)
  const { isSm, isMd } = useBreakPoints()

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
      {(content.blockTitle || content.blockDescription) && (
        <div
          className={cn('flex flex-col text-center w-full', {
            ['pb-8']: !config.padY || config.padY === 'small',
            ['pb-12']: config.padY && config.padY === 'normal',
            ['pb-24']: config.padY && config.padY === 'large',
            ['pb-32']: config.padY && config.padY === 'extra',
          })}
        >
          {content.blockTitle && (
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-accent-9">
              {content.blockTitle}
            </h1>
          )}
          {content.blockDescription && (
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              {content.blockDescription}
            </p>
          )}
        </div>
      )}
      <div className="w-full flex flex-wrap m-0">
        {content.imageUrl1 && (
          <div className="w-full lg:w-1/3 sm:w-1/2 p-4">
            <div className="flex relative">
              <Image
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center shadow-lg"
                src={content.imageUrl1}
                width="320"
                height="320"
                layout="fill"
              />
              <div
                style={{ minHeight: isSm ? 250 : isMd ? 300 : 350 }}
                className={`px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 ${
                  (content.subTitle1 ||
                    content.subTitle1 ||
                    content.description1) &&
                  'hover:opacity-100'
                }`}
              >
                <h2 className="tracking-widest text-sm title-font font-medium text-tertiary-2 mb-1">
                  {content.subTitle1}
                </h2>
                <h1 className="title-font text-lg font-medium text-accent-9 mb-3">
                  {content.title1}
                </h1>
                <p className="leading-relaxed">{content.description1}</p>
              </div>
            </div>
          </div>
        )}
        {content.imageUrl2 && (
          <div className="w-full lg:w-1/3 sm:w-1/2 p-4">
            <div className="flex relative">
              <Image
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center shadow-lg"
                src={content.imageUrl2}
                width="320"
                height="320"
                layout="fill"
              />
              <div
                style={{ minHeight: isSm ? 250 : isMd ? 300 : 350 }}
                className={`px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 ${
                  (content.subTitle2 ||
                    content.subTitle2 ||
                    content.description2) &&
                  'hover:opacity-100'
                }`}
              >
                <h2 className="tracking-widest text-sm title-font font-medium text-tertiary-2 mb-1">
                  {content.subTitle2}
                </h2>
                <h1 className="title-font text-lg font-medium text-accent-9 mb-3">
                  {content.title2}
                </h1>
                <p className="leading-relaxed">{content.description2}</p>
              </div>
            </div>
          </div>
        )}
        {content.imageUrl3 && (
          <div className="w-full lg:w-1/3 sm:w-1/2 p-4">
            <div className="flex relative">
              <Image
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center shadow-lg"
                src={content.imageUrl3}
                width="320"
                height="320"
                layout="fill"
              />
              <div
                style={{ minHeight: isSm ? 250 : isMd ? 300 : 350 }}
                className={`px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 ${
                  (content.subTitle3 ||
                    content.subTitle3 ||
                    content.description3) &&
                  'hover:opacity-100'
                }`}
              >
                <h2 className="tracking-widest text-sm title-font font-medium text-tertiary-2 mb-1">
                  {content.subTitle3}
                </h2>
                <h1 className="title-font text-lg font-medium text-accent-9 mb-3">
                  {content.title3}
                </h1>
                <p className="leading-relaxed">{content.description3}</p>
              </div>
            </div>
          </div>
        )}
        {content.imageUrl4 && (
          <div className="w-full lg:w-1/3 sm:w-1/2 p-4">
            <div className="flex relative">
              <Image
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center shadow-lg"
                src={content.imageUrl4}
                width="320"
                height="320"
                layout="fill"
              />
              <div
                style={{ minHeight: isSm ? 250 : isMd ? 300 : 350 }}
                className={`px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 ${
                  (content.subTitle4 ||
                    content.subTitle4 ||
                    content.description4) &&
                  'hover:opacity-100'
                }`}
              >
                <h2 className="tracking-widest text-sm title-font font-medium text-tertiary-2 mb-1">
                  {content.subTitle4}
                </h2>
                <h1 className="title-font text-lg font-medium text-accent-9 mb-3">
                  {content.title4}
                </h1>
                <p className="leading-relaxed">{content.description4}</p>
              </div>
            </div>
          </div>
        )}
        {content.imageUrl5 && (
          <div className="w-full lg:w-1/3 sm:w-1/2 p-4">
            <div className="flex relative">
              <Image
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center shadow-lg"
                src={content.imageUrl5}
                width="320"
                height="320"
                layout="fill"
              />
              <div
                style={{ minHeight: isSm ? 250 : isMd ? 300 : 350 }}
                className={`px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 ${
                  (content.subTitle5 ||
                    content.subTitle5 ||
                    content.description5) &&
                  'hover:opacity-100'
                }`}
              >
                <h2 className="tracking-widest text-sm title-font font-medium text-tertiary-2 mb-1">
                  {content.subTitle5}
                </h2>
                <h1 className="title-font text-lg font-medium text-accent-9 mb-3">
                  {content.title5}
                </h1>
                <p className="leading-relaxed">{content.description5}</p>
              </div>
            </div>
          </div>
        )}
        {content.imageUrl6 && (
          <div className="w-full lg:w-1/3 sm:w-1/2 p-4 ">
            <div className="flex relative">
              <Image
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center shadow-lg"
                src={content.imageUrl6}
                width="320"
                height="320"
                layout="fill"
              />
              <div
                style={{ minHeight: isSm ? 250 : isMd ? 300 : 350 }}
                className={`px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 ${
                  (content.subTitle6 ||
                    content.subTitle6 ||
                    content.description6) &&
                  'hover:opacity-100'
                }`}
              >
                <h2 className="tracking-widest text-sm title-font font-medium text-tertiary-2 mb-1">
                  {content.subTitle6}
                </h2>
                <h1 className="title-font text-lg font-medium text-accent-9 mb-3">
                  {content.title6}
                </h1>
                <p className="leading-relaxed">{content.description6}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
