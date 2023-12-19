/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { RightArrow } from 'components/icons'
import Link from 'next/link'
import cn from 'classnames'

import { Storage } from 'aws-amplify'
Storage.configure({ level: 'public' })

import { useProduct } from 'hooks/useProduct'
import { useCategory } from 'hooks/useCategory'
import { useMenu } from 'hooks/useMenu'

import { PageStatus } from 'models'

import dynamic from 'next/dynamic'
const Card1 = dynamic(() => import('./Card1'))
const Card2 = dynamic(() => import('./Card2'))
const Card3 = dynamic(() => import('./Card3'))
const Card4 = dynamic(() => import('./Card4'))
const Card5 = dynamic(() => import('./Card5'))

interface Props {
  block: any
  user: any
}

export default function View(props: Props) {
  const { block, user } = props
  const [content, setContent] = useState({} as any)
  const [config, setConfig] = useState({} as any)

  const [photosS3, setPhotosS3] = useState([] as any)
  const [products, setProducts] = useState([] as any)
  const [categories, setCategories] = useState([] as any)
  const [menus, setMenus] = useState([] as any)

  const { listProductsByStatusCategoryName } = useProduct()
  const { listCategories } = useCategory()
  const { listMenus } = useMenu()

  const fetchPhotosS3 = async (contentParse: any) => {
    const items = await Storage.list(contentParse.folder, { level: 'public' })
    const { files } = processStorageList(items)
    setPhotosS3(files)
  }

  const fetchProducts = async (contentParse: any) => {
    const { items } = await listProductsByStatusCategoryName({
      status: PageStatus.ON,
      categoryName: {
        between: [
          { category: contentParse.category, name: '' },
          { category: contentParse.category, name: 'Z' },
        ],
      },
      limit: contentParse.qtyCards,
      nextToken: null,
    })
    setProducts(items)
  }

  const fetchCategories = async (contentParse: any) => {
    const { items } = await listCategories({
      limit: 100,
      nextToken: null,
    })
    const c: any[] = []
    items.map((i: any) => {
      if (!i.isSub && !i.hide && c.length <= contentParse.qtyCards) {
        c.push(i)
      }
    })
    setCategories(
      c.sort((a: any, b: any) =>
        a.order > b.order ? 1 : b.order > a.order ? -1 : 0
      )
    )
  }
  
  const fetchMenus = async (contentParse: any) => {
    const { items } = await listMenus({
      limit: 100,
      nextToken: null,
    })
    const m: any[] = []
    items.map((i: any) => {
      if (!i.hide && m.length <= contentParse.qtyCards) {
        m.push(i)
      }
    })
    setMenus(
      m.sort((a: any, b: any) =>
        a.order > b.order ? 1 : b.order > a.order ? -1 : 0
      )
    )
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const fetchPhotosS3 = async (contentParse: any) => {
        const items = await Storage.list(contentParse.folder, { level: "public" })
        console.log(items)
        const { files } = processStorageList(items)
        setPhotosS3(files)
      }
    
      const fetchProducts = async (contentParse: any) => {
        const { items } = await listProductsByStatusCategoryName({
          status: PageStatus.ON,
          categoryName: {
            between: [
              { category: contentParse.category, name: '' },
              { category: contentParse.category, name: 'Z' },
            ],
          },
          limit: contentParse.qtyCards,
          nextToken: null,
        })
        setProducts(items)
      }
    
      const fetchCategories = async (contentParse: any) => {
        const { items } = await listCategories({
          limit: 100,
          nextToken: null,
        })
        const c: any[] = []
        items.map((i: any) => {
          if (!i.isSub && !i.hide && c.length <= contentParse.qtyCards) {
            c.push(i)
          }
        })
        setCategories(
          c.sort((a: any, b: any) =>
            a.order > b.order ? 1 : b.order > a.order ? -1 : 0
          )
        )
      }
      
      const fetchMenus = async (contentParse: any) => {
        const { items } = await listMenus({
          limit: 100,
          nextToken: null,
        })
        const m: any[] = []
        items.map((i: any) => {
          if (!i.hide && m.length <= contentParse.qtyCards) {
            m.push(i)
          }
        })
        setMenus(
          m.sort((a: any, b: any) =>
            a.order > b.order ? 1 : b.order > a.order ? -1 : 0
          )
        )
      }

      if (block && block.config) {
        const configParse = JSON.parse(block.config)
        setConfig(configParse)
      }
      if (block && block.content) {
        const contentParse = JSON.parse(block.content)
        setContent(contentParse)
  
        if (contentParse.source === 'images_folder' && contentParse.folder) {
          fetchPhotosS3(contentParse)
        } else if (contentParse.source === 'category_products') {
          fetchProducts(contentParse)
        } else if (contentParse.source === 'categories') {
          fetchCategories(contentParse)
        } else if (contentParse.source === 'menus') {
          fetchMenus(contentParse)
        }
      }
    }
    return () => {
      isMounted = false
      setContent({} as any)
      setConfig({} as any)
      setPhotosS3([] as any)
      setProducts([] as any)
      setCategories([] as any)
      setMenus([] as any)
    }
  }, [block])


  const getName = (key: string) => {
    const nameArr = key
      .split(content.folder + '/')[1]
      .split('.')[0]
      .toLowerCase()
      .split('_')

    let name = ''
    for (let i = 0; i < nameArr.length; i++) {
      if (nameArr[i].length === 1) {
        name += `${nameArr[i].toUpperCase()}. `
      } else if (nameArr[i].length === 2 || nameArr[i].length === 3) {
        name += `${nameArr[i]} `
      } else {
        name += `${nameArr[i].charAt(0).toUpperCase()}${nameArr[i].slice(1)} `
      }
    }
    return name
  }

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
      <div className="mt-4 flex flex-col m-auto p-auto">
        {(content.title || content.viewAllLink) && (
          <h2 className="flex flex-row items-center justify-between">
            <div className="ml-6 font-bold text-xl text-accent-8">
              {content.title && content.title}
            </div>
            {content.buttonName1 && content.buttonLink1 && (
              <Link href={content.buttonLink1}>
                <a className="flex text-accent-6 hover:text-accent-9 mr-4 bg-accent-1 py-1 px-2 rounded">
                  <span className="hidden md:block">{content.buttonName1}</span>{' '}
                  <RightArrow />
                </a>
              </Link>
            )}
          </h2>
        )}
        <div className="mt-3 flex overflow-x-scroll pb-6 hide-scroll-bar">
          <div className="flex flex-nowrap ml-3">
            {content.source === 'images_folder' &&
              content.folder &&
              photosS3.map(
                (photo: any, index: number) =>
                  photo.key.indexOf('.DS_Store') === -1 &&
                  index < content.qtyCards && (
                    <div
                      key={index}
                      className={cn('inline-block', {
                        ['px-2']:
                          !content.viewFormat ||
                          (content.viewFormat !== 'circle-sm' &&
                            content.viewFormat !== 'circle-md' &&
                            content.viewFormat !== 'circle-lg' &&
                            content.viewFormat !== 'square-sm' &&
                            content.viewFormat !== 'square-md' &&
                            content.viewFormat !== 'square-lg') ||
                          (content.viewFormat &&
                            content.viewFormat === 'square-lg') ||
                          (content.viewFormat &&
                            content.viewFormat === 'circle-lg'),
                        ['px-1']:
                          (content.viewFormat &&
                            content.viewFormat === 'square-sm') ||
                          (content.viewFormat &&
                            content.viewFormat === 'square-md') ||
                          (content.viewFormat &&
                            content.viewFormat === 'circle-sm') ||
                          (content.viewFormat &&
                            content.viewFormat === 'circle-md'),
                      })}
                    >
                      <div
                        className={cn(
                          'max-w-xs overflow-hidden drop-shadow-lg shadow bg-accent-1 hover:shadow-lg transition-shadow duration-300 ease-in-out',
                          {
                            ['w-80 h-52 rounded-lg']:
                              !content.viewFormat ||
                              (content.viewFormat !== 'cards-v' &&
                                content.viewFormat !== 'circle-sm' &&
                                content.viewFormat !== 'circle-md' &&
                                content.viewFormat !== 'circle-lg' &&
                                content.viewFormat !== 'square-sm' &&
                                content.viewFormat !== 'square-md' &&
                                content.viewFormat !== 'square-lg'),
                            ['w-52 h-72 rounded']:
                              content.viewFormat &&
                              content.viewFormat === 'cards-v',
                            ['w-20 h-20 rounded']:
                              content.viewFormat &&
                              content.viewFormat === 'square-sm',
                            ['w-28 h-28 rounded']:
                              content.viewFormat &&
                              content.viewFormat === 'square-md',
                            ['w-40 h-40 rounded']:
                              content.viewFormat &&
                              content.viewFormat === 'square-lg',
                            ['w-20 h-20 rounded-full']:
                              content.viewFormat &&
                              content.viewFormat === 'circle-sm',
                            ['w-28 h-28 rounded-full']:
                              content.viewFormat &&
                              content.viewFormat === 'circle-md',
                            ['w-40 h-40 rounded-full']:
                              content.viewFormat &&
                              content.viewFormat === 'circle-lg',
                          }
                        )}
                      >
                        {
                          // CARD 1
                          content.viewMode === 'card1' && (
                            <Card1
                              midiaKey={photo.key}
                              objectFit={content.objectFit}
                              photo={`${process.env.MIDIA_CLOUDFRONT}${photo.key}`}
                              viewFormat={content.viewFormat}
                            />
                          )
                        }
                        {
                          // CARD 2
                          content.viewMode === 'card2' && (
                            <Card2
                              midiaKey={photo.key}
                              objectFit={content.objectFit}
                              photo={`${process.env.MIDIA_CLOUDFRONT}${photo.key}`}
                              title={getName(photo.key)}
                              viewFormat={content.viewFormat}
                            />
                          )
                        }
                        {
                          // CARD 4
                          content.viewMode === 'card4' && (
                            <Card4
                              objectFit={content.objectFit}
                              photo={photo.key}
                              viewFormat={content.viewFormat}
                            />
                          )
                        }
                        {
                          // CARD 5
                          content.viewMode === 'card5' && (
                            <Card5
                              objectFit={content.objectFit}
                              photo={photo.key}
                              viewFormat={content.viewFormat}
                            />
                          )
                        }
                      </div>
                    </div>
                  )
              )}

            {content.source === 'category_products' &&
              products.map((product: any, index: number) => (
                <div
                  key={index}
                  className={cn('inline-block', {
                    ['px-2']:
                      !content.viewFormat ||
                      (content.viewFormat !== 'circle-sm' &&
                        content.viewFormat !== 'circle-md' &&
                        content.viewFormat !== 'circle-lg' &&
                        content.viewFormat !== 'square-sm' &&
                        content.viewFormat !== 'square-md' &&
                        content.viewFormat !== 'square-lg') ||
                      (content.viewFormat &&
                        content.viewFormat === 'square-lg') ||
                      (content.viewFormat &&
                        content.viewFormat === 'circle-lg'),
                    ['px-1']:
                      (content.viewFormat &&
                        content.viewFormat === 'square-sm') ||
                      (content.viewFormat &&
                        content.viewFormat === 'square-md') ||
                      (content.viewFormat &&
                        content.viewFormat === 'circle-sm') ||
                      (content.viewFormat &&
                        content.viewFormat === 'circle-md'),
                  })}
                >
                  <div
                    className={cn(
                      'max-w-xs overflow-hidden drop-shadow-lg shadow bg-accent-1 hover:shadow-lg transition-shadow duration-300 ease-in-out',
                      {
                        ['w-80 h-52 rounded-lg']:
                          !content.viewFormat ||
                          (content.viewFormat !== 'cards-v' &&
                            content.viewFormat !== 'circle-sm' &&
                            content.viewFormat !== 'circle-md' &&
                            content.viewFormat !== 'circle-lg' &&
                            content.viewFormat !== 'square-sm' &&
                            content.viewFormat !== 'square-md' &&
                            content.viewFormat !== 'square-lg'),
                        ['w-52 h-72 rounded']:
                          content.viewFormat &&
                          content.viewFormat === 'cards-v',
                        ['w-20 h-20 rounded']:
                          content.viewFormat &&
                          content.viewFormat === 'square-sm',
                        ['w-28 h-28 rounded']:
                          content.viewFormat &&
                          content.viewFormat === 'square-md',
                        ['w-40 h-40 rounded']:
                          content.viewFormat &&
                          content.viewFormat === 'square-lg',
                        ['w-20 h-20 rounded-full']:
                          content.viewFormat &&
                          content.viewFormat === 'circle-sm',
                        ['w-28 h-28 rounded-full']:
                          content.viewFormat &&
                          content.viewFormat === 'circle-md',
                        ['w-40 h-40 rounded-full']:
                          content.viewFormat &&
                          content.viewFormat === 'circle-lg',
                      }
                    )}
                  >
                    {
                      // CARD 1
                      content.viewMode === 'card1' && (
                        <Card1
                          objectFit={content.objectFit}
                          photo={
                            product.photo1
                              ? product.photo1
                              : product.thumbnail 
                              ? product.thumbnail
                              : '/images/no_photo.png'
                          }
                          viewFormat={content.viewFormat}
                          link={`/product/${
                            product.alias ? product.alias : product.id
                          }`}
                        />
                      )
                    }
                    {
                      // CARD 2
                      content.viewMode === 'card2' && (
                        <Card2
                          objectFit={content.objectFit}
                          photo={
                            product.photo1
                            ? product.photo1
                            : product.thumbnail 
                            ? product.thumbnail
                              : '/images/no_photo.png'
                          }
                          title={product.name}
                          viewFormat={content.viewFormat}
                          link={`/product/${
                            product.alias ? product.alias : product.id
                          }`}
                        />
                      )
                    }
                    {
                      // CARD 3
                      content.viewMode === 'card3' && (
                        <Card3
                          objectFit={content.objectFit}
                          photo={
                            product.photo1
                            ? product.photo1
                            : product.thumbnail 
                            ? product.thumbnail
                              : '/images/no_photo.png'
                          }
                          title={product.name}
                          description={product.description}
                          viewFormat={content.viewFormat}
                          link={`/product/${
                            product.alias ? product.alias : product.id
                          }`}
                        />
                      )
                    }
                  </div>
                </div>
              ))}

            {content.source === 'categories' &&
              categories.map((category: any, index: number) => (
                <div
                  key={index}
                  className={cn('inline-block', {
                    ['px-2']:
                      !content.viewFormat ||
                      (content.viewFormat !== 'circle-sm' &&
                        content.viewFormat !== 'circle-md' &&
                        content.viewFormat !== 'circle-lg' &&
                        content.viewFormat !== 'square-sm' &&
                        content.viewFormat !== 'square-md' &&
                        content.viewFormat !== 'square-lg') ||
                      (content.viewFormat &&
                        content.viewFormat === 'square-lg') ||
                      (content.viewFormat &&
                        content.viewFormat === 'circle-lg'),
                    ['px-1']:
                      (content.viewFormat &&
                        content.viewFormat === 'square-sm') ||
                      (content.viewFormat &&
                        content.viewFormat === 'square-md') ||
                      (content.viewFormat &&
                        content.viewFormat === 'circle-sm') ||
                      (content.viewFormat &&
                        content.viewFormat === 'circle-md'),
                  })}
                >
                  <div
                    className={cn(
                      'max-w-xs overflow-hidden drop-shadow-lg shadow bg-accent-1 hover:shadow-lg transition-shadow duration-300 ease-in-out',
                      {
                        ['w-80 h-52 rounded-lg']:
                          !content.viewFormat ||
                          (content.viewFormat !== 'cards-v' &&
                            content.viewFormat !== 'circle-sm' &&
                            content.viewFormat !== 'circle-md' &&
                            content.viewFormat !== 'circle-lg' &&
                            content.viewFormat !== 'square-sm' &&
                            content.viewFormat !== 'square-md' &&
                            content.viewFormat !== 'square-lg'),
                        ['w-52 h-72 rounded']:
                          content.viewFormat &&
                          content.viewFormat === 'cards-v',
                        ['w-20 h-20 rounded']:
                          content.viewFormat &&
                          content.viewFormat === 'square-sm',
                        ['w-28 h-28 rounded']:
                          content.viewFormat &&
                          content.viewFormat === 'square-md',
                        ['w-40 h-40 rounded']:
                          content.viewFormat &&
                          content.viewFormat === 'square-lg',
                        ['w-20 h-20 rounded-full']:
                          content.viewFormat &&
                          content.viewFormat === 'circle-sm',
                        ['w-28 h-28 rounded-full']:
                          content.viewFormat &&
                          content.viewFormat === 'circle-md',
                        ['w-40 h-40 rounded-full']:
                          content.viewFormat &&
                          content.viewFormat === 'circle-lg',
                      }
                    )}
                  >
                    {
                      // CARD 1
                      content.viewMode === 'card1' && (
                        <Card1
                          objectFit={content.objectFit}
                          photo={
                            category.thumbnail
                              ? `${process.env.MIDIA_CLOUDFRONT}${category.thumbnail}`
                              : '/images/no_photo.png'
                          }
                          viewFormat={content.viewFormat}
                          link={`/page/${
                            category.alias ? category.alias : category.id
                          }`}
                        />
                      )
                    }
                    {
                      // CARD 2
                      content.viewMode === 'card2' && (
                        <Card2
                          objectFit={content.objectFit}
                          photo={
                            category.thumbnail
                              ? `${process.env.MIDIA_CLOUDFRONT}${category.thumbnail}`
                              : '/images/no_photo.png'
                          }
                          title={category.title}
                          viewFormat={content.viewFormat}
                          link={`/page/${
                            category.alias ? category.alias : category.id
                          }`}
                        />
                      )
                    }
                    {
                      // CARD 3
                      content.viewMode === 'card3' && (
                        <Card3
                          objectFit={content.objectFit}
                          photo={
                            category.thumbnail
                              ? `${process.env.MIDIA_CLOUDFRONT}${category.thumbnail}`
                              : '/images/no_photo.png'
                          }
                          title={category.title}
                          description={category.description}
                          viewFormat={content.viewFormat}
                          link={`/page/${
                            category.alias ? category.alias : category.id
                          }`}
                        />
                      )
                    }
                  </div>
                </div>
              ))}

            {content.source === 'menus' &&
              menus.map((menu: any, index: number) => (
                <div
                  key={index}
                  className={cn('inline-block', {
                    ['px-2']:
                      !content.viewFormat ||
                      (content.viewFormat !== 'circle-sm' &&
                        content.viewFormat !== 'circle-md' &&
                        content.viewFormat !== 'circle-lg' &&
                        content.viewFormat !== 'square-sm' &&
                        content.viewFormat !== 'square-md' &&
                        content.viewFormat !== 'square-lg') ||
                      (content.viewFormat &&
                        content.viewFormat === 'square-lg') ||
                      (content.viewFormat &&
                        content.viewFormat === 'circle-lg'),
                    ['px-1']:
                      (content.viewFormat &&
                        content.viewFormat === 'square-sm') ||
                      (content.viewFormat &&
                        content.viewFormat === 'square-md') ||
                      (content.viewFormat &&
                        content.viewFormat === 'circle-sm') ||
                      (content.viewFormat &&
                        content.viewFormat === 'circle-md'),
                  })}
                >
                  <div
                    className={cn(
                      'max-w-xs overflow-hidden drop-shadow-lg shadow bg-accent-1 hover:shadow-lg transition-shadow duration-300 ease-in-out',
                      {
                        ['w-80 h-52 rounded-lg']:
                          !content.viewFormat ||
                          (content.viewFormat !== 'cards-v' &&
                            content.viewFormat !== 'circle-sm' &&
                            content.viewFormat !== 'circle-md' &&
                            content.viewFormat !== 'circle-lg' &&
                            content.viewFormat !== 'square-sm' &&
                            content.viewFormat !== 'square-md' &&
                            content.viewFormat !== 'square-lg'),
                        ['w-52 h-72 rounded']:
                          content.viewFormat &&
                          content.viewFormat === 'cards-v',
                        ['w-20 h-20 rounded']:
                          content.viewFormat &&
                          content.viewFormat === 'square-sm',
                        ['w-28 h-28 rounded']:
                          content.viewFormat &&
                          content.viewFormat === 'square-md',
                        ['w-40 h-40 rounded']:
                          content.viewFormat &&
                          content.viewFormat === 'square-lg',
                        ['w-20 h-20 rounded-full']:
                          content.viewFormat &&
                          content.viewFormat === 'circle-sm',
                        ['w-28 h-28 rounded-full']:
                          content.viewFormat &&
                          content.viewFormat === 'circle-md',
                        ['w-40 h-40 rounded-full']:
                          content.viewFormat &&
                          content.viewFormat === 'circle-lg',
                      }
                    )}
                  >
                    {
                      // CARD 1
                      content.viewMode === 'card1' && (
                        <Card1
                          objectFit={content.objectFit}
                          photo={
                            menu.thumbnail
                              ? `${process.env.MIDIA_CLOUDFRONT}${menu.thumbnail}`
                              : '/images/no_photo.png'
                          }
                          viewFormat={content.viewFormat}
                          link={`/page/${menu.alias ? menu.alias : menu.id}`}
                        />
                      )
                    }
                    {
                      // CARD 2
                      content.viewMode === 'card2' && (
                        <Card2
                          objectFit={content.objectFit}
                          photo={
                            menu.thumbnail
                              ? `${process.env.MIDIA_CLOUDFRONT}${menu.thumbnail}`
                              : '/images/no_photo.png'
                          }
                          title={menu.title}
                          viewFormat={content.viewFormat}
                          link={`/page/${menu.alias ? menu.alias : menu.id}`}
                        />
                      )
                    }
                    {
                      // CARD 3
                      content.viewMode === 'card3' && (
                        <Card3
                          objectFit={content.objectFit}
                          photo={
                            menu.thumbnail
                              ? `${process.env.MIDIA_CLOUDFRONT}${menu.thumbnail}`
                              : '/images/no_photo.png'
                          }
                          title={menu.title}
                          description={menu.description}
                          viewFormat={content.viewFormat}
                          link={`/page/${menu.alias ? menu.alias : menu.id}`}
                        />
                      )
                    }
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function processStorageList(result: any) {
  const files: any[] = []
  const folders: any[] = []
  result.forEach((res: any) => {
    if (res.size) {
      files.push(res)
      const possibleFolder = res.key.split('/').slice(0, -1).join('/')
      if (possibleFolder && folders.indexOf(possibleFolder) === -1) {
        folders.push(possibleFolder)
      }
    } else {
      folders.push(res.key)
    }
  })
  return { files, folders }
}
