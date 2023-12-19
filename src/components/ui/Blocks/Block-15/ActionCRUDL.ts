import { useDataBase } from 'hooks/useDataBase'
import { DataBaseItemStatus } from 'API'

export default async function ActionCRUDL(props: any) {
  const { userID, name, email, phone, title, dataBase, data, search } = props
  
  const { listDataBasesByName, createDataBase, createDataBaseItem } = useDataBase()

  const database = await listDataBasesByName({ name: dataBase })
  let dataBaseID = ''

  if (database.items.length === 0) {
    const createdDataBase = await createDataBase({
      name: dataBase
    })
    dataBaseID = createdDataBase.id
  } else {
    dataBaseID = database.items[0].id
  }

  const body = {
    dataBaseID,
    userID,
    data: JSON.stringify(data),
    status: DataBaseItemStatus.STANDBY,
    search,
    notes: '',
  }

  const createdDataBaseItem = await createDataBaseItem(body)

  return null
}
