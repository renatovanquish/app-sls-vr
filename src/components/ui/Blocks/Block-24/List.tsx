import { useEffect, useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'
import { Loading } from 'components/ui'
import { useRestrictedContentView } from 'hooks/useRestrictedContentView'
import { useTheme } from 'next-themes'

import Moment from 'moment'

import { Storage } from 'aws-amplify'
Storage.configure({ level: 'protected' })

interface Props {
  contents: any[]
  contentSel: any
  setContentSel: any
  setTabSel?: any
  userID: string
  relationID: string
}

export default function List(props: Props) {
  const {
    contents,
    contentSel,
    setContentSel,
    setTabSel,
    userID,
    relationID
  } = props
  const { theme } = useTheme()

  return (
    <div>
      {contents.map((c: any, i: number) => (
        <div key={i}>
          {c.break && (
            <div className={`${!i ? 'pb-3' : 'pt-6 pb-3'}`}>
              <h2 className="tracking-widest text-xs title-font font-medium text-tertiary-2 mb-1">
                {c.group}
              </h2>
              <h1 className="title-font font-bold text-cyan-900">
                {c.subGroup}
              </h1>
            </div>
          )}
          <div
            onClick={() => {
              if (
                c.lifetime !== 'PERIOD' ||
                (Moment(c.start) <= Moment() && Moment(c.expiration) > Moment())
              ) {
                localStorage.setItem(relationID, i.toString())
                setContentSel(c)
                if (setTabSel) {
                  setTabSel(0)
                }
              }
            }}
            className={cn('my-1 w-full rounded-lg p-2', {
              'bg-accent-0 shadow-sm': theme === 'light' && contentSel.id !== c.id,
              'bg-accent-1 shadow-sm': theme === 'dark' && contentSel.id !== c.id,
              'bg-accent-3 my-3 shadow': theme === 'light' && contentSel.id === c.id,
              'bg-accent-2 my-3 shadow': theme === 'dark' && contentSel.id === c.id,
              'cursor-pointer':
                c.lifetime !== 'PERIOD' ||
                (Moment(c.start) <= Moment() &&
                  Moment(c.expiration) > Moment()),
              'cursor-not-allowed': !(
                c.lifetime !== 'PERIOD' ||
                (Moment(c.start) <= Moment() && Moment(c.expiration) > Moment())
              ),
            })}
          >
            <div className="w-full flex items-center justify-between">
              <div className="mr-4" style={{ minWidth: 64, minHeight: 64 }}>
                <Thumbnail
                  thumbnailKey={c.thumbnail}
                  identityId={c.identityId}
                  restrictedContentID={c.id}
                  userID={userID}
                />
              </div>

              <div className="w-full flex flex-col content-center">
                <h2 className="text-accent-9 text-sm font-medium">{c.title}</h2>
                <div className="flex mt-1 gap-2 text-xs">
                  {(c.lifetime !== 'PERIOD' ||
                    (Moment(c.start) <= Moment() &&
                      Moment(c.expiration) > Moment())) && (
                    <div className="bg-green-500 text-white px-1 rounded font-semibold">
                      LIBERADO
                    </div>
                  )}
                  {c.lifetime === 'PERIOD' && Moment(c.start) > Moment() && (
                    <div className="bg-accent-3 text-white px-1 rounded">
                      AGUARDANDO
                    </div>
                  )}
                  {c.lifetime === 'PERIOD' &&
                    Moment(c.expiration) < Moment() && (
                      <div className="bg-red-500 text-white px-1 rounded">
                        EXPIRADO
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Thumbnail(props: any) {
  const { thumbnailKey, identityId, restrictedContentID, userID } = props
  const [loading, setLoading] = useState(true)
  const [url, setUrl] = useState('')
  const [percentage, setPercentage] = useState(0)

  const { listRestrictedContentViewByRestrictedContentUser } =
    useRestrictedContentView()

  useEffect(() => {
    if (thumbnailKey) {
      setLoading(true)
      const fetch = async () => {
        const u = await Storage.get(thumbnailKey, {
          level: 'protected',
          contentType: 'video/*',
          download: false,
          expires: 10800,
          identityId,
        })
        setUrl(u.toString())
        setLoading(false)
      }
      fetch()
    } else {
      setUrl('')
      setLoading(false)
    }
    return () => {
      setUrl('')
      setLoading(false)
    }
  }, [thumbnailKey, identityId])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const fetchData = async () => {
        const { items } = await listRestrictedContentViewByRestrictedContentUser({
          restrictedContentID,
          userID: { eq: userID },
        })
        if (items.length > 0) {
          setPercentage(items[0].percentage)
        } else {
          setPercentage(0)
        }
      }
      fetchData()
    }
    return () => {
      setPercentage(0)
    }
  },[restrictedContentID])

  return loading ? (
    <Loading />
  ) : (
    <div
      className="radial-progress bg-slate-200 text-red-500"
      style={
        {
          '--value': percentage,
          '--size': '72px',
          '--thickness': '4px',
        } as any
      }
    >
      <Image
        alt=""
        className="bg-accent-1 object-cover object-center flex-shrink-0 mask mask-circle"
        src={url ? url : '/images/no_photo.png'}
        width={64}
        height={64}
      />
    </div>
  )
}
