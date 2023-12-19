import { useRouter } from 'next/router'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { formatPhoneNumber } from 'react-phone-number-input'
import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Trash, Print } from 'components/icons'
import { Loading } from 'components/ui'

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
    item,
    index,
    handleSelect,
    itemSelected,
    isLast,
    handleDelete,
    onClickItem,
  } = props
  const { theme } = useTheme()

  const router = useRouter()

  const componentRef = useRef(null)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current as any,
  })

  return !item ? null : (
    <div key={index}>
      {item.break && (
        <div
          className={`flex justify-between px-4 mb-4 ${
            index !== 0 ? 'mt-8' : 'mt-4'
          }`}
        >
          <div className={`px-4 mb-4 ${index !== 0 ? 'mt-8' : 'mt-4'}`}>
            <h2 className="tracking-widest text-xs title-font font-medium text-tertiary-2 mb-1">
              DATA
            </h2>
            <h1 className="title-font text-xl font-medium text-accent-9 capitalize">
              {Moment(item.updatedAt).format('dddd, DD MMMM YYYY')}
            </h1>
          </div>
          {index === 0 && (
            <div>
              <select
                className="text-accent-9 bg-accent-0 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                onChange={(e) => {
                  const param = e.target.value.toLowerCase()
                  router.push(`/admin/message/${param}/`)
                }}
              >
                <option value="AGUARDANDO">AGUARDANDO</option>
                <option value="FINALIZADO">FINALIZADO</option>
              </select>
            </div>
          )}
        </div>
      )}
      <div
        className={`px-4 lg:pl-8 w-full ${
          itemSelected === index ? 'py-3' : 'py-1'
        } ${
          isLast && 'pb-5'
        } scale-95 transform transition duration-500 hover:scale-100`}
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
          <div className="w-full">
            <div className="grid grid-cols-3">
              <div
                className="cursor-pointer col-span-2"
                onClick={() => handleSelect(index)}
              >
                <CardClosed
                  item={item}
                  itemSelected={itemSelected}
                  index={index}
                />
              </div>
              <div className="flex justify-end flex-wrap content-center space-x-3">
                <CardButons
                  index={index}
                  item={item}
                  handleSelect={handleSelect}
                  handleDelete={handleDelete}
                  onClickItem={onClickItem}
                  handlePrint={handlePrint}
                />
              </div>
            </div>
          </div>
          {itemSelected === index && (
            <div ref={componentRef}><CardOpen index={index} item={item} /></div>
          )}
        </div>
      </div>
    </div>
  )
}

interface CardClosedProps {
  item: any
  itemSelected: number
  index: number
}

function CardClosed(props: CardClosedProps) {
  const { item, itemSelected, index } = props
  return (
    <div>
      <div
        className={`${
          itemSelected === index ? 'mb-2 text-xl' : 'mb-1 text-lg'
        } text-accent-9 font-semibold`}
      >
        {item.name}
      </div>
      <div className="py-1 text-xs">
        <span className="bg-accent-1 rounded py-1 px-2 mr-2 text-accent-7">
          <span>{Moment(item.updatedAt).format('DD-MM-YYYY')}</span>
          &nbsp;
          <span>{Moment(item.updatedAt).format('HH:mm')}</span>
        </span>
      </div>
    </div>
  )
}

interface CardButonsProps {
  index: number
  item: any
  handleSelect: any
  handleDelete: any
  onClickItem: any
  handlePrint: any
}

function CardButons(props: CardButonsProps) {
  const { index, item, handleSelect, handleDelete, onClickItem, handlePrint } =
    props
  return (
    <div className="flex gap-3 justify-end flex-wrap content-center">
      <a
        data-tip="Imprimir Página"
        title="Imprimir Página"
        onClick={handlePrint}
        className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
      >
        <Print />
      </a>

      <a
        data-tip="Excluir Página"
        title="Excluir Página"
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
  )
}

function CardOpen(props: any) {
  const [contentDocument, setContentDocument] = useState({} as any)
  const { item } = props

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setContentDocument(
        item.documents.items && item.documents.items[0]
          ? JSON.parse(item.documents.items[0].content)
          : item
      )
    }
    return () => {
      isMounted = false
      setContentDocument({} as any)
    }
  }, [item])

  return (
    <div className="max-w-full w-full mx-auto">
      <div className="my-4 w-full md:w-12/12">
        <div className="text-xl text-tertiary-2">
          {contentDocument && formatPhoneNumber(contentDocument.phone as any)}
        </div>
        <div className="text-xl text-tertiary-2">
          {contentDocument && contentDocument.email}
        </div>
      </div>
      {(contentDocument &&
        contentDocument.data) &&
        contentDocument.data.map((line: any, idxLine: number) => (
          <div
            key={`l${idxLine}`}
            className="mt-3 flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4"
          >
            {(line &&
              line.fields) &&
              line.fields.map((field: any, idxField: number) => (
                <div
                  key={`f${idxField}`}
                  className={`w-full md:basis-${field.size}/12`}
                >
                  {field.name && <div className="text-sm">{field.name}</div>}
                  {(!field.value && field.type !== 'title') && <div className='text-accent-6 text-sm'>Não informado</div>}
                  {(field.value && field.type !== 'image') && <div className='font-semibold text-accent-9'>{field.value.toString()}</div>}
                  {(field.type === 'image' && field.link) && <Image className='rounded-full' alt="" src={field.link} width={100} height={100} />}
                </div>
              ))}
          </div>
        ))}
    </div>
  )
}
