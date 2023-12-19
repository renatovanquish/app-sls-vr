/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
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
      <div className="flex flex-wrap mx-auto items-center">
        <div className="w-full md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 mb-10 md:mb-0 pb-10 border-b border-accent-2">
          {content.title && (
            <h1 className="text-center md:text-left sm:text-3xl text-2xl font-medium title-font mb-2 text-accent-9">
              {content.title}
            </h1>
          )}
          {content.description && (
            <p className="text-center md:text-left leading-relaxed text-base">
              {content.description}
            </p>
          )}
          {link1 && (
            <Link href={link1}>
              <a className="text-tertiary-2 inline-flex items-center mt-4">
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
        {content.titleTags && (
          <div className="w-full flex flex-col md:w-1/2 md:pl-12">
            <h2 className="text-center md:text-left title-font font-semibold text-tertiary-2 tracking-wider text-lg mb-3 uppercase">
              {content.titleTags}
            </h2>
            <nav className="grid grid-cols-2 xl:grid-cols-3 gap-2 list-none w-full">
              {content.tag1 && (
                <li className="btn btn-ghost">
                  <a className="text-accent-6">{content.tag1}</a>
                </li>
              )}
              {content.tag2 && (
                <li className="btn btn-ghost">
                  <a className="text-accent-6">{content.tag2}</a>
                </li>
              )}
              {content.tag3 && (
                <li className="btn btn-ghost">
                  <a className="text-accent-6">{content.tag3}</a>
                </li>
              )}
              {content.tag4 && (
                <li className="btn btn-ghost">
                  <a className="text-accent-6">{content.tag4}</a>
                </li>
              )}
              {content.tag5 && (
                <li className="btn btn-ghost">
                  <a className="text-accent-6">{content.tag5}</a>
                </li>
              )}
              {content.tag6 && (
                <li className="btn btn-ghost">
                  <a className="text-accent-6">{content.tag6}</a>
                </li>
              )}
              {content.tag7 && (
                <li className="btn btn-ghost">
                  <a className="text-accent-6">{content.tag7}</a>
                </li>
              )}
              {content.tag8 && (
                <li className="btn btn-ghost">
                  <a className="text-accent-6">{content.tag8}</a>
                </li>
              )}
              {content.tag9 && (
                <li className="btn btn-ghost">
                  <a className="text-accent-6">{content.tag9}</a>
                </li>
              )}
              {content.tag10 && (
                <li className="btn btn-ghost">
                  <a className="text-accent-6">{content.tag10}</a>
                </li>
              )}
              {content.tag11 && (
                <li className="btn btn-ghost">
                  <a className="text-accent-6">{content.tag11}</a>
                </li>
              )}
              {content.tag12 && (
                <li className="btn btn-ghost">
                  <a className="text-accent-6">{content.tag12}</a>
                </li>
              )}
            </nav>
          </div>
        )}
      </div>
    </section>
  )
}
