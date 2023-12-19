import React, { useState } from 'react'
import { ScheduleFrequencies } from 'API'
import { useTheme } from 'next-themes'
import cn from 'classnames'


import Moment from 'moment'

interface Props {
  items: any
}
export default function Schedules(props: Props) {
  const { items } = props
  const [value, onChange] = useState(new Date())
  const { theme } = useTheme()
  return (
    <div>
      <div>Calendar</div>
      <div className="mt-2 mb-4 flex flex-col gap-4">
        {items.map((i: any, n: number) => (i.viewType === 'CARD' || i.viewType === 'ALL') && (
          <div key={n} className={cn("p-3 rounded-lg shadow",{
            'bg-sky-50 text-black': theme === 'light',
            'bg-slate-900 text-white': theme === 'dark',
          })}>
            <div className="text-lg font-semibold">{i.title}</div>
            <div>
              <span className="capitalize font-semibold text-sm">
                {Moment(i.dateTime).format('dddd, DD-MM-YYYY')}
              </span>
              <span className="font-semibold text-sm">&nbsp;às&nbsp;</span>
              <span className="font-semibold text-sm">
                {Moment(i.dateTime).format('HH:mm')}
              </span>
            </div>
            <div className="text-xs">{i.description}</div>
            {i.frequency !== ScheduleFrequencies.NONE && <div className="badge badge-warning text-white">
              {i.frequency === ScheduleFrequencies.WEEK && <span>Semanal</span>}
              {i.frequency === ScheduleFrequencies.MONTHLY && (
                <span>Mensal</span>
              )}
              {i.frequency === ScheduleFrequencies.QUARTERLY && (
                <span>Trimestral</span>
              )}
              {i.frequency === ScheduleFrequencies.SEMIANNUAL && (
                <span>Semestral</span>
              )}
              {i.frequency === ScheduleFrequencies.ANNUAL && <span>Anual</span>}
            </div>}
          </div>
        ))}
      </div>
    </div>
  )
}
