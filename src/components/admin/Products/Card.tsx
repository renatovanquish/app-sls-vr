import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames'
import { FormProduct } from 'components/admin'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { RightArrow, Trash, Edit as IconEdit } from 'components/icons'

import { PageSideColumn } from 'models'

import Moment from 'moment'

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

export default function CardProduct(props: PropsCard) {
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
    paramsItems,
  } = props

  const [currentItem, setCurrentItem] = useState(item ? item : ({} as any))

  const { theme } = useTheme()
  const router = useRouter()
  const { target } = router.query

  const getPhoto = (photo: string) => {
    return photo && photo.substr(0, 4) === 'http'
      ? photo
      : photo
      ? `${process.env.MIDIA_CLOUDFRONT}${photo}`
      : '/images/no_photo.png'
  }

  return !item ? null : (
    <div key={index}>
      {!index && <Header />}
      {currentItem.break && (
        <div
          className={`flex justify-between px-4 mb-4 ${
            index !== 0 ? 'mt-8' : 'mt-4'
          }`}
        >
          <div>
            <h2 className="tracking-widest text-xs title-font font-medium text-tertiary-2 mb-1">
              CATEGORIA
            </h2>
            <h1 className="title-font text-xl font-medium text-accent-9">
              {paramsItems.categories.map(
                (i: any, k: number) =>
                  currentItem.category === i.id && (
                    <span key={k}>{i.title}</span>
                  )
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
        {' '}
        <div
          style={{
            backgroundColor: theme == 'light' ? '#fff' : '#1F2029',
          }}
          className={[
            'p-4 w-full rounded hover:shadow-lg',
            itemSelected === index ? 'shadow-lg' : 'shadow',
          ].join(' ')}
        >
          <div className="cursor-pointer">
            <div className="grid grid-cols-3">
              <div
                className="cursor-pointer col-span-2"
                onClick={() => handleSelect(index)}
              >
                <div className="w-full h-full flex items-center">
                  {(currentItem.thumbnail || currentItem.photo1) && (
                    <Image
                      alt={currentItem.name}
                      className="bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle"
                      src={
                        item.thumbnail
                          ? `${process.env.MIDIA_CLOUDFRONT}${currentItem.thumbnail}`
                          : getPhoto(currentItem.photo1)
                      }
                      width={56}
                      height={56}
                    />
                  )}
                  <div
                    style={{ minWidth: 56, minHeight: 56 }}
                    className={cn('flex flex-col content-center', {
                      'ml-3': currentItem.thumbnail || currentItem.photo1,
                    })}
                  >
                    <h2
                      className={cn(
                        'text-accent-9 font-semibold text-lg hover:text-tertiary-2',
                        {
                          'text-xl': itemSelected === index,
                        }
                      )}
                    >
                      {currentItem.name}
                    </h2>
                    <div className="flex mt-1 gap-2 text-sm">
                      {!currentItem.hideInMenu && (
                        <div
                          className="bg-green-500 text-white px-1 rounded tooltip"
                          data-tip="Visivel no Menu"
                        >
                          VISÍVEL
                        </div>
                      )}
                      {currentItem.hideInMenu && (
                        <div
                          className="bg-orange-500 text-white px-1 rounded tooltip"
                          data-tip="Oculto no Menu"
                        >
                          OCULTO
                        </div>
                      )}
                      <div
                        className={cn('text-white px-1 rounded tooltip', {
                          'bg-violet-500':
                            currentItem.type === 'DIGITAL' ||
                            (!currentItem.type &&
                              process.env.PRODUCT_TYPE_DEFAULT === 'DIGITAL'),
                          'bg-rose-500':
                            currentItem.type === 'DELIVERY' ||
                            (!currentItem.type &&
                              process.env.PRODUCT_TYPE_DEFAULT === 'DELIVERY'),
                        })}
                      >
                        {currentItem.type
                          ? currentItem.type
                          : process.env.PRODUCT_TYPE_DEFAULT
                          ? process.env.PRODUCT_TYPE_DEFAULT
                          : 'DELIVERY'}
                      </div>
                      {currentItem.sideColumn !== PageSideColumn.N && (
                        <div className="bg-purple-700 text-white px-1 rounded">
                          {currentItem.sideColumn === PageSideColumn.R && (
                            <span
                              data-tip="Lateral a Direita"
                              className="tooltip"
                            >
                              D
                            </span>
                          )}
                          {currentItem.sideColumn === PageSideColumn.L && (
                            <span
                              data-tip="Lateral a Esquerda"
                              className="tooltip"
                            >
                              E
                            </span>
                          )}
                        </div>
                      )}
                      {currentItem.subCategoryProps &&
                        currentItem.subCategoryProps.title && (
                          <div className="max-w-[50%] line-clamp-1 bg-accent-6 text-accent-0 px-1 rounded ">
                            {currentItem.subCategoryProps.title}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end flex-wrap content-center">
                <a
                  data-tip="Editar"
                  title="Editar"
                  className="text-blue-500 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                  onClick={() => handleSelect(index)}
                >
                  <IconEdit />
                </a>

                <a
                  data-tip="Excluir Produto"
                  title="Excluir Produto"
                  onClick={() =>
                    onClickItem({
                      action: 'DELETE_PRODUCT',
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
                  href={`/product/${
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
            <FormProduct
              setCurrentItem={setCurrentItem}
              product={currentItem}
              handleUpdate={handleUpdate}
              index={index}
              userID={userID}
            />
          )}
        </div>
      </div>
    </div>
  )
}
