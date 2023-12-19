import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames'
import { FormPage } from 'components/admin'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { Modal } from 'components/ui'
import { RightArrow, Trash, Edit as IconEdit } from 'components/icons'

import { PageSideColumn } from 'models'

import Moment from 'moment'

import Edit from './Edit'
import Header from './Header'

interface PropsCard {
  userID: string
  index: number
  item: any
  onClickItem: any
  handleUpdate: any
  handleDelete: any
  handleSelect: any
  itemSelected: number
  isLast: boolean
  paramsItems: any
}

export default function CardPage(props: PropsCard) {
  const {
    userID,
    item,
    index,
    onClickItem,
    handleUpdate,
    handleSelect,
    itemSelected,
    handleDelete,
    isLast,
    paramsItems
  } = props

  const [pageSel, setPageSel] = useState({} as any)

  const [currentItem, setCurrentItem] = useState(item ? item : ({} as any))
  const { theme } = useTheme()

  const router = useRouter()
  const { target } = router.query

  return !item ? null : (
    <div key={index}>
      {!index && <Header />}
      {currentItem.break && (
        <div
          className={`px-4 mb-4 ${
            index !== 0 ? 'mt-8' : 'mt-4'
          }`}
        >
          <div>
            <h2 className="tracking-widest text-xs title-font font-medium text-tertiary-2 mb-1">
              MENU
            </h2>
            <h1 className="title-font text-xl font-medium text-accent-5">
              {paramsItems.menus.map(
                (i: any, k: number) =>
                  currentItem.menu === i.id && <span key={k}>{i.title}</span>
              )}
            </h1>
          </div>
        </div>
      )}
      <div
        className={`px-4 lg:pl-8 w-full ${
          itemSelected === index ? 'py-3 scale-100' : 'py-1 scale-95'
        } ${
          isLast && 'pb-5'
        } transform transition duration-500 hover:scale-100`}
      >
        <div
          className={[
            'bg-accent-1 p-4 w-full rounded hover:shadow-lg',
            itemSelected === index ? 'shadow-lg' : 'shadow',
          ].join(' ')}
        >
          <div className="w-full" onClick={() => handleSelect(index)}>
            <div className="grid grid-cols-3">
              <div className="cursor-pointer col-span-2">
                <div className="w-full h-full flex items-center">
                  {currentItem.thumbnail && (
                    <Image
                      alt={currentItem.title}
                      className="bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle"
                      src={`${process.env.MIDIA_CLOUDFRONT}${currentItem.thumbnail}`}
                      width={56}
                      height={56}
                    />
                  )}
                  <div
                    style={{ minWidth: 56, minHeight: 56 }}
                    className={cn('flex flex-col content-center', {
                      'ml-3': currentItem.thumbnail,
                    })}
                  >
                    <h2
                      className={cn(
                        'text-accent-7 font-semibold text-lg hover:text-tertiary-2',
                        {
                          'text-xl': itemSelected === index,
                        }
                      )}
                    >
                      {currentItem.title}
                    </h2>
                    <div className="flex mt-1 gap-2 text-xs">
                      <div className="bg-accent-0 text-accent-5 px-1 rounded tooltip" data-tip="Ordem de exibição">
                        {currentItem.order}
                      </div>
                      {!currentItem.hideInMenu && (
                        <div className="bg-green-500 text-white px-1 rounded tooltip" data-tip="Visivel no Menu">
                          VISÍVEL
                        </div>
                      )}
                      {currentItem.hideInMenu && (
                        <div className="bg-orange-500 text-white px-1 rounded tooltip" data-tip="Oculto no Menu">
                          OCULTO
                        </div>
                      )}
                      {currentItem.sideColumn !== PageSideColumn.N && (
                        <div className="bg-purple-700 text-white px-1 rounded">
                          {currentItem.sideColumn === PageSideColumn.R && <span data-tip="Lateral a Direita" className='tooltip'>D</span>}
                          {currentItem.sideColumn === PageSideColumn.L && <span data-tip="Lateral a Esquerda" className='tooltip'>E</span>}
                        </div>
                      )}
                      <div className="hidden lg:block bg-accent-1 rounded px-1 mr-2 text-accent-5 tooltip" data-tip="Última atualização">
                        <span>
                          {Moment(currentItem.updatedAt).format('DD-MM-YYYY')}
                        </span>
                        &nbsp;
                        <span>
                          {Moment(currentItem.updatedAt).format('HH:mm')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end flex-wrap content-center">
                <a
                  data-tip="Editar"
                  title="Editar"
                  className="text-blue-500 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                  onClick={() => {
                    // handleSelect(index)
                    setPageSel(item)
                  }}
                >
                  <IconEdit />
                </a>

                <a
                  data-tip="Excluir Página"
                  title="Excluir Página"
                  onClick={() =>
                    onClickItem({
                      action: 'DELETE_PAGE',
                      item,
                      index,
                      handleDelete,
                      handleSelect,
                    })
                  }
                  className="mx-2 text-red-500 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                >
                  <Trash />
                </a>

                <Link
                  href={`/page/${
                    currentItem.alias ? currentItem.alias : currentItem.id
                  }`}
                >
                  <a
                    data-tip="Visualizar"
                    title="visualizar"
                    target="_blank"
                    className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                  >
                    <RightArrow />
                  </a>
                </Link>
              </div>
            </div>
          </div>

          {itemSelected === index && (
            <FormPage
              setCurrentItem={setCurrentItem}
              page={currentItem}
              handleUpdate={handleUpdate}
              index={index}
              userID={userID}
            />
          )}

          {currentItem.id === pageSel.id && (
            <Modal
              hideHeader={true}
              open={pageSel.id ? true : false}
              onClose={() => setPageSel({} as any)}
              focusTrap={false}
              fullSize={true}
              title=""
            >
              <Edit
                onClose={() => setPageSel({} as any)}
                userID={userID}
                page={pageSel}
                indexSel={index}
                handleUpdate={handleUpdate}
                menus={paramsItems.menus}
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  )
}
