
interface Props {
  user: any
}

export default function TabInfo(props: Props) {
  const { user } = props
  return (<div>
    <div><label className="mr-2">ID do Usuário</label>{user.id}</div>
    {user.profile && user.profile.doc && <div><label className="mr-2">CPF</label>{user.profile.doc}</div>}
    {user.profile && user.profile.birth && <div><label className="mr-2">Nascimento</label>{user.profile.birth}</div>}
    {user.profile && user.profile.gender !== 'UNKNOWN' && <div><label className="mr-2">Gênero</label>{user.profile.gender}</div>}
    {false && user.addresses.items.length > 0 && <div><label className="mr-2">Endereços</label><div>{JSON.stringify(user.addresses.items)}</div></div>}
    {false && user.carts.items.length > 0 && <div><label className="mr-2">carts</label><div>{JSON.stringify(user.carts.items)}</div></div>}
  </div>)
}
