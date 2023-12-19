import { useState } from 'react'
import cn from 'classnames'
import React, { InputHTMLAttributes } from 'react'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  notes?: string | any
  icon?: any
  icontwo?: any
  register?: any
  defaultValue?: any
  onChange?: (...args: any[]) => any
  onInvalid?: any
}

const InputPassword: React.FC<Props> = (props) => {
  const { className, children, onChange, register, defaultValue, onInvalid, ...rest } =
    props

  const [showPassword, setShowPassword] = useState(false)

  const rootClassName = cn(
    'py-2 bg-accent-1 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500',
    { ['pl-10']: props.icon },
    className
  )

  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value)
    }
    return null
  }

  const PasswordEye = () => {
    return (
      <div>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-xs"
        >
          {!showPassword ? (
            <span className="uppercase font-bold text-accent-6 text-xs">
              mostrar
            </span>
          ) : (
            <span className="uppercase font-bold text-accent-6 text-xs">
              esconder
            </span>
          )}
        </button>
      </div>
    )
  }

  return (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        {props.label && (
          <label className="text-accent-7 text-sm font-semibold px-1">
            {props.label}
          </label>
        )}
        <div className="bg-accent-1 flex h-11 justify-between items-center py-2 w-full pl-3 rounded-lg border-2 border-accent-2 outline-none focus:border-indigo-500">
          <div className="w-10 -ml-2 flex items-center justify-center">
            {props.icon}
          </div>
          <input
            className="w-full border-none outline-none shadow-none focus:outline-none focus:shadow-none"
            onChange={handleOnChange}
            autoComplete="none"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            defaultValue={defaultValue}
            type={showPassword ? 'text' : 'password'}
            {...register}
            {...rest}
          />
          <div className="w-32 flex items-center justify-center">
            <PasswordEye />
          </div>
        </div>
        {!onInvalid && props.notes && (
          <span className="text-accent-6 text-xs">{props.notes}</span>
        )}
        {onInvalid && <span className="text-red-500 text-xs font-semibold">{onInvalid}</span>}
      </div>
    </div>
  )
}

export default InputPassword
