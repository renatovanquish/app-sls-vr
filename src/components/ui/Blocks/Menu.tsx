/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Trash, Eye, Edit, Cog } from 'components/icons'
import { useCategory } from 'hooks/useCategory'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import cn from 'classnames'

interface Props {
  onClickItem: any
  block: any
  index: number
}

export default function Menu(props: Props): JSX.Element {
  const { onClickItem, block, index } = props
  const order = block.order
  const configParse = block.config ? JSON.parse(block.config) : false
  const contentParse = block.content ? JSON.parse(block.content) : false

  const { getCategory } = useCategory()

  const r =
    configParse && configParse.anchor
      ? configParse.anchor
      : contentParse && contentParse.title
      ? contentParse.title
      : contentParse.blockTitle
      ? contentParse.blockTitle
      : contentParse.content
      ? contentParse.content.replace(/<[^>]*>?/gm, '')
      : contentParse.imageUrl
      ? contentParse.imageUrl
      : contentParse.source === 'categories'
      ? 'Categorias do e-commerce'
      : contentParse.source === 'images_folder'
      ? `Galeria de Mídias - ${contentParse.folder}`
      : contentParse.source === 'category_products'
      ? 'Produtos de uma categoria'
      : contentParse.source === 'menus'
      ? 'Menus das Páginas'
      : contentParse.folder
      ? contentParse.folder
      : contentParse.videoUrl
      ? contentParse.videoUrl
      : ''

  const [reference, setReference] = useState(r)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const GetCategory = async (r: string) => {
        const c = await getCategory({ id: contentParse.category })
        console.log(contentParse.category, c)
        setReference(`${r} - ${c?.title}`)
      }

      if (block.component === '13' && contentParse.category) {
        GetCategory('Produtos da Categoria')
      }

      if (block.component === '17' && contentParse.category) {
        GetCategory('Produtos da Categoria')
      }

      if (block.component === '24') {
        if (contentParse.type === 'ALL') {
          setReference('Todos os tipos')
        } else {
          const types = (process.env.RELATIONS as any).filter((rl: any) => {
            return rl.restricted
          })
          const tl = types.find((t: any) => t.type === contentParse.type)
          setReference(`Tipo ${tl?.label}`)
        }
      }
    }
    return () => {
      setReference('')
    }
  }, [block])

  const { theme } = useTheme()

  return (
    <div className="flex justify-start">
      <Image
        alt=""
        className={cn("bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle", {
          'opacity-50': theme === 'dark'
        })}
        src={`/blocks/${block.component}.png`}
        width={72}
        height={72}
      />
      <div className='ml-4'>
        <div className="flex justify-start mt-1">
          <div className="text-lg font-bold">{order}</div>
          {reference && (
            <div className="ml-4 text-lg font-medium text-tertiary-2 line-clamp-1 mr-8">
              {reference}
            </div>
          )}
        </div>
        <div className="mt-1 flex justify-start gap-6">
          <button className="cursor-pointer" title="Editar Bloco">
            <Edit />
          </button>
          <button
            type="button"
            className="cursor-pointer"
            title="Visualizar Bloco"
            onClick={() => onClickItem({ action: 'PREVIEW', block })}
          >
            <Eye />
          </button>
          <button
            className="cursor-pointer"
            title="Configurações"
            onClick={() => onClickItem({ action: 'CONFIG', block, index })}
          >
            <Cog />
          </button>
          <button
            className="cursor-pointer"
            title="Excluir Bloco"
            onClick={() => onClickItem({ action: 'DELETE', block, index })}
          >
            <Trash />
          </button>
        </div>
      </div>
    </div>
  )
}
