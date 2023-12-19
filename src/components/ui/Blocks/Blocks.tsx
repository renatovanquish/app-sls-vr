/* eslint-disable no-prototype-builtins */
import { useEffect, useState } from 'react'
import { useBlock } from 'hooks/useBlock'
import { useScreen } from 'hooks/useScreen'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { toast } from 'react-toast'
import { Modal } from 'components/ui'
import { useUI } from 'components/ui/context'
import { useUserAuth } from 'components/userAuth/context'
import { MidiasLib } from 'components/admin'
import { List, Add, Config } from 'components/ui/Blocks'

import dynamic from 'next/dynamic'

const Block1 = dynamic(() => import('./Block-1/Block'))
const Block2 = dynamic(() => import('./Block-2/Block'))
const Block3 = dynamic(() => import('./Block-3/Block'))
const Block4 = dynamic(() => import('./Block-4/Block'))
const Block5 = dynamic(() => import('./Block-5/Block'))
const Block6 = dynamic(() => import('./Block-6/Block'))
const Block7 = dynamic(() => import('./Block-7/Block'))
const Block8 = dynamic(() => import('./Block-8/Block'))
const Block9 = dynamic(() => import('./Block-9/Block'))
const Block10 = dynamic(() => import('./Block-10/Block'))
const Block11 = dynamic(() => import('./Block-11/Block'))
const Block12 = dynamic(() => import('./Block-12/Block'))
const Block13 = dynamic(() => import('./Block-13/Block'))
const Block14 = dynamic(() => import('./Block-14/Block'))
const Block15 = dynamic(() => import('./Block-15/Block'))
const Block16 = dynamic(() => import('./Block-16/Block'))
const Block17 = dynamic(() => import('./Block-17/Block'))
const Block18 = dynamic(() => import('./Block-18/Block'))
const Block19 = dynamic(() => import('./Block-19/Block'))
const Block20 = dynamic(() => import('./Block-20/Block'))
const Block21 = dynamic(() => import('./Block-21/Block'))
const Block22 = dynamic(() => import('./Block-22/Block'))
const Block23 = dynamic(() => import('./Block-23/Block'))
const Block24 = dynamic(() => import('./Block-24/Block'))
const Block25 = dynamic(() => import('./Block-25/Block'))

interface Props {
  userID: string
  pageID: string
  handleUpdateBlocks?: any
}

export default function Blocks(props: Props) {
  const { userID, pageID, handleUpdateBlocks } = props
  const { listBlocksByPageOrder, deleteBlock } = useBlock()
  const [blocks, setBlocks] = useState([] as any)
  const [modalSel, setModalSel] = useState('')
  const [indexSel, setIndexSel] = useState(0)
  const [blockSel, setBlockSel] = useState({} as any)
  const [isLoading, setIsLoading] = useState(true)
  const { screenWidth, screenHeight } = useScreen()
  const { isSm } = useBreakPoints()
  const { openModal, displayModal, closeModal } = useUI()
  const { user } = useUserAuth()
  
  const onClickItem = (e: any) => {
    const { action, block, index } = e
    setBlockSel(block)
    setIndexSel(index)

    if (action === 'DELETE') {
      openActionSheet(block, index)
    }

    if (action === 'PREVIEW' || action === 'IMAGES' || action === 'CONFIG') {
      setModalSel(action)
      openModal()
    }
  }

  const openActionSheet = async (e: any, index: number) => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma excluir o bloco?`,
      message: '',
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
      await deleteBlock({ id: e.id })

      const b = blocks.map((item: any, i: number) => {
        if (index !== i) {
          return item
        }
      })

      setBlocks(b)
      
      if(handleUpdateBlocks) {
        handleUpdateBlocks(b)
      }

      toast.info('Bloco excluído com sucesso.')
    }
  }

  const handleCreate = (b: any) => {
    setBlocks(blocks.concat(b))
  }

  const handleUpdate = (i: number, itemUpdated: any) => {
    const b = blocks.map((item: any, index: number) => {
      if (index !== i) {
        return item
      } else {
        Object.keys(item).forEach((p: any) => {
          if (itemUpdated.hasOwnProperty(p)) {
            item[p] = itemUpdated[p] 
          }
        })
        return item
      }
    })
    setBlocks(b)
    if(handleUpdateBlocks) {
      handleUpdateBlocks(b)
    }
  }

  useEffect(() => {
    let isMounted = true
    const fetchBlocks = async () => {
      if (isMounted) {
        const { items } = await listBlocksByPageOrder({
          pageID,
          limit: 100,
          nextToken: null,
        })
        setBlocks(items)
        setIsLoading(false)
      }
    }
    fetchBlocks()
    return () => {
      isMounted = false
      setBlockSel({} as any)
      setBlocks([] as any)
      setIsLoading(true)
    }
  }, [pageID])

  return (
    <div className="m-4">
      <List
        blocks={blocks}
        onClickItem={onClickItem}
        handleUpdate={handleUpdate}
        isLoading={isLoading}
      />

      <Add pageID={pageID} order={blocks.length} handleCreate={handleCreate} />

      {modalSel && (
        <Modal open={displayModal} onClose={closeModal} focusTrap={false} absolute={modalSel === 'IMAGES' ? true : false} title={
          modalSel === 'PREVIEW' ? (
            <div className="mt-2 text-2xl font-semibold">Pré-visualização</div>
          ) : modalSel === 'CONFIG' ? (
            <div className="mt-2 text-2xl font-semibold">Configurações do bloco</div>
          ) : (<></>)
        }>
          <div
            className='bg-accent-1'
            style={{
              width: modalSel === 'CONFIG' ? isSm ? screenWidth : screenWidth * 0.6 : screenWidth * 0.8,
              height: modalSel === 'IMAGES' ? screenHeight * 0.8 : 'auto',
              maxHeight: screenHeight * 0.8,
            }}
          >
            {modalSel === 'PREVIEW' && (
              <div>
                {blockSel.component === '1' && <Block1 block={blockSel} user={user} />}
                {blockSel.component === '2' && <Block2 block={blockSel} user={user} />}
                {blockSel.component === '3' && <Block3 block={blockSel} user={user} />}
                {blockSel.component === '4' && <Block4 block={blockSel} user={user} />}
                {blockSel.component === '5' && <Block5 block={blockSel} user={user} />}
                {blockSel.component === '6' && <Block6 block={blockSel} user={user} />}
                {blockSel.component === '7' && <Block7 block={blockSel} user={user} />}
                {blockSel.component === '8' && <Block8 block={blockSel} user={user} />}
                {blockSel.component === '9' && <Block9 block={blockSel} user={user} />}
                {blockSel.component === '10' && <Block10 block={blockSel} user={user} />}
                {blockSel.component === '11' && <Block11 block={blockSel} user={user} />}
                {blockSel.component === '12' && <Block12 block={blockSel} user={user} />}
                {blockSel.component === '13' && <Block13 block={blockSel} user={user} />}
                {blockSel.component === '14' && <Block14 block={blockSel} user={user} />}
                {blockSel.component === '15' && <Block15 block={blockSel} user={user} />}
                {blockSel.component === '16' && <Block16 block={blockSel} user={user} />}
                {blockSel.component === '17' && <Block17 block={blockSel} user={user} />}
                {blockSel.component === '18' && <Block18 block={blockSel} user={user} />}
                {blockSel.component === '19' && <Block19 block={blockSel} user={user} />}
                {blockSel.component === '20' && <Block20 block={blockSel} user={user} />}
                {blockSel.component === '21' && <Block21 block={blockSel} user={user} />}
                {blockSel.component === '22' && <Block22 block={blockSel} user={user} />}
                {blockSel.component === '23' && <Block23 block={blockSel} user={user} />}
                {blockSel.component === '24' && <Block24 block={blockSel} user={user} />}
                {blockSel.component === '25' && <Block25 block={blockSel} user={user} />}
              </div>
            )}
            {modalSel === 'IMAGES' && (
              <div
                style={{ height: screenHeight * 0.78 }}
                className="overflow-y-auto"
              >
                <MidiasLib userID={userID} isModal={true} />
              </div>
            )}
            {modalSel === 'CONFIG' && (
              <div className="overflow-y-auto w-full">
                <Config
                  block={blockSel}
                  index={indexSel}
                  handleUpdate={handleUpdate}
                  userID={userID}
                />
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}
