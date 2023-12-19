import { Auth, API } from 'aws-amplify'
import { useState, useEffect } from 'react'
import { toast } from 'react-toast'
import { Loading } from 'components/ui'
import { useGroupUser } from 'hooks/useGroupUser'

interface Props {
  user: any
}

export default function TabOrders(props: Props) {
  const { user } = props
  const [groups, setGroups] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)

  const { listGroupsByUser, createGroupUser, deleteGroupUser } = useGroupUser()

  const checkGroups = async () => {
    const apiName = 'AdminQueries'
    const path = '/listGroups'
    const myInit = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    }
    const r = await API.get(apiName, path, myInit)
    groups.map((group: any) => {
      let exists = false
      r.Groups.map((g: any) => {
        if (group.name === g.GroupName) {
          exists = true
        }
      })
      if (!exists) {
        toast.hideAll()
        toast.error(`Grupo ${group.name} deve ser criado no cognito.`)
      }
    })
    return r
  }

  const getUser = async (username: string) => {
    const apiName = 'AdminQueries'
    const path = '/getUser'
    const myInit = {
      body: {
        username,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    }
    const r = await API.get(apiName, path, myInit)
    console.log(r)
    return r
  }

  const listGroupsForUser = async (username: string, g: any) => {
    const apiName = 'AdminQueries'
    const path = '/listGroupsForUser'
    const myInit = {
      queryStringParameters: {
        username,
        limit: 60,
        token: '',
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    }
    const { NextToken, ...rest } = await API.get(apiName, path, myInit)
    g.map((groupEnv: any) => {
      rest.Groups.map((groupCognito: any) => {
        if (groupEnv.name === groupCognito.GroupName) {
          groupEnv.isMember = true
        }
      })
    })
    setGroups(g)
    setIsLoading(false)
  }

  const addUserToGroup = async (username: string, groupname: string) => {
    const apiName = 'AdminQueries'
    const path = '/addUserToGroup'
    const myInit = {
      body: {
        username,
        groupname,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    }
    return await API.post(apiName, path, myInit)
  }

  const removeUserFromGroup = async (username: string, groupname: string) => {
    const apiName = 'AdminQueries'
    const path = '/removeUserFromGroup'
    const myInit = {
      body: {
        username,
        groupname,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    }
    return await API.post(apiName, path, myInit)
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted && user) {
      const g = [] as any
      ;(process.env.GROUPS as any).map((group: string) => {
        g.push({
          isMember: false,
          name: group,
        })
      })
      if (user && g.length > 0) {
        listGroupsForUser(user.id, g)
      }
    }
    return () => {
      isMounted = false
      setGroups([] as any)
      setIsLoading(true)
    }
  }, [user])

  const handleCheckboxChange = async (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    const g = groups.map((group: any) => {
      if (group.name === target.name) {
        group.isMember = !group.isMember
      }
      return group
    })

    setGroups(g)

    const { items } = await listGroupsByUser({ 
      userID: user.id,
      group: {eq: target.name}
    })

    if (value) {
      await addUserToGroup(user.id, target.name)
      toast(`${user.name} adicionado no grupo ${target.name} com sucesso.`, {
        backgroundColor: '#263238',
        color: '#fff',
      })
      if (!items || items.length === 0) {
        await createGroupUser({
          group: target.name,
          userID: user.id,
          profileID: user.id
        })
      } 
    } else {
      const r = await removeUserFromGroup(user.id, target.name)
      toast(`${user.name} removido do grupo ${target.name} com sucesso.`, {
        backgroundColor: '#263238',
        color: '#fff',
      })
      items.map(async (i: any)=>{
        await deleteGroupUser({
          id: i.id,
        })
      }) 
    }
  }

  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading &&
        groups.map((g: any, k: number) => (
          <div key={k} className="m-4 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id={g.name}
                  name={g.name}
                  checked={g.isMember}
                  onChange={handleCheckboxChange}
                  className="checkbox"
                  disabled={false}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={g.name} className="font-medium text-gray-700">
                  {g.name}
                </label>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
