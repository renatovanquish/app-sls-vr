import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Trash, Edit as IconEdit } from 'components/icons'
import cn from 'classnames'
import Moment from 'moment'

import FormQuiz from './Form'
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
    index,
    item,
    onClickItem,
    handleUpdate,
    handleDelete,
    handleSelect,
    itemSelected,
    isLast,
  } = props

  const [currentItem, setCurrentItem] = useState(item ? item : ({} as any))
  const { theme } = useTheme()

  return !item ? null : (
    <div key={index}>
      {!index && <Header />}
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
            'p-4 w-full rounded hover:shadow-lg',
            itemSelected === index ? 'shadow-lg' : 'shadow',
          ].join(' ')}
        >
          <div className="w-full" onClick={() => handleSelect(index)}>
            <div className="grid grid-cols-3">
              <div className="cursor-pointer col-span-2">
                <div className="w-full h-full flex items-center">
            
                  <div
                    className="flex flex-col content-center"
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
                    <div className="flex mt-1 gap-2 text-xs">
                      <div
                        className="hidden lg:block bg-accent-1 rounded px-1 mr-2 text-accent-7 tooltip"
                        data-tip="Última atualização"
                      >
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

              <div className="flex justify-end flex-wrap gap-2 content-center">
                <a
                  data-tip="Editar"
                  title="Editar"
                  className="text-blue-500 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                  onClick={() => {
                    // handleSelect(index)
                  }}
                >
                  <IconEdit />
                </a>

                <a
                  data-tip="Excluir"
                  title="Excluir"
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
            <FormQuiz
              setCurrentItem={setCurrentItem}
              currentItem={currentItem}
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
