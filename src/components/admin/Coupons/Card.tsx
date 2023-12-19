import { useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'
import { useTheme } from 'next-themes'
import { Trash, Edit as IconEdit } from 'components/icons'
import FormCoupon from './Form'
import NumberFormat from 'react-number-format'
import Header from './Header'

import Moment from 'moment'

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
}

export default function Card(props: PropsCard) {
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
  } = props

  const [currentItem, setCurrentItem] = useState(item ? item : ({} as any))
  const { theme } = useTheme()

  return !item ? null : (
    <div key={index}>
      {index === 0 && <Header />}
      <div
        className={`px-4 lg:pl-8 w-full ${
          itemSelected === index ? 'py-3 scale-100' : 'py-1 scale-95'
        } ${
          isLast && 'pb-5'
        } transform transition duration-500 hover:scale-100`}
      >
        <div
          style={{
            backgroundColor: theme == 'light' ? '#fff' : '#1F2029',
          }}
          className={[
            'px-4 py-4 w-full rounded hover:shadow-lg',
            itemSelected === index ? 'shadow-lg' : 'shadow',
          ].join(' ')}
        >
          <div className="w-full" onClick={() => handleSelect(index)}>
            <div className="grid grid-cols-3">
              <div className="cursor-pointer col-span-2">
                <div className="w-full h-full flex items-center">
                  <div className="flex flex-col content-center">
                    <h2
                      className={cn(
                        'capitalize text-accent-9 font-semibold text-lg hover:text-tertiary-2',
                        {
                          'text-2xl': itemSelected === index,
                        }
                      )}
                    >
                      {currentItem.name}
                      {currentItem.discountPercentage > 0 && (
                        <span> - {currentItem.discountPercentage} %</span>
                      )}
                      {currentItem.discountValue > 0 && (
                        <span>
                          {' '}
                          -{' '}
                          <NumberFormat
                            value={currentItem.discountValue}
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
                      )}
                    </h2>
                    <div className="flex mt-1 gap-2 text-sm">
                      {Moment(currentItem.start) <= Moment() &&
                        Moment(currentItem.expiration) > Moment() && (
                          <div className="bg-green text-white px-1 rounded font-semibold">
                            Ativa
                          </div>
                        )}
                      {Moment(currentItem.start) > Moment() && (
                        <div className="bg-accent-2 text-accent-9 px-1 rounded font-semibold">
                          Aguardando
                        </div>
                      )}
                      {Moment(currentItem.expiration) < Moment() && (
                        <div className="bg-red text-white px-1 rounded font-semibold">
                          Expirada
                        </div>
                      )}
                      <div className="bg-orange-500 text-white px-1 rounded font-semibold">
                        {currentItem.qtyUsed ? currentItem.qtyUsed : 0}/
                        {currentItem.qtyLimit}
                      </div>
                      <div className="bg-accent-7 text-accent-0 px-1 rounded">
                        {currentItem.code}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end flex-wrap content-center space-x-3">
                <a
                  data-tip="Editar"
                  title="Editar"
                  className="text-blue z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                  onClick={() => {
                    handleSelect(index)
                  }}
                >
                  <IconEdit />
                </a>

                <a
                  data-tip="Excluir Cupom"
                  title="Excluir Cupom"
                  onClick={() =>
                    onClickItem({
                      action: 'DELETE',
                      item,
                      index,
                      handleDelete,
                      handleSelect,
                    })
                  }
                  className="text-red z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                >
                  <Trash />
                </a>
              </div>
            </div>
          </div>

          {itemSelected === index && (
            <FormCoupon
              coupon={currentItem}
              userID={userID}
              setCurrentItem={setCurrentItem}
            />
          )}
        </div>
      </div>
    </div>
  )
}
