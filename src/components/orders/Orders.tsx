import { API, graphqlOperation } from 'aws-amplify'
import * as subscriptions from 'graphql/subscriptions'

import { useEffect, useState, useRef } from 'react'
import { List, EmptyMessage, Loading } from 'components/ui'
import { useUI } from 'components/ui/context'
import { useOrder } from 'hooks/useOrder'
import { ModelSortDirection, OrderStatus } from 'API'
import { useRouter } from 'next/router'
import Header from './Header'
import CardOrder from './Card'

import Moment from 'moment'

interface Props {
  user: any
  admin?: boolean
  status?: string
}

export default function Orders(props: Props) {
  const { user, admin, status } = props
  const adminMode = admin === true && user.isAdmin ? true : false

  const router = useRouter()
  const { target } = router.query

  const [reload, setReload] = useState(0)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [item, setItem] = useState({} as any)
  const [items, setItems] = useState([] as any)

  const playerRef = useRef<any>(null)
  const { config } = useUI()
  const [itemCreated, setItemCreated] = useState({} as any)
  const [audioStarted, setAudioStarted] = useState(false)

  const [p1, setP1] = useState([] as any)
  const [p2, setP2] = useState([] as any)
  const [p3, setP3] = useState([] as any)
  const [p4, setP4] = useState([] as any)

  const { listOrdersByUserCreatedAt, listOrdersByStatusCreatedAt, getOrder } =
    useOrder()

  useEffect(() => {
    if (user && user.id && !adminMode) {
      const subscription = API.graphql(
        graphqlOperation(subscriptions.onUpdateOrder, {
          userID: user.id,
        })
      )
        // @ts-ignore
        .subscribe({
          next: (data: any) => {
            setReload(reload + 1)
          },
          error: (error: any) => console.warn(error),
        })
      return () => {
        subscription.unsubscribe()
      }
    }
  }, [user])

  const fetchAPPROVED = async () => {
    const { items } = await listOrdersByStatusCreatedAt({
      status: OrderStatus.APPROVED,
      createdAt: {
        between: [
          Moment().startOf('day').toString(),
          Moment().endOf('day').toString()
        ],
      },
    })
    let pt = [] as any
    items.forEach((i: any) => {
      pt.push({ id: i.id, createdAt: i.createdAt })
    })
    setP1(pt)
  }

  const fetchPREPARATION = async () => {
    const { items } = await listOrdersByStatusCreatedAt({
      status: OrderStatus.IN_PREPARATION,
      createdAt: {
        between: [
          Moment().startOf('day').toString(),
          Moment().endOf('day').toString()
        ],
      },
    })
    let pt = [] as any
    items.forEach((i: any) => {
      pt.push({ id: i.id, createdAt: i.createdAt })
    })
    setP1(pt)
  }

  const fetchTRANSIT = async () => {
    const { items } = await listOrdersByStatusCreatedAt({
      status: OrderStatus.IN_TRANSIT,
      createdAt: {
        between: [
          Moment().startOf('day').toString(),
          Moment().endOf('day').toString()
        ],
      },
    })
    let pt = [] as any
    items.forEach((i: any) => {
      pt.push({ id: i.id, createdAt: i.createdAt })
    })
    setP3(pt)
  }

  const fetchDELIVERED = async () => {
    const { items } = await listOrdersByStatusCreatedAt({
      status: OrderStatus.DELIVERED,
      createdAt: {
        between: [
          Moment().startOf('day').toString(),
          Moment().endOf('day').toString()
        ],
      },
    })
    let pt = [] as any
    items.forEach((i: any) => {
      pt.push({ id: i.id, createdAt: i.createdAt })
    })
    setP4(pt)
  }

  useEffect(() => {
    if (adminMode && config) {
      fetchAPPROVED()
      fetchPREPARATION()
      fetchTRANSIT()
      fetchDELIVERED()

      const subscriptionCreate = API.graphql(
        graphqlOperation(subscriptions.onCreateOrderAdm)
      )
        // @ts-ignore
        .subscribe({
          next: async (data: any) => {
            const d = data.value.data.onCreateOrderAdm
            const o = await getOrder({ id: d.id })
            setItemCreated(o)
            if (config.soundOnNewOrder) {
              playerRef.current.play()
            }
            fetchAPPROVED()
            fetchPREPARATION()
            fetchTRANSIT()
            fetchDELIVERED()
          },
          error: (error: any) => console.warn(error),
        })

      return () => {
        subscriptionCreate.unsubscribe()
      }
    }
  }, [config, playerRef])



  useEffect(() => {
    if (target && target[1]) {
      const t = target[1].toString()
      let isSearch = t && t.match(/^[0-9]+$/) !== null ? true : false
      if (isSearch) {
        setSearch(t)
        const fetchItem = async () => {
          setLoading(true)
          const { items } = await listOrdersByStatusCreatedAt({
            status: OrderStatus.APPROVED,
            createdAt: {
              between: [
                Moment.unix(parseInt(t)).toDate().toISOString(),
                Moment.unix(parseInt(t) + 0.999)
                  .toDate()
                  .toISOString(),
              ],
            },
          })
          if (items && items.length > 0) {
            setItems(items)
            setItem(items[0])
            setLoading(false)
          } else {
            const { items } = await listOrdersByStatusCreatedAt({
              status: OrderStatus.CANCELED,
              createdAt: {
                between: [
                  Moment.unix(parseInt(t)).toDate().toISOString(),
                  Moment.unix(parseInt(t) + 0.999)
                    .toDate()
                    .toISOString(),
                ],
              },
            })
            if (items && items.length > 0) {
              setItems(items)
              setItem(items[0])
              setLoading(false)
            } else {
              const { items } = await listOrdersByStatusCreatedAt({
                status: OrderStatus.STANDBY,
                createdAt: {
                  between: [
                    Moment.unix(parseInt(t)).toDate().toISOString(),
                    Moment.unix(parseInt(t) + 0.999)
                      .toDate()
                      .toISOString(),
                  ],
                },
              })
              if (items && items.length > 0) {
                setItems(items)
                setItem(items[0])
                setLoading(false)
              } else {
                const { items } = await listOrdersByStatusCreatedAt({
                  status: OrderStatus.REJECTED,
                  createdAt: {
                    between: [
                      Moment.unix(parseInt(t)).toDate().toISOString(),
                      Moment.unix(parseInt(t) + 0.999)
                        .toDate()
                        .toISOString(),
                    ],
                  },
                })
                if (items && items.length > 0) {
                  setItems(items)
                  setItem(items[0])
                  setLoading(false)
                } else {
                  const { items } = await listOrdersByStatusCreatedAt({
                    status: OrderStatus.IN_PREPARATION,
                    createdAt: {
                      between: [
                        Moment.unix(parseInt(t)).toDate().toISOString(),
                        Moment.unix(parseInt(t) + 0.999)
                          .toDate()
                          .toISOString(),
                      ],
                    },
                  })
                  if (items && items.length > 0) {
                    setItems(items)
                    setItem(items[0])
                    setLoading(false)
                  } else {
                    const { items } = await listOrdersByStatusCreatedAt({
                      status: OrderStatus.IN_TRANSIT,
                      createdAt: {
                        between: [
                          Moment.unix(parseInt(t)).toDate().toISOString(),
                          Moment.unix(parseInt(t) + 0.999)
                            .toDate()
                            .toISOString(),
                        ],
                      },
                    })
                    if (items && items.length > 0) {
                      setItems(items)
                      setItem(items[0])
                      setLoading(false)
                    } else {
                      const { items } = await listOrdersByStatusCreatedAt({
                        status: OrderStatus.DELIVERED,
                        createdAt: {
                          between: [
                            Moment.unix(parseInt(t)).toDate().toISOString(),
                            Moment.unix(parseInt(t) + 0.999)
                              .toDate()
                              .toISOString(),
                          ],
                        },
                      })
                      if (items && items.length > 0) {
                        setItems(items)
                        setItem(items[0])
                        setLoading(false)
                      } else {
                        setLoading(false)
                      }
                    }
                  }
                }
              }
            }
          }
        }
        setItems([] as any)
        setItem({} as any)
        fetchItem()
      } else {
        setItems([] as any)
        setItem({} as any)
        setSearch('')
        setLoading(false)
      }
    } else {
      setSearch('')
      setLoading(false)
    }
  }, [target])

  return user && user.id && !search && !item.id ? (
    <div>
      {adminMode && (
        <div style={{ position: 'absolute', zIndex: 100, marginTop: -60 }}>
          <audio
            ref={playerRef}
            controls={true}
            autoPlay={true}
            preload="auto"
            muted={false}
          >
            <source src="/beep.mp3"></source>
          </audio>
        </div>
      )}
      <List
        keys={`${status}${reload}`}
        userID={user.id}
        EmptyHeader={
          adminMode && (
            <div className="w-full mt-20">
              <OrdersPanel p1={p1} p2={p2} p3={p3} p4={p4} />
              <Header index={0} item={undefined} adminMode={adminMode} />
            </div>
          )
        }
        emptyMessage="Nenhum pedido por aqui."
        endMessage="Estes são todos os pedidos."
        listItems={
          adminMode ? listOrdersByStatusCreatedAt : listOrdersByUserCreatedAt
        }
        variables={
          adminMode
            ? {
                status: status ? status.toUpperCase() : OrderStatus.STANDBY,
                limit: 50,
                sortDirection: ModelSortDirection.DESC,
                nextToken: null,
              }
            : {
                userID: user.id,
                limit: 50,
                sortDirection: ModelSortDirection.DESC,
                nextToken: null,
              }
        }
        layout="flexCol"
        Card={CardOrder}
        breakItems="CREATEDAT"
        onCreatedItem={itemCreated}
        sortParams={[{ name: 'createdAt', reverse: true }]}
        paramsItems={{ adminMode }}
      />
    </div>
  ) : (
    <div>
      {loading && (
        <div className="px-4">
          <Loading />
        </div>
      )}
      {!loading && item && !item.id && (
        <EmptyMessage message="Pedido não localizado." />
      )}
      {!loading &&
        items.map((i: any, n: number) => (
          <div key={n}>
            <CardOrder
              userID={user.id}
              index={n}
              item={i}
              onClickItem={() => {}}
              itemSelected={n}
              handleUpdate={() => {}}
              handleDelete={() => {}}
              handleSelect={() => {}}
              isLast={true}
              paramsItems={{ adminMode }}
            />
          </div>
        ))}
    </div>
  )
}

function OrdersPanel(props: any) {
  const { p1, p2, p3, p4 } = props
  return (
    <div className="m-4">
      <div className="p-4 bg-accent-1 rounded shadow">
        <div className="text-lg font-bold">Pedidos em produção</div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-accent-0 rounded p-4">
            <div className="font-semibold">Aprovados</div>
            {p1.map((i: any, n: number) => (
              <OrderChange
                key={n}
                id={i.id}
                createdAt={i.createdAt}
                previusStatus=""
                nextStatus={``}
              />
            ))}
          </div>
          <div className="bg-accent-0 rounded p-4">
            <div className="font-semibold">Preparando</div>
            {p2.map((i: any, n: number) => (
              <OrderChange
                key={n}
                id={i.id}
                createdAt={i.createdAt}
                previusStatus=""
                nextStatus={``}
              />
            ))}
          </div>
          <div className="bg-accent-0 rounded p-4">
            <div className="font-semibold">Saiu para entrega</div>
            {p3.map((i: any, n: number) => (
              <OrderChange
                key={n}
                id={i.id}
                createdAt={i.createdAt}
                previusStatus=""
                nextStatus={``}
              />
            ))}
          </div>
          <div className="bg-accent-0 rounded p-4">
            <div className="font-semibold">Entregue</div>
            {p4.map((i: any, n: number) => (
              <OrderChange
                key={n}
                id={i.id}
                createdAt={i.createdAt}
                previusStatus=""
                nextStatus={``}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface PropsOrderChange {
  id: string
  createdAt: any
  previusStatus: string
  nextStatus: string
}
function OrderChange(props: PropsOrderChange) {
  const { id, createdAt, previusStatus, nextStatus } = props
  return <div># {Moment(createdAt).unix()}</div>
}
