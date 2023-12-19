import Amplify, { withSSRContext } from 'aws-amplify'
import awsExports from '../../aws-exports'
Amplify.configure({ ...awsExports, ssr: true })

import {
  GRAPHQL_AUTH_MODE,
  GraphQLResult,
} from '@aws-amplify/api'

import {
  getProductCustom,
  listProductsByAliasCreatedAtCustom,
  listProductsByStatusCategoryNameCustom,
} from 'graphql/custom-queries'

import crypto from 'lib/crypto'

import { listProducts, listCategories } from 'graphql/queries'

import { GetStaticProps, GetStaticPaths } from 'next'

import {
  PageStatus,
  PageOptionTitle,
  PageSideColumn,
  PageOptionSideColumn,
} from 'models'

import { Storage } from 'aws-amplify'
Storage.configure({ level: 'public' })

import { validate as uuidValidate } from 'uuid'
import { ModelSortDirection } from 'API'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Container, Footer, ScrollTopArrow } from 'components/ui'
import { Layout } from 'components/common'
import { useUI } from 'components/ui/context'
import { Head } from 'components/common'
import { Cart } from 'components/icons'
import { useBreakPoints } from 'hooks/useBreakPoints'
import cn from 'classnames'
import Carousel from 're-carousel'
import IndicatorDots from 'components/ui/Carousel/indicator-dots'
import Buttons from 'components/ui/Carousel/buttons'
import { RightArrow, ArrowLeft } from 'components/icons'
import NumberFormat from 'react-number-format'
import Image from 'next/image'
import Link from 'next/link'
import { useUserAuth } from 'components/userAuth/context'
import { useCart } from 'hooks/useCart'

interface PropsProduct {
  id: string
  alias: string
  status: string
  category: string
  type: string
  name: string
  description: string
  contentTitle: string
  contentTitle2: string
  contentTitle3: string
  content: string
  content2: string
  content3: string
  tags: any
  price_of: number
  price: number
  qty: number
  photo1: string
  photo2: string
  photo3: string
  photo4: string
  photo5: string
  thumbnail: string
  titlePadX: string
  titlePadY: string
  contentPadX: string
  contentPadY: string
  optionTitle: string
  sideColumn: string
  sideColumnPadX: string
  sideColumnPadY: string
  sideColumnContent: string
  optionSideColumn: string
  footerSm: string
  footerLg: string
  updatedAt: any
  blocks: any
  options: any
}

type PropsMenu = {
  id: string
  alias: string
  title: string
  hideInMenu: boolean
}

type PropsCategories = {
  id: string
  title: string
}

type Props = {
  product: PropsProduct
  menu?: PropsMenu
  categories?: PropsCategories
  tokenObj?: any
}

const getPhoto = (photo: string) => {
  return photo && photo.substr(0, 4) === 'http'
    ? photo
    : photo
    ? `${process.env.MIDIA_CLOUDFRONT}${photo}`
    : '/images/no_photo.png'
}

const getPrice = (price: number, tokenObj: any) => {
  if (!tokenObj || !tokenObj.priceAdjustment) {
    return price
  } else if (tokenObj && tokenObj.qtyBlend === '1') {
    return (price * parseInt(tokenObj.priceAdjustment)) / 100
  } else {
    return price
  }
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

export default function IndexProduct({
  product,
  menu,
  categories,
}: Props): JSX.Element {
  const router = useRouter()
  const { t } = router.query
  const [tokenObj, setTokenObj] = useState(
    t ? crypto.decrypt(decodeURIComponent(t.toString())) : ({} as any)
  )

  const { isSm, isMd } = useBreakPoints()
  const { showSearch, config } = useUI()

  useEffect(() => {
    showSearch()
    setTokenObj(
      t ? crypto.decrypt(decodeURIComponent(t.toString())) : ({} as any)
    )
    return () => {
      setTokenObj({} as any)
    }
  }, [t])

  if (!router.isFallback && !product?.alias) {
    return (
      <div className="p-5 text-2xl font-semibold">
        Página não localizada. (404)
      </div>
    )
  }

  if (router.isFallback) {
    return <div className="p-5">Carregando...</div>
  }

  return (
    <Container>
      <Head
        title={product.name}
        description={product.description}
        alias={`/product/${product.alias}/`}
        thumbnail={product.thumbnail}
      />

      {!product.name && (
        <div className="p-4 text-2xl font-semibold">Página não localizada!</div>
      )}

      {product.name && product.optionTitle !== PageOptionTitle.N && (
        <div
          className={cn('text-accent-9 text-2xl font-bold', {
            ['text-left']:
              !product.optionTitle || product.optionTitle === PageOptionTitle.L,
            ['text-right']: product.optionTitle === PageOptionTitle.R,
            ['text-center']: product.optionTitle === PageOptionTitle.C,
            ['px-0']: product.titlePadX && product.titlePadX === 'none',
            ['px-4']: !product.titlePadX || product.titlePadX === 'small',
            ['px-8']: product.titlePadX && product.titlePadX === 'normal',
            ['px-12']: product.titlePadX && product.titlePadX === 'large',
            ['px-24']: product.titlePadX && product.titlePadX === 'extra',
            ['py-0']: product.titlePadY && product.titlePadY === 'none',
            ['py-4']: !product.titlePadY || product.titlePadY === 'small',
            ['py-8']: product.titlePadY && product.titlePadY === 'normal',
            ['py-12']: product.titlePadY && product.titlePadY === 'large',
            ['py-24']: product.titlePadY && product.titlePadY === 'extra',
          })}
        >
          {product.name}
        </div>
      )}

      {(!product.sideColumn || product.sideColumn === PageSideColumn.N) && (
        <>
          <HandleProduct
            product={product}
            categories={categories}
            tokenObj={tokenObj}
          />
        </>
      )}

      {product.sideColumn === PageSideColumn.L && (
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {!isSm && !isMd && (
            <div className="col-span-1">
              <HandleSideColumn
                product={product}
                menu={menu}
                tokenObj={tokenObj}
              />
            </div>
          )}
          <div className="col-span-3">
            <HandleProduct
              product={product}
              categories={categories}
              tokenObj={tokenObj}
            />
          </div>
          {(isSm || isMd) && (
            <div className="col-span-1">
              <HandleSideColumn
                product={product}
                menu={menu}
                tokenObj={tokenObj}
              />
            </div>
          )}
        </div>
      )}

      {product.sideColumn === PageSideColumn.R && (
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="col-span-3">
            <HandleProduct
              product={product}
              categories={categories}
              tokenObj={tokenObj}
            />
          </div>
          <div className="col-span-1">
            <HandleSideColumn
              product={product}
              menu={menu}
              tokenObj={tokenObj}
            />
          </div>
        </div>
      )}

      {process.env.SCROLL_TO_TOP_IN_BOTTOM && !isSm && !isMd && (
        <ScrollTopArrow />
      )}

      <Footer
        footerSm={product.footerSm}
        footerLg={product.footerLg}
        facebook={config?.facebook}
        twitter={config?.twitter}
        instagram={config?.instagram}
        youtube={config.youtube}
        linkedin={config.linkedin}
        info={config?.infoFooter ? config?.infoFooter : ''}
        content={config.footer}
      />

      <div className="h-24 lg:h-4" />
    </Container>
  )
}

IndexProduct.Layout = Layout

/**
 * SIDE COLUMN
 * *************************************************
 */

function HandleSideColumn(props: Props) {
  const { product, menu, tokenObj } = props
  const { isSm, isMd } = useBreakPoints()
  return (
    <div>
      {product.optionSideColumn === PageOptionSideColumn.CONTENT_TAGS ? (
        <>
          <HandleSideColumnContent product={product} />
          <HandleTags product={product} />
        </>
      ) : product.optionSideColumn === PageOptionSideColumn.CONTENT_MENU ? (
        <>
          <HandleSideColumnContent product={product} />
          <HandleMenu product={product} menu={menu} tokenObj={tokenObj} />
        </>
      ) : product.optionSideColumn ===
        PageOptionSideColumn.CONTENT_MENU_TAGS ? (
        <>
          <HandleSideColumnContent product={product} />
          <HandleMenu product={product} menu={menu} tokenObj={tokenObj} />
          <HandleTags product={product} />
        </>
      ) : product.optionSideColumn === PageOptionSideColumn.TAGS_CONTENT ? (
        <>
          <HandleTags product={product} />
          <HandleSideColumnContent product={product} />
        </>
      ) : product.optionSideColumn === PageOptionSideColumn.MENU_CONTENT ? (
        <>
          <HandleMenu product={product} menu={menu} tokenObj={tokenObj} />
          <HandleSideColumnContent product={product} />
        </>
      ) : (
        <>
          <HandleMenu product={product} menu={menu} tokenObj={tokenObj} />
          <HandleSideColumnContent product={product} />
          <HandleTags product={product} />
        </>
      )}

      {(isSm || isMd) && (
        <div className="mx-4">
          <Link
            href={`${
              tokenObj && tokenObj.origin ? tokenObj.origin : process.env.HOME
            }`}
          >
            <a className="w-full md:w-auto border-none md:border-solid btn btn-outline cursor-pointer">
              <ArrowLeft /> Continuar Comprando
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}

/**
 * SIDE COLUMN CONTENT
 * *************************************************
 */

function HandleSideColumnContent(props: Props) {
  const { product } = props
  return (
    <>
      {product.sideColumnContent &&
        product.sideColumnContent.replace(/<[^>]*>?/gm, '') && (
          <div
            className={cn('w-full text-accent-8', {
              ['px-0']:
                product.sideColumnPadX && product.sideColumnPadX === 'none',
              ['px-4']:
                !product.sideColumnPadX || product.sideColumnPadX === 'small',
              ['px-8']:
                product.sideColumnPadX && product.sideColumnPadX === 'normal',
              ['px-12']:
                product.sideColumnPadX && product.sideColumnPadX === 'large',
              ['px-24']:
                product.sideColumnPadX && product.sideColumnPadX === 'extra',
              ['py-0']:
                product.sideColumnPadY && product.sideColumnPadY === 'none',
              ['py-4']:
                !product.sideColumnPadY || product.sideColumnPadY === 'small',
              ['py-8']:
                product.sideColumnPadY && product.sideColumnPadY === 'normal',
              ['py-12']:
                product.sideColumnPadY && product.sideColumnPadY === 'large',
              ['py-24']:
                product.sideColumnPadY && product.sideColumnPadY === 'extra',
            })}
          >
            {product.sideColumnContent && (
              <div
                dangerouslySetInnerHTML={{ __html: product.sideColumnContent }}
              ></div>
            )}
          </div>
        )}
    </>
  )
}

/**
 * TAGS
 * *************************************************
 */

function HandleTags(props: Props) {
  const { product } = props
  return (
    <ul
      className={cn('text-accent-8', {
        ['px-0']: product.sideColumnPadX && product.sideColumnPadX === 'none',
        ['px-4']: !product.sideColumnPadX || product.sideColumnPadX === 'small',
        ['px-8']: product.sideColumnPadX && product.sideColumnPadX === 'normal',
        ['px-12']: product.sideColumnPadX && product.sideColumnPadX === 'large',
        ['px-24']: product.sideColumnPadX && product.sideColumnPadX === 'extra',
        ['py-0']: product.sideColumnPadY && product.sideColumnPadY === 'none',
        ['py-4']: !product.sideColumnPadY || product.sideColumnPadY === 'small',
        ['py-8']: product.sideColumnPadY && product.sideColumnPadY === 'normal',
        ['py-12']: product.sideColumnPadY && product.sideColumnPadY === 'large',
        ['py-24']: product.sideColumnPadY && product.sideColumnPadY === 'extra',
      })}
    >
      {product.tags.map((tag: string, index: number) => (
        <li key={`tag${index}`}>{tag}</li>
      ))}
    </ul>
  )
}

/**
 * MENU
 * *************************************************
 */
function HandleMenu(props: Props) {
  const { product, menu, tokenObj } = props
  const router = useRouter()
  const { t } = router.query

  const menuSorted = tokenObj.showSubCategory
    ? breakSubCategory(
        (menu as any).sort((a: any, b: any) =>
          a.subCategory.localeCompare(b.subCategory)
        )
      )
    : (menu as any).sort((a: any, b: any) => a.name.localeCompare(b.name))

  return (
    <div
      className={cn({
        ['px-0']: product.sideColumnPadX && product.sideColumnPadX === 'none',
        ['px-4']: !product.sideColumnPadX || product.sideColumnPadX === 'small',
        ['px-8']: product.sideColumnPadX && product.sideColumnPadX === 'normal',
        ['px-12']: product.sideColumnPadX && product.sideColumnPadX === 'large',
        ['px-24']: product.sideColumnPadX && product.sideColumnPadX === 'extra',
        ['py-0']: product.sideColumnPadY && product.sideColumnPadY === 'none',
        ['py-4']: !product.sideColumnPadY || product.sideColumnPadY === 'small',
        ['py-8']: product.sideColumnPadY && product.sideColumnPadY === 'normal',
        ['py-12']: product.sideColumnPadY && product.sideColumnPadY === 'large',
        ['py-24']: product.sideColumnPadY && product.sideColumnPadY === 'extra',
      })}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
        {menuSorted.map((item: any, index: number) =>
          !item.hideInMenu || (item.hideInMenu && item.hideInMenu === false) ? (
            <>
              {tokenObj.showSubCategory && item.break && item.subCategoryProps && (
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                  <h1 className="mt-4 text-xl font-medium title-font text-accent-9">
                    {item.subCategoryProps.title}
                  </h1>
                  <div className="mb-2 w-16 h-1 rounded-full bg-tertiary-2 inline-flex"></div>
                </div>
              )}
              <div
                onClick={() => {
                  router.push(
                    `/product/${encodeURIComponent(
                      item.alias ? item.alias : item.id
                    )}/?t=${t ? encodeURIComponent(t.toString()) : ''}`
                  )
                }}
                key={`item${index}`}
                className={cn(
                  'bg-accent-0 shadow text-accent-6 lg:w-full cursor-pointer h-full flex items-center py-2 px-2 rounded-lg',
                  {
                    ['border-l-2 border-tertiary']:
                      router.asPath.split('/')[2] === item.alias,
                  }
                )}
              >
                <div
                  className="flex flex-wrap content-center "
                  style={{ minWidth: 64 }}
                >
                  <Image
                    alt={item.name}
                    className="bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle"
                    src={
                      item.thumbnail
                        ? `${process.env.MIDIA_CLOUDFRONT}${item.thumbnail}`
                        : getPhoto(item.photo1)
                    }
                    width={64}
                    height={64}
                  />
                </div>
                <div className="ml-3 flex-grow">
                  <h2 className="line-clamp-1 title-font font-semibold text-lg hover:text-tertiary-2">
                    {item.name}
                  </h2>
                  <p className="text-accent-5 line-clamp-2 text-xs">
                    {item.description}
                  </p>
                  <div className="text-sm font-medium text-red-500">
                    {item.price_of > 0 && (
                      <span>
                        <span>De&nbsp;</span>
                        <span className="line-through">
                          <NumberFormat
                            value={getPrice(item.price_of, tokenObj)}
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
                        value={getPrice(item.price, tokenObj)}
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
                {router.asPath.split('/')[2] !== item.alias && (
                  <div className="text-accent-2">
                    <RightArrow width={24} height={24} />
                  </div>
                )}
              </div>
            </>
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  )
}

/**
 * PRODUCT
 * *************************************************
 */

function HandleProduct(props: Props) {
  const { product, categories, tokenObj } = props

  const router = useRouter()
  const { t } = router.query

  const [loading, setLoading] = useState(false)
  const { isSm, isMd, isLg } = useBreakPoints()

  const { user } = useUserAuth()
  const { setModalView, openModal } = useUI()

  const categoriesSorted = !categories
    ? []
    : (categories as any).sort((a: any, b: any) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      )

  const photos = [] as any
  photos.push(getPhoto(product.photo1))
  if (product.photo2) {
    photos.push(getPhoto(product.photo2))
  }
  if (product.photo3) {
    photos.push(getPhoto(product.photo3))
  }
  if (product.photo4) {
    photos.push(getPhoto(product.photo4))
  }
  if (product.photo5) {
    photos.push(getPhoto(product.photo5))
  }

  const frames = photos.map((f: any, k: number) => {
    return (
      <Image
        key={k}
        alt={product.name}
        className="w-full object-cover object-center rounded-lg shadow-lg"
        src={getPhoto(f)}
        layout="fill"
      />
    )
  })

  const [total, setTotal] = useState(0)
  const [options, setOptions] = useState([] as any)
  const [contentTabSel, setContentTabSel] = useState(1)

  const handleCheckboxChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const optionPrice = options[parseInt(target.name)].price

    setOptions(
      options.map((o: any, idx: number) => {
        if (idx === parseInt(target.name)) {
          o.checked = !o.checked
        }
        return o
      })
    )

    if (value) {
      setTotal(total + optionPrice)
    } else {
      setTotal(total - optionPrice)
    }
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setTotal(getPrice(product.price, tokenObj))
      const opt: any[] = []
      product.options.items.map((o: any, i: number) => {
        o.checked = false
        opt.push(o)
      })
      setOptions(opt)
    }
    return () => {
      isMounted = false
      setTotal(0)
      setOptions([] as any)
    }
  }, [product])

  const { listCartsByUser, createCart, createCartOption, deleteCartOption } =
    useCart()

  const addCart = async () => {
    if (loading) {
      return null
    }

    setLoading(true)

    if (!user) {
      setModalView('SIGNUP_VIEW')
      openModal()
      setLoading(false)
      return null
    }

    const { items } = await listCartsByUser({
      userID: user.id,
    })

    const exists = items.filter((p: any) => {
      if (p.productID === product.id) {
        p.options.items.map(async (o: any) => {
          await deleteCartOption({ id: o.id })
        })
      }
      return !p.blendID && p.productID === product.id
    })

    if (!exists || exists.length === 0) {
      const createdCart = (await createCart({
        userID: user.id,
        productID: product.id,
        qty: 1,
        changeName: tokenObj && tokenObj.name ? tokenObj.name : null,
        changeDescription:
          tokenObj && tokenObj.description ? tokenObj.description : null,
        changeQtyBlend: tokenObj && tokenObj.qtyBlend ? tokenObj.qtyBlend : 1,
        changePriceAdjustment:
          tokenObj && tokenObj.priceAdjustment
            ? tokenObj.priceAdjustment
            : null,
        blendID: null,
      })) as any

      options.map(
        async (o: any) =>
          o.checked &&
          (await createCartOption({
            cartID: createdCart.id,
            optionID: o.id,
          }))
      )

      setLoading(false)
      if (t && t.toString() !== 'undefined') {
        router.push(`/cart/?t=${t ? encodeURIComponent(t.toString()) : ''}`)
      } else {
        router.push('/cart/')
      }
    } else {
      options.map(
        async (o: any) =>
          o.checked &&
          (await createCartOption({
            cartID: exists[0].id,
            optionID: o.id,
          }))
      )
      setLoading(false)
      if (t && t.toString() !== 'undefined') {
        router.push(`/cart/?t=${t ? encodeURIComponent(t.toString()) : ''}`)
      } else {
        router.push('/cart/')
      }
    }
  }

  return (
    <div
      className={cn('w-full text-accent-8', {
        ['px-0']: product.contentPadX && product.contentPadX === 'none',
        ['px-4']: !product.contentPadX || product.contentPadX === 'small',
        ['px-8']: product.contentPadX && product.contentPadX === 'normal',
        ['px-12']: product.contentPadX && product.contentPadX === 'large',
        ['px-24']: product.contentPadX && product.contentPadX === 'extra',
        ['py-0']: product.contentPadY && product.contentPadY === 'none',
        ['py-4']: !product.contentPadY || product.contentPadY === 'small',
        ['py-8']: product.contentPadY && product.contentPadY === 'normal',
        ['py-12']: product.contentPadY && product.contentPadY === 'large',
        ['py-24']: product.contentPadY && product.contentPadY === 'extra',
      })}
    >
      <div className="flex flex-wrap">
        {photos.length > 1 && (
          <div className="w-full lg:w-1/2 h-64 md:h-80 lg:h-auto z-10">
            <Carousel
              auto
              loop
              frames={frames}
              widgets={[IndicatorDots, Buttons]}
            ></Carousel>
          </div>
        )}
        {photos.length === 1 && (
          <div className="relative w-full lg:w-1/2 h-64 md:h-80 lg:h-auto">
            <Image
              alt=""
              className="w-full h-full object-cover object-center rounded-lg shadow-lg"
              src={getPhoto(product.photo1)}
              layout="fill"
            />
          </div>
        )}
        <div
          style={!isSm && !isMd ? { minHeight: 380, maxHeight: 512 } : {}}
          className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"
        >
          <h2 className="text-sm title-font text-tertiary-2 tracking-widest">
            {categoriesSorted.map(
              (i: any, k: number) =>
                product.category === i.id && <span key={k}>{i.title}</span>
            )}
          </h2>
          <h1 className="text-accent-9 text-3xl title-font font-medium mb-1">
            {product.name} {tokenObj.name && <span> - {tokenObj.name}</span>}
          </h1>
          {tokenObj.description && (
            <div className="pb-2 text-red-500 leading-relaxed">
              {tokenObj.description}
            </div>
          )}
          <div className="text-accent-6 text-lg leading-relaxed">{product.description}</div>
          <div className="py-5 border-b-2 border-accent-2 mb-5">
            
            {options.length > 0 && (<div>
              <div className="mb-2 text-accent-7 font-semibold">Opcionais</div>
              <table className="table-auto">
                <tbody>
                  {options
                    .sort((a: any, b: any) => a.name.localeCompare(b.name))
                    .map((option: any, index: number) => (
                      <tr key={index}>
                        <td>
                          <input
                            id={`${index}`}
                            name={`${index}`}
                            type="checkbox"
                            checked={options[index].checked}
                            onChange={handleCheckboxChange}
                            className="checkbox"
                          />
                        </td>

                        <td>
                          <div
                            className={`text-accent-6 ${
                              isSm && 'font-semibold'
                            }`}
                          >
                            {option.name}
                          </div>
                          {(isSm ||
                            (isLg &&
                              product.sideColumn !== PageSideColumn.N)) && (
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
                        {!isSm &&
                          (!isLg ||
                            (isLg &&
                              product.sideColumn === PageSideColumn.N)) && (
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
            </div>)}
          </div>
          <div className="flex">
            <span className="mt-2 title-font font-bold text-2xl text-accent-9">
              <NumberFormat
                value={total}
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
            <button
              className={`ml-auto btn btn-error text-white ${
                loading && 'loading'
              }`}
              onClick={addCart}
            >
              <Cart /> <span className="ml-2">ADICIONAR</span>
            </button>
          </div>
        </div>
        {(product.contentTitle ||
          product.contentTitle2 ||
          product.contentTitle3) && (
          <div className="w-full mt-4 tabs">
            <a
              onClick={() => setContentTabSel(1)}
              className={cn('tab tab-lg tab-bordered text-tertiary-2 font-bold', {
                'tab-active': contentTabSel === 1,
              })}
            >
              {product.contentTitle}
            </a>
            <a
              onClick={() => setContentTabSel(2)}
              className={cn('tab tab-lg tab-bordered text-tertiary-2 font-bold', {
                'tab-active': contentTabSel === 2,
              })}
            >
              {product.contentTitle2}
            </a>
            <a
              onClick={() => setContentTabSel(3)}
              className={cn('tab tab-lg tab-bordered text-tertiary-2 font-bold', {
                'tab-active': contentTabSel === 3,
              })}
            >
              {product.contentTitle3}
            </a>
            <div className="flex-1 cursor-default tab tab-bordered"></div>
          </div>
        )}
        {product.content && contentTabSel === 1 && (
          <div
            className="w-full mt-4 leading-relaxed text-accent-6"
            dangerouslySetInnerHTML={{ __html: product.content }}
          ></div>
        )}
        {product.content2 && contentTabSel === 2 && (
          <div
            className="w-full mt-4 leading-relaxed text-accent-6"
            dangerouslySetInnerHTML={{ __html: product.content2 }}
          ></div>
        )}
        {product.content3 && contentTabSel === 3 && (
          <div
            className="w-full mt-4 leading-relaxed text-accent-6"
            dangerouslySetInnerHTML={{ __html: product.content3 }}
          ></div>
        )}

        {!isSm && !isMd && (
          <Link
            href={`${
              tokenObj && tokenObj.origin ? tokenObj.origin : process.env.HOME
            }`}
          >
            <a className="mt-6 btn btn-outline cursor-pointer text-accent-6">
              <ArrowLeft /> Continuar Comprando
            </a>
          </Link> 
        )}

      </div>
    </div>
  )
}

/**
 * GET STATIC PATHS
 * GET STATIC PROPS
 * *************************************************
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const SSR = withSSRContext()

  const {
    data: {
      listProducts: { items },
    },
  } = (await SSR.API.graphql({
    query: listProducts,
    variables: {
      limit: 1000,
    },
    authMode: GRAPHQL_AUTH_MODE.API_KEY,
  })) as GraphQLResult<any>

  const paths = items.map((item: any) => ({
    params: { alias: item.alias },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const SSR = withSSRContext()
  const { alias } = context.params

  let product = {} as any
  let menu = [] as any
  let categories = [] as any

  if (alias) {
    if (uuidValidate(alias.toString())) {
      const {
        data: { getProduct },
      } = await SSR.API.graphql({
        query: getProductCustom,
        variables: { id: alias?.toString() },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
      product = getProduct ? getProduct : {}
    } else {
      const {
        data: {
          listProductsByAliasCreatedAt: { items },
        },
      } = await SSR.API.graphql({
        query: listProductsByAliasCreatedAtCustom,
        variables: {
          alias: alias?.toString(),
          createdAt: { gt: '0' },
          sortDirection: ModelSortDirection.DESC,
          limit: 1,
        },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
      product = items && items[0] ? items[0] : {}
    }

    if (product && product.id) {
      const resultMenu = (await SSR.API.graphql({
        query: listProductsByStatusCategoryNameCustom,
        variables: {
          status: PageStatus.ON,
          categoryName: { beginsWith: { category: product.category } },
          sortDirection: ModelSortDirection.ASC,
          limit: 1000,
          nextToken: null,
        },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<any>

      menu =
        resultMenu.data &&
        resultMenu.data.listProductsByStatusCategoryName &&
        resultMenu.data.listProductsByStatusCategoryName.items
          ? resultMenu.data.listProductsByStatusCategoryName.items
          : []
    }

    const resultCategories = (await SSR.API.graphql({
      query: listCategories,
      variables: {
        limit: 1000,
      },
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as GraphQLResult<any>

    categories =
      resultCategories.data &&
      resultCategories.data.listCategories &&
      resultCategories.data.listCategories.items
        ? resultCategories.data.listCategories.items
        : []
  }

  return {
    revalidate: 60,
    props: {
      product: JSON.parse(JSON.stringify(product)),
      menu: JSON.parse(JSON.stringify(menu)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  }
}
