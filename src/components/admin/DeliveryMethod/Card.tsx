import { useState } from 'react'
import cn from 'classnames'
import { useTheme } from 'next-themes'
import { Trash, Edit as IconEdit } from 'components/icons'
import FormDeliveryMethod from './Form'
import NumberFormat from 'react-number-format'

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
      {index === 0 && (
        <div className="mt-4 px-4 mb-4">
          <h2 className="tracking-widest text-xs title-font font-medium text-tertiary-2 mb-1">
            METODOS DE ENTREGA
          </h2>
          <h1 className="title-font text-xl font-medium text-accent-9 capitalize">
            Ativos
          </h1>
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
                <h2
                  className={cn(
                    'capitalize text-accent-9 font-semibold text-lg hover:text-tertiary-2',
                    {
                      'text-xl': itemSelected === index,
                    }
                  )}
                >
                  {currentItem.name}
                </h2>
                <div className="flex mt-1 gap-2 text-xs">
                  {currentItem.price > 0 && <div className="bg-orange-500 text-white px-1 rounded">
                    <NumberFormat
                      value={currentItem.price}
                      thousandsGroupStyle="thousand"
                      prefix="R$ "
                      thousandSeparator={'.'}
                      decimalSeparator={','}
                      displayType="text"
                      allowNegative={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />
                  </div>}
                  {currentItem.price === 0 && <div className="bg-green-500 text-white px-1 rounded">Gratis</div>}
                </div>
              </div>
              <div className="flex justify-end flex-wrap content-center space-x-3">
                <a
                  data-tip="Editar"
                  title="Editar"
                  className="text-blue-500 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                  onClick={() => {
                    handleSelect(index)
                  }}
                >
                  <IconEdit />
                </a>

                <a
                  data-tip="Excluir metodo de entrega"
                  title="Excluir metodo de entega"
                  onClick={() =>
                    onClickItem({
                      action: 'DELETE',
                      item,
                      index,
                      handleDelete,
                      handleSelect,
                    })
                  }
                  className="text-red-500 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                >
                  <Trash />
                </a>
              </div>
            </div>
          </div>
          {itemSelected === index && (
            <FormDeliveryMethod
              deliveryMethod={currentItem}
              userID={userID}
              setCurrentItem={setCurrentItem}
            />
          )}
        </div>
      </div>
    </div>
  )
}
