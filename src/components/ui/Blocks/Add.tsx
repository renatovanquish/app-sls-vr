/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { useBlock } from 'hooks/useBlock'
import { toast } from 'react-toast'
import { Plus2 } from 'components/icons'
import { useTheme } from 'next-themes'
import cn from 'classnames'

interface Props {
  pageID: any
  order: number
  handleCreate: any
}

export default function Add(props: Props): JSX.Element {
  const { pageID, order, handleCreate } = props
  const { createBlock } = useBlock()
  const [show, setShow] = useState(false)

  const addBlock = async (n: number) => {
    const input = {
      pageID,
      order,
      component: `${n}`,
      content: '',
    }

    const createdBlock = await createBlock(input)
    delete createdBlock.page
    handleCreate(createdBlock)

    toast.info(`Bloco adicionado com sucesso.`)
  }

  const { theme } = useTheme()

  return (
    <div className="mt-8 shadow rounded-md">
      <div
        className="cursor-pointer p-4 text-left font-bold"
        onClick={() => setShow(!show)}
      >
        <Plus2 /> <span className="ml-2">Adicionar</span>
      </div>
      {show && (
        <div className="pb-4 flex justify-between md:justify-start flex-wrap gap-4">
          <img
            onClick={() => {
              addBlock(19)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco19"
            src="/blocks/19.png"
          />
          <img
            onClick={() => {
              addBlock(1)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco1"
            src="/blocks/1.png"
          />
          <img
            onClick={() => {
              addBlock(2)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco2"
            src="/blocks/2.png"
          />
          <img
            onClick={() => {
              addBlock(3)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco3"
            src="/blocks/3.png"
          />
          <img
            onClick={() => {
              addBlock(14)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco14"
            src="/blocks/14.png"
          />
          <img
            onClick={() => {
              addBlock(5)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco5"
            src="/blocks/5.png"
          />
          <img
            onClick={() => {
              addBlock(6)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco6"
            src="/blocks/6.png"
          />
          <img
            onClick={() => {
              addBlock(7)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco7"
            src="/blocks/7.png"
          />
          <img
            onClick={() => {
              addBlock(8)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco8"
            src="/blocks/8.png"
          />
          <img
            onClick={() => {
              addBlock(9)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco9"
            src="/blocks/9.png"
          />
          <img
            onClick={() => {
              addBlock(13)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco13"
            src="/blocks/13.png"
          />
          <img
            onClick={() => {
              addBlock(10)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco10"
            src="/blocks/10.png"
          />
          <img
            onClick={() => {
              addBlock(23)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco23"
            src="/blocks/23.png"
          />
          <img
            onClick={() => {
              addBlock(20)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco20"
            src="/blocks/20.png"
          />
          <img
            onClick={() => {
              addBlock(4)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco4"
            src="/blocks/4.png"
          />
          <img
            onClick={() => {
              addBlock(12)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco12"
            src="/blocks/12.png"
          />

          <img
            onClick={() => {
              addBlock(11)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco11"
            src="/blocks/11.png"
          />
          <img
            onClick={() => {
              addBlock(15)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco15"
            src="/blocks/15.png"
          />
          <img
            onClick={() => {
              addBlock(21)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco21"
            src="/blocks/21.png"
          />
          <img
            onClick={() => {
              addBlock(16)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco16"
            src="/blocks/16.png"
          />
          <img
            onClick={() => {
              addBlock(17)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco17"
            src="/blocks/17.png"
          />
          <img
            onClick={() => {
              addBlock(18)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco18"
            src="/blocks/18.png"
          />
          <img
            onClick={() => {
              addBlock(22)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco22"
            src="/blocks/22.png"
          />
          <img
            onClick={() => {
              addBlock(24)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco24"
            src="/blocks/24.png"
          />
          <img
            onClick={() => {
              addBlock(25)
            }}
            className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
              'opacity-50': theme === 'dark'
            })}
            alt="bloco25"
            src="/blocks/25.png"
          />
        </div>
      )}
    </div>
  )
}
