/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Search, RightArrow } from 'components/icons'
import cn from 'classnames'
import Image from 'next/image'

interface Props {
  block: any
  menu: any
  user: any
}

export default function View(props: Props) {
  const { block, menu, user } = props
  const [content, setContent] = useState({} as any)
  const [config, setConfig] = useState({} as any)
  const [menuSorted, setMenuSorted] = useState([] as any)
  const [search, setSearch] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (block && block.config) {
      const configParse = JSON.parse(block.config)
      setConfig(configParse)
    }
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setContent(contentParse)

      setMenuSorted(
        contentParse.orderDesc && contentParse.orderDesc === 'true'
          ? (menu as any).sort((a: any, b: any) =>
              a.order < b.order ? 1 : b.order < a.order ? -1 : 0
            )
          : (menu as any).sort((a: any, b: any) =>
              a.order > b.order ? 1 : b.order > a.order ? -1 : 0
            )
      )
    }
    return () => {
      setConfig({} as any)
      setContent({} as any)
      setMenuSorted([] as any)
    }
  }, [block, menu])

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
      {content.enableFilter && content.enableFilter === 'true' && (
        <div className="mb-6 cursor-default relative flex items-center justify-center text-base w-full transition-colors duration-150">
          <label className="hidden">Search</label>
          <input
            className="bg-accent-1 rounded-full px-3 py-2 outline-none appearance-none w-full transition duration-150 ease-in-out"
            autoComplete="off"
            placeholder="Filtrar..."
            onKeyUp={(e) => {
              e.preventDefault()
              setSearch(e.currentTarget.value)
            }}
          />
          <div className="text-accent-7 absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search />
          </div>
        </div>
      )}
      <div
        className={cn('grid', {
          ['grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-4']:
            !content.qtyColumns || content.qtyColumns === 'auto',
          ['grid-cols-1 gap-2']:
            content.qtyColumns && content.qtyColumns === '1',
          ['grid-cols-2 gap-2']:
            content.qtyColumns && content.qtyColumns === '2',
        })}
      >
        {menuSorted.map((item: any, index: number) =>
          (!item.hideInMenu ||
            (item.hideInMenu && item.hideInMenu === false)) &&
          (!search ||
            (search &&
              item.title.toLowerCase().indexOf(search.toLowerCase()) != -1)) ? (
            <div
              key={`item${index}`}
              className={cn(
                'shadow bg-accent-0 text-accent-6 lg:w-full cursor-pointer h-full flex items-center py-2 px-2 rounded-lg',
                {
                  ['border-l-2 border-tertiary']:
                    router.asPath === `/page/${item.alias}/`,
                }
              )}
              onClick={() => {
                router.push(`/page/${item.alias ? item.alias : item.id}`)
              }}
            >
              {content.thumbnail !== '0' && item.thumbnail && (
                <div
                  className="flex flex-wrap content-center"
                  style={{
                    height: content.thumbnail
                      ? parseInt(content.thumbnail)
                      : 64,
                    width: content.thumbnailFormat !== 'wide' ? 
                      (content.thumbnail ? parseInt(content.thumbnail) : 64) : 
                      (content.thumbnail ? parseInt(content.thumbnail) + (parseInt(content.thumbnail) * 0.5625) : 64),
                      minWidth: content.thumbnailFormat !== 'wide' ? 
                      (content.thumbnail ? parseInt(content.thumbnail) : 64) : 
                      (content.thumbnail ? parseInt(content.thumbnail) + (parseInt(content.thumbnail) * 0.5625) : 64) 
                  }}
                >
                  <Image
                    alt={item.title}
                    className={cn(
                      'bg-accent-1 object-cover object-center ',
                      {
                        'mask mask-squircle':
                          !content.thumbnailFormat ||
                          content.thumbnailFormat === 'squircle',
                        'mask mask-circle':
                          content.thumbnailFormat === 'circle',
                        'mask mask-square':
                          content.thumbnailFormat === 'square'
                      }
                    )}
                    src={`${process.env.MIDIA_CLOUDFRONT}${item.thumbnail}`}
                    width={content.thumbnailFormat !== 'wide' ? 
                    (content.thumbnail ? parseInt(content.thumbnail) : 64) : 
                    (content.thumbnail ? parseInt(content.thumbnail) + (parseInt(content.thumbnail) * 0.5625) : 64)}
                    height={content.thumbnail ? parseInt(content.thumbnail) : 64}
                  />
                </div>
              )}
              <div
                className={cn('flex-grow', {
                  'ml-3': content.thumbnail !== '0' && item.thumbnail,
                })}
              >
                <h2 className="title-font font-semibold text-lg hover:text-tertiary-2">
                  {item.title}
                </h2>
                {content.showDescription &&
                  content.showDescription === 'true' &&
                  item.description && (
                    <p className="text-accent-5 line-clamp-2 text-xs md:text-base">
                      {item.description}
                    </p>
                  )}
              </div>
              {router.asPath !== `/page/${item.alias}/` && (
                <div className="text-accent-2">
                  <RightArrow width={24} height={24} />
                </div>
              )}
            </div>
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  )
}
