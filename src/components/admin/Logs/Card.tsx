import { Avatar } from 'components/common'
import { useTheme } from 'next-themes'
import { useBreakPoints } from 'hooks/useBreakPoints'
import cn from 'classnames'
import { Search, Cart, Person } from 'components/icons'
import { formatPhoneNumber } from 'react-phone-number-input'
import { useRouter } from 'next/router'
import Header from './Header'
import Link from 'next/link'

import Moment from 'moment'

interface PropsCard {
  index: number
  userID: string
  item: any
  handleSelect: any
  itemSelected: number
  isLast: boolean
}

export default function Card(props: PropsCard) {
  const { item, index, handleSelect, itemSelected, isLast } = props
  const router = useRouter()
  const { target } = router.query
  const { theme } = useTheme()
  const { isSm, isMd } = useBreakPoints()

  const getParse = (value: string) => {
    // check is value is json
    if (value.includes('{') && value.includes('}')) {
      return JSON.parse(value)
    } else {
      return value
    }
  }

  return !item ? null : (
    <div>
      {!index && <Header />}
      {item.break && (
        <div className={`px-4 mb-4 ${index !== 0 ? 'mt-8' : 'mt-4'}`}>
          <h2 className="tracking-widest text-xs title-font font-medium text-tertiary-2 mb-1">
            DATA
          </h2>
          <h1 className="title-font text-xl font-medium text-accent-9 capitalize">
            {Moment(item.createdAt).format('dddd, DD MMMM YYYY')}
          </h1>
        </div>
      )}
      <div
        key={index}
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
            'w-full p-2 border-l-4 rounded cursor-pointer hover:shadow-lg',
            itemSelected === index ? 'rounded-b-none' : 'shadow',
            item.notes &&
            (item.notes.indexOf('CEP') !== -1 ||
              item.notes.indexOf('Erro') !== -1 ||
              item.notes.indexOf('Indisponibilidade') !== -1 ||
              item.notes.indexOf('erro') !== -1)
              ? 'border-red'
              : item.notes && item.notes.indexOf('Novo pedido') !== -1
              ? 'border-emerald-500'
              : 'border-accent-4',
          ].join(' ')}
        >
          <div
            className={cn('w-full', {
              'grid grid-cols-1 lg:grid-cols-2 gap-': itemSelected !== index,
              'flex justify-between': itemSelected === index,
            })}
            onClick={() => handleSelect(index)}
          >
            <div
              className="flex items-center"
              onClick={() => handleSelect(index)}
            >
              <Avatar
                avatarKey={
                  item.user && item.user.avatar ? item.user.avatar : ''
                }
                size={itemSelected === index ? (isSm ? 84 : 128) : 42}
              />
              <div className="w-full flex-grow ml-3">
                <h2
                  className={cn('capitalize font-semibold line-clamp-1', {
                    'text-xl': itemSelected === index,
                  })}
                >
                  {item.user?.name}
                </h2>
                {itemSelected !== index && (
                  <div className="flex">
                    <div
                      className={cn('text-xs font-semibold px-1 rounded', {
                        'bg-accent-4 text-accent-0':
                          item.notes.indexOf('Novo pedido') === -1 &&
                          item.notes.indexOf('CEP') === -1 &&
                          item.notes.indexOf('Erro') === -1 &&
                          item.notes.indexOf('Indisponibilidade') === -1 &&
                          item.notes.indexOf('erro') === -1,
                        'bg-emerald-500 text-white':
                          item.notes.indexOf('Novo pedido') !== -1,
                        'bg-red text-white':
                          item.notes.indexOf('CEP') !== -1 ||
                          item.notes.indexOf('Erro') !== -1 ||
                          item.notes.indexOf('Indisponibilidade') !== -1 ||
                          item.notes.indexOf('erro') !== -1,
                      })}
                    >
                      {item.tag}
                    </div>
                  </div>
                )}
                <div
                  className={cn('flex text-sm', {
                    'flex-row gap-3': (isSm || isMd) && itemSelected !== index,
                    'flex-col gap-0':
                      (!isSm && !isMd && itemSelected === index) ||
                      itemSelected === index,
                  })}
                >
                  {item.user && item.user.email && itemSelected === index && (
                    <div>{item.user.email}</div>
                  )}
                  {item.user && item.user.phone && itemSelected === index && (
                    <div>{formatPhoneNumber(item.user.phone as any)}</div>
                  )}
                </div>
              </div>
            </div>

            <div>
              {itemSelected !== index && (
                <div className="flex flex-col flex-wrap pt-1">
                  <div className="break-all font-semibold">{item.notes}</div>
                  <div className="inline text-accent-7 mr-2 text-xs">
                    {Moment(item.createdAt).format('DD/MM/YYYY')} às{' '}
                    {Moment(item.createdAt).format('HH:mm:ss')}
                  </div>
                </div>
              )}
              {itemSelected === index && (
                <div className="mt-6 mr-6 flex gap-2">
                  {item.notes.indexOf('Novo pedido') !== -1 && (
                    <a
                      onClick={() => {
                        router.push(
                          '/admin/orders/' + item.notes.replace(/\D/g, '')
                        )
                      }}
                      className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                    >
                      <Cart />
                    </a>
                  )}
                  {item.notes.indexOf('Novo pedido') !== -1 && (
                    <Link href={`/admin/users/${item.user.email}`}>
                      <a className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center">
                        <Person />
                      </a>
                    </Link>
                  )}
                  {target && !target[1] && (
                    <a
                      onClick={() => {
                        router.push('/admin/logs/' + item.userID)
                      }}
                      className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                    >
                      <Search />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {itemSelected === index && (
          <div
            style={{
              backgroundColor: theme == 'light' ? '#fff' : '#1F2029',
            }}
            className={[
              'border-l-4 p-2 text-accent-8 pb-4 rounded-md',
              itemSelected === index ? 'rounded-t-none shadow-lg' : 'shadow',
              item.notes &&
              (item.notes.indexOf('CEP') !== -1 ||
                item.notes.indexOf('Erro') !== -1 ||
                item.notes.indexOf('Indisponibilidade') !== -1 ||
                item.notes.indexOf('erro') !== -1)
                ? 'border-red'
                : item.notes && item.notes.indexOf('Novo pedido') !== -1
                ? 'border-emerald-500'
                : 'border-accent-4',
            ].join(' ')}
          >
            <div className="flex gap-2">
              <div
                className={cn('text-xs font-semibold px-1 rounded', {
                  'bg-accent-4 text-accent-0':
                    item.notes.indexOf('Novo pedido') === -1 &&
                    item.notes.indexOf('CEP') === -1 &&
                    item.notes.indexOf('Erro') === -1 &&
                    item.notes.indexOf('Indisponibilidade') === -1 &&
                    item.notes.indexOf('erro') === -1,
                  'bg-emerald-500 text-white':
                    item.notes.indexOf('Novo pedido') !== -1,
                  'bg-red text-white':
                    item.notes.indexOf('CEP') !== -1 ||
                    item.notes.indexOf('Erro') !== -1 ||
                    item.notes.indexOf('Indisponibilidade') !== -1 ||
                    item.notes.indexOf('erro') !== -1,
                })}
              >
                {item.tag}
              </div>
              <div className="inline text-accent-7 mr-2 text-xs">
                {Moment(item.createdAt).format('DD/MM/YYYY')} às{' '}
                {Moment(item.createdAt).format('HH:mm:ss')}
              </div>
            </div>
            <p className="break-all text-lg font-semibold">{item.notes}</p>
            <p className="mt-2 font-semibold text-accent-9">Origem do Acesso</p>
            <p className="break-all text-sm">
              {item.city} - {item.region} - {item.country} -{' '}
              <a
                className="text-blue"
                href={
                  'https://maps.google.com/?q=' +
                  item.lat +
                  ',' +
                  item.lng +
                  '&z=8'
                }
                target="_blank"
                rel="noreferrer"
              >
                Ver no Mapa
              </a>
            </p>
            <p className="mt-2 font-semibold text-accent-9">Dados da Conexão</p>
            <p className="break-all text-sm">
              {item.ip} - {item.provider}
            </p>
            <p className="mt-2 font-semibold text-accent-9">Dispositivo</p>
            <p className="break-all text-sm">
              <span className="uppercase">{item.platform}</span> -{' '}
              {item.manufacturer} - {item.model} - {item.osName} -{' '}
              {item.osVersion}
            </p>
            {item.message && (
              <div>
                <p className="mt-2 font-semibold text-accent-9">
                  Registro dos Dados
                </p>
                <pre className="text-sm">
                  {JSON.stringify(getParse(item.message), null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
