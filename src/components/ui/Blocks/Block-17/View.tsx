/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useProduct } from 'hooks/useProduct'
import { useCategory } from 'hooks/useCategory'
import cn from 'classnames'
import Image from 'next/image'
import { useScreen } from 'hooks/useScreen'
import { PageStatus } from 'models'
import { ModelSortDirection } from 'API'
import { RightArrow, Info, Refresh, Apps } from 'components/icons'
import { useBreakPoints } from 'hooks/useBreakPoints'
import NumberFormat from 'react-number-format'
import crypto from 'lib/crypto'

import { useUserAuth } from 'components/userAuth/context'
import { useUI } from 'components/ui/context'
import { useCart } from 'hooks/useCart'
import { v4 as uuidv4 } from 'uuid'

import getPhoto from 'lib/getPhoto'

interface Props {
  block: any
  menu: any
  hasLateral?: boolean
  user: any
}

export default function View(props: Props) {
  const { block, menu, hasLateral, user } = props
  const [content, setContent] = useState({} as any)
  const [config, setConfig] = useState({} as any)
  const [products, setProducts] = useState([] as any)
  const [category, setCategory] = useState({} as any)

  const [dataSel, setDataSel] = useState({} as any)

  const { listProductsByStatusCategoryName, listProducts } = useProduct()
  const { getCategory } = useCategory()
  const { isSm, isMd } = useBreakPoints()

  const [part1, setPart1] = useState({} as any)
  const [part2, setPart2] = useState({} as any)
  const [part3, setPart3] = useState({} as any)

  const myContainer = useRef(null) as any

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (block && block.config) {
        const configParse = JSON.parse(block.config)
        setConfig(configParse)
      }

      if (block && block.content) {
        const contentParse = JSON.parse(block.content)
        setContent(contentParse)

        const fetchProductsByStatusCategoryName = async () => {
          const { items } = await listProductsByStatusCategoryName({
            status: PageStatus.ON,
            categoryName: { beginsWith: { category: contentParse.category } },
            sortDirection: ModelSortDirection.ASC,
            limit: 500,
            nextToken: null,
          })

          const ps =
            ((isSm || isMd) && contentParse.showSubCategoryMobile !== 'hide') ||
            (!isSm && !isMd && contentParse.showSubCategoryDesktop !== 'hide')
              ? breakSubCategory(
                  (items as any).sort((a: any, b: any) =>
                    a.subCategory.localeCompare(b.subCategory)
                  )
                )
              : (items as any).sort((a: any, b: any) =>
                  a.name.localeCompare(b.name)
                )

          setProducts(ps)

          if (items.length === 0) {
            fetchCategory()
          }
        }

        const fetchCategory = async () => {
          const c = await getCategory({ id: contentParse.category })
          setCategory(c)
        }

        const fetchProductsByTags = async () => {
          const { items } = await listProducts({ limit: 500 })
          const pd = items.filter(
            (p: any) => p.tags.indexOf(contentParse.tags) !== -1
          )
          setProducts(pd)
        }

        const fetchProductsByDiscount = async () => {
          const { items } = await listProducts({ limit: 500 })
          const pd = items.filter((p: any) => p.price_of > 0)
          setProducts(pd)
        }

        setProducts([] as any)
        setCategory({} as any)

        if (contentParse.origin && contentParse.origin === 'tags') {
          fetchProductsByTags()
        } else if (contentParse.origin && contentParse.origin === 'discount') {
          fetchProductsByDiscount()
        } else {
          fetchProductsByStatusCategoryName()
        }
      }
    }
    return () => {
      setConfig({} as any)
      setContent({} as any)
      setProducts([] as any)
      setCategory({} as any)
      setDataSel({} as any)
      isMounted = false
    }
  }, [block, isSm, isMd])

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
      {products.length === 0 && category.title && (
        <div className="alert bg-accent-1 text-accent-9 text-xl">
          <div className="flex-1">
            <div className="pt-2">
              <Info width={32} height={32} />
            </div>
            <label className="ml-4">
              <h4>Nenhum produto disponível em: {category.title}.</h4>
              <p className="text-sm text-base-content text-opacity-60">
                Retorne novamente em breve, por favor.
              </p>
            </label>
          </div>
        </div>
      )}

      <div ref={myContainer}></div>

      {dataSel.name && (
        <ChangeSelected
          data={content.data}
          dataSel={dataSel}
          setDataSel={setDataSel}
          setPart1={setPart1}
          part1={part1}
          setPart2={setPart2}
          part2={part2}
          setPart3={setPart3}
          part3={part3}
          content={content}
          topPosition={
            myContainer && myContainer.current
              ? myContainer.current.offsetTop - 150
              : 0
          }
        />
      )}

      {!dataSel.name && content.data && content.data.length > 0 && (
        <div className="mt-4">
          <ShowTitleDescription
            index={0}
            content={content}
            title="Escolha uma das opções"
            description=""
          />
          <div
            className={cn('pt-4', {
              'flex justify-center flex-wrap overflow-y-hidden mx-auto':
                !isSm && !isMd,
              'grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 ': isSm || isMd,
            })}
          >
            {content.data.map((option: any, index: number) => (
              <div key={index}>
                {(isSm || isMd) && (
                  <SetChangeCombinationsMobile
                    option={option}
                    setDataSel={setDataSel}
                    setPart1={setPart1}
                    setPart2={setPart2}
                    setPart3={setPart3}
                    topPosition={
                      myContainer && myContainer.current
                        ? myContainer.current.offsetTop - 150
                        : 0
                    }
                  />
                )}
                {!isSm && !isMd && (
                  <SetChangeCombinationsDesktop
                    option={option}
                    setDataSel={setDataSel}
                    setPart1={setPart1}
                    setPart2={setPart2}
                    setPart3={setPart3}
                    topPosition={
                      myContainer && myContainer.current
                        ? myContainer.current.offsetTop - 150
                        : 0
                    }
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {(dataSel.name || !content.data || content.data.length === 0) && (
        <div>
          {(!dataSel.qtyBlend || dataSel.qtyBlend === '1') && (
            <ListProducts
              products={products}
              content={content}
              dataSel={dataSel}
              hasLateral={hasLateral}
            />
          )}

          {dataSel.qtyBlend &&
            ((dataSel.qtyBlend === '2' &&
              (!part1.productID || !part2.productID)) ||
              (dataSel.qtyBlend === '3' &&
                (!part1.productID ||
                  !part2.productID ||
                  !part3.productID))) && (
              <ListProducts
                products={products}
                content={content}
                dataSel={dataSel}
                setPart1={setPart1}
                part1={part1}
                setPart2={setPart2}
                part2={part2}
                setPart3={setPart3}
                part3={part3}
                hasLateral={hasLateral}
                topPosition={
                  myContainer && myContainer.current
                    ? myContainer.current.offsetTop - 150
                    : 0
                }
              />
            )}
        </div>
      )}
    </div>
  )
}

const getPrice = (price: number, dataSel: any) => {
  if (!dataSel) {
    return price
  } else if (dataSel && dataSel.qtyBlend === '1' && dataSel.priceAdjustment) {
    return (price * parseInt(dataSel.priceAdjustment)) / 100
  } else {
    return price
  }
}

export function ShowTitleDescription(props: any) {
  const { index, content, title, description } = props
  const { isSm, isMd, breakPoint } = useBreakPoints()
  return (
    <div
      key={`std${index}`}
      className={cn(
        {
          'w-full': !isSm && !isMd,
          'col-span-1 md:col-span-2': isSm || isMd,
        },
        {
          'mt-10 mb-6': !isSm && !isMd,
          'mt-6 mb-3': (isSm || isMd) && index !== 0,
          'mb-3': (isSm || isMd) && index === 0,
        }
      )}
    >
      <div
        className={cn('w-full', {
          ['text-left']:
            ((isSm || isMd) && content.showSubCategoryMobile === 'show-left') ||
            (!isSm && !isMd && content.showSubCategoryDesktop === 'show-left'),
          ['text-center']:
            ((isSm || isMd) &&
              content.showSubCategoryMobile === 'show-center') ||
            (!isSm &&
              !isMd &&
              content.showSubCategoryDesktop === 'show-center'),
          ['text-right']:
            ((isSm || isMd) &&
              content.showSubCategoryMobile === 'show-right') ||
            (!isSm && !isMd && content.showSubCategoryDesktop === 'show-right'),
        })}
      >
        {title && (
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-accent-9">
            {title}
          </h1>
        )}
        {description && (
          <p
            className={cn(
              'mt-3 inline text-base leading-relaxed xl:w-2/4 lg:w-3/4 text-accent-7',
              {
                ['mx-auto']:
                  ((isSm || isMd) &&
                    content.showSubCategoryMobile === 'show-center') ||
                  (!isSm &&
                    !isMd &&
                    content.showSubCategoryDesktop === 'show-center'),
                ['text-right']:
                  ((isSm || isMd) &&
                    content.showSubCategoryMobile === 'show-right') ||
                  (!isSm &&
                    !isMd &&
                    content.showSubCategoryDesktop === 'show-right'),
              }
            )}
          >
            {description}
          </p>
        )}
        <div
          className={cn('flex mt-3', {
            ['justify-start']:
              ((isSm || isMd) &&
                content.showSubCategoryMobile === 'show-left') ||
              (!isSm &&
                !isMd &&
                content.showSubCategoryDesktop === 'show-left'),
            ['justify-center']:
              ((isSm || isMd) &&
                content.showSubCategoryMobile === 'show-center') ||
              (!isSm &&
                !isMd &&
                content.showSubCategoryDesktop === 'show-center'),
            ['justify-end']:
              ((isSm || isMd) &&
                content.showSubCategoryMobile === 'show-right') ||
              (!isSm &&
                !isMd &&
                content.showSubCategoryDesktop === 'show-right'),
          })}
        >
          <div className="w-16 h-1 rounded-full bg-tertiary-2 inline-flex"></div>
        </div>
      </div>
    </div>
  )
}

interface PropsCard {
  index: number
  item: any
  content: any
  dataSel: any
  setPart1?: any
  part1?: any
  setPart2?: any
  part2?: any
  setPart3?: any
  part3?: any
  topPosition?: number
  hasLateral?: boolean
}

export function CardDesktop(props: PropsCard) {
  const {
    index,
    item,
    content,
    dataSel,
    part1,
    part2,
    part3,
    setPart1,
    setPart2,
    setPart3,
    topPosition,
    hasLateral,
  } = props
  const router = useRouter()
  const { screenWidth } = useScreen()
  return (
    <div
      key={`de${index}`}
      style={{
        minWidth: 320,
        maxWidth:
          screenWidth >= 630 && screenWidth < 700
            ? 270
            : screenWidth >= 700 && screenWidth < 800
            ? 300
            : screenWidth >= 800 && screenWidth < 950
            ? 320
            : screenWidth >= 950 && screenWidth < 1116
            ? 280
            : screenWidth >= 1116 && screenWidth < 1282
            ? 300
            : screenWidth >= 1282 && screenWidth < 1450
            ? 320
            : screenWidth < 630
            ? screenWidth * 0.8
            : 320,
        width: screenWidth < 630 ? screenWidth * 0.6 : 'auto',
      }}
      onClick={() => {
        if (!dataSel.qtyBlend || dataSel.qtyBlend === '1') {
          let data = {
            origin: router.asPath,
            category: content.category,
            showSubCategory:
              content.showSubCategoryMobile !== 'hide' ||
              content.showSubCategoryDesktop !== 'hide',
          }
          if (dataSel && dataSel.name) {
            data = Object.assign(data, dataSel)
          }
          const hash = crypto.encrypt(data) as string
          if (!content.linkMode || content.linkMode !== 'none') {
            router.push(
              `/product/${encodeURIComponent(
                item.alias ? item.alias : item.id
              )}/?t=${encodeURIComponent(hash)}`
            )
          }
        } else {
          window.scrollTo({ top: topPosition, behavior: 'smooth' })
          if (!part1.productID) {
            setPart1({
              alias: item.alias,
              productID: item.id,
              name: item.name,
              price: item.price,
            })
          } else if (!part2.productID) {
            setPart2({
              alias: item.alias,
              productID: item.id,
              name: item.name,
              price: item.price,
            })
          } else if (!part3.productID && dataSel.qtyBlend === '3') {
            setPart3({
              alias: item.alias,
              productID: item.id,
              name: item.name,
              price: item.price,
            })
          }
        }
      }}
      className="cursor-pointer m-4 bg-accent-0 rounded-lg shadow-lg md:hover:shadow-xl transform transition duration-500 md:hover:scale-105"
    >
      <div className="relative h-56 w-full">
        <Image
          alt={item.name}
          className="object-cover object-center rounded-t-lg"
          src={getPhoto(item.photo1)}
          layout="fill"
        />
      </div>
      <div className="p-4">
        <div className="flex font-bold text-xl mb-2 content-center items-center gap-2">
          {content.showCode === 'show' && item.code && (
            <span className="p-1 inline bg-accent-1 text-accent-7 rounded">
              {item.code}
            </span>
          )}
          {item.name}
        </div>
        <div className="text-accent-6 text-base">{item.description}</div>
        <div className="mt-3 text-xl font-medium text-red-500">
          {item.price_of > 0 && (
            <span>
              <span>De&nbsp;</span>
              <span className="line-through">
                <NumberFormat
                  value={getPrice(item.price_of, dataSel)}
                  thousandsGroupStyle="thousand"
                  prefix="R$ "
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  displayType="text"
                  allowNegative={true}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </span>
              <span>&nbsp;por&nbsp;</span>
            </span>
          )}
          <span className="font-bold">
            <NumberFormat
              value={getPrice(item.price, dataSel)}
              thousandsGroupStyle="thousand"
              prefix="R$ "
              thousandSeparator={'.'}
              decimalSeparator={','}
              displayType="text"
              allowNegative={true}
              decimalScale={2}
              fixedDecimalScale={true}
            />
          </span>
        </div>
      </div>
    </div>
  )
}

export function Card(props: PropsCard) {
  const {
    index,
    item,
    content,
    dataSel,
    part1,
    part2,
    part3,
    setPart1,
    setPart2,
    setPart3,
    topPosition,
  } = props
  const router = useRouter()
  return (
    <div
      key={`mo${index}`}
      onClick={() => {
        if (!dataSel.qtyBlend || dataSel.qtyBlend === '1') {
          let data = {
            origin: router.asPath,
            category: content.category,
            showSubCategory:
              content.showSubCategoryMobile !== 'hide' ||
              content.showSubCategoryDesktop !== 'hide',
          }
          if (dataSel && dataSel.name) {
            data = Object.assign(data, dataSel)
          }
          const hash = crypto.encrypt(data) as string
          if (!content.linkMode || content.linkMode !== 'none') {
            router.push(
              `/product/${encodeURIComponent(
                item.alias ? item.alias : item.id
              )}/?t=${encodeURIComponent(hash)}`
            )
          }
        } else {
          window.scrollTo({ top: topPosition, behavior: 'smooth' })
          if (!part1.productID) {
            setPart1({
              productID: item.id,
              alias: item.alias,
              name: item.name,
              price: item.price,
            })
          } else if (!part2.productID) {
            setPart2({
              productID: item.id,
              alias: item.alias,
              name: item.name,
              price: item.price,
            })
          } else if (!part3.productID && dataSel.qtyBlend === '3') {
            setPart3({
              productID: item.id,
              alias: item.alias,
              name: item.name,
              price: item.price,
            })
          }
        }
      }}
      className={cn(
        'text-accent-6 bg-accent-0 lg:w-full cursor-pointer h-full flex items-center py-2 px-2 rounded-lg shadow',
        {
          ['border-l-2 border-tertiary']:
            router.asPath === `/product/${item.alias}/`,
        }
      )}
    >
      {content.thumbnail !== '0' && (item.thumbnail || item.photo1) && (
        <div
          className="flex flex-wrap content-center"
          style={{
            minWidth: content.thumbnail ? parseInt(content.thumbnail) : 64,
          }}
        >
          <Image
            alt={item.name}
            className="bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle"
            src={
              item.thumbnail
                ? `${process.env.MIDIA_CLOUDFRONT}${item.thumbnail}`
                : getPhoto(item.photo1)
            }
            width={content.thumbnail ? parseInt(content.thumbnail) : 64}
            height={content.thumbnail ? parseInt(content.thumbnail) : 64}
          />
        </div>
      )}
      <div
        className={cn('flex-grow', {
          'ml-3': content.thumbnail !== '0' && (item.thumbnail || item.photo1),
        })}
      >
        <div className="flex gap-1">
          {content.showCode === 'show' && item.code && (
            <div>
              <span className="p-1 inline bg-accent-5 text-accent-0 text-sm font-semibold rounded">
                {item.code}
              </span>
            </div>
          )}
          <div>
            <span
              className={cn('text-accent-7 font-bold hover:text-tertiary-2', {
                'text-lg': !content.textSize || content.textSize === 'default',
                'text-xl': content.textSize === 'lg',
              })}
            >
              {item.name}
            </span>
          </div>
        </div>
        {(!content.showDescription ||
          (content.showDescription !== 'false' && item.description)) && (
          <p
            className={cn(
              `text-accent-5 ${
                !content.textSize || content.textSize === 'default'
                  ? 'text-sm'
                  : content.textSize === 'lg'
                  ? 'text-base'
                  : 'text-sm'
              }`,
              {
                ['line-clamp-1']: content.showDescription === 'show-1',
                ['line-clamp-2']: content.showDescription === 'show-2',
                ['line-clamp-3']: content.showDescription === 'show-3',
              }
            )}
          >
            {item.description}
          </p>
        )}
        <div
          className={cn('font-medium text-red-500', {
            'text-sm': !content.textSize || content.textSize === 'default',
            'text-base': content.textSize === 'lg',
          })}
        >
          {item.price_of > 0 && (
            <span>
              <span>De&nbsp;</span>
              <span className="line-through">
                <NumberFormat
                  value={getPrice(item.price_of, dataSel)}
                  thousandsGroupStyle="thousand"
                  prefix="R$ "
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  displayType="text"
                  allowNegative={true}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </span>
              <span>&nbsp;por&nbsp;</span>
            </span>
          )}
          <span className="font-bold">
            <NumberFormat
              value={getPrice(item.price, dataSel)}
              thousandsGroupStyle="thousand"
              prefix="R$ "
              thousandSeparator={'.'}
              decimalSeparator={','}
              displayType="text"
              allowNegative={true}
              decimalScale={2}
              fixedDecimalScale={true}
            />
          </span>
        </div>
      </div>
    </div>
  )
}

export function breakSubCategory(items: any) {
  let last = ''
  const itemsMaped = items.map((v: any) => {
    v.break = false
    if (v.subCategory !== last) {
      v.break = true
      last = v.subCategory
    }
    return v
  })
  return itemsMaped
}

interface PropsCHC {
  option: any
  setDataSel: any
  topPosition: number
  setPart1: any
  setPart2: any
  setPart3: any
}

export function SetChangeCombinationsMobile(props: PropsCHC) {
  const { option, setDataSel, topPosition, setPart1, setPart2, setPart3 } =
    props
  return (
    <div
      onClick={() => {
        window.scrollTo({ top: topPosition, behavior: 'smooth' })
        setPart1({} as any)
        setPart2({} as any)
        setPart3({} as any)
        setDataSel(option)
      }}
      className="bg-accent-0 lg:w-full cursor-pointer h-full flex items-center py-2 px-2 rounded-lg shadow"
    >
      {option.imageUrl && (
        <div className="flex-grow">
          <div className="flex">
            <div
              className="flex flex-wrap content-center"
              style={{
                minWidth: 64,
              }}
            >
              <Image
                alt=""
                className="bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle"
                src={option.imageUrl}
                width={64}
                height={64}
              />
            </div>
            <div className="ml-3">
              <div className="flex gap-1">
                <div>
                  <span className="text-accent-9 title-font font-semibold text-lg lg:text-2xl hover:text-tertiary-2">
                    {option.name}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-accent-6">{option.description}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {!option.imageUrl && (
        <div className="flex-grow">
          <div className="flex gap-1">
            <div>
              <span className="text-accent-9 title-font font-semibold text-lg lg:text-2xl hover:text-tertiary-2">
                {option.name}
              </span>
            </div>
          </div>
          <div>
            <span className="text-accent-6">{option.description}</span>
          </div>
        </div>
      )}
      <div className="text-accent-2">
        <RightArrow width={24} height={24} />
      </div>
    </div>
  )
}

export function SetChangeCombinationsDesktop(props: PropsCHC) {
  const { option, setDataSel, topPosition, setPart1, setPart2, setPart3 } =
    props
  return (
    <div className="2xl:w-1/6 xl:w-1/5 lg:w-1/4 m-4">
      <div
        onClick={() => {
          window.scrollTo({ top: topPosition, behavior: 'smooth' })
          setPart1({} as any)
          setPart2({} as any)
          setPart3({} as any)
          setDataSel(option)
        }}
        className="cursor-pointer w-80 bg-accent-0 rounded-lg shadow hover:shadow-md transform transition duration-500 hover:scale-105"
      >
        {option.imageUrl && (
          <div className="flex p-2">
            <div
              className="flex flex-wrap content-center"
              style={{
                minWidth: 64,
              }}
            >
              <Image
                alt=""
                className="bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle"
                src={option.imageUrl}
                width={64}
                height={64}
              />
            </div>
            <div className="ml-3">
              <div className="text-accent-9 flex font-bold text-2xl mb-1 content-center items-center gap-2">
                {option.name}
              </div>
              <div className="text-accent-6 text-base">
                {option.description}
              </div>
            </div>
          </div>
        )}
        {!option.imageUrl && (
          <div className="p-4">
            <div className="text-accent-9 flex font-bold text-2xl mb-1 content-center items-center gap-2">
              {option.name}
            </div>
            <div className="text-accent-6 text-base">{option.description}</div>
          </div>
        )}
      </div>
    </div>
  )
}

interface PropsCHCSel {
  data: any
  dataSel: any
  setDataSel: any
  setPart1: any
  part1: any
  setPart2: any
  part2: any
  setPart3: any
  part3: any
  topPosition: number
  content: any
}

export function ChangeSelected(props: PropsCHCSel) {
  const {
    data,
    dataSel,
    setDataSel,
    part1,
    part2,
    part3,
    setPart1,
    setPart2,
    setPart3,
    topPosition,
    content,
  } = props

  const calcPrice = () => {
    let p = 0
    if (dataSel && dataSel.priceAdjustment === '1') {
      p =
        dataSel.qtyBlend === '2'
          ? (part1.price + part2.price) / 2
          : (part1.price + part2.price + part3.price) / 3
    } else if (dataSel && dataSel.priceAdjustment === '2') {
      if (dataSel.qtyBlend === '2') {
        p = part1.price > part2.price ? part1.price : part2.price
      } else if (dataSel.qtyBlend === '3') {
        p = part1.price
        if (part2.price > p) {
          p = part2.price
        }
        if (part3.price > p) {
          p = part3.price
        }
      }
    }
    return p
  }

  const router = useRouter()
  const { user } = useUserAuth()
  const { setModalView, openModal } = useUI()
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([] as any)
  const [total, setTotal] = useState(0)
  const { getProduct } = useProduct()
  const { listCartsByUser, createCart, createCartOption, deleteCartOption } =
    useCart()
  const { isSm } = useBreakPoints()

  const addCart = async () => {
    if (loading) {
      return null
    }

    setLoading(true)

    if (!user) {
      setModalView('LOGIN_VIEW')
      openModal()
      setLoading(false)
      return null
    }

    /*
    const { items } = await listCartsByUser({
      userID: user.id,
    })
    */

    const blendID = uuidv4()

    if (part1 && part1.productID) {
      const createdCart1 = (await createCart({
        userID: user.id,
        productID: part1.productID,
        qty: 1,
        changeName: dataSel.name,
        changeDescription: dataSel.description,
        changeQtyBlend: dataSel.qtyBlend,
        changePriceAdjustment: dataSel.priceAdjustment,
        blendID,
      })) as any

      options.map(
        async (o: any) =>
          o.checked &&
          (await createCartOption({
            cartID: createdCart1.id,
            optionID: o.id,
          }))
      )
    }

    if (part2 && part2.productID) {
      const createdCart2 = (await createCart({
        userID: user.id,
        productID: part2.productID,
        qty: 1,
        changeName: dataSel.name,
        changeDescription: dataSel.description,
        changeQtyBlend: dataSel.qtyBlend,
        changePriceAdjustment: dataSel.priceAdjustment,
        blendID,
      })) as any

      options.map(
        async (o: any) =>
          o.checked &&
          (await createCartOption({
            cartID: createdCart2.id,
            optionID: o.id,
          }))
      )
    }

    if (dataSel.qtyItems === '3' && part3 && part3.productID) {
      const createdCart3 = (await createCart({
        userID: user.id,
        productID: part3.productID,
        qty: 1,
        changeName: dataSel.name,
        changeDescription: dataSel.description,
        changeQtyBlend: dataSel.qtyBlend,
        changePriceAdjustment: dataSel.priceAdjustment,
        blendID,
      })) as any

      options.map(
        async (o: any) =>
          o.checked &&
          (await createCartOption({
            cartID: createdCart3.id,
            optionID: o.id,
          }))
      )
    }

    setLoading(false)

    let data = {
      origin: router.asPath,
      category: content.category,
      showSubCategory:
        content.showSubCategoryMobile !== 'hide' ||
        content.showSubCategoryDesktop !== 'hide',
      part1,
      part2,
      part3,
    }

    if (dataSel && dataSel.name) {
      data = Object.assign(data, dataSel)
    }
    const hash = crypto.encrypt(data) as string
    router.push(`/cart/?t=${encodeURIComponent(hash)}`)
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const fetchProduct = async () => {
        const product = await getProduct({ id: part1.productID })
        const opt: any[] = []
        product.options.items.map((o: any, i: number) => {
          o.checked = false
          opt.push(o)
        })
        setOptions(opt)
      }
      if (part1 && part1.productID) {
        fetchProduct()
      }
    }
    return () => {
      isMounted = false
      setOptions([] as any)
    }
  }, [part1])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      let p = calcPrice()
      options.map((o: any) => {
        if (o.checked) {
          p = p + o.price
        }
      })
      setTotal(p)
    }
    return () => {
      isMounted = false
      setTotal(0)
    }
  }, [options])

  return (
    <div className="mb-4 lg:mb-0 p-3 bg-accent-1 rounded-lg">
      <div className="flex justify-between">
        <div className="text-lg lg:text-xl text-accent-9 font-bold">
          <div className="flex flex-col lg:flex-row">
            <div className="text-lg lg:text-2xl text-accent-9 font-bold line-clamp-1">
              {dataSel.name}
            </div>
            {dataSel.description && (
              <div className="text-accent-6 ml-0 lg:ml-4 lg:mt-1 text-xs lg:text-lg line-clamp-1">
                {dataSel.description}
              </div>
            )}
          </div>
        </div>
        <div className="flex-none text-lg lg:text-xl text-accent-9 font-bold">
          <div className="flex items-stretch">
            <div className="dropdown dropdown-end">
              <div tabIndex={0}>
                <span className="mr-2 text-xs">OPÇÕES</span>
                <Apps />
              </div>
              <ul
                tabIndex={0}
                className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
              >
                {data.map((o: any, index: number) => (
                  <li key={index}>
                    <div
                      className="btn btn-ghost"
                      onClick={() => {
                        setPart1({} as any)
                        setPart2({} as any)
                        setPart3({} as any)
                        setDataSel(o)
                      }}
                    >
                      {o.name}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {dataSel.qtyBlend && dataSel.qtyBlend !== '1' && (
        <div className="mt-3 lg:mt-2">
          <div
            className={cn('flex justify-between p-2 rounded-lg', {
              'bg-accent-9 text-accent-0': !part1.productID,
              'bg-accent-2': part1.productID,
            })}
          >
            {!part1.productID && (
              <div>Selecione a parte 1/{dataSel.qtyBlend}</div>
            )}
            {part1.productID && (
              <div>
                <div className="text-red-500 font-semibold">{part1.name}</div>
                <div className="text-accent-7 text-xs">
                  Parte 1/{dataSel.qtyBlend}
                </div>
              </div>
            )}
            {part1.productID && (
              <div
                onClick={() => {
                  setPart1({} as any)
                  setTimeout(() => {
                    window.scrollTo({ top: topPosition, behavior: 'smooth' })
                  }, 1000)
                }}
                className="text-tertiary-2 mr-2 z-10 cursor-pointer bg-accent-0 p-2 rounded-full flex items-center justify-center"
              >
                <Refresh />
              </div>
            )}
          </div>

          {(part1.productID || part2.productID) && (
            <div
              className={cn('mt-2 flex justify-between p-2 rounded-lg', {
                'bg-accent-9 text-accent-0': !part2.productID,
                'bg-accent-2': part2.productID,
              })}
            >
              {!part2.productID && (
                <div>Selecione a parte 2/{dataSel.qtyBlend}</div>
              )}
              {part2.productID && (
                <div>
                  <div className="text-red-500 font-semibold">{part2.name}</div>
                  <div className="text-accent-7 text-xs">
                    Parte 2/{dataSel.qtyBlend}
                  </div>
                </div>
              )}
              {part2.productID && (
                <div
                  onClick={() => {
                    setPart2({} as any)
                    setTimeout(() => {
                      window.scrollTo({ top: topPosition, behavior: 'smooth' })
                    }, 1000)
                  }}
                  className="text-tertiary-2 mr-2 z-10 cursor-pointer bg-accent-0 p-2 rounded-full flex items-center justify-center"
                >
                  <Refresh />
                </div>
              )}
            </div>
          )}

          {dataSel.qtyBlend === '3' &&
            ((part1.productID && part2.productID) || part3.productID) && (
              <div
                className={cn('mt-2 flex justify-between p-2 rounded-lg', {
                  'bg-accent-9 text-accent-0': !part3.productID,
                  'bg-accent-2': part3.productID,
                })}
              >
                {!part3.productID && (
                  <div>Selecione a parte 3/{dataSel.qtyBlend}</div>
                )}
                {part3.productID && (
                  <div>
                    <div className="text-red-500 font-semibold">
                      {part3.name}
                    </div>
                    <div className="text-accent-7 text-xs">
                      Parte 3/{dataSel.qtyBlend}
                    </div>
                  </div>
                )}
                {part3.productID && (
                  <div
                    onClick={() => {
                      setPart3({} as any)
                      setTimeout(() => {
                        window.scrollTo({
                          top: topPosition,
                          behavior: 'smooth',
                        })
                      }, 1000)
                    }}
                    className="text-tertiary-2 mr-2 z-10 cursor-pointer bg-accent-0 p-2 rounded-full flex items-center justify-center"
                  >
                    <Refresh />
                  </div>
                )}
              </div>
            )}

          {((dataSel.qtyBlend === '2' && part1.productID && part2.productID) ||
            (dataSel.qtyBlend === '3' &&
              part1.productID &&
              part2.productID &&
              part3.productID)) && (
            <div>
              <div className="mt-2 p-2 flex justify-between">
                <div className="text-lg lg:text-xl text-accent-9 font-bold">
                  Sub-total
                </div>
                <div className="flex-none text-lg lg:text-xl text-accent-9 font-bold">
                  <NumberFormat
                    value={calcPrice()}
                    thousandsGroupStyle="thousand"
                    prefix="R$ "
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    displayType="text"
                    allowNegative={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </div>
              </div>

              <div className="py-2">
                {options.length > 0 && (
                  <table className="table w-full table-zebra">
                    <thead>
                      <tr className="mb-2">
                        {!isSm && <th></th>}
                        <th colSpan={isSm ? 2 : 1}>Opcionais</th>
                        {!isSm && <th>Valor adicional</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {options
                        .sort((a: any, b: any) => a.name.localeCompare(b.name))
                        .map((option: any, index: number) => (
                          <tr key={`opt${index}`}>
                            <td>
                              <input
                                id={`${index}`}
                                name={`${index}`}
                                type="checkbox"
                                checked={options[index].checked}
                                onChange={(event: any) => {
                                  const target = event.target
                                  setOptions(
                                    options.map((o: any, idx: number) => {
                                      if (idx === parseInt(target.name)) {
                                        o.checked = !o.checked
                                      }
                                      return o
                                    })
                                  )
                                }}
                                className="checkbox checkbox-accent"
                              />
                            </td>
                            <td>
                              <div
                                className={`text-accent-7 ${
                                  isSm && 'font-semibold'
                                }`}
                              >
                                {option.name}
                              </div>
                              {isSm && (
                                <div>
                                  {option.price === 0 && (
                                    <div className="badge badge-success font-semibold text-white">
                                      GRÁTIS
                                    </div>
                                  )}
                                  {option.price > 0 && (
                                    <div className="text-red-500">
                                      <NumberFormat
                                        value={option.price}
                                        thousandsGroupStyle="thousand"
                                        prefix="+ R$ "
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        displayType="text"
                                        allowNegative={true}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                            </td>
                            {!isSm && (
                              <td>
                                {option.price === 0 && (
                                  <div className="badge badge-success font-semibold text-white">
                                    GRÁTIS
                                  </div>
                                )}
                                {option.price > 0 && (
                                  <div className="text-red-500">
                                    <NumberFormat
                                      value={option.price}
                                      thousandsGroupStyle="thousand"
                                      prefix="+ R$ "
                                      thousandSeparator={'.'}
                                      decimalSeparator={','}
                                      displayType="text"
                                      allowNegative={true}
                                      decimalScale={2}
                                      fixedDecimalScale={true}
                                    />
                                  </div>
                                )}
                              </td>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="p-2 flex justify-between">
                <div className="text-lg lg:text-xl text-accent-9 font-bold">
                  Total
                </div>
                <div className="flex-none text-lg lg:text-xl text-accent-9 font-bold">
                  <NumberFormat
                    value={total ? total : calcPrice()}
                    thousandsGroupStyle="thousand"
                    prefix="R$ "
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    displayType="text"
                    allowNegative={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </div>
              </div>

              {(!content.linkMode || content.linkMode !== 'none') && (
                <button
                  className={`w-full btn btn-error ${loading && 'loading'}`}
                  onClick={addCart}
                >
                  <span className="mr-2">CONTINUAR</span> <RightArrow />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface PropsListProducts {
  products: any
  content: any
  dataSel: any
  setPart1?: any
  part1?: any
  setPart2?: any
  part2?: any
  setPart3?: any
  part3?: any
  topPosition?: number
  hasLateral?: boolean
}
export function ListProducts(props: PropsListProducts) {
  const {
    products,
    content,
    dataSel,
    part1,
    part2,
    part3,
    setPart1,
    setPart2,
    setPart3,
    topPosition,
    hasLateral,
  } = props
  const { isSm, isMd } = useBreakPoints()
  return (
    <div
      className={cn({
        'flex flex-row justify-evenly gap-10 mx-auto flex-wrap': !isSm && !isMd,
        'grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 ': isSm || isMd,
      })}
    >
      {products.map(
        (item: any, index: number) =>
          (!item.hideInMenu ||
            (item.hideInMenu && item.hideInMenu === false)) && (
            <>
              {(((isSm || isMd) && content.showSubCategoryMobile !== 'hide') ||
                (!isSm &&
                  !isMd &&
                  content.showSubCategoryDesktop !== 'hide')) &&
                item.break &&
                item.subCategoryProps && (
                  <ShowTitleDescription
                    key={`s${index}`}
                    index={index}
                    content={content}
                    title={item.subCategoryProps.title}
                    description={item.subCategoryProps.description}
                  />
                )}

              {(isSm || isMd) && (
                <Card
                  key={`m${index}`}
                  index={index}
                  item={item}
                  content={content}
                  dataSel={dataSel}
                  setPart1={setPart1}
                  part1={part1}
                  setPart2={setPart2}
                  part2={part2}
                  setPart3={setPart3}
                  part3={part3}
                  topPosition={topPosition}
                />
              )}

              {!isSm && !isMd && (
                <CardDesktop
                  key={`d${index}`}
                  index={index}
                  item={item}
                  content={content}
                  dataSel={dataSel}
                  setPart1={setPart1}
                  part1={part1}
                  setPart2={setPart2}
                  part2={part2}
                  setPart3={setPart3}
                  part3={part3}
                  topPosition={topPosition}
                  hasLateral={hasLateral}
                />
              )}
            </>
          )
      )}
    </div>
  )
}
