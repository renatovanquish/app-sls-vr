import { useState } from 'react'
import { Trash, Check } from 'components/icons'
import { Button, FormCard } from 'components/ui'

import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'

export default function Advanced(props: any) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState()
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const openModalRequestData = async (e: any) => {
    const promptRet = await ActionSheet.showActions({
      title: 'Confirma solicitação dos seus dados?',
      message: '',
      options: [
        { title: 'NÃO', style: ActionSheetButtonStyle.Destructive },
        { title: 'SIM' },
      ],
    })
    if (promptRet.index === 1) {
      setLoading(true)
      setLoading(false)
    }
  }

  const openModalClearCache = async (e: any) => {
    const promptRet = await ActionSheet.showActions({
      title: 'Confirma excluir o cache?',
      message: '',
      options: [
        { title: 'NÃO', style: ActionSheetButtonStyle.Destructive },
        { title: 'SIM' },
      ],
    })
    if (promptRet.index === 1) {
      setLoading(true)
      setLoading(false)
    }
  }

  const openModalDeleteAccount = async (e: any) => {
    const promptRet = await ActionSheet.showActions({
      title: 'Confirma excluir sua conta?',
      message: '',
      options: [
        { title: 'NÃO', style: ActionSheetButtonStyle.Destructive },
        { title: 'SIM' },
      ],
    })
    if (promptRet.index === 1) {
      setLoading(true)
      setLoading(false)
    }
  }

  const ButtonsRequestData: React.FC = () => (
    <div>
      <Button
        variant="slim"
        type="button"
        onClick={() => props.openModalRequestData(null)}
      >
        <Check className="h-7 w-7" />
        <span className="ml-2 font-semibold md:font-medium text-lg md:text-base">
          SOLICITAR
        </span>
      </Button>
    </div>
  )

  const ButtonsClearCache: React.FC = () => (
    <div>
      <Button
        variant="slim"
        type="button"
        onClick={() => props.openModalClearCache(null)}
      >
        <Trash className="h-7 w-7" />
        <span className="ml-2 font-semibold md:font-medium text-lg md:text-base">
          LIMPAR CACHE
        </span>
      </Button>
    </div>
  )

  const ButtonsDeleteAccount: React.FC = () => (
    <div>
      <Button
        variant="slim"
        type="button"
        style={{ background: '#D50000', color: '#FFFFFF' }}
        onClick={() => props.openModalDeleteAccount(null)}
      >
        <Trash className="h-7 w-7" />
        <span className="ml-2 font-semibold md:font-medium text-lg md:text-base">
          EXCLUIR CONTA
        </span>
      </Button>
    </div>
  )

  return (
    <>
      <FormCard
        title="Solicite uma copia das suas informações"
        description="Ao solicitar uma cópia de suas informações pessoais armazenadas no App, você receberá um arquivo com os registros de seu histórico de uso no app."
        buttons={<ButtonsRequestData />}
      ></FormCard>

      <FormCard
        title="Limpar Cache"
        description="A fim de melhorar sua experiencia no app um cache local é gerado automaticamente a medida que você utiliza o app. Aqui voce pode apagar este cache."
        buttons={<ButtonsClearCache />}
      ></FormCard>

      <FormCard
        title="Excluir Conta - Zona de perigo"
        description="Caso exclua sua conta, todos seus dados serão apagados de forma irreversivel! Tenha certeza se realmente deseja excluir sua conta."
        buttons={<ButtonsDeleteAccount />}
      ></FormCard>
    </>
  )
}
