import Amplify, { withSSRContext } from 'aws-amplify'
import awsExports from '../../aws-exports'
Amplify.configure({ ...awsExports, ssr: true })

import {
  GRAPHQL_AUTH_MODE,
  GraphQLResult,
} from '@aws-amplify/api'

import {
  getPageCustom,
  listPagesByAliasCreatedAtCustom,
  listPagesByStatusMenuOrderCustom,
} from 'graphql/custom-queries'

import { listPages } from 'graphql/queries'

import {
  PageStatus,
  PageType,
  PageChangeFreq,
  PagePriority,
  PageOptionTitle,
  PageSideColumn,
  PageOptionSideColumn,
  Page,
} from 'models'
import { validate as uuidValidate } from 'uuid'
import { ModelSortDirection } from 'API'

import { GetStaticProps, GetStaticPaths } from 'next'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Footer, ScrollTopArrow, Modal } from 'components/ui'
import { Layout, Head } from 'components/common'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { useUI } from 'components/ui/context'
import cn from 'classnames'
import Image from 'next/image'
import { RightArrow } from 'components/icons'
import { useUserAuth } from 'components/userAuth/context'

import Block1 from 'components/ui/Blocks/Block-1/View'
import Block2 from 'components/ui/Blocks/Block-2/View'
import Block3 from 'components/ui/Blocks/Block-3/View'
import Block4 from 'components/ui/Blocks/Block-4/View'
import Block5 from 'components/ui/Blocks/Block-5/View'
import Block6 from 'components/ui/Blocks/Block-6/View'
import Block7 from 'components/ui/Blocks/Block-7/View'
import Block8 from 'components/ui/Blocks/Block-8/View'
import Block9 from 'components/ui/Blocks/Block-9/View'
import Block10 from 'components/ui/Blocks/Block-10/View'
import Block11 from 'components/ui/Blocks/Block-11/View'
import Block12 from 'components/ui/Blocks/Block-12/View'
import Block13 from 'components/ui/Blocks/Block-13/View'
import Block14 from 'components/ui/Blocks/Block-14/View'
import Block15 from 'components/ui/Blocks/Block-15/View'
import Block16 from 'components/ui/Blocks/Block-16/View'
import Block17 from 'components/ui/Blocks/Block-17/View'
import Block18 from 'components/ui/Blocks/Block-18/View'
import Block19 from 'components/ui/Blocks/Block-19/View'
import Block20 from 'components/ui/Blocks/Block-20/View'
import Block21 from 'components/ui/Blocks/Block-21/View'
import Block22 from 'components/ui/Blocks/Block-22/View'
import Block23 from 'components/ui/Blocks/Block-23/View'
import Block24 from 'components/ui/Blocks/Block-24/View'
import Block25 from 'components/ui/Blocks/Block-25/View'

import dynamic from 'next/dynamic'
const Edit = dynamic(() => import('../../components/admin/Pages/Edit'))

type PropsPage = {
  id: string
  alias: string
  status: string
  type: string
  menu: string
  menuProps: any
  order: number
  title: string
  description: string
  content: string
  contentPadX: string
  contentPadY: string
  tags: any
  thumbnail: string
  changeFreq: string
  priority: string
  optionTitle: string
  titlePadX: string
  titlePadY: string
  sideColumn: string
  sideColumnPadX: string
  sideColumnPadY: string
  sideColumnContent: string
  optionSideColumn: string
  footerSm: string
  footerLg: string
  hideInMenu: boolean
  updatedAt: any
  blocks: any
}

type PropsMenu = {
  id: string
  alias: string
  title: string
  hideInMenu: boolean
  order: number
}

type PropsSSR = {
  pageSSR: PropsPage
  menu?: PropsMenu
}

type Props = {
  page: PropsPage
  menu?: PropsMenu
  user?: any
}

export default function PageComponent({
  pageSSR,
  menu,
}: PropsSSR): JSX.Element {
  const [page, setPage] = useState({} as any)
  const router = useRouter()
  const { user } = useUserAuth()
  const { isSm, isMd } = useBreakPoints()

  const {
    displayEditPage,
    hideEditPage,
    hideSearch,
    showSearch,
    hideNavBarBottom,
    showNavBarBottom,
    config,
  } = useUI()

  useEffect(() => {
    showSearch()
    showNavBarBottom()
    setPage(pageSSR)
  }, [pageSSR])

  if (!router.isFallback && !pageSSR?.alias) {
    return (
      <div className="p-5 text-2xl font-semibold">
        Página não localizada. (404)
      </div>
    )
  }

  if (router.isFallback) {
    return <div className="p-5">Carregando...</div>
  }

  const handleUpdate = (p: any) => {
    if (p) {
      setPage(p)
    }
  }

  const handleUpdateBlocks = (blocks: any) => {
    const p = page
    if (blocks) {
      p.blocks.items = blocks
      setPage(p)
    }
  }

  return (
    <Container>
      <Head
        title={page.title}
        description={page.description}
        alias={`/page/${page.alias}/`}
        thumbnail={page.thumbnail}
      />

      {!pageSSR.title && !pageSSR.content && (
        <div className="p-4 text-2xl font-semibold">Página não localizada!</div>
      )}

      {page.title && page.optionTitle !== PageOptionTitle.N && (
        <div
          className={cn('text-accent-9 text-2xl font-bold', {
            ['text-left']:
              !page.optionTitle || page.optionTitle === PageOptionTitle.L,
            ['text-right']: page.optionTitle === PageOptionTitle.R,
            ['text-center']: page.optionTitle === PageOptionTitle.C,
            ['px-0']: page.titlePadX && page.titlePadX === 'none',
            ['px-4']: !page.titlePadX || page.titlePadX === 'small',
            ['px-8']: page.titlePadX && page.titlePadX === 'normal',
            ['px-12']: page.titlePadX && page.titlePadX === 'large',
            ['px-24']: page.titlePadX && page.titlePadX === 'extra',
            ['py-0']: page.titlePadY && page.titlePadY === 'none',
            ['py-4']: !page.titlePadY || page.titlePadY === 'small',
            ['py-8']: page.titlePadY && page.titlePadY === 'normal',
            ['py-12']: page.titlePadY && page.titlePadY === 'large',
            ['py-24']: page.titlePadY && page.titlePadY === 'extra',
          })}
        >
          {page.title}
        </div>
      )}

      {(!page.sideColumn || page.sideColumn === PageSideColumn.N) && (
        <>
          <HandleContent page={page} />
          <HandleBlocks page={page} menu={menu} user={user} />
        </>
      )}

      {page.sideColumn === PageSideColumn.L && (
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {!isSm && !isMd && (
            <div className="col-span-1">
              <HandleSideColumn page={page} menu={menu} />
            </div>
          )}
          <div className="col-span-3">
            <HandleContent page={page} />
            <HandleBlocks page={page} menu={menu} user={user} />
          </div>
          {(isSm || isMd) && (
            <div className="col-span-1">
              <HandleSideColumn page={page} menu={menu} />
            </div>
          )}
        </div>
      )}

      {page.sideColumn === PageSideColumn.R && (
        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="col-span-3">
            <HandleContent page={page} />
            <HandleBlocks page={page} menu={menu} user={user} />
          </div>
          <div className="col-span-1">
            <HandleSideColumn page={page} menu={menu} />
          </div>
        </div>
      )}

      {process.env.SCROLL_TO_TOP_IN_BOTTOM && !isSm && !isMd && (
        <ScrollTopArrow />
      )}

      <Footer
        footerSm={page.footerSm}
        footerLg={page.footerLg}
        facebook={config?.facebook}
        twitter={config?.twitter}
        instagram={config?.instagram}
        youtube={config.youtube}
        linkedin={config.linkedin}
        info={config?.infoFooter ? config?.infoFooter : ''}
        content={config.footer}
      />

      <div className="h-24 lg:h-4" />

      {user && user.isAdmin && (
        <Modal
          hideHeader={true}
          open={displayEditPage}
          onClose={() => {
            hideEditPage()
          }}
          focusTrap={false}
          fullSize={true}
          title=""
        >
          <Edit
            onClose={() => {
              hideEditPage()
            }}
            userID={user.id}
            page={page}
            indexSel={undefined}
            handleUpdate={handleUpdate}
            handleUpdateBlocks={handleUpdateBlocks}
            menus={[]}
          />
        </Modal>
      )}
    </Container>
  )
}

PageComponent.Layout = Layout

/**
 * CONTENT
 * *************************************************
 */

export const HandleContent = (props: Props) => {
  const { page } = props
  return (
    <>
      {page.content && page.content.replace(/<[^>]*>?/gm, '') && (
        <div
          className={cn('w-full text-accent-8', {
            ['px-0']: page.contentPadX && page.contentPadX === 'none',
            ['px-4']: !page.contentPadX || page.contentPadX === 'small',
            ['px-8']: page.contentPadX && page.contentPadX === 'normal',
            ['px-12']: page.contentPadX && page.contentPadX === 'large',
            ['px-24']: page.contentPadX && page.contentPadX === 'extra',
            ['py-0']: page.contentPadY && page.contentPadY === 'none',
            ['py-4']: !page.contentPadY || page.contentPadY === 'small',
            ['py-8']: page.contentPadY && page.contentPadY === 'normal',
            ['py-12']: page.contentPadY && page.contentPadY === 'large',
            ['py-24']: page.contentPadY && page.contentPadY === 'extra',
          })}
        >
          {page.content && (
            <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
          )}
        </div>
      )}
    </>
  )
}

/**
 * BLOCKS
 * *************************************************
 */

export const HandleBlocks = (props: Props) => {
  const { page, menu, user } = props
  return (
    <>
      {page.blocks &&
        page.blocks.items &&
        page.blocks.items
          .sort((a: any, b: any) =>
            a.order > b.order ? 1 : b.order > a.order ? -1 : 0
          )
          .map((block: any, index: number) =>
            block && block.content && block.component === '1' ? (
              <Block1 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '2' ? (
              <Block2 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '3' ? (
              <Block3 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '4' ? (
              <Block4
                key={index}
                block={block}
                user={user}
                hasLateral={
                  page.sideColumn && page.sideColumn !== PageSideColumn.N
                    ? true
                    : false
                }
              />
            ) : block && block.content && block.component === '5' ? (
              <Block5 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '6' ? (
              <Block6 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '7' ? (
              <Block7 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '8' ? (
              <Block8 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '9' ? (
              <Block9 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '10' ? (
              <Block10 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '11' ? (
              <Block11 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '12' ? (
              <Block12
                key={index}
                block={block}
                user={user}
                hasLateral={
                  page.sideColumn && page.sideColumn !== PageSideColumn.N
                    ? true
                    : false
                }
              />
            ) : block && block.content && block.component === '13' ? (
              <Block13 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '14' ? (
              <Block14 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '15' ? (
              <Block15 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '16' ? (
              <Block16 key={index} block={block} menu={menu} user={user} />
            ) : block && block.content && block.component === '17' ? (
              <Block17
                key={index}
                block={block}
                menu={menu}
                user={user}
                hasLateral={
                  page.sideColumn && page.sideColumn !== PageSideColumn.N
                    ? true
                    : false
                }
              />
            ) : block && block.content && block.component === '18' ? (
              <Block18 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '19' ? (
              <Block19 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '20' ? (
              <Block20 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '21' ? (
              <Block21 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '22' ? (
              <Block22 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '23' ? (
              <Block23 key={index} block={block} user={user} />
            ) : block && block.content && block.component === '24' ? (
              <Block24
                key={index}
                block={block}
                user={user}
                hasLateral={
                  page.sideColumn && page.sideColumn !== PageSideColumn.N
                    ? true
                    : false
                }
              />
            ) : block && block.content && block.component === '25' ? (
              <Block25
                key={index}
                block={block}
                user={user}
              />
            ) : (
              <div key={index}></div>
            )
          )}
    </>
  )
}

/**
 * SIDE COLUMN
 * *************************************************
 */

export const HandleSideColumn = (props: Props) => {
  const { page, menu } = props
  return (
    <div>
      {page.optionSideColumn === PageOptionSideColumn.CONTENT_TAGS ? (
        <>
          <HandleSideColumnContent page={page} />
          <HandleTags page={page} />
        </>
      ) : page.optionSideColumn === PageOptionSideColumn.CONTENT_MENU ? (
        <>
          <HandleSideColumnContent page={page} />
          <HandleMenu page={page} menu={menu} />
        </>
      ) : page.optionSideColumn === PageOptionSideColumn.CONTENT_MENU_TAGS ? (
        <>
          <HandleSideColumnContent page={page} />
          <HandleMenu page={page} menu={menu} />
          <HandleTags page={page} />
        </>
      ) : page.optionSideColumn === PageOptionSideColumn.TAGS_CONTENT ? (
        <>
          <HandleTags page={page} />
          <HandleSideColumnContent page={page} />
        </>
      ) : page.optionSideColumn === PageOptionSideColumn.MENU_CONTENT ? (
        <>
          <HandleMenu page={page} menu={menu} />
          <HandleSideColumnContent page={page} />
        </>
      ) : (
        <>
          <HandleMenu page={page} menu={menu} />
          <HandleSideColumnContent page={page} />
          <HandleTags page={page} />
        </>
      )}
    </div>
  )
}

/**
 * SIDE COLUMN CONTENT
 * *************************************************
 */
export const HandleSideColumnContent = (props: Props) => {
  const { page } = props
  return (
    <>
      {page.sideColumnContent &&
        page.sideColumnContent.replace(/<[^>]*>?/gm, '') && (
          <div
            className={cn('w-full text-accent-8', {
              ['px-0']: page.sideColumnPadX && page.sideColumnPadX === 'none',
              ['px-4']: !page.sideColumnPadX || page.sideColumnPadX === 'small',
              ['px-8']: page.sideColumnPadX && page.sideColumnPadX === 'normal',
              ['px-12']: page.sideColumnPadX && page.sideColumnPadX === 'large',
              ['px-24']: page.sideColumnPadX && page.sideColumnPadX === 'extra',
              ['py-0']: page.sideColumnPadY && page.sideColumnPadY === 'none',
              ['py-4']: !page.sideColumnPadY || page.sideColumnPadY === 'small',
              ['py-8']: page.sideColumnPadY && page.sideColumnPadY === 'normal',
              ['py-12']: page.sideColumnPadY && page.sideColumnPadY === 'large',
              ['py-24']: page.sideColumnPadY && page.sideColumnPadY === 'extra',
            })}
          >
            {page.sideColumnContent && (
              <div
                dangerouslySetInnerHTML={{ __html: page.sideColumnContent }}
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

export const HandleTags = (props: Props) => {
  const { page } = props
  return (
    <ul
      className={cn('text-accent-8', {
        ['px-0']: page.sideColumnPadX && page.sideColumnPadX === 'none',
        ['px-4']: !page.sideColumnPadX || page.sideColumnPadX === 'small',
        ['px-8']: page.sideColumnPadX && page.sideColumnPadX === 'normal',
        ['px-12']: page.sideColumnPadX && page.sideColumnPadX === 'large',
        ['px-24']: page.sideColumnPadX && page.sideColumnPadX === 'extra',
        ['py-0']: page.sideColumnPadY && page.sideColumnPadY === 'none',
        ['py-4']: !page.sideColumnPadY || page.sideColumnPadY === 'small',
        ['py-8']: page.sideColumnPadY && page.sideColumnPadY === 'normal',
        ['py-12']: page.sideColumnPadY && page.sideColumnPadY === 'large',
        ['py-24']: page.sideColumnPadY && page.sideColumnPadY === 'extra',
      })}
    >
      {page.tags.map((tag: string, index: number) => (
        <li className="text-tertiary-2 my-1 underline" key={`tag${index}`}>
          <Link href={`/search/${tag.toLowerCase()}`}>
            <a>{tag}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

/**
 * MENU
 * *************************************************
 */

export const HandleMenu = (props: Props) => {
  const { page, menu } = props
  const router = useRouter()
  const { isSm } = useBreakPoints()

  const showThumbnailPage =
    page.menuProps &&
    page.menuProps.showThumbnailPage &&
    (page.menuProps.showThumbnailPage === 'ALL' ||
      (page.menuProps.showThumbnailPage === 'SM' && isSm) ||
      (page.menuProps.showThumbnailPage === 'LG' && !isSm))
      ? true
      : false

  const showDescriptionPage =
    page.menuProps &&
    page.menuProps.showDescriptionPage &&
    (page.menuProps.showDescriptionPage === 'ALL' ||
      (page.menuProps.showDescriptionPage === 'SM' && isSm) ||
      (page.menuProps.showDescriptionPage === 'LG' && !isSm))
      ? true
      : false

  const menuSorted = !menu
    ? []
    : page.menuProps && page.menuProps.orderDesc
    ? (menu as any).sort((a: any, b: any) =>
        a.order < b.order ? 1 : b.order < a.order ? -1 : 0
      )
    : (menu as any).sort((a: any, b: any) =>
        a.order > b.order ? 1 : b.order > a.order ? -1 : 0
      )

  return (
    <div
      className={cn({
        ['px-0']: page.sideColumnPadX && page.sideColumnPadX === 'none',
        ['px-4']: !page.sideColumnPadX || page.sideColumnPadX === 'small',
        ['px-8']: page.sideColumnPadX && page.sideColumnPadX === 'normal',
        ['px-12']: page.sideColumnPadX && page.sideColumnPadX === 'large',
        ['px-24']: page.sideColumnPadX && page.sideColumnPadX === 'extra',
        ['py-0']: page.sideColumnPadY && page.sideColumnPadY === 'none',
        ['py-4']: !page.sideColumnPadY || page.sideColumnPadY === 'small',
        ['py-8']: page.sideColumnPadY && page.sideColumnPadY === 'normal',
        ['py-12']: page.sideColumnPadY && page.sideColumnPadY === 'large',
        ['py-24']: page.sideColumnPadY && page.sideColumnPadY === 'extra',
      })}
    >
      {menuSorted.map(
        (item: any, index: number) =>
          (!item.hideInMenu ||
            (item.hideInMenu && item.hideInMenu === false)) && (
            <div
              key={`item${index}`}
              className={cn(
                'mb-2 my-2 shadow bg-accent-0 text-accent-6 lg:w-full cursor-pointer flex items-center py-2 px-2 rounded-lg',
                {
                  ['border-l-2 border-tertiary']:
                    router.asPath === `/page/${item.alias}/`,
                }
              )}
              onClick={() => {
                router.push(`/page/${item.alias ? item.alias : item.id}`)
              }}
            >
              {showThumbnailPage && item.thumbnail && (
                <div
                  className="flex flex-wrap content-center"
                  style={{ minWidth: 64 }}
                >
                  <Image
                    alt={item.title}
                    className="bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle"
                    src={`${process.env.MIDIA_CLOUDFRONT}${item.thumbnail}`}
                    width={64}
                    height={64}
                  />
                </div>
              )}
              <div
                className={cn('flex-grow', {
                  'ml-3': item.thumbnail,
                })}
              >
                <h2 className="title-font font-semibold text-lg hover:text-tertiary-2">
                  {item.title}
                </h2>
                {showDescriptionPage && item.description && (
                  <p className="text-accent-5 line-clamp-2 text-xs">
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
          )
      )}
    </div>
  )
}

/**
 * GET SERVER SIDE PROPS
 * *************************************************
 */
/*
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const SSR = withSSRContext(context)
  const { alias } = context.query

  let page = {} as any
  let menu = [] as any

  if (alias) {
    if (uuidValidate(alias.toString())) {
      const {
        data: { getPage },
      } = await SSR.API.graphql({
        query: getPageCustom,
        variables: { id: alias?.toString() },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
      page = getPage ? getPage : {}
    } else {
      const {
        data: {
          listPagesByAliasCreatedAt: { items },
        },
      } = await SSR.API.graphql({
        query: listPagesByAliasCreatedAtCustom,
        variables: {
          alias: alias?.toString(),
          createdAt: { gt: '0' },
          sortDirection: ModelSortDirection.DESC,
          limit: 1,
        },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
      page = items && items[0] ? items[0] : {}
    }

    if (page && page.id) {
      const resultMenu = (await SSR.API.graphql({
        query: listPagesByStatusMenuOrderCustom,
        variables: {
          status: PageStatus.ON,
          menuOrder: {
            between: [
              { menu: page.menu, order: 0 },
              { menu: page.menu, order: 999999 },
            ],
          },
          sortDirection: ModelSortDirection.ASC,
          limit: 1000,
          nextToken: null,
        },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<any>

      menu =
        resultMenu.data &&
        resultMenu.data.listPagesByStatusMenuOrder &&
        resultMenu.data.listPagesByStatusMenuOrder.items
          ? resultMenu.data.listPagesByStatusMenuOrder.items
          : []
    }
  }

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      menu: JSON.parse(JSON.stringify(menu)),
    },
  }
}
*/

/**
 * GET STATIC PATHS
 * GET STATIC PROPS
 * *************************************************
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const SSR = withSSRContext()

  const {
    data: {
      listPages: { items },
    },
  } = (await SSR.API.graphql({
    query: listPages,
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

  let page = {} as any
  let menu = [] as any

  if (alias) {
    if (uuidValidate(alias.toString())) {
      const {
        data: { getPage },
      } = await SSR.API.graphql({
        query: getPageCustom,
        variables: { id: alias?.toString() },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
      page = getPage ? getPage : {}
    } else {
      const {
        data: {
          listPagesByAliasCreatedAt: { items },
        },
      } = await SSR.API.graphql({
        query: listPagesByAliasCreatedAtCustom,
        variables: {
          alias: alias?.toString(),
          createdAt: { gt: '0' },
          sortDirection: ModelSortDirection.DESC,
          limit: 1,
        },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
      page = items && items[0] ? items[0] : {}
    }

    if (page && page.id) {
      const resultMenu = (await SSR.API.graphql({
        query: listPagesByStatusMenuOrderCustom,
        variables: {
          status: PageStatus.ON,
          menuOrder: {
            between: [
              { menu: page.menu, order: 0 },
              { menu: page.menu, order: 999999999 },
            ],
          },
          sortDirection: ModelSortDirection.ASC,
          limit: 1000,
          nextToken: null,
        },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })) as GraphQLResult<any>

      menu =
        resultMenu.data &&
        resultMenu.data.listPagesByStatusMenuOrder &&
        resultMenu.data.listPagesByStatusMenuOrder.items
          ? resultMenu.data.listPagesByStatusMenuOrder.items
          : []

      const nextToken =
        resultMenu.data &&
        resultMenu.data.listPagesByStatusMenuOrder &&
        resultMenu.data.listPagesByStatusMenuOrder.nextToken
          ? resultMenu.data.listPagesByStatusMenuOrder.nextToken
          : ''

      if (nextToken) {
        const resultMenu2 = (await SSR.API.graphql({
          query: listPagesByStatusMenuOrderCustom,
          variables: {
            status: PageStatus.ON,
            menuOrder: {
              between: [
                { menu: page.menu, order: 0 },
                { menu: page.menu, order: 999999999 },
              ],
            },
            sortDirection: ModelSortDirection.ASC,
            limit: 1000,
            nextToken: nextToken,
          },
          authMode: GRAPHQL_AUTH_MODE.API_KEY,
        })) as GraphQLResult<any>

        const menu2 =
          resultMenu2.data &&
          resultMenu2.data.listPagesByStatusMenuOrder &&
          resultMenu2.data.listPagesByStatusMenuOrder.items
            ? resultMenu2.data.listPagesByStatusMenuOrder.items
            : []

        menu = menu.concat(menu2)
      }
    }
  }

  return {
    revalidate: 15,
    props: {
      pageSSR: JSON.parse(JSON.stringify(page)),
      menu: JSON.parse(JSON.stringify(menu)),
    },
  }
}
