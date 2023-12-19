/* eslint-disable no-prototype-builtins */
import { FC, useEffect, useRef, ReactNode, Component, useState } from 'react'
import { Container, Loading, EndMessage, EmptyMessage } from 'components/ui'
import cn from 'classnames'
import s from './List.module.css'
import { useUI } from 'components/ui/context'
import InfiniteScroll from 'react-infinite-scroll-component'
import generateSortFn from 'lib/generateSortFn'
import { useBreakPoints } from 'hooks/useBreakPoints'
import { useScreen } from 'hooks/useScreen'

interface Props {
  className?: string
  children?: ReactNode[] | Component[] | any[]
  layout?: 'flexCol' | 'flex' | ''
  userID: string
  listItems: any
  variables: any
  keys: string
  emptyMessage: string
  endMessage: string
  Card: any
  height?: number
  onClickItem?: any
  Header?: any
  breakItems?: string // 'MENU' | 'CREATEDAT' | 'UPDATEDAT' | 'DATE' | CATEGORY | TYPE
  sortParams?: any // [{name: 'menu', reverse: false}, {name: 'order', reverse: false}]
  paramsItems?: any
  EmptyHeader?: React.ReactNode
  onUpdatedItem?: any
  onCreatedItem?: any
  onDeletedItem?: any
}

const List: FC<Props> = ({
  className,
  layout = 'flex',
  children,
  userID,
  listItems,
  variables,
  keys,
  emptyMessage = '',
  endMessage = '',
  Card,
  height,
  onClickItem,
  Header,
  breakItems,
  sortParams,
  paramsItems,
  EmptyHeader,
  onUpdatedItem,
  onCreatedItem,
  onDeletedItem,
}) => {
  const listClassName = cn(
    {
      [s.listFlex]: layout === 'flex',
      [s.listFlexCol]: layout === 'flexCol',
    },
    className
  )

  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [itemsList, setItemsList] = useState<any[]>([])
  const [itemSelected, setItemSelected] = useState(-1)
  const [token, setToken] = useState(variables.nextToken)
  const { heightNavBar } = useUI()

  const { isSm, isMd } = useBreakPoints()
  const { screenHeight } = useScreen()

  const [heightHeader, setHeightHeader] = useState(0)
  const ref = useRef(null as any)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      console.log('****** List - Fetch Data ******')
      const fetchData = async () => {
        variables.nextToken = null
        const { items, nextToken } = await listItems(variables)
        if (items) {
          if (!nextToken) {
            setHasMore(false)
          } else {
            setHasMore(true)
            setToken(nextToken)
          }

          const itemsFmt =
            sortParams && sortParams.length > 0
              ? items.sort(generateSortFn(sortParams))
              : items

          if (breakItems && breakItems === 'CATEGORY') {
            setItemsList(breakCategory(itemsFmt))
            setIsLoading(false)
          } else if (breakItems && breakItems === 'MENU') {
            setItemsList(breakMenu(itemsFmt))
            setIsLoading(false)
          } else if (breakItems && breakItems === 'UPDATEDAT') {
            setItemsList(breakUpdatedAt(itemsFmt))
            setIsLoading(false)
          } else if (breakItems && breakItems === 'CREATEDAT') {
            setItemsList(breakCreatedAt(itemsFmt))
            setIsLoading(false)
          } else if (breakItems && breakItems === 'DATE') {
            setItemsList(breakDate(itemsFmt))
            setIsLoading(false)
          } else if (breakItems && breakItems === 'TYPE') {
            setItemsList(breakType(itemsFmt))
            setIsLoading(false)
          } else {
            setItemsList(itemsFmt)
            setIsLoading(false)
          }
        } else {
          setIsLoading(false)
        }
      }
      setIsLoading(true)
      setHasMore(true)
      setToken(null)
      setItemsList([] as any)
      fetchData()
    }
    return () => {
      isMounted = false
      setHasMore(true)
      setIsLoading(true)
      setToken(null)
      setItemsList([] as any)
    }
  }, [keys])

  useEffect(() => {
    if (ref.current) {
      const h = ref.current.clientHeight
      setHeightHeader(h)
    }
  }, [ref.current?.clientHeight])

  const fetchData2 = async () => {
    if (hasMore) {
      console.log('****** List - Fetch Data More ******')
      variables.nextToken = token ? token : null
      const { items, nextToken } = await listItems(variables)
      if (items) {
        if (!nextToken) {
          setHasMore(false)
        } else {
          setHasMore(true)
          setToken(nextToken)
        }

        const itemsFmt =
          sortParams && sortParams.length > 0
            ? items.sort(generateSortFn(sortParams))
            : items

        if (breakItems && breakItems === 'CATEGORY') {
          setItemsList(breakCategory(itemsList.concat(itemsFmt)))
        } else if (breakItems && breakItems === 'MENU') {
          setItemsList(breakMenu(itemsList.concat(itemsFmt)))
        } else if (breakItems && breakItems === 'UPDATEDAT') {
          setItemsList(breakUpdatedAt(itemsList.concat(itemsFmt)))
        } else if (breakItems && breakItems === 'CREATEDAT') {
          setItemsList(breakCreatedAt(itemsList.concat(itemsFmt)))
        } else if (breakItems && breakItems === 'DATE') {
          setItemsList(breakDate(itemsList.concat(itemsFmt)))
        } else if (breakItems && breakItems === 'TYPE') {
          setItemsList(breakType(itemsList.concat(itemsFmt)))
        } else {
          setItemsList((itemsList: any) => [...itemsList, ...itemsFmt])
        }
      }
    }
    setIsLoading(false)
  }

  const handleOnUpdatedItem = (itemUpd: any) => {
    const itemsFmt1 = itemsList.map((item: any) => {
      if (item.id !== itemUpd.id) {
        return item
      } else {
        Object.keys(item).forEach((p: any) => {
          if (itemUpd.hasOwnProperty(p)) {
            item[p] = itemUpd[p]
          }
        })
        return item
      }
    })

    const itemsFmt2 =
      sortParams && sortParams.length > 0
        ? itemsFmt1.sort(generateSortFn(sortParams))
        : itemsFmt1

    if (breakItems && breakItems === 'CATEGORY') {
      setItemsList(breakCategory(itemsFmt2))
    } else if (breakItems && breakItems === 'MENU') {
      setItemsList(breakMenu(itemsFmt2))
    } else if (breakItems && breakItems === 'UPDATEDAT') {
      setItemsList(breakUpdatedAt(itemsFmt2))
    } else if (breakItems && breakItems === 'CREATEDAT') {
      setItemsList(breakCreatedAt(itemsFmt2))
    } else if (breakItems && breakItems === 'DATE') {
      setItemsList(breakDate(itemsFmt2))
    } else if (breakItems && breakItems === 'TYPE') {
      setItemsList(breakType(itemsFmt2))
    } else {
      setItemsList(itemsFmt2)
    }
  }

  const handleOnCreatedItem = (item: any) => {
    const itemsFmt = itemsList
    itemsFmt.push(item)

    if (itemSelected !== -1) {
      setItemSelected(itemSelected + 1)
    }

    const itemsFmt2 =
      sortParams && sortParams.length > 0
        ? itemsFmt.sort(generateSortFn(sortParams))
        : itemsFmt

    if (breakItems && breakItems === 'CATEGORY') {
      setItemsList(breakCategory(itemsFmt2))
    } else if (breakItems && breakItems === 'MENU') {
      setItemsList(breakMenu(itemsFmt2))
    } else if (breakItems && breakItems === 'UPDATEDAT') {
      setItemsList(breakUpdatedAt(itemsFmt2))
    } else if (breakItems && breakItems === 'CREATEDAT') {
      setItemsList(breakCreatedAt(itemsFmt2))
    } else if (breakItems && breakItems === 'DATE') {
      setItemsList(breakDate(itemsFmt2))
    } else if (breakItems && breakItems === 'TYPE') {
      setItemsList(breakType(itemsFmt2))
    } else {
      setItemsList(itemsFmt2)
    }
  }

  const handleOnDeletedItem = (itemDlt: any) => {
    const itemsFmt = itemsList.map((item: any) => {
      if (item.id !== itemDlt.id) {
        return item
      }
    })
    if (breakItems && breakItems === 'CATEGORY') {
      setItemsList(breakCategory(itemsFmt))
    } else if (breakItems && breakItems === 'MENU') {
      setItemsList(breakMenu(itemsFmt))
    } else if (breakItems && breakItems === 'UPDATEDAT') {
      setItemsList(breakUpdatedAt(itemsFmt))
    } else if (breakItems && breakItems === 'CREATEDAT') {
      setItemsList(breakCreatedAt(itemsFmt))
    } else if (breakItems && breakItems === 'DATE') {
      setItemsList(breakDate(itemsFmt))
    } else if (breakItems && breakItems === 'TYPE') {
      setItemsList(breakType(itemsFmt))
    } else {
      setItemsList(itemsFmt)
    }
  }

  const handleDelete = (i: number) => {
    setItemsList(
      itemsList.map((item: any, index: number) => {
        if (index !== i) {
          return item
        }
      })
    )
  }

  const handleSelect = (i: number) => {
    if (itemSelected === i) {
      setItemSelected(-1)
    } else {
      setItemSelected(i)
    }
  }

  useEffect(() => {
    if (onUpdatedItem && onUpdatedItem.id) {
      handleOnUpdatedItem(onUpdatedItem)
    }
  }, [onUpdatedItem])

  useEffect(() => {
    if (onCreatedItem && onCreatedItem.id) {
      handleOnCreatedItem(onCreatedItem)
    }
  }, [onCreatedItem])

  useEffect(() => {
    if (onDeletedItem && onDeletedItem.id) {
      handleOnDeletedItem(onDeletedItem)
    }
  }, [onDeletedItem])

  return (
    <div className={s.root}>
      {isLoading && (
        <Container className="p-4">
          <Loading />
        </Container>
      )}
      {!isLoading && itemsList && itemsList.length === 0 && (
        <Container className={`${EmptyHeader ? '-pt-2' : 'pt-4'}`}>
          {EmptyHeader}
          <EmptyMessage message={emptyMessage} />
        </Container>
      )}
      {!isLoading && itemsList && itemsList.length > 0 && (
        <div className="rounded-xl">
          {(isSm || isMd) && (
            <InfiniteScroll
              dataLength={itemsList.length}
              next={fetchData2}
              hasMore={hasMore}
              loader={
                <div className="m-6">
                  <Loading />
                </div>
              }
              height={
                height ? height : screenHeight - (heightNavBar + heightHeader)
              }
              scrollThreshold="100px"
              endMessage={<EndMessage message={endMessage} />}
            >
              {Header && <Header ref={ref} />}
              <div className={listClassName}>
                {itemsList.map((item: any, index: number) => (
                  <Card
                    key={item ? item.id : index}
                    index={index}
                    isLast={itemsList.length === index + 1}
                    userID={userID}
                    item={item}
                    active={item && item.id == keys}
                    onClickItem={onClickItem}
                    handleUpdate={handleOnUpdatedItem}
                    handleSelect={handleSelect}
                    handleDelete={handleDelete}
                    itemSelected={itemSelected}
                    paramsItems={paramsItems}
                  />
                ))}
              </div>
            </InfiniteScroll>
          )}

          {!isSm && !isMd && (
            <InfiniteScroll
              dataLength={itemsList.length}
              next={fetchData2}
              hasMore={hasMore}
              loader={
                <div className="m-6">
                  <Loading />
                </div>
              }
              height={
                height ? height : screenHeight - (heightNavBar + heightHeader)
              }
              scrollThreshold="150px"
              endMessage={<EndMessage message={endMessage} />}
            >
              {Header && <Header ref={ref} />}
              <div className={listClassName}>
                {itemsList.map((item: any, index: number) => (
                  <Card
                    key={item ? item.id : index}
                    index={index}
                    isLast={itemsList.length === index + 1}
                    userID={userID}
                    item={item}
                    active={item && item.id == keys}
                    onClickItem={onClickItem}
                    handleUpdate={handleOnUpdatedItem}
                    handleSelect={handleSelect}
                    handleDelete={handleDelete}
                    itemSelected={itemSelected}
                    paramsItems={paramsItems}
                  />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
      )}
    </div>
  )
}

export default List

function breakUpdatedAt(items: any) {
  let last = ''
  const itemsMaped = items.map((v: any) => {
    v.break = false
    if (v.updatedAt.substr(0, 10) !== last) {
      v.break = true
      last = v.updatedAt.substr(0, 10)
    }
    return v
  })
  return itemsMaped
}

function breakCreatedAt(items: any) {
  let last = ''
  const itemsMaped = items.map((v: any) => {
    v.break = false
    if (v.createdAt.substr(0, 10) !== last) {
      v.break = true
      last = v.createdAt.substr(0, 10)
    }
    return v
  })
  return itemsMaped
}

function breakDate(items: any) {
  let last = ''
  const itemsMaped = items.map((v: any) => {
    v.break = false
    if (v.date.substr(0, 10) !== last) {
      v.break = true
      last = v.date.substr(0, 10)
    }
    return v
  })
  return itemsMaped
}

function breakMenu(items: any) {
  let last = ''
  const itemsMaped = items.map((v: any) => {
    v.break = false
    if (v.menu !== last) {
      v.break = true
      last = v.menu
    }
    return v
  })
  return itemsMaped
}

function breakCategory(items: any) {
  let last = ''
  const itemsMaped = items.map((v: any) => {
    v.break = false
    if (v.category !== last) {
      v.break = true
      last = v.category
    }
    return v
  })
  return itemsMaped
}

function breakType(items: any) {
  let last = ''
  const itemsMaped = items.map((v: any) => {
    v.break = false
    if (v.type !== last) {
      v.break = true
      last = v.type
    }
    return v
  })
  return itemsMaped
}