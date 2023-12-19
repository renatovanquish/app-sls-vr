import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { List } from 'components/ui'
import { useCategory } from 'hooks/useCategory'
import { useProduct } from 'hooks/useProduct'
import { PageStatus } from 'models'
import { ListProductsByStatusCategoryNameQueryVariables } from 'API'
import { Layout } from 'components/common'

export default function Products(): JSX.Element {
  const [categories, setCategories] = useState([] as any)
  const { listCategories } = useCategory()

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      const { items } = await listCategories({ limit: 1000 })
      setCategories(items)
    }
    if (isMounted) {
      fetchData()
    }
    return () => {
      setCategories([] as any)
    }
  }, [])

  return (
    <div className="p-5">
      {categories.map((category: any, k: number) => (
        <div key={k}>
          <ProductsByCategory category={category} categories={categories} />
        </div>
      ))}
    </div>
  )
}

Products.Layout = Layout

export function ProductsByCategory(props: any) {
  const { category, categories } = props

  const [products, setProducts] = useState([] as any)
  const { listProductsByStatusCategoryName } = useProduct()

  const getPhoto = (photo: string) => {
    return photo && photo.substr(0, 4) === 'http'
      ? photo
      : photo
      ? `${process.env.MIDIA_CLOUDFRONT}${photo}`
      : '/images/no_photo.png'
  }

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      const { items } = await listProductsByStatusCategoryName({
        status: PageStatus.ON,
        categoryName: {
          between: [
            { category: category.id, name: '' },
            { category: category.id, name: 'Z' },
          ],
        },
        limit: 1000,
        nextToken: null,
      })
      setProducts(items)
    }
    if (isMounted) {
      fetchData()
    }
    return () => {
      setProducts([] as any)
    }
  }, [])

  return (
    <div>
      {products.length > 0 && (
        <div className="mt-3 mb-9">
          <div className="font-semibold text-3xl text-sky-600">{category.title}</div>
          {products.map((product: any, index: number) => (
            <div
              key={index}
              className="mt-3 p-2 w-full bg-accent-1 rounded-lg flex justify-between"
            >
              <div className='pr-2'>
                <h2 className="text-accent-9 title-font text-xl font-medium ">
                  {product.name}
                </h2>
                <div className="text-accent-7 title-font">
                  {product.description}
                </div>
                {product.code && <div className="bg-accent-6 text-accent-0 inline px-2 rounded text-sm font-medium">
                  {product.code}
                </div>}
              </div>
              <div className='w-40 flex flex-col justify-center text-right'>
                <div className="text-lg font-bold text-red-500">R$ {product.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
