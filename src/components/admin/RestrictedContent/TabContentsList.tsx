import { useState, useEffect } from 'react'
import { useRestrictedContent } from 'hooks/useRestrictedContent'
import { Modal, Loading } from 'components/ui'
import { useScreen } from 'hooks/useScreen'
import { Trash, Edit, Cross, Plus2, Search } from 'components/icons'
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { toast } from 'react-toast'
import cn from 'classnames'
import generateSortFn from 'lib/generateSortFn'
import { RestrictedContentTypes } from 'API'

import Moment from 'moment'

import ContentsForm from './TabContentsForm'
import Rating from "./Rating"

interface Props {
  relationID: string
  name: string
  groups: any[]
}

export default function Contents(props: Props) {
  const { relationID, name, groups } = props
  const [contents, setContents] = useState<any[]>([])
  const [contentSel, setContentSel] = useState({} as any)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const { screenWidth, screenHeight } = useScreen()

  const { listRestrictedContentsByRelationOrder, deleteRestrictedContent } =
    useRestrictedContent()

  const fetchData = async () => {
    setContents([])
    const { items, nextToken } = await listRestrictedContentsByRelationOrder({
      relationID,
      limit: 1000,
    })

    const itemsFmt =
      groups && groups.length > 0
        ? breakGroup(
            items.sort(
              generateSortFn([
                { name: 'group', reverse: false },
                { name: 'subGroup', reverse: false },
                { name: 'order', reverse: false },
              ])
            )
          )
        : items

    setContents(itemsFmt)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    return () => {
      setLoading(true)
      setContents([])
      setSearch('')
    }
  }, [relationID])

  const onClickItem = (e: any) => {
    const { action, item } = e
    if (action === 'DELETE') {
      openActionSheetDelete(item)
    }
  }

  const openActionSheetDelete = async (e: any) => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma excluir o conteúdo? : ${e.title}`,
      message: e.title,
      options: [
        {
          title: 'NÃO',
          style: ActionSheetButtonStyle.Destructive,
        },
        {
          title: 'SIM',
        },
      ],
    })
    if (promptRet.index === 1) {
      await deleteRestrictedContent({ id: e.id })
      fetchData()
      toast('Conteúdo excluído com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
    }
  }

  const onCloseModal = () => {
    setShowModal(false)
    setContentSel({} as any)
    fetchData()
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="overflow-x-auto w-full">
      <div className="p-1 bg-accent-5 rounded-lg flex justify-between">
        <div
          style={{ width: 240 }}
          className={cn(
            'cursor-default relative flex items-center justify-center text-base w-full transition-colors duration-150'
          )}
        >
          <input
            className="text-accent-9 py-2 bg-accent-0 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
            autoComplete="off"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <div className="cursor-pointer text-accent-7 absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search />
          </div>
        </div>
        <div className="p-1">
          <a
            className="cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
            onClick={() => {
              setContentSel({} as any)
              setShowModal(true)
            }}
          >
            <Plus2 />
          </a>
        </div>
      </div>

      <div className="mt-4">
        {contents.map(
          (c: any, i: number) =>
            c.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 && (
              <div key={i}>
                {c.break && (
                  <div className='pt-6 pb-3'>
                    <h2 className="tracking-widest text-xs title-font font-medium text-tertiary-2 mb-1">
                    {c.group}
                    </h2>
                    <h1 className="title-font text-lg font-bold text-cyan-900">
                      {c.subGroup}
                    </h1>
                  </div>
                )}
                <div
                  className={`my-1 w-full bg-slate-50 rounded-lg p-3 ${i && 'pt-3'}`}
                >
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-accent-9 font-semibold text-lg">
                        {c.title}
                      </h2>
                      <div className="flex mt-1 gap-2 text-sm">
                        <div className={cn('text-white px-1 rounded', {
                          'bg-red-700': c.type === RestrictedContentTypes.VIDEO,
                          'bg-amber-600': c.type === RestrictedContentTypes.AUDIO,
                          'bg-sky-900': c.type === RestrictedContentTypes.PDF,
                          'bg-blue-500': c.type === RestrictedContentTypes.IMAGE,
                        })}>
                          {c.type}
                        </div>
                        {(c.lifetime === 'PROGRAMMED' || c.lifetime === 'PERIOD' || c.lifetime === 'FOREVER' ) && <div className="bg-slate-400 text-white px-1 rounded">
                            {c.lifetime === 'PROGRAMMED' && <span>PROGRAMADO</span>}
                            {c.lifetime === 'PERIOD' && <span>PERÍODO</span>}
                            {c.lifetime === 'FOREVER' && <span>VITALÍCIO</span>}
                        </div>}
                        <div><Rating restrictedContentID={c.id}/></div>
                      </div>
                    </div>
                    <div style={{minWidth:100}} className="flex justify-end flex-wrap gap-2 content-center">
                      <a
                        data-tip="Editar"
                        title="Editar"
                        className="text-blue-500 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                        onClick={() => {
                          setContentSel(c)
                          setShowModal(true)
                        }}
                      >
                        <Edit />
                      </a>

                      <a
                        data-tip="Excluir"
                        title="Excluir"
                        onClick={() =>
                          onClickItem({
                            action: 'DELETE',
                            item: c,
                          })
                        }
                        className="mr-2 text-red-500 z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                      >
                        <Trash />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>

      <Modal
        hideHeader={true}
        open={showModal}
        onClose={onCloseModal}
        focusTrap={false}
        fullSize={true}
      >
        <div
          className="overflow-y-auto bg-accent-0 pr-2"
          style={{
            width: screenWidth,
            height: screenHeight,
          }}
        >
          <div className="sticky top-0 z-50 bg-accent-0">
            <div className="flex justify-between">
              <div>
                <div className="pl-4 pt-1 text-base font-semibold line-clamp-1">
                  {name}
                </div>
                <div className="pl-4 text-xs">Conteúdo Restrito</div>
              </div>
              <div className="pt-3 pr-4">
                <button
                  onClick={onCloseModal}
                  aria-label="Close"
                  className="cursor-pointer bg-accent-1 p-2 rounded-full"
                >
                  <Cross className="h-7 w-7" />
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 pb-4 overflow-y-auto">
            <ContentsForm
              relationID={relationID}
              onCloseModal={onCloseModal}
              item={contentSel}
              groups={groups}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

function breakGroup(items: any) {
  let last = ''
  const itemsMaped = items.map((v: any) => {
    v.break = false
    if (v.group !== last) {
      v.break = true
      last = v.group
    }
    return v
  })
  return itemsMaped
}



