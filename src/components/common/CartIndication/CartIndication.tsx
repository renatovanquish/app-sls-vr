import { API, graphqlOperation } from 'aws-amplify'
import * as subscriptions from 'graphql/subscriptions'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cart } from 'components/icons'
import { useUserAuth } from 'components/userAuth/context'
import { useCart } from 'hooks/useCart'

export default function CartIndication() {
  const [itemsCount, setItemsCount] = useState(0)
  const { user } = useUserAuth()
  const { listCartsByUser } = useCart()

  useEffect(() => {
    let isMounted = true
    if (isMounted && user) {
      const countItemsCart = async () => {
        const { items } = await listCartsByUser({ userID: user.id })
        const blendIDs: string | any[] = []
        let count = 0
        items.map((i:any)=>{
          if (!i.blendID || blendIDs.indexOf(i.blendID) === -1) { count++ }
          if (i.blendID && blendIDs.indexOf(i.blendID) === -1) { blendIDs.push(i.blendID) }
        })
        setItemsCount(count)
      }
      countItemsCart()
      const subscriptionOnCreateCart = API.graphql(
        graphqlOperation(subscriptions.onCreateCart, { userID: user.id })
      )
        // @ts-ignore
        .subscribe({
          next: ({ value }: any) => {
            countItemsCart()
          },
          error: (error: any) => console.warn(error),
        })
      const subscriptionOnDeleteCart = API.graphql(
        graphqlOperation(subscriptions.onDeleteCart, { userID: user.id })
      )
        // @ts-ignore
        .subscribe({
          next: ({ value }: any) => {
            countItemsCart()
          },
          error: (error: any) => console.warn(error),
        })
      return () => {
        subscriptionOnCreateCart.unsubscribe()
        subscriptionOnDeleteCart.unsubscribe()
        setItemsCount(0)
        isMounted = false
      }
    }
  }, [user])

  return user && itemsCount > 0 ? (
    <Link href="/cart/">
      <a className="z-10 cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center">
        <Cart />
        <span className="border border-accent-1 bg-red-500 text-white h-4 w-4 absolute rounded-full right-0 -top-1 flex items-center justify-center font-bold text-xs">
          {itemsCount}
        </span>
      </a>
    </Link>
  ) : (
    <></>
  )
}
