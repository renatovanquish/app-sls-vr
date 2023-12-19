import { useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'
import { useTheme } from 'next-themes'
import { Mail, Mobile, Plus, Minus } from 'components/icons'
import { formatPhoneNumber } from 'react-phone-number-input'
import Tabs from './Tabs'
import Header from './Header'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { RelationModes } from 'models'

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
  const { isSm } = useBreakPoints()

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
            <div className="grid grid-cols-5">
              <div className="cursor-pointer col-span-4">
                <div className="w-full flex items-center">
                  <Image
                    alt={
                      currentItem.user
                        ? currentItem.user.name
                        : currentItem.name
                    }
                    className="bg-accent-1 object-cover object-center flex-shrink-0 rounded-full"
                    src={
                      currentItem.user && currentItem.user.avatar
                        ? `${process.env.MIDIA_CLOUDFRONT}${currentItem.user.avatar}`
                        : currentItem.avatar
                        ? `${process.env.MIDIA_CLOUDFRONT}${currentItem.avatar}`
                        : '/user/user.png'
                    }
                    width={itemSelected !== index ? 64 : isSm ? 84 : 128}
                    height={itemSelected !== index ? 64 : isSm ? 84 : 128}
                    onError={(e: any) => {
                      e.target.onerror = null
                      e.target.src = '/user/user.png'
                    }}
                  />
                  <div
                    style={{
                      minWidth: itemSelected !== index ? 64 : isSm ? 84 : 128,
                    }}
                    className="flex-grow ml-3"
                  >
                    <h2
                      className={cn(
                        'capitalize text-accent-9 font-semibold text-lg hover:text-tertiary-2 line-clamp-1',
                        {
                          'text-xl': itemSelected === index,
                        }
                      )}
                    >
                      {currentItem.user
                        ? currentItem.user.name
                        : currentItem.name}
                    </h2>
                    <div className="flex flex-col gap-0 lg:flex-row lg:gap-3 text-sm">
                      {itemSelected === index && (
                        <div>
                          <Mail width={16} height={16} />
                          <span className="ml-1">
                            {currentItem.user
                              ? currentItem.user.email
                              : currentItem.email}
                          </span>
                        </div>
                      )}
                      {itemSelected === index && (
                        <div>
                          <Mobile width={16} height={16} />
                          <span className="ml-1">
                            {formatPhoneNumber(
                              currentItem.user
                                ? (currentItem.user.phone as any)
                                : (currentItem.phone as any)
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex mt-1 gap-2 text-xs">
                      {(currentItem.active ||
                        (currentItem.user && currentItem.user.active)) && (
                        <div className="bg-emerald-500 text-white px-1 rounded">
                          ATIVO
                        </div>
                      )}
                      {!(
                        currentItem.active ||
                        (currentItem.user && currentItem.user.active)
                      ) && (
                        <div className="bg-slate-500 text-white px-1 rounded">
                          INATIVO
                        </div>
                      )}
                      <div className="inline text-accent-7">
                        {Moment(
                          currentItem.user
                            ? currentItem.user.createdAt
                            : currentItem.createdAt
                        ).format('DD/MM/YYYY')}{' '}
                        às{' '}
                        {Moment(
                          currentItem.user
                            ? currentItem.user.createdAt
                            : currentItem.createdAt
                        ).format('HH:mm:ss')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end flex-wrap content-center space-x-3">

              </div>
            </div>
          </div>
          {itemSelected === index && (
            <Tabs
              user={currentItem.user ? currentItem.user : currentItem}
              handleDelete={handleDelete}
              index={index}
            />
          )}
        </div>
      </div>
    </div>
  )
}
