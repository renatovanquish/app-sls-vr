import { useState, useEffect } from 'react'
import { Button, Input } from 'components/ui'
import { Check, Trash, Edit, Cross } from 'components/icons'
import { useSchedule } from 'hooks/useSchedule'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { toast } from 'react-toast'
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet'
import { ScheduleFrequencies } from 'API'
import { v4 as uuidv4 } from 'uuid'

import Moment from 'moment'

type SchedulesInputs = {
  dateTime: any
  title: string
  description: string
  frequency: string
  viewType: string
  link: string
}

interface Props {
  relationID: string
  userID: string
}

export default function TabSchedules(props: Props) {
  const { relationID, userID } = props

  const [loading, setLoading] = useState(true)
  const [id, setId] = useState('')
  const [schedules, setSchedules] = useState([] as any)

  const {
    listSchedulesByRelationDateTime,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  } = useSchedule()

  const fetchData = async () => {
    setId('')
    setSchedules([] as any)
    const { items } = await listSchedulesByRelationDateTime({
      relationID,
      limit: 100,
      nextToken: null,
    })
    setSchedules(items)
    setLoading(false)
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      fetchData()
    }
    return () => {
      isMounted = false
      setLoading(true)
      setSchedules([] as any)
      setId('')
    }
  }, [relationID])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<SchedulesInputs>()

  const watchDateTime = watch('dateTime')
  const watchTitle = watch('title')

  const onSubmit: SubmitHandler<SchedulesInputs> = async (data) => {
    const { dateTime, title, description, frequency, viewType, link } = data

    setLoading(true)
    const input = {
      id: id ? id : uuidv4(),
      relationID,
      userID,
      dateTime: Moment(dateTime).toISOString(),
      title,
      description,
      frequency,
      viewType,
      link,
    } as any

    if (id) {
      await updateSchedule(input)
      fetchData()
      reset()
      setId('')
    } else {
      const result = (await createSchedule(input)) as any
      setSchedules(schedules.concat(result))
      reset()
    }

    setLoading(false)
    toast(`Agendamento ${id ? 'atualizado' : 'adicionado'} com sucesso.`, {
      backgroundColor: '#263238',
      color: '#fff',
    })
  }

  const onDeleteItem = async (e: any, index: number) => {
    const promptRet = await ActionSheet.showActions({
      title: `Confirma excluir o agendamento? ${e.title}`,
      message: '',
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
      await deleteSchedule({ id: e.id })

      setSchedules(
        schedules.map((item: any, i: number) => {
          if (index !== i) {
            return item
          }
        })
      )

      toast('Agendamento excluído com sucesso.', {
        backgroundColor: '#263238',
        color: '#fff',
      })
    }
  }

  const onEditItem = async (e: any, index: number) => {
    setId(e.id)
    setValue('dateTime', Moment(e.dateTime).format('YYYY-MM-DDTHH:mm'))
    setValue('title', e.title)
    setValue('description', e.description)
    setValue('frequency', e.frequency)
    setValue('viewType', e.viewType)
    setValue('link', e.link)
  }

  return (
    <div>
      <div className="mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md">
            <div className="flex flex-col sm:flex-row w-full sm:space-x-2 space-y-3 sm:space-y-0 mb-2 sm:mb-4">
              <div className="basis-full md:basis-1/3">
                <Input
                  label="Data de início"
                  type="datetime-local"
                  register={register('dateTime')}
                  defaultValue={''}
                />
              </div>
              <div className="basis-full md:basis-1/3">
                <div className="w-full">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Recorrência
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('frequency')}
                      placeholder=""
                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option value={ScheduleFrequencies.NONE}>Nenhuma</option>
                      <option value={ScheduleFrequencies.WEEK}>Semanal</option>
                      <option value={ScheduleFrequencies.MONTHLY}>
                        Mensal
                      </option>
                      <option value={ScheduleFrequencies.QUARTERLY}>
                        Trimestral
                      </option>
                      <option value={ScheduleFrequencies.SEMIANNUAL}>
                        Semestral
                      </option>
                      <option value={ScheduleFrequencies.ANNUAL}>Anual</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="basis-full md:basis-1/3">
                <div className="w-full">
                  <label
                    htmlFor=""
                    className="text-accent-7 text-sm font-semibold px-1"
                  >
                    Visualização
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10"></div>
                    <select
                      {...register('viewType')}
                      placeholder=""
                      className="text-accent-9 bg-accent-1 w-full pl-3 -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                    >
                      <option value="ALL">Em ambos</option>
                      <option value="CARD">Card</option>
                      <option value="CALENDAR">Calendário</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="basis-full">
                <Input
                  label="Título"
                  type="text"
                  register={register('title')}
                  defaultValue={''}
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="basis-full">
                <label className="text-accent-7 text-sm font-semibold px-1">
                  Descrição (Opcional)
                </label>
                <div className="flex">
                  <div className="w-10 z-10"></div>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <textarea
                        rows={2}
                        className="-ml-10 text-accent-9 bg-accent-1 w-full rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500"
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <span className="text-accent-6 text-xs"></span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:space-x-2 space-y-3 lg:space-y-0 mb-2 lg:mb-4">
              <div className="basis-full">
                <Input
                  label="Link"
                  type="text"
                  register={register('link')}
                  defaultValue={''}
                />
              </div>
            </div>
          </div>
          <div className="my-6 flex gap-2">
            <Button
              variant="slim"
              type="submit"
              loading={loading}
              disabled={!watchDateTime || !watchTitle}
            >
              <Check className="-ml-2 mr-2" />
              {id ? 'Atualizar' : 'Adicionar'}
            </Button>

            {id && (
              <Button
                variant="slim"
                type="button"
                onClick={() => {
                  setId('')
                  reset()
                  setValue('dateTime', '')
                  setValue('title', '')
                  setValue('description', '')
                  setValue('frequency', '')
                  setValue('viewType', '')
                }}
              >
                <Cross className="-ml-2 mr-2" />
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </div>

      {schedules.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full table-compact">
            <thead>
              <tr>
                <th>Data e hora</th>
                <th>Frequência</th>
                <th>Título</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {schedules
                .sort((a: any, b: any) => a.dateTime.localeCompare(b.dateTime))
                .map(
                  (schedule: any, index: number) =>
                    schedule && (
                      <tr key={index}>
                        <td className="text-base">
                          <span>
                            {Moment(schedule.dateTime).format('DD-MM-YYYY')}
                          </span>
                          &nbsp;
                          <span>
                            {Moment(schedule.dateTime).format('HH:mm')}
                          </span>
                        </td>
                        <td className="text-base">
                          {schedule.frequency === ScheduleFrequencies.NONE && (
                            <span>Nenhuma</span>
                          )}
                          {schedule.frequency === ScheduleFrequencies.WEEK && (
                            <span>Semanal</span>
                          )}
                          {schedule.frequency ===
                            ScheduleFrequencies.MONTHLY && <span>Mensal</span>}
                          {schedule.frequency ===
                            ScheduleFrequencies.QUARTERLY && (
                            <span>Trimestral</span>
                          )}
                          {schedule.frequency ===
                            ScheduleFrequencies.SEMIANNUAL && (
                            <span>Semestral</span>
                          )}
                          {schedule.frequency ===
                            ScheduleFrequencies.ANNUAL && <span>Anual</span>}
                        </td>
                        <td className="text-base">{schedule.title}</td>
                        <td>
                          <div className="flex gap-3">
                            <div className="text-blue-500 cursor-pointer">
                              <Edit
                                onClick={() => {
                                  onEditItem(schedule, index)
                                }}
                              />
                            </div>
                            <div className="text-red-500 cursor-pointer">
                              <Trash
                                onClick={() => {
                                  onDeleteItem(schedule, index)
                                }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
