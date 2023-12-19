import { Auth, Storage, API } from 'aws-amplify'
import * as subscriptions from 'graphql/subscriptions'

import { useState, useEffect } from 'react'
import { ArrowLeft } from 'components/icons'
import QRCode from 'react-qr-code'
import Layout from './Layout'
import cn from 'classnames'
import { useBreakPoints } from 'hooks/useBreakPoints'
import Moment from 'moment'

interface Props {
  relationLink: any
  security: string
  setContentSel: any
  user: any
  padX: string
}

export default function Access(props: Props) {
  const { relationLink, security, setContentSel, user, padX } = props

  const [timestamp, setTimestamp] = useState(Moment().unix())

  const [authorized, setAuthorized] = useState(
    security === 'qrCode' ? false : true
  )
  
  const { isSm, isMd } = useBreakPoints()

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Moment().unix())
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user && user.id) {
      const subscriptionCreate = API.graphql({
        query: subscriptions.onCreateQrCodeScan,
        variables: { userID: user.id },
      })
        // @ts-ignore
        .subscribe({
          next: async (data: any) => {
            let result = data.value.data.onCreateQrCodeScan
            console.log(user.profile.uuid)
            console.log(result)
            if (result.userID === user.id && 
                // user.profile.uuid === result.uuid &&
                relationLink.relationID === result.relationID) {
              setAuthorized(true)
            }
          },
          error: (error: any) => console.warn(error),
        })

      return () => {
        subscriptionCreate.unsubscribe()
      }
    }
  }, [user])

  return (
    <div>
      {!authorized && security === 'qrCode' && (
        <div>
          <div className="pt-4 flex justify-center">
            <QRCode value={`${user.id}|${relationLink.relationID}|${timestamp}`} />
          </div>
          <p className="mt-4 text-center">
            Necessário escanear o QR Code para ter acesso ao conteúdo.
          </p>
          <div className="mt-4 flex justify-center">
            <a
              onClick={() => setContentSel(false as any)}
              className="btn btn-outline cursor-pointer"
            >
              <ArrowLeft /> Voltar
            </a>
          </div>
          {true && <div className="mt-4 flex justify-center cursor-pointer text-xs text-red-500">
            <a
              onClick={() => {
                setAuthorized(true)
              }}
            >
              Autorizar
            </a>
          </div>}
        </div>
      )}

      {authorized && <Layout 
        relationLink={relationLink} 
        user={user} 
        padX={padX} 
        setContentSel={setContentSel}
      />}
    </div>
  )
}
