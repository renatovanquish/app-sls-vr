import { FC, useRef, useEffect, useCallback } from 'react'
import Portal from '@reach/portal'
import s from './Modal.module.css'
import { Cross } from 'components/icons'

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

import FocusTrap from 'lib/focus-trap'

import { useScreen } from 'hooks/useScreen'
import { useBreakPoints } from 'hooks/useBreakPoints'

interface Props {
  title?: any
  className?: string
  children?: any
  open?: boolean
  focusTrap?: boolean
  fullSize?: boolean
  absolute?: boolean
  hideHeader?: boolean
  onClose: () => void
  onEnter?: () => void | null
  onOpen?: any
}

const Modal: FC<Props> = ({
  title,
  children,
  open,
  fullSize,
  absolute,
  hideHeader,
  onClose,
  onEnter = null,
  focusTrap = true,
  onOpen,
}) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>
  const { screenWidth, screenHeight } = useScreen()
  const { isSm } = useBreakPoints()

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current)
        window.addEventListener('keydown', handleKey)
        if (onOpen) {
          onOpen()
        }
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      window.removeEventListener('keydown', handleKey)
      clearAllBodyScrollLocks()
    }
  }, [open, handleKey])

  return (
    <Portal>
      {open ? (
        <div className={s.root}>
          <div
            style={{
              minWidth: isSm ? screenWidth : 'auto',
              maxWidth: fullSize ? screenWidth : screenWidth * 0.9,
              maxHeight: fullSize ? screenHeight : screenHeight * 0.9,
            }}
            className={`${s.modal} min-h-full min-w-full md:min-h-0 md:min-w-0`}
            role="dialog"
            ref={ref}
          >
            {!hideHeader && (
              <div
                className={`flex justify-between py-4 px-4 ${
                  absolute && 'absolute right-1'
                }`}
              >
                <div>{title}</div>
                <div>
                  <button
                    onClick={() => onClose()}
                    aria-label="Close"
                    className="cursor-pointer bg-accent-1 p-2 rounded-full flex items-center justify-center"
                  >
                    <Cross className="h-7 w-7" />
                  </button>
                </div>
              </div>
            )}
            {focusTrap && <FocusTrap focusFirst>{children}</FocusTrap>}
            {!focusTrap && <>{children}</>}
          </div>
        </div>
      ) : null}
    </Portal>
  )
}

export default Modal
