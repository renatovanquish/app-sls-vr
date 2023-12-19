import { Avatar } from 'components/common'
import { useTheme } from 'next-themes'
import { useLog } from 'hooks/useLog'
import { List } from 'components/ui'
import { Mail, Mobile } from 'components/icons'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { ModelSortDirection } from 'API'
import cn from 'classnames'
import { useScreen } from 'hooks/useScreen'

import Moment from 'moment'

export default function Logs(props: any): JSX.Element {
  const { user } = props
  const { listLogByUser } = useLog()
  const { screenHeight } = useScreen()
  
  return !user ? (
    <></>
  ) : (
    <List
      keys=""
      userID={user.id}
      emptyMessage="Nenhum log por aqui."
      endMessage="Estes são todos os logs."
      listItems={listLogByUser}
      variables={{
        userID: user.id,
        limit: 50,
        sortDirection: ModelSortDirection.DESC,
        nextToken: null,
      }}
      layout="flexCol"
      Card={Card}
      breakItems="CREATEDAT"
      height={screenHeight}
    />
  )
}

interface PropsCard {
  index: number
  userID: string
  item: any
  handleSelect: any
  itemSelected: number
  isLast: boolean
}

function Card(props: PropsCard) {
  const { item, index, handleSelect, itemSelected, isLast } = props
  const { theme } = useTheme()
  const { isSm, isMd } = useBreakPoints()
  return !item ? null : (
    <div>
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
            'w-full p-2 border-l-4 bg-accent-0 rounded cursor-pointer',
            itemSelected === index ? 'rounded-b-none' : 'shadow',
            item.page === 'ACCESSED_ADM' ||
            (item.notes &&
              (item.notes.indexOf('Erro') !== -1 ||
                item.notes.indexOf('erro') !== -1))
              ? 'border-red'
              : 'border-blue',
          ].join(' ')}
        >
          <div
            className=" w-full grid grid-cols-1 md:grid-cols-2 gap-6"
            onClick={() => handleSelect(index)}
          >
            <div
              className="flex items-center"
              onClick={() => handleSelect(index)}
            >
              <Avatar
                avatarKey={item.user.avatar}
                size={itemSelected === index ? (isSm ? 84 : 128) : 42}
              />
              <div className="w-full flex-grow ml-3">
                <h2
                  className={cn(
                    'capitalize font-semibold text-lg hover:text-tertiary-2',
                    {
                      'text-xl text-accent-7': itemSelected !== index,
                      'text-xl text-tertiary-2': itemSelected === index,
                    }
                  )}
                >
                  {item.user.name}
                </h2>
                <div className="inline text-xs bg-accent-1 rounded px-1 mr-2 text-accent-7">
                  Você
                </div>
              </div>
            </div>

            <div className="w-full">
              <div
                className={cn('flex flex-col flex-wrap', {
                  'pt-7': !isSm && !isMd && itemSelected === index,
                  'pt-1': !isSm && !isMd && itemSelected !== index,
                })}
              >
                <div className="break-all">{item.notes}</div>
                <div className="text-sm">
                  <div className="inline text-accent-7 mr-2 text-xs">
                    {Moment(item.createdAt).format('DD/MM/YYYY')} às{' '}
                    {Moment(item.createdAt).format('HH:mm:ss')}
                  </div>
                </div>
              </div>
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
                item.notes.indexOf('erro') !== -1)
                ? 'border-red'
                : 'border-blue',
            ].join(' ')}
          >
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
          </div>
        )}
      </div>
    </div>
  )
}
