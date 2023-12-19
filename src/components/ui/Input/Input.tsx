import cn from 'classnames'
import s from './Input.module.css'
import React, { InputHTMLAttributes } from 'react'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  notes?: string | any
  icon?: any
  register?: any
  defaultValue?: any
  onChange?: (...args: any[]) => any
  onInvalid?: any
}

const Input: React.FC<Props> = (props) => {
  const { className, children, onChange, register, defaultValue, onInvalid, ...rest } = props

  const rootClassName = cn(
    'py-2 bg-accent-1 w-full -ml-10 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500',
    { 'pl-10': props.icon },
    { 'pl-3': !props.icon },
    className
  )

  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value)
    }
    return null
  }

  return (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        {props.label && (
          <label className="text-accent- text-sm font-semibold px-1">{props.label}</label>
        )}
        <div className="flex">
          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
            {props.icon}
          </div>
          <input
            className={rootClassName}
            onChange={handleOnChange}
            autoComplete="none"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            defaultValue={defaultValue}
            {...register}
            {...rest}
          />
        </div>
        {!onInvalid && props.notes && <span className="text-accent-3 text-xs">{props.notes}</span>}
        {onInvalid && <span className="text-red-500 text-xs font-semibold">{onInvalid}</span>}
      </div>
    </div>
  )
}

export default Input
