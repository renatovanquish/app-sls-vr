import { Auth, API } from 'aws-amplify'
import { useState } from 'react'
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { toast } from 'react-toast'
import { useUser } from 'hooks/useUser'
import { useLog } from "hooks/useLog";
import Link from 'next/link'

interface Props {
  user: any
  handleDelete: any
  index: number
}

export default function TabActions(props: Props) {
  const { user, handleDelete, index } = props
  
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)

  const { adminDeleteUser, updateProfile } = useUser()
  const { setLogUser } = useLog();

  const deleteUser = async () => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma excluir o usuário? : ${user.name}`,
      message: user.name,
      options: [
        {
          title: 'NÃO',
          style: ActionSheetButtonStyle.Destructive,
        },
        {
          title: 'SIM',
        },
      ],
    })
    if (promptRet.index === 1) {
      setLoading(true)
      await adminDeleteUser({ id: user.id })
      handleDelete(index)
      toast('Usuário excluído com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
      setLoading(false)
    }
  }

  const confirmUser = async () => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma validação do usuário? : ${user.name}`,
      message: user.name,
      options: [
        {
          title: 'NÃO',
          style: ActionSheetButtonStyle.Destructive,
        },
        {
          title: 'SIM',
        },
      ],
    })
    if (promptRet.index === 1) {
      setLoading2(true)
      const apiName = 'AdminQueries'
      const path = '/confirmUserSignUp'
      const myInit = {
        body: {
          username: user.id,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      }

      const r = await API.post(apiName, path, myInit)
      console.log(r)
      toast('Usuário validado com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
      setLoading2(false)
    }
  }

  const resetRegisterMobile = async () => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma resetar o registro do celular do usuário? : ${user.name}`,
      message: user.name,
      options: [
        {
          title: 'NÃO',
          style: ActionSheetButtonStyle.Destructive,
        },
        {
          title: 'SIM',
        },
      ],
    })
    if (promptRet.index === 1) {
      setLoading3(true)
      await updateProfile({ userID: user.id, uuid: '' })

      setLogUser({
        userID: user.id,
        tag: "RESET REGISTRO DO CELULAR",
        notes: "Registro resetado com sucesso.",
        message: '',
      });

      toast('Registro resetado com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
      setLoading3(false)
    }
  }

  return (
    <div className="flex gap-4">
      <button onClick={confirmUser} className={`btn ${loading2 && 'loading'}`}>
        Ativar Usuário
      </button>

      <Link href={`/admin/logs/${user.email}`}>
        <button className="btn">LOGS</button>
      </Link>
      
      <button
        onClick={deleteUser}
        className={`btn btn-error ${loading && 'loading'}`}
      >
        Excluir Usuário
      </button>

      <button
        onClick={resetRegisterMobile}
        className={`btn btn-warning ${loading3 && 'loading'}`}
      >
        Reset Registro Celular
      </button>
    </div>
  )
}
