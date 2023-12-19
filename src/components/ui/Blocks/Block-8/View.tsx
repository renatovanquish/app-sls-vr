/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import { useBreakPoints } from 'hooks/useBreakPoints'

interface Props {
  block: any
  user: any
}

export default function View(props: Props) {
  const { block, user } = props
  const [content, setContent] = useState({} as any)
  const [config, setConfig] = useState({} as any)
  const { isSm } = useBreakPoints()

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
        <div className="flex flex-col text-center w-full mb-20">
          {content.blockTitle && (
            <h1 className="text-2xl font-medium title-font mb-4 text-accent-9 tracking-widest">
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
      <div className="flex flex-wrap -m-4">
        <div className="w-full p-4 lg:w-1/2">
          <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
            {content.imageUrl1 && (
              <div className="flex-shrink-0">
                <Image
                  alt=""
                  className="object-cover object-center rounded-lg"
                  src={content.imageUrl1}
                  width={isSm ? 256 : 128}
                  height={isSm ? 256 : 128}
                />
              </div>
            )}
            <div className="flex-grow sm:pl-8">
              <h2 className="title-font font-bold text-xl text-accent-9">
                {content.title1}
              </h2>
              <h3 className="text-tertiary-2 mb-2 text-sm">{content.subTitle1}</h3>
              <p className="mb-4 text-accent-6">{content.description1}</p>
            </div>
          </div>
        </div>
        <div className="w-full p-4 lg:w-1/2">
          <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
            {content.imageUrl2 && (
              <div className="flex-shrink-0">
                <Image
                  alt=""
                  className="w-48 h-48 object-cover object-center rounded-lg"
                  src={content.imageUrl2}
                  width={isSm ? 256 : 128}
                  height={isSm ? 256 : 128}
                />
              </div>
            )}
            <div className="flex-grow sm:pl-8">
              <h2 className="title-font font-bold text-xl text-accent-9">
                {content.title2}
              </h2>
              <h3 className="text-tertiary-2 mb-2 text-sm">{content.subTitle2}</h3>
              <p className="mb-4 text-accent-6">{content.description2}</p>
            </div>
          </div>
        </div>
        <div className="w-full p-4 lg:w-1/2">
          <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
            {content.imageUrl3 && (
              <div className="flex-shrink-0">
                <Image
                  alt=""
                  className="w-48 h-48 object-cover object-center rounded-lg"
                  src={content.imageUrl3}
                  width={isSm ? 256 : 128}
                  height={isSm ? 256 : 128}
                />
              </div>
            )}
            <div className="flex-grow sm:pl-8">
              <h2 className="title-font font-bold text-xl text-accent-9">
                {content.title3}
              </h2>
              <h3 className="text-tertiary-2 mb-2 text-sm">{content.subTitle3}</h3>
              <p className="mb-4 text-accent-6">{content.description3}</p>
            </div>
          </div>
        </div>
        <div className="w-full p-4 lg:w-1/2">
          <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
            {content.imageUrl4 && (
              <div className="flex-shrink-0">
                <Image
                  alt=""
                  className="w-48 h-48 object-cover object-center rounded-lg"
                  src={content.imageUrl4}
                  width={isSm ? 256 : 128}
                  height={isSm ? 256 : 128}
                />
              </div>
            )}
            <div className="flex-grow sm:pl-8">
              <h2 className="title-font font-bold text-xl text-accent-9">
                {content.title4}
              </h2>
              <h3 className="text-tertiary-2 mb-2 text-sm">{content.subTitle4}</h3>
              <p className="mb-4 text-accent-6">{content.description4}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
