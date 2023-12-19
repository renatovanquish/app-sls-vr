import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout, Head } from 'components/common'
import { Container } from 'components/ui'
import { PageStatus } from 'models'
import Link from 'next/link'
import { useUI } from 'components/ui/context'
import { RightArrow } from 'components/icons'

import { usePage } from 'hooks/usePage'
import { useProduct } from 'hooks/useProduct'
export default function PageSearch(): JSX.Element {
  const router = useRouter()
  const { term } = router.query
  
  const { listPages } = usePage()
  const { listProductsByStatusCategoryName } = useProduct()

  const [itemsPage, setItemsPage] = useState([] as any)
  const [itemsProduct, setItemsProduct] = useState([] as any)

  const { showSearch } = useUI()

  useEffect(() => {
    showSearch()
  }, [])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const fetchPages = async () => {
        const { items } = await listPages({
          // status: PageStatus.ON,
          filter: { search: { contains: term?.toString().toLowerCase() } },
          limit: 100,
          nextToken: null,
        })
        setItemsPage(items)
      }
      const fetchProducts = async () => {
        const { items } = await listProductsByStatusCategoryName({
          status: PageStatus.ON,
          filter: { search: { contains: term?.toString().toLowerCase() } },
          limit: 100,
          nextToken: null,
        })
        setItemsProduct(items)
      }
      if (term) {
        fetchPages()
        fetchProducts()
      }
    }
    return () => {
      setItemsPage([] as any)
    }
  }, [term])

  return term ? (
    <Container className='p-4'>
    <Head
      title={term.toString()}
      description={''}
      alias={`/search/${term}/`}
      thumbnail=""
    />
    <div className="pb-24">
        <div className="text-lg text-accent-9">Pesquisa por: {term}.</div>
        
        {itemsProduct.map((item: any, idx: number) => !item.hideInSearch && (
          <Link href={`/product/${item.alias}`} key={idx} passHref>
            <a>
              <div className="mt-3 cursor-pointer flex items-center py-2">
              {(item.thumbnail || item.photo1) && <img
                alt={item.name}
                className="w-16 h-16 bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle mr-4"
                src={item.thumbnail ? `${process.env.MIDIA_CLOUDFRONT}${item.thumbnail}` : item.photo1 ? item.photo1 : '/images/no_photo.png'}
              />}
              <div className="flex-grow">
                <h2 className="text-accent-9 title-font font-medium">
                  {item.name}
                </h2>
                <p className="text-sm text-accent-6">{item.description}</p>
              </div>
              </div>
            </a>
          </Link>
        ))}

        {itemsPage.map((item: any, idx: number) => item.status === PageStatus.ON && (
          <Link href={`/page/${item.alias}`} key={idx} passHref>
            <a>
            <div className="mt-3 cursor-pointer flex items-center py-2">
              <img
                alt={item.name}
                className="w-16 h-16 bg-accent-1 object-cover object-center flex-shrink-0 mask mask-squircle mr-4"
                src={item.thumbnail ? `${process.env.MIDIA_CLOUDFRONT}${item.thumbnail}` : '/images/no_photo.png'}
              />
              <div className="flex-grow">
                <h2 className="text-accent-9 title-font font-medium">
                  {item.title}
                </h2>
                <p className="text-sm text-accent-6">{item.description}</p>
              </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
      </Container>
  ) : (
    <div>Nenhum termo informado.</div>
  )
}

PageSearch.Layout = Layout

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
  return !item ? null : (
    <div className="px-4 my-2">
      <Link href={`/page/${item.alias}`}>
        <a>
          <div className="text-lg font-semibold underline">{item.title}</div>
          {item.description && <div className="">{item.description}</div>}
        </a>
      </Link>
    </div>
  )
}
