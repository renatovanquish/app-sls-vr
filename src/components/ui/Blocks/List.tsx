/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Info } from 'components/icons'
import { Menu } from 'components/ui/Blocks'
import { useTheme } from 'next-themes'
import { Loading } from 'components/ui'

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
  blocks: any
  onClickItem: any
  handleUpdate: any
  isLoading: boolean
}

export default function List(props: Props): JSX.Element {
  const { blocks, onClickItem, handleUpdate, isLoading } = props
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState([] as any)

  useEffect(() => {
    if (blocks && blocks.length > 0) {
      const isOpenArray: boolean[] = []
      blocks.forEach((item: any) => {
        isOpenArray.push(false)
      })
      setIsOpen(isOpenArray)
    }
  }, [blocks])

  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && blocks.length === 0 && (
        <div className="select-none">
          <div className="px-4 py-4 w-full rounded shadow bg-tertiary text-tertiary">
            <div className="flex-1">
              <Info />
              <label className="ml-2 font-semibold">
                Nenhum bloco foi adicionado nesta página.
              </label>
            </div>
          </div>
        </div>
      )}
      {blocks.map(
        (block: any, index: number) =>
          block && (
            <div
              key={index}
              className={`w-full bg-accent-0 shadow rounded ${index > 0 && 'mt-4'}`}
            >
              <div
                onClick={() => {
                  setIsOpen(
                    isOpen.map((item: boolean, i: number) =>
                      i === index ? !item : false
                    )
                  )
                }}
                className="p-2 rounded"
              >
                <Menu onClickItem={onClickItem} block={block} index={index} />
              </div>
              <div
              >
                {isOpen[index] && (
                  <div className="px-4 pb-4">
                    {block.component === '1' && (
                      <Block1
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '2' && (
                      <Block2
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '3' && (
                      <Block3
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '4' && (
                      <Block4
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '5' && (
                      <Block5
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '6' && (
                      <Block6
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '7' && (
                      <Block7
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '8' && (
                      <Block8
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '9' && (
                      <Block9
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '10' && (
                      <Block10
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '11' && (
                      <Block11
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '12' && (
                      <Block12
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '13' && (
                      <Block13
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '14' && (
                      <Block14
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '15' && (
                      <Block15
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '16' && (
                      <Block16
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '17' && (
                      <Block17
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '18' && (
                      <Block18
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '19' && (
                      <Block19
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '20' && (
                      <Block20
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '21' && (
                      <Block21
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '22' && (
                      <Block22
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '23' && (
                      <Block23
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '24' && (
                      <Block24
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}

                    {block.component === '25' && (
                      <Block25
                        mode="EDIT"
                        block={block}
                        handleUpdate={handleUpdate}
                        index={index}
                        onClickItem={onClickItem}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )
      )}
    </div>
  )
}
