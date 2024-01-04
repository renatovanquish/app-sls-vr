/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button } from 'components/ui'
import { Check } from 'components/icons'
import { toast } from 'react-toast'
import { useBlock } from 'hooks/useBlock'
import { useDataBase } from 'hooks/useDataBase'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  dataBase: string
  enableSearch: boolean
  orderDesc: boolean
}

interface Props {
  block: any
  handleUpdate: any
  index?: number
  onClickItem?: any
}

export default function Edit(props: Props) {
  const { block, handleUpdate, index, onClickItem } = props
  const [loading, setLoading] = useState(false)
  const { updateBlock } = useBlock()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  useEffect(() => {
    if (block && block.content) {
      const contentParse = JSON.parse(block.content)
      setValue('dataBase', contentParse.dataBase)
      setValue('enableSearch', contentParse.enableSearch)
      setValue('orderDesc', contentParse.orderDesc)
    } else {
      setValue('enableSearch', true)
      setValue('orderDesc', true)
    }
  }, [])

  const [dataBases, setDataBases] = useState([] as any)
  const { listDataBases } = useDataBase()

  useEffect(()=>{
    let isMounted = true
    if (isMounted) {
      const fetchDB = async () => {
        const { items } = await listDataBases({ limit: 100 })
        console.log(items)
        setDataBases(items)
      }
      fetchDB()
    }
    return () => {
      setDataBases([] as any)
    }
  },[])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    const updatedBlock = await updateBlock({
      id: block.id,
      content: JSON.stringify(data),
    })
    delete updatedBlock.page
    handleUpdate(index, updatedBlock)
    toast.info(`Bloco atualizado com sucesso!`)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4 max-w-full w-full mx-auto">
        <div className="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
          <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
            Banco de dados de formulários
          </h2>
          <h1 className="md:text-2xl text-xl font-medium title-font text-accent-9">
            Opções da visualização dos dados
          </h1>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
          <div className="w-full md:w-2/4">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Banco de dados
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('dataBase')}

                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    {dataBases.map((db:any, idx:number)=>(<option key={idx} value={db.id}>{db.name}</option>))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/4">
            <div className="flex -mx-3">
              <div className="w-full px-3">
                <label
                  htmlFor=""
                  className="text-accent-7 text-sm font-semibold px-1"
                >
                  Exibir em ordem decrescente?
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <select
                    {...register('orderDesc')}

                    className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                  >
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Button type="submit" variant="slim" loading={loading} disabled={false}>
          <Check className="-ml-2 mr-2" />
          Atualizar
        </Button>
      </div>
    </form>
  )
}
